// Kiểm tra cỡ theo chuẩn CLAUDE.md (Q361; nhân vật cao 1,9 m) và thời gian đi bộ dọc lối.
import { vatXY, congXY, loiAo, LAT } from './chung.js';

// [tên nhóm, chiều đo ('h' cao, 'dai' cạnh dài), min, max, các loai]
export const LUAT = [
  ['Ghế (cả tựa lưng; mặt ngồi 0,45–0,55)', 'h', 0.45, 1.0, ['ghe', 'ghe-da', 'ghe-dau']],
  ['Bàn bệt', 'h', 0.35, 0.5, ['ban-thu-phap', 'co-tuong']],
  ['Bàn ăn/làm', 'h', 0.7, 0.8, ['ban-moc', 'ban-may', 'ban-cafe', 'ban-nhom', 'ban-ve']],
  ['Quầy', 'h', 0.9, 1.0, ['quay']],
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
  return { w: m.w * s, d: m.d * s, h: m.h * s, m };
}
export function kiemKhu(K, M) {
  const loi = [];
  for (const [i, v] of (K.vat || []).entries()) {
    const c = coVat(v, M); if (!c) continue;
    const L = LUAT.find((l) => l[4].includes(v.loai)); if (!L) continue;
    const val = L[1] === 'h' ? c.h : Math.max(c.w, c.d);
    if (val < L[2] * (1 - SAI) || val > L[3] * (1 + SAI)) loi.push({ loai: 'vat', i, id: v.id || v.loai, nhom: L[0], val, min: L[2], max: L[3], doDo: L[1] === 'h' ? 'cao' : 'dài' });
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
export function congToiDiem(K) {
  const G = doThi(K), P = diemXem(K);
  return (K.cong || []).map((c) => { const g = congXY(c, K.dao); return { cong: c, ds: P.map((p) => ({ p, ...diBo(G, g, p) })).sort((a, b) => a.t - b.t) }; });
}
