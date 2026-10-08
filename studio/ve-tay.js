// Vẽ lại tranh bản đồ tay từ dữ liệu khu đang sửa (Q367), bằng studio/but.js (bản JS của tools/ban-do/but.py).
// Đây là bộ vẽ chung cho mọi khu theo khung các tệp tools/ban-do/<khu>.py: biển mây, đảo + vách, mảng cỏ, nước, lối, sân,
// cổng, lan can, vật (mái nhà / sạp bạt / ghế / khối theo cỡ model), cây theo cay.lum (cùng thuật toán dong-lua.py), rải đá hoa, la bàn.
// Chi tiết trang trí đặt tay riêng từng khu trong tệp .py (diều, vịt, dây cờ…) không có ở đây.
import { Tranh, bangMau, MUC, BONG, f } from './but.js';
import { vatXY, vatRot, vienDao, congXY, loiAo, DEG } from './chung.js';

const NHA = /^(nha|quan|ki-ot|mieu|kho-thoc|xuong-tre|atelier|dai-khi-tuong|tram-xe-buyt|choi|ga-cap-treo|nha-thi-dau|hai-dang|thap)/;
const SAP = /^(sap|xe-banh-mi|gian-hoa|den-keo-quan)/;
const dDoan = (x, z, [ax, az], [bx, bz]) => { const dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1))); return Math.hypot(x - ax - dx * t, z - az - dz * t); };
const trongDG = (P, x, z) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) if ((P[i][1] > z) !== (P[j][1] > z) && x < (P[j][0] - P[i][0]) * (z - P[i][1]) / (P[j][1] - P[i][1]) + P[i][0]) c = !c; return c; };

export function veTay(K, M) {
  const MAU = bangMau(M.bangMau.mau), dao = K.dao || { r: 20 };
  const mep = vienDao(dao, 140).map(([x, z]) => [x, z]);
  const Rmax = Math.max(...mep.map(([x, z]) => Math.max(Math.abs(x), Math.abs(z))));
  const khung = Rmax > 45 ? Math.max(72, Math.ceil(Rmax + 8)) : 47;
  const T = new Tranh(K.id, MAU, 7, khung), s = khung / 47;
  if (dao.mauNen) MAU.co = dao.mauNen;
  // vùng trống để rải cây/cỏ
  const loiDs = K.loi?.length ? K.loi : loiAo(K);
  const vatO = (K.vat || []).map((v) => { const p = vatXY(v), m = M.modelMap[v.loai], to = +v.to || +v.co || 1; return { ...p, r: m ? Math.max(m.w, m.d) / 2 * to : (+v.r || 1) }; });
  const mepTrong = (x, z, m) => { if (!trongDG(mep, x, z)) return false; if (m <= 0) return true; for (let i = 0; i < mep.length; i++) if (dDoan(x, z, mep[i], mep[(i + 1) % mep.length]) < m) return false; return true; };
  const tren_loi = (x, z, m) => loiDs.some((l) => (l.diem || []).some((p, i) => i > 0 && dDoan(x, z, l.diem[i - 1], p) < (+l.rong || 1.5) / 2 + m));
  const ban = (x, z, m = 0) => vatO.some((o) => Math.hypot(x - o.x, z - o.z) < o.r + 0.5 + m) || tren_loi(x, z, m)
    || [].concat(K.tam || []).some((t) => Math.hypot(x - t.x, z - t.z) < t.r + m) || (K.nuoc || []).some(([a, b, c, d]) => x > a - m && x < b + m && z > c - m && z < d + m)
    || (K.san && Math.hypot(x, z) < K.san.r + m);
  const trong = (x, z, m = 0) => mepTrong(x, z, 2 + m) && !ban(x, z, m);

  if (!dao.trong) T.bien_may([[-38, -40, 1.3], [37, -41, 1.1], [42, 18, 1.2], [-43, 30, 1.4], [30, 43, 1.0], [-14, 45, 0.9], [44, -12, 0.8]].map(([x, z, k]) => [x * s, z * s, k * s]));
  else T.add(`<rect x="-${khung}" y="-${khung}" width="${2 * khung}" height="${2 * khung}" fill="#E9DCC6"/>`);
  if (dao.trong) {   // phòng: sàn gỗ, tường dày
    T.hinh(mep.map(([x, z]) => [x * 1.08, z * 1.08]), MAU['go-dam'], { day: 0.2, bien: 0.03 });
    T.hinh(mep, MAU['go-sang'], { day: 0.14, bien: 0.03 });
    const r = dao.r, van = []; for (let z = -r + 0.6; z < r; z += 0.6) van.push(`M${f(-r)} ${f(z)}H${f(r)}`);
    T.add(`<path d="${van.join('')}" stroke="${MAU['go-nau']}" stroke-width=".04" opacity=".5"/>`);
  } else { T.dao(mep); T.mang_co(trong, 24, khung - 7); }
  for (const [a, b, c, d] of K.dao?.vung || []) T.hinh([[a, c], [b, c], [b, d], [a, d]], MAU['da-lat'], { day: 0.1, bien: 0.05, mo: 0.9 });
  for (const [a, b, c, d] of K.nuoc || []) { T.hinh([[a, c], [b, c], [b, d], [a, d]], MAU.nuoc, { day: 0.15, bien: 0.15 }); T.hinh([[a + 0.6, c + 0.6], [b - 0.6, c + 0.6], [b - 0.6, d - 0.6], [a + 0.6, d - 0.6]], MAU['nuoc-sau'], { net: null, bien: 0.2, mo: 0.5 }); }
  if (K.suoi?.diem) { const w = +K.suoi.rong || 1.6; T.add(`<path d="${T.run(K.suoi.diem, 0.15)}" fill="none" stroke="${MAU.nuoc}" stroke-width="${f(w + 0.4)}" stroke-linecap="round" stroke-linejoin="round"/>`); T.add(`<path d="${T.run(K.suoi.diem, 0.1)}" fill="none" stroke="${MAU['nuoc-sang']}" stroke-width=".18" stroke-dasharray=".6 1.2" stroke-linecap="round"/>`); }
  for (const l of loiDs) {
    if (!l.diem || l.diem.length < 2) continue;
    if (l.kieu === 'tham') { T.add(`<path d="${T.run(l.diem, 0.02)}" fill="none" stroke="${MAU['nhua-do'] || '#C0504A'}" stroke-width="${f(+l.rong || 1.4)}" stroke-linecap="butt"/>`); continue; }
    if (l.kieu === 'go') { T.add(`<path d="${T.run(l.diem, 0.04)}" fill="none" stroke="${MAU['go-dam']}" stroke-width="${f((+l.rong || 1.2) + 0.3)}"/>`); T.add(`<path d="${T.run(l.diem, 0.04)}" fill="none" stroke="${MAU['go-sang']}" stroke-width="${f(+l.rong || 1.2)}" stroke-dasharray=".35 .12"/>`); continue; }
    T.duong(l.diem, +l.rong || 1.5, l.kieu === 'dat' ? 'dat' : 'da');
  }
  if (K.san) { T.hinh(T.vong(0, 0, K.san.r + 0.3, null, 0.12, 120), '#C9B089', { net: null }); T.hinh(T.vong(0, 0, K.san.r, null, 0.12, 120), MAU['da-lat'], { day: 0.14 }); if (K.san.nuoc) { T.hinh(T.vong(0, 0, K.san.nuoc), MAU.nuoc, { day: 0.14 }); } }
  for (const t of [].concat(K.tam || [])) { T.hinh(T.vong(t.x, t.z, t.r + 0.2), '#C9B089', { net: null }); T.hinh(T.vong(t.x, t.z, t.r), MAU['da-lat'], { day: 0.14 }); }
  // cổng
  for (const c of K.cong || []) {
    const p = congXY(c, dao), a = c.x != null ? Math.atan2(p.z - (dao.elip?.z || 0), p.x - (dao.elip?.x || 0)) : (c.goc || 0) * DEG;
    if (dao.trong) { const nx = -Math.sin(a), nz = Math.cos(a); T.add(`<path d="M${f(p.x + nx * 0.7)} ${f(p.z + nz * 0.7)}L${f(p.x - nx * 0.7)} ${f(p.z - nz * 0.7)}" stroke="${MAU['go-dam']}" stroke-width=".5"/>`); continue; }
    if (c.kieu !== 'cap-treo') T.duong([[p.x - Math.cos(a), p.z - Math.sin(a)], [p.x + Math.cos(a) * 10, p.z + Math.sin(a) * 10]], 1.8, 'dat');
    const nx = -Math.sin(a), nz = Math.cos(a), mau = /tre/.test(c.kieu || '') ? MAU['tre-xanh'] : MAU['do-son'];
    for (const sg of [-1, 1]) { const cx = p.x + nx * 1.9 * sg, cz = p.z + nz * 1.9 * sg; T.add(`<circle cx="${f(cx + 0.3)}" cy="${f(cz + 0.4)}" r=".6" fill="${BONG}"/><circle cx="${f(cx)}" cy="${f(cz)}" r=".5" fill="${mau}" stroke="${MUC}" stroke-width=".12"/>`); }
  }
  if (!dao.trong) { if (dao.lanCan === 'tre') T.lan_can_tre(mep, 5); else if (dao.lanCan) T.net([...mep.map(([x, z]) => [x * 0.985, z * 0.985]), [mep[0][0] * 0.985, mep[0][1] * 0.985]], dao.lanCan === 'mau' ? MAU['do-son'] : MAU['go-dam'], 0.22, { bien: 0.06 }); }
  // vật
  for (const v of K.vat || []) {
    const { x, z } = vatXY(v), m = M.modelMap[v.loai], to = +v.to || +v.co || 1, goc = -vatRot(v) / DEG;
    const w = m ? m.w * to : (+v.r || 1) * 2, d = m ? m.d * to : (+v.r || 1) * 2, L = v.loai || '';
    if (L === 'cay' || L === 'cay-co-thu') T.cay(x, z, L === 'cay-co-thu' ? 2.4 : 1.2);
    else if (L.startsWith('ghe')) T.ghe(x, z, goc);
    else if (SAP.test(L)) T.bat_mau(x, z, Math.max(1.6, w), Math.max(1.2, d), goc, v.xam ? ['#A9A9B3', '#E4E4E8'] : ['#E0503F', '#FFF4DE'], Math.max(2, Math.round(w / 0.8)));
    else if (NHA.test(L) && w > 1.8) T.mai(x, z, w - 0.5, d - 0.5, { goc, xam: !!v.xam || /xam/.test(L), cao: Math.min(2.2, (m?.h || 4) * 0.25) });
    else if (L === 'ho-sen' || L === 'ao' || L === 'ao-sen') { const r = +v.r || 3; T.hinh(T.vong(x, z, r), MAU.nuoc, { day: 0.15, bien: 0.15 }); for (let i = 0; i < 3; i++) T.add(`<circle cx="${f(x + Math.cos(i * 2.1) * r * 0.5)}" cy="${f(z + Math.sin(i * 2.1) * r * 0.5)}" r=".45" fill="${MAU['coc-xanh'] || '#72C46C'}" stroke="${MUC}" stroke-width=".06"/>`); }
    else { T.bong(Tranh.xoay(Tranh.chu_nhat(w, d), x, z, goc)); T.hinh(Tranh.xoay(Tranh.chu_nhat(w, d), x, z, goc), v.xam ? MAU['xam-soc'] : MAU['go-sang'], { day: 0.12, bien: 0.04 }); }
  }
  // cây
  for (const [cx, cz, n, toCay] of K.cay?.lum || []) for (let i = 0; i < n * 2 + 1; i++) for (let t = 0; t < 20; t++) { const x = cx + T.r.uniform(-2.8, 2.8), z = cz + T.r.uniform(-2.2, 2.2); if (trong(x, z, 0.6) || (i === 0 && toCay)) { T.cay(x, z, i === 0 && toCay ? toCay : T.r.uniform(0.85, 1.25)); break; } }
  for (const [x, z, sc] of K.cay?.diem || []) T.cay(x, z, sc || 1);
  if (!dao.trong) for (let i = 0; i < 60; i++) {   // cây lẻ dọc rìa đảo cho khung tranh đầy đặn (như dong-lua.py)
    const k = Math.floor(T.r.random() * mep.length), [ex, ez] = mep[k], d = Math.hypot(ex, ez) || 1, lui = T.r.uniform(3.5, 6.5), x = ex - ex / d * lui, z = ez - ez / d * lui;
    if (trong(x, z, 1.2)) T.cay(x, z, T.r.uniform(0.8, 1.15));
  }
  for (const g of K.cay?.le?.goc || []) T.cay(Math.cos(g * DEG) * K.cay.le.cach, Math.sin(g * DEG) * K.cay.le.cach, 1.3);
  const rai = K.cay?.rai || {};
  for (const [loai, ham] of [['bui', 'bui'], ['da', 'da'], ['hoa', 'hoa'], ['rom', 'rom'], ['nam', 'nam']]) for (let k = 0; k < (rai[loai] || 0) * (loai === 'hoa' ? 2 : 1); k++) for (let t = 0; t < 40; t++) { const x = T.r.uniform(-Rmax, Rmax), z = T.r.uniform(-Rmax, Rmax); if (trong(x, z, 0.8)) { T[ham](x, z); break; } }
  if (!dao.trong) T.la_ban(-khung + 7, -khung + 8, s);
  return T.svg();
}
