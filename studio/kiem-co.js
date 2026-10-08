// Kiểm tra cỡ theo chuẩn CLAUDE.md (Q361; nhân vật cao 1,9 m) và thời gian đi bộ dọc lối.
import { vatXY, congXY, loiAo, LAT } from './chung.js';
import { hinhKhu, vongVaCham } from './hinh.mjs';

// [tên nhóm, chiều đo ('h' cao, 'mat' độ cao mặt ngồi/mặt bàn đo từ GLB, 'dai' cạnh dài), min, max, các loai]
export const LUAT = [
  ['Ghế ngồi (mặt ngồi)', 'mat', 0.45, 0.55, ['ghe', 'ghe-da', 'ghe-dau', 'ghe-cat-toc']],
  ['Bàn bệt (mặt bàn)', 'mat', 0.35, 0.5, ['ban-thu-phap', 'co-tuong']],
  ['Bàn ăn/làm (mặt bàn)', 'mat', 0.7, 0.8, ['ban-moc', 'ban-may', 'ban-cafe', 'ban-nhom', 'ban-ve']],
  ['Quầy (mặt quầy)', 'mat', 0.9, 1.0, ['quay']],
  ['Biển', 'h', 2.2, 2.6, ['bang', 'bang-tin', 'cot-bien-chi', 'bang-nghe']],
  ['Đèn đường', 'h', 3.0, 3.5, ['cot-den', 'cot-den-long']],
  ['Bụi', 'h', 0.6, 1.2, ['bui']],
  ['Cây nhỏ', 'h', 3, 4, ['cay']],
  ['Cổ thụ', 'h', 8, 10, ['cay-co-thu']],
  ['Công trình nhỏ', 'h', 3.5, 5, ['ki-ot', 'ki-ot-lon', 'mieu', 'mieu-linh-may', 'sap-cho', 'sap-cho-xam', 'sap-thu-mua', 'tram-xe-buyt', 'tram-xe-buyt-lon', 'choi-bat-giac', 'choi-canh', 'choi-cau', 'den-keo-quan', 'goc-ve-chai', 'goc-nhuom', 'gian-hoa']],
  ['Nhà 1 tầng', 'h', 4, 5, ['nha-nho', 'nha', 'nha-do', 'nha-san', 'quan']],
  ['Nhà 2 tầng', 'h', 6, 7, ['nha-ong', 'nha-ong-xam']],
  ['Công trình lớn', 'h', 6, 8, ['dai-khi-tuong', 'xuong-tre', 'atelier', 'kho-thoc', 'coi-xay-gao', 'khan-dai', 'san-khau', 'nha-thi-dau']],
  ['Địa danh', 'h', 12, 15, ['thap-dong-ho', 'hai-dang']],
  ['Xe máy/xe đẩy', 'dai', 2.0, 2.2, ['xe-om', 'xe-banh-mi']],
];
export const LUAT_LOI = { lối: [2, 2], đường: [4, 5], 'đại lộ': [6, 6] };
const SAI = 0.1;   // dung sai 10 %

export function coVat(v, M) {
  const m = M.modelMap[v.loai]; if (!m) return null;
  const s = +v.to || +v.co || 1;
  return { w: m.w * s, d: m.d * s, h: m.h * s, mat: m.matTren != null ? m.matTren * s : null, m };
}
export function kiemKhu(K, M) {
  const loi = [];
  for (const [i, v] of (K.vat || []).entries()) {
    const c = coVat(v, M); if (!c) continue;
    const L = LUAT.find((l) => l[4].includes(v.loai)); if (!L) continue;
    const val = L[1] === 'h' ? c.h : L[1] === 'mat' ? c.mat ?? c.h : Math.max(c.w, c.d);
    if (val < L[2] * (1 - SAI) || val > L[3] * (1 + SAI)) loi.push({ loai: 'vat', i, id: v.id || v.loai, nhom: L[0], val, min: L[2], max: L[3], doDo: L[1] === 'h' ? 'cao' : L[1] === 'mat' ? 'mặt cao' : 'dài' });
  }
  for (const [i, p] of (K.loi || []).entries()) {
    if (p.kieu === 'tham' || K.dao?.trong) continue;   // thảm trong nhà không theo chuẩn lối
    const r = +p.rong || 0;
    if (r < 2 * (1 - SAI) || (r > 2.2 && r < 3.6) || r > 6.6) loi.push({ loai: 'loi', i, id: p.id, nhom: r < 3 ? 'Lối (2 m)' : 'Đường (4–5 m)', val: r, min: r < 3 ? 2 : 4, max: r < 3 ? 2 : 5, doDo: 'rộng' });
  }
  return loi;
}
// điểm đáng xem: vật có diaDanh / chinh, góc ảnh
export function diemXem(K) {
  const o = [];
  for (const v of K.vat || []) if (v.diaDanh || v.chinh) { const p = v.diaDanh?.toi ? { x: v.diaDanh.toi[0], z: v.diaDanh.toi[1] } : vatXY(v); o.push({ ten: v.diaDanh?.ten || v.id, ...p }); }
  return o;
}
export function khoangCachXem(K) {   // điểm gần nhất của mỗi điểm đáng xem, chuẩn 17–27 m (chỉ khu ngoài trời)
  const P = diemXem(K);
  return P.map((p) => {
    let best = null; for (const q of P) if (q !== p) { const d = Math.hypot(q.x - p.x, q.z - p.z); if (!best || d < best.d) best = { d, q }; }
    return { p, gan: best?.q, d: best?.d ?? 0, ok: !best || K.dao?.trong || (best.d >= 17 * 0.9 && best.d <= 27 * 1.1) };
  });
}

// ---- đi bộ: đồ thị từ các lối (đầu nút trùng nhau trong 0,6 m thì nối), cỏ 3,7 m/s, lát 4 m/s ----
export const V_CO = 3.7, V_LAT = 4;
export function doThi(K) {
  const loiDs = (K.loi && K.loi.length ? K.loi : []).concat(K.loi && K.loi.length ? [] : loiAo(K));
  const N = [], E = [], seg = [];
  const nut = (x, z) => { for (let i = 0; i < N.length; i++) if (Math.hypot(N[i][0] - x, N[i][1] - z) < 0.6) return i; N.push([x, z]); E.push([]); return N.length - 1; };
  for (const p of loiDs) {
    const v = LAT.has(p.kieu) ? V_LAT : V_CO; let prev = null;
    for (const [x, z] of p.diem || []) { const i = nut(x, z); if (prev != null && prev !== i) { const t = Math.hypot(N[i][0] - N[prev][0], N[i][1] - N[prev][1]) / v; E[i].push([prev, t]); E[prev].push([i, t]); seg.push([prev, i, v]); } prev = i; }
  }
  return { N, E, seg, loiDs };
}
function chieu(G, x, z) {   // hình chiếu gần nhất lên một đoạn lối
  let best = null;
  for (const [a, b, v] of G.seg) {
    const [ax, az] = G.N[a], [bx, bz] = G.N[b], dx = bx - ax, dz = bz - az, L2 = dx * dx + dz * dz || 1;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L2)), px = ax + dx * t, pz = az + dz * t, d = Math.hypot(x - px, z - pz);
    if (!best || d < best.d) best = { a, b, v, t, px, pz, d };
  }
  return best;
}
// thời gian đi từ A tới B (giây), trả cả đường đi [[x,z]...]
export function diBo(G, A, B) {
  const thang = { t: Math.hypot(B.x - A.x, B.z - A.z) / V_CO, duong: [[A.x, A.z], [B.x, B.z]], m: Math.hypot(B.x - A.x, B.z - A.z) };
  const ca = chieu(G, A.x, A.z), cb = chieu(G, B.x, B.z); if (!ca || !cb) return thang;
  const n = G.N.length, dist = new Array(n + 2).fill(Infinity), prev = new Array(n + 2).fill(-1), S = n, T = n + 1;
  const adj = (i) => { const o = i < n ? [...G.E[i]] : [];
    for (const [c, id] of [[ca, S], [cb, T]]) { if (i === id) { o.push([c.a, c.d / V_CO + Math.hypot(G.N[c.a][0] - c.px, G.N[c.a][1] - c.pz) / c.v], [c.b, c.d / V_CO + Math.hypot(G.N[c.b][0] - c.px, G.N[c.b][1] - c.pz) / c.v]); }
      else if (i === c.a || i === c.b) o.push([id, c.d / V_CO + Math.hypot(G.N[i][0] - c.px, G.N[i][1] - c.pz) / c.v]); }
    if (i === S && ca.a === cb.a && ca.b === cb.b) o.push([T, ca.d / V_CO + cb.d / V_CO + Math.hypot(ca.px - cb.px, ca.pz - cb.pz) / ca.v]);
    return o; };
  dist[S] = 0; const done = new Set();
  for (;;) { let u = -1; for (let i = 0; i < n + 2; i++) if (!done.has(i) && dist[i] < Infinity && (u < 0 || dist[i] < dist[u])) u = i; if (u < 0 || u === T) break; done.add(u); for (const [w, t] of adj(u)) if (dist[u] + t < dist[w]) { dist[w] = dist[u] + t; prev[w] = u; } }
  if (!(dist[T] < thang.t)) return thang;
  const pt = (i) => (i === S ? [A.x, A.z] : i === T ? [B.x, B.z] : G.N[i]), duong = [];
  for (let i = T; i >= 0; i = prev[i]) { duong.unshift(pt(i)); if (i === S) break; }
  { duong.splice(1, 0, [ca.px, ca.pz]); duong.splice(duong.length - 1, 0, [cb.px, cb.pz]); }
  let m = 0; for (let i = 1; i < duong.length; i++) m += Math.hypot(duong[i][0] - duong[i - 1][0], duong[i][1] - duong[i - 1][1]);
  return { t: dist[T], duong, m };
}
// ---- Q367: đi bộ tránh vật cản: lưới 0,5 m trên vùng đi được (hinh.mjs: mép đảo, nước, cầu, vùng hẻm) trừ vòng va chạm vật ----
const O = 0.5, THAN = 0.35;   // ô lưới, nửa bề ngang người
export function luoiDi(K) {
  let H; try { H = hinhKhu({ cong: [], ...K, dao: { banCong: [], song: [], ...K.dao } }); } catch { return null; }
  const vong = (K.vat || []).flatMap((v) => { try { return vongVaCham(v); } catch { return []; } });
  let R = (K.dao.r || 20) + 6; if (K.dao.elip) R = Math.max(R, Math.abs(K.dao.elip.x) + K.dao.elip.rx + 4, Math.abs(K.dao.elip.z) + K.dao.elip.rz + 4); if (K.dao.hcn) R = Math.max(...K.dao.hcn) + 6;
  const n = Math.ceil(2 * R / O), di = new Uint8Array(n * n), lat = new Uint8Array(n * n), x0 = -R, z0 = -R;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const x = x0 + (i + 0.5) * O, z = z0 + (j + 0.5) * O;
    if (!H.inIsle(x, z, 0.2)) continue;
    if (vong.some((c) => Math.hypot(x - c.x, z - c.z) < c.r + THAN)) continue;
    di[j * n + i] = 1; lat[j * n + i] = H.onRoad(x, z, 0) ? 1 : 0;
  }
  return { n, x0, z0, di, lat, vong };
}
const oCua = (L, x, z) => { const i = Math.floor((x - L.x0) / O), j = Math.floor((z - L.z0) / O); return i >= 0 && j >= 0 && i < L.n && j < L.n ? j * L.n + i : -1; };
function oGanDi(L, x, z) { const k = oCua(L, x, z); if (k >= 0 && L.di[k]) return k; for (let r = 1; r < 16; r++) for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) { if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue; const k2 = oCua(L, x + di * O, z + dj * O); if (k2 >= 0 && L.di[k2]) return k2; } return -1; }
// Dijkstra một nguồn trên lưới 8 hướng (thời gian theo tốc độ ô: lát 4, cỏ 3,7)
export function thoiGianTu(L, x, z) {
  const N = L.n * L.n, t = new Float64Array(N).fill(Infinity), truoc = new Int32Array(N).fill(-1), s = oGanDi(L, x, z); if (s < 0) return null;
  const heap = [[0, s]]; t[s] = 0;
  const push = (it) => { heap.push(it); let c = heap.length - 1; while (c > 0) { const p = (c - 1) >> 1; if (heap[p][0] <= heap[c][0]) break; [heap[p], heap[c]] = [heap[c], heap[p]]; c = p; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let c = 0; for (;;) { const l = 2 * c + 1, r = l + 1; let m = c; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === c) break; [heap[m], heap[c]] = [heap[c], heap[m]]; c = m; } } return top; };
  const NB = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];
  while (heap.length) {
    const [tk, k] = pop(); if (tk > t[k]) continue; const i = k % L.n, j = (k / L.n) | 0;
    for (const [di, dj, d] of NB) { const i2 = i + di, j2 = j + dj; if (i2 < 0 || j2 < 0 || i2 >= L.n || j2 >= L.n) continue; const k2 = j2 * L.n + i2; if (!L.di[k2]) continue;
      if (di && dj && (!L.di[j * L.n + i2] || !L.di[j2 * L.n + i])) continue;   // không cắt góc vật
      const v = (L.lat[k] && L.lat[k2]) ? V_LAT : V_CO, t2 = tk + d * O / v; if (t2 < t[k2]) { t[k2] = t2; truoc[k2] = k; push([t2, k2]); } }
  }
  return { t, truoc, s };
}
export function diBoTranh(L, A, B, T0) {
  const T = T0 || thoiGianTu(L, A.x, A.z); if (!T) return null;
  const e = oGanDi(L, B.x, B.z); if (e < 0 || !(T.t[e] < Infinity)) return null;
  const tam = (k) => [L.x0 + (k % L.n + 0.5) * O, L.z0 + (((k / L.n) | 0) + 0.5) * O], duong = [];
  for (let k = e; k >= 0; k = T.truoc[k]) duong.unshift(tam(k));
  // nối thêm đoạn thẳng từ A / tới B (ra khỏi vật cản tới ô đi được gần nhất)
  const dA = Math.hypot(duong[0][0] - A.x, duong[0][1] - A.z), dB = Math.hypot(duong[duong.length - 1][0] - B.x, duong[duong.length - 1][1] - B.z);
  duong.unshift([A.x, A.z]); duong.push([B.x, B.z]);
  const gon = [duong[0]]; for (let i = 1; i < duong.length - 1; i++) { const [a, b] = gon[gon.length - 1], [c, d] = duong[i], [e2, f2] = duong[i + 1]; if (Math.abs((c - a) * (f2 - b) - (d - b) * (e2 - a)) > 1e-6) gon.push(duong[i]); } gon.push(duong[duong.length - 1]);
  let m = 0; for (let i = 1; i < gon.length; i++) m += Math.hypot(gon[i][0] - gon[i - 1][0], gon[i][1] - gon[i - 1][1]);
  return { t: T.t[e] + (dA + dB) / V_CO, duong: gon, m, tranh: true };
}
export function congToiDiem(K) {
  const L = luoiDi(K), G = L ? null : doThi(K), P = diemXem(K);
  return (K.cong || []).map((c) => { const g = congXY(c, K.dao), a = Math.atan2(g.z, g.x), vao = { x: g.x - Math.cos(a) * 1.2, z: g.z - Math.sin(a) * 1.2 }, T = L && thoiGianTu(L, vao.x, vao.z);
    return { cong: c, ds: P.map((p) => ({ p, ...((T && diBoTranh(L, vao, p, T)) || diBo(G || doThi(K), g, p)) })).sort((a, b) => a.t - b.t) }; });
}
