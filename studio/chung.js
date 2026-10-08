// Phố Mây Studio · dùng chung: tải dữ liệu gói, hình học khu (giống src/game/01-canh-chung.js), tải tệp xuống.
export const DEG = Math.PI / 180;
export const $ = (s, el = document) => el.querySelector(s);
export const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) { if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (v != null && v !== false) e.setAttribute(k, v); }
  for (const k of kids.flat()) if (k != null) e.append(k.nodeType ? k : document.createTextNode(k));
  return e;
};
export const r2 = (x) => Math.round(x * 100) / 100;
export const fmt = (x, n = 1) => (+x).toFixed(n).replace('.', ',');

let DATA = null;
export async function taiManifest() {
  if (DATA) return DATA;
  const [m, mau] = await Promise.all([fetch('data/manifest.json').then((r) => r.json()), fetch('data/bang-mau.json').then((r) => r.json())]);
  DATA = { ...m, bangMau: mau, modelMap: Object.fromEntries(m.model.map((x) => [x.id, x])) };
  return DATA;
}
export const taiKhu = (id) => fetch(`data/khu/${id}.json`).then((r) => r.text());
export const taiBanDo = (id) => fetch(`data/ban-do/${id}.svg`).then((r) => (r.ok ? r.text() : null));

export function taiXuong(ten, noiDung, kieu = 'application/json') {
  const blob = noiDung instanceof Blob ? noiDung : new Blob([noiDung], { type: kieu + ';charset=utf-8' });
  const a = el('a', { href: URL.createObjectURL(blob), download: ten }); document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
export const luu = {
  get(k) { try { return localStorage.getItem('pho-may-studio:' + k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem('pho-may-studio:' + k, v); } catch { /* bộ nhớ bị chặn: bỏ qua */ } },
  del(k) { try { localStorage.removeItem('pho-may-studio:' + k); } catch { /* bỏ qua */ } },
};

// ---- hình học khu ----
export const vatXY = (v) => (v.goc != null && v.cach != null ? { x: Math.cos(v.goc * DEG) * v.cach, z: Math.sin(v.goc * DEG) * v.cach } : { x: v.x ?? 0, z: v.z ?? 0 });
export const vatRot = (v) => { const { x, z } = vatXY(v); return v.quay === 'tam' ? Math.atan2(-x, -z) + (v.lech || 0) * DEG : (+v.quay || 0) * DEG; };
// bán kính mép đảo theo góc a (rad), tâm (0,0) trừ đảo bầu dục có tâm riêng
export function banKinh(dao) {
  if (dao.hcn) return (a) => Math.min(dao.hcn[0] / Math.max(Math.abs(Math.cos(a)), 1e-9), dao.hcn[1] / Math.max(Math.abs(Math.sin(a)), 1e-9));
  if (dao.vuong) return (a) => dao.r / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a)));
  const s = dao.song || [];
  return (a) => s.reduce((r, [am, k, ph]) => r + am * Math.sin(k * a + ph), dao.r);
}
export function vienDao(dao, N = 128) {   // đa giác mép đảo [[x,z]...]
  if (dao.elip) {
    const E = dao.elip, o = [];
    for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2, r = (1 / Math.hypot(Math.cos(a) / E.rx, Math.sin(a) / E.rz)) * (1 + (E.song || []).reduce((t, [am, k, ph]) => t + am * Math.sin(k * a + ph), 0)); o.push([E.x + Math.cos(a) * r, E.z + Math.sin(a) * r]); }
    return o;
  }
  if (dao.vuong) { const r = dao.r; return [[-r, -r], [r, -r], [r, r], [-r, r]]; }
  if (dao.hcn) { const [a, b] = dao.hcn; return [[-a, -b], [a, -b], [a, b], [-a, b]]; }
  const R = banKinh(dao), o = [];
  for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2, r = R(a); o.push([Math.cos(a) * r, Math.sin(a) * r]); }
  return o;
}
export function congXY(c, dao) {
  if (c.x != null && c.z != null) return { x: c.x, z: c.z };
  const a = (c.goc || 0) * DEG;
  if (dao.elip) { const E = dao.elip, r = 1 / Math.hypot(Math.cos(a) / E.rx, Math.sin(a) / E.rz); return { x: E.x + Math.cos(a) * r, z: E.z + Math.sin(a) * r }; }
  const r = banKinh(dao)(a); return { x: Math.cos(a) * r, z: Math.sin(a) * r };
}
// đường tổng hợp cho khu không có 'loi' (Quảng Trường: đường vòng + đại lộ tới cổng)
export function loiAo(K) {
  const o = [];
  if (K.duongVong) { const d = []; for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2; d.push([Math.cos(a) * K.duongVong.r, Math.sin(a) * K.duongVong.r]); } o.push({ id: 'duong-vong', kieu: 'lat', rong: K.duongVong.rong, diem: d, ao: true }); }
  if (K.daiLo) for (const c of K.cong || []) { const p = congXY(c, K.dao); o.push({ id: 'dai-lo-' + c.id, kieu: 'lat', rong: K.daiLo.rong, diem: [[0, 0], [r2(p.x), r2(p.z)]], ao: true }); }
  return o;
}
export const LAT = new Set(['da', 'go', 'lat', 'tham', 'gach', 'be-tong', 'soi']);
