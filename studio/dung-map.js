// Dựng map: bản vẽ 2D từ trên xuống (lưới mét), công cụ, bảng thuộc tính, hoàn tác, bản nháp, xuất JSON/PNG, kiểm tra cỡ.
import { $, el, DEG, r2, fmt, taiKhu, taiBanDo, taiXuong, luu, vatXY, vatRot, vienDao, congXY, loiAo, LAT } from './chung.js';
import { kiemKhu, khoangCachXem, congToiDiem, doThi, diBo, coVat, V_CO, V_LAT, luoiDi, diBoTranh } from './kiem-co.js';
import { taoXemKhu } from './xem-3d.js';
import { veTay } from './ve-tay.js';
import { tomTatKhu } from './tom-tat.js';
import { ghiGon } from './json-gon.js';

const SNAP = 0.5, snap = (v) => Math.round(v / SNAP) * SNAP;
const DS_DIEM = ['npc', 'gocAnh'];   // mảng điểm có x, z được sửa trực tiếp
const BO_QUA = new Set(['cong', 'loi', 'vat', 'cay', 'npc', 'gocAnh']);

export function taoDungMap(root, M) {
  const S = { id: null, K: null, goc: '', chon: null, tool: 'chon', model: null, cam: { x: 0, z: 0, s: 8 }, nen: { img: null, vb: null, on: false, op: 0.6 }, tay: { on: false, img: null, vb: null, svg: '' }, hoan: [], lam: [], loiMoi: null, do: [], doKq: null, loiCo: [], an: { khac: true, nhan: true } };
  window.__studio = S;
  // ---- khung ----
  const cv = el('canvas', { class: 'map-cv', tabindex: 0 }), ctx = cv.getContext('2d');
  const cv3 = el('canvas', { class: 'map-3d' });
  const thuocTinh = el('div', { class: 'tt' }), kiemTra = el('div', { class: 'kt' }), khacGoc = el('div', { class: 'kg' });
  const chonTep = el('input', { type: 'file', accept: '.json,application/json', hidden: true, onchange: () => { if (chonTep.files[0]) moTep(chonTep.files[0]); chonTep.value = ''; } });
  const chonKhu = el('select', { class: 'chon-khu', 'aria-label': 'Chọn khu' }, M.khu.map((k) => el('option', { value: k.id }, (k.trong ? '🏠 ' : '') + k.ten + ' · ' + k.id)));
  const tim = el('input', { type: 'search', placeholder: 'Tìm model…' }), dsModel = el('div', { class: 'ds-model' });
  const nutTool = (id, ten, goiY) => el('button', { class: 'tool', 'data-tool': id, title: goiY, onclick: () => datTool(id) }, ten);
  const banNhap = el('div', { class: 'ban-nhap', hidden: true });
  const trangThai = el('div', { class: 'trang-thai' });
  const opNen = el('input', { type: 'range', min: 0, max: 1, step: 0.05, value: 0.6, oninput: () => { S.nen.op = +opNen.value; ve(); } });
  const bTay = el('input', { type: 'checkbox', onchange: () => { S.tay.on = bTay.checked; if (S.tay.on) veLaiTay(); else ve(); } });
  const bNen = el('input', { type: 'checkbox', onchange: () => { S.nen.on = bNen.checked; ve(); } });
  const trai = el('aside', { class: 'pa trai' },
    el('h3', {}, 'Công cụ'),
    el('div', { class: 'tools' },
      nutTool('chon', '↖ Chọn / kéo', 'Chọn, kéo để dời, kéo chấm tròn để xoay (V)'),
      nutTool('them-vat', '＋ Đặt vật', 'Chọn model bên dưới rồi bấm lên bản đồ (A)'),
      nutTool('loi', '〰 Vẽ lối', 'Bấm từng điểm, bấm đúp hoặc Enter để xong (P)'),
      nutTool('npc', '🧍 Chỗ NPC', 'Bấm để đặt chỗ đứng NPC (N)'),
      nutTool('anh', '📷 Góc ảnh', 'Bấm để đặt góc chụp ảnh (O)'),
      nutTool('cay', '🌳 Cây', 'Bấm để đặt lùm cây (T)'),
      nutTool('do', '⏱ Đo đi bộ', 'Bấm hai điểm: thời gian đi dọc lối (M)')),
    el('div', { class: 'hang' }, el('button', { onclick: () => hoanTac(), title: 'Ctrl+Z' }, '↶ Hoàn tác'), el('button', { onclick: () => lamLai(), title: 'Ctrl+Y' }, '↷ Làm lại')),
    el('div', { class: 'hang' }, el('button', { onclick: () => nhanBan(), title: 'Ctrl+D' }, '⧉ Nhân bản'), el('button', { onclick: () => xoa(), title: 'Delete' }, '✕ Xoá')),
    el('h3', {}, 'Model'), tim, dsModel,
    el('h3', {}, 'Bản đồ vẽ tay'),
    el('label', { class: 'hang' }, bNen, ' Lót tranh data/ban-do'), el('label', { class: 'hang' }, 'Độ đục ', opNen),
    el('label', { class: 'hang' }, bTay, ' Vẽ lại tranh tay từ dữ liệu đang sửa'),
    el('div', { class: 'hang' }, el('button', { onclick: () => xuatTay('svg') }, '⬇ SVG tay'), el('button', { onclick: () => xuatTay('png') }, '⬇ PNG tay')),
    el('p', { class: 'nho' }, 'Bút vẽ là bản JS của tools/ban-do/but.py; chi tiết trang trí đặt tay trong <khu>.py không có.'),
    el('h3', {}, 'Hiện'),
    el('label', { class: 'hang' }, el('input', { type: 'checkbox', checked: true, onchange: (e) => { S.an.nhan = e.target.checked; ve(); } }), ' Nhãn'),
    el('label', { class: 'hang' }, el('input', { type: 'checkbox', checked: true, onchange: (e) => { S.an.khac = e.target.checked; ve(); } }), ' Điểm khác (mèo, bia đá…)'));
  const tabTT = el('button', { class: 'tab-p chon', onclick: () => tabPhai('tt') }, 'Thuộc tính'), tabKT = el('button', { class: 'tab-p', onclick: () => tabPhai('kt') }, 'Kiểm tra cỡ ', el('b', { class: 'huy' }, '0')), tabKG = el('button', { class: 'tab-p', onclick: () => tabPhai('kg') }, 'Khác gốc ', el('b', { class: 'huy xanh' }, '0'));
  const phai = el('aside', { class: 'pa phai' }, el('div', { class: 'hang tabs-p' }, tabTT, tabKT, tabKG), thuocTinh, kiemTra, khacGoc);
  const giua = el('section', { class: 'giua' },
    el('div', { class: 'thanh' }, chonKhu,
      el('button', { onclick: () => chonTep.click(), title: 'Mở tệp JSON khu đã tải trước đây (hoặc kéo thả tệp vào bản đồ)' }, '⬆ Mở JSON'), chonTep, el('button', { onclick: xuatJSON, class: 'chinh' }, '⬇ JSON khu'), el('button', { onclick: xuatTomTat }, '⬇ Tóm tắt thay đổi'), el('button', { onclick: xuatPNG }, '⬇ PNG'),
      el('button', { onclick: () => { S.cam = vuaKhung(); ve(); } }, '⤢ Vừa khung'),
      el('button', { class: 'nut-pa', onclick: () => root.classList.toggle('an-trai') }, '☰ Công cụ'), el('button', { class: 'nut-pa', onclick: () => root.classList.toggle('an-phai') }, '☰ Thuộc tính'), el('button', { class: 'nut-pa', onclick: () => root.classList.toggle('an-3d') }, '⧈ 3D')),
    el('div', { class: 'khung-cv' }, cv, trangThai, banNhap),
    el('div', { class: 'khung-3d' }, cv3, el('p', { class: 'nho g3' }, 'Xem 3D: kéo để xoay, cuộn để phóng; kéo nhân vật (1,9 m) để so cỡ.')));
  root.append(trai, giua, phai);
  if (innerWidth < 900) root.classList.add('an-trai', 'an-phai');
  queueMicrotask(() => datTool('chon'));
  const X3 = taoXemKhu(cv3, M);

  function veDsModel() {
    const q = tim.value.trim();
    dsModel.replaceChildren(...M.model.filter((m) => m.id.includes(q)).map((m) => el('button', { class: 'mo' + (S.model === m.id ? ' chon' : ''), onclick: () => { S.model = m.id; datTool('them-vat'); veDsModel(); } }, m.id, el('small', {}, ` ${fmt(m.w)}×${fmt(m.d)}×${fmt(m.h)}`))));
  }
  tim.addEventListener('input', veDsModel); veDsModel();
  function datTool(t) { S.tool = t; if (t !== 'loi') ketThucLoi(); if (t !== 'do') { S.do = []; S.doKq = null; } trai.querySelectorAll('.tool').forEach((b) => b.classList.toggle('chon', b.dataset.tool === t)); goiY(); ve(); }
  function tabPhai(t) { tabTT.classList.toggle('chon', t === 'tt'); tabKT.classList.toggle('chon', t === 'kt'); tabKG.classList.toggle('chon', t === 'kg'); thuocTinh.hidden = t !== 'tt'; kiemTra.hidden = t !== 'kt'; khacGoc.hidden = t !== 'kg'; if (t === 'kt') veKiem(); if (t === 'kg') veKhac(); }
  // ---- mở lại tệp đã tải, so với bản gói sẵn ----
  async function moTep(file) {
    let K; try { K = JSON.parse(await file.text()); } catch (e) { alert('Tệp không phải JSON: ' + e.message); return; }
    const id = K.id || file.name.replace(/(-\d+)?\.json$/, '');
    if (!M.khu.some((k) => k.id === id)) { alert(`Không có khu “${id}” trong Studio.`); return; }
    if (id !== S.id) await moKhu(id, true);
    ghi(); S.K = K; S.chon = null; doi(); tabPhai('kg');
  }
  const goc = () => (S._gocObj && S._gocTxt === S.goc ? S._gocObj : (S._gocTxt = S.goc, S._gocObj = JSON.parse(S.goc)));
  function vatKhac() {   // vật đổi chỗ / xoá: [vật gốc, có còn không]
    const A = goc().vat || [], B = new Map((S.K.vat || []).filter((v) => v.id).map((v) => [v.id, v]));
    return A.filter((v) => v.id && JSON.stringify(v) !== JSON.stringify(B.get(v.id))).map((v) => [v, B.has(v.id)]);
  }
  function veKhac() {
    const dong = tomTatKhu(S.id, goc(), S.K).split('\n').slice(3).filter((l) => /^[~+-]/.test(l));
    tabKG.querySelector('b').textContent = dong.length;
    khacGoc.replaceChildren(el('h3', {}, `Khác bản gói sẵn: ${dong.length}`), el('p', { class: 'nho' }, 'Vật đổi chỗ có khung đứt màu cam ở chỗ cũ. Mở lại tệp đã tải bằng ⬆ Mở JSON hoặc kéo thả tệp vào bản đồ.'),
      el('ul', { class: 'ds-khac' }, dong.map((l) => el('li', { class: l[0] === '+' ? 'them' : l[0] === '-' ? 'bot' : 'doi' }, l))));
  }
  tabPhai('tt');
  const goiY = () => { trangThai.textContent = { chon: 'Chọn: bấm vật để chọn, kéo để dời (bắt 0,5 m), kéo chấm tròn để xoay, kéo nền để cuộn, cuộn chuột/chụm 2 ngón để phóng.', 'them-vat': S.model ? `Bấm lên bản đồ để đặt “${S.model}”.` : 'Chọn một model ở cột trái.', loi: 'Bấm từng điểm của lối; bấm đúp / Enter để xong, Esc huỷ. Chọn lối có sẵn để kéo đỉnh, bấm lên đoạn để chèn đỉnh, Alt+bấm đỉnh để xoá.', npc: 'Bấm để đặt chỗ NPC.', anh: 'Bấm để đặt góc ảnh.', cay: 'Bấm để đặt lùm cây (cay.lum).', do: 'Bấm điểm A rồi điểm B: thời gian đi bộ tránh vật cản và nước (lưới 0,5 m; cỏ 3,7 m/s, đường lát 4 m/s).' }[S.tool]; };

  // ---- dữ liệu, hoàn tác, nháp ----
  const ghi = () => { S.hoan.push(JSON.stringify(S.K)); if (S.hoan.length > 200) S.hoan.shift(); S.lam = []; };
  let hen3d = 0, henTay = 0, henKiem = 0;
  function veLaiTay() {
    const svg = veTay(S.K, M); S.tay.svg = svg; S.tay.vb = /viewBox="([^"]+)"/.exec(svg)[1].split(/[\s,]+/).map(Number);
    const img = new Image(); img.onload = () => { S.tay.img = img; ve(); }; img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  }
  function xuatTay(kieu) {
    const svg = veTay(S.K, M);
    if (kieu === 'svg') return taiXuong(`${S.id}.svg`, svg, 'image/svg+xml');
    const img = new Image(); img.onload = () => { const c = document.createElement('canvas'); c.width = c.height = 1024; c.getContext('2d').drawImage(img, 0, 0, 1024, 1024); c.toBlob((b) => taiXuong(`${S.id}-tay.png`, b), 'image/png'); };
    img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  }
  function doi(khongVe3d) {
    luu.set('nhap:' + S.id, JSON.stringify(S.K)); banNhap.hidden = false;
    banNhap.replaceChildren('Đã lưu nháp trong trình duyệt. ', el('button', { onclick: boNhap }, 'Bỏ nháp, về bản gốc'));
    S.loiCo = kiemKhu(S.K, M); tabKT.querySelector('b').textContent = S.loiCo.length;
    ve(); veTT(); if (!kiemTra.hidden) { clearTimeout(henKiem); henKiem = setTimeout(veKiem, 400); } veKhac();
    if (S.tay.on && !khongVe3d) { clearTimeout(henTay); henTay = setTimeout(veLaiTay, 250); }
    if (!khongVe3d) { clearTimeout(hen3d); hen3d = setTimeout(() => X3.dung(S.K), 350); }
  }
  function hoanTac() { if (!S.hoan.length) return; S.lam.push(JSON.stringify(S.K)); S.K = JSON.parse(S.hoan.pop()); S.chon = null; doi(); }
  function lamLai() { if (!S.lam.length) return; S.hoan.push(JSON.stringify(S.K)); S.K = JSON.parse(S.lam.pop()); S.chon = null; doi(); }
  function boNhap() { if (!confirm('Bỏ bản nháp của khu này?')) return; luu.del('nhap:' + S.id); moKhu(S.id, true); }
  async function moKhu(id, boQuaNhap) {
    S.id = id; S.goc = await taiKhu(id); const nhap = !boQuaNhap && luu.get('nhap:' + id);
    S.K = JSON.parse(nhap || S.goc); S.hoan = []; S.lam = []; S.chon = null; S.do = []; S.doKq = null; S.loiMoi = null;
    banNhap.hidden = !nhap; if (nhap) banNhap.replaceChildren('Đang mở bản nháp đã lưu. ', el('button', { onclick: boNhap }, 'Bỏ nháp, về bản gốc'));
    chonKhu.value = id; luu.set('khu', id);
    S.nen.img = null; S.nen.vb = null;
    const svg = M.khu.find((k) => k.id === id)?.banDo ? await taiBanDo(id) : null;
    if (svg) { const vb = /viewBox="([^"]+)"/.exec(svg)?.[1].split(/[\s,]+/).map(Number); const img = new Image(); img.onload = () => ve(); img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })); S.nen.img = img; S.nen.vb = vb; }
    bNen.disabled = !svg; bNen.parentElement.title = svg ? '' : 'Khu này chưa có tranh vẽ tay';
    S.cam = vuaKhung(); S.loiCo = kiemKhu(S.K, M); tabKT.querySelector('b').textContent = S.loiCo.length;
    ve(); veTT(); veKiem(); veKhac(); X3.dung(S.K); if (S.tay.on) veLaiTay();
    try { history.replaceState(null, '', '#map/' + id); } catch { /* bỏ qua */ }
  }
  chonKhu.addEventListener('change', () => moKhu(chonKhu.value));

  // ---- toạ độ ----
  const W = () => cv.clientWidth, H = () => cv.clientHeight;
  const toMH = (x, z) => [(x - S.cam.x) * S.cam.s + W() / 2, (z - S.cam.z) * S.cam.s + H() / 2];
  const toTG = (sx, sz) => [(sx - W() / 2) / S.cam.s + S.cam.x, (sz - H() / 2) / S.cam.s + S.cam.z];
  function vuaKhung() { const v = vienDao(S.K.dao); let R = 0; let cx = 0, cz = 0; v.forEach(([x, z]) => { cx += x / v.length; cz += z / v.length; }); v.forEach(([x, z]) => { R = Math.max(R, Math.abs(x - cx), Math.abs(z - cz)); }); return { x: cx, z: cz, s: Math.min(W() || 600, H() || 400) / (2 * R + 8) }; }

  // ---- các mục chọn được ----
  const khacDs = () => { const o = []; if (!S.an.khac) return o; for (const [k, v] of Object.entries(S.K)) if (!BO_QUA.has(k) && Array.isArray(v)) v.forEach((it, i) => { if (it && typeof it === 'object' && !Array.isArray(it) && typeof it.x === 'number' && typeof it.z === 'number') o.push({ loai: 'khac', k, i }); }); return o; };
  const lay = (c) => (!c ? null : c.loai === 'vat' ? S.K.vat[c.i] : c.loai === 'cong' ? S.K.cong[c.i] : c.loai === 'loi' ? S.K.loi[c.i] : c.loai === 'lum' ? S.K.cay.lum[c.i] : c.loai === 'diem' ? S.K.cay.diem[c.i] : c.loai === 'khac' ? S.K[c.k][c.i] : c.loai === 'dao' ? S.K.dao : S.K[c.loai]?.[c.i]);
  function viTri(c) {
    const o = lay(c); if (!o) return null;
    if (c.loai === 'vat') return vatXY(o);
    if (c.loai === 'cong') return congXY(o, S.K.dao);
    if (c.loai === 'lum' || c.loai === 'diem') return { x: o[0], z: o[1] };
    if (c.loai === 'loi') return { x: o.diem[0][0], z: o.diem[0][1] };
    return { x: o.x, z: o.z };
  }
  function datViTri(c, x, z) {
    const o = lay(c);
    if (c.loai === 'vat') {
      const p0 = vatXY(o), dx = x - p0.x, dz = z - p0.z;
      if (o.goc != null && o.cach != null) { o.goc = r2(Math.atan2(z, x) / DEG); o.cach = r2(Math.hypot(x, z)); } else { o.x = r2(x); o.z = r2(z); }
      if (Array.isArray(o.diaDanh?.toi)) o.diaDanh.toi = [r2(o.diaDanh.toi[0] + dx), r2(o.diaDanh.toi[1] + dz)];
      if (Array.isArray(o.dung) && typeof o.dung[0] === 'number') o.dung = [r2(o.dung[0] + dx), r2(o.dung[1] + dz)];
    } else if (c.loai === 'cong') {
      if (o.x != null && o.z != null) { o.x = r2(x); o.z = r2(z); } else { const E = S.K.dao.elip; o.goc = Math.round(Math.atan2(z - (E?.z || 0), x - (E?.x || 0)) / DEG); }
    } else if (c.loai === 'lum' || c.loai === 'diem') { o[0] = r2(x); o[1] = r2(z); }
    else if (c.loai === 'loi') { const p0 = o.diem[0], dx = x - p0[0], dz = z - p0[1]; o.diem = o.diem.map(([a, b]) => [r2(a + dx), r2(b + dz)]); }
    else { o.x = r2(x); o.z = r2(z); }
  }
  function nhan(c) { const o = lay(c); if (!o) return ''; if (c.loai === 'vat') return o.diaDanh?.ten || o.id || o.loai; if (c.loai === 'cong') return `Cổng ${o.id} → ${o.ten || o.toi}`; if (c.loai === 'lum') return 'Lùm cây'; if (c.loai === 'diem') return 'Cây'; if (c.loai === 'khac') return `${c.k}: ${o.ten || o.id || c.i}`; if (c.loai === 'dao') return 'Đảo'; return o.ten || o.id || c.loai; }
  const coVatXZ = (v) => { const c = coVat(v, M); return c ? [c.w, c.d] : [(+v.r || 1) * 2, (+v.r || 1) * 2]; };
  function gocHop(v) { const { x, z } = vatXY(v), t = vatRot(v), [w, d] = coVatXZ(v), m = M.modelMap[v.loai], s = +v.to || +v.co || 1; const ox = m ? (m.min[0] + m.max[0]) / 2 * s : 0, oz = m ? (m.min[2] + m.max[2]) / 2 * s : 0;
    return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]].map(([lx, lz]) => { lx += ox; lz += oz; return [x + lx * Math.cos(t) + lz * Math.sin(t), z - lx * Math.sin(t) + lz * Math.cos(t)]; }); }
  const tayXoay = (v) => { const { x, z } = vatXY(v), t = vatRot(v), [w, d] = coVatXZ(v), R = Math.max(w, d) / 2 + 1.2; return [x + Math.cos(t) * R, z - Math.sin(t) * R]; };
  function tayDao() { const D = S.K.dao; if (D.elip) return [{ k: 'rx', x: D.elip.x + D.elip.rx, z: D.elip.z }, { k: 'rz', x: D.elip.x, z: D.elip.z + D.elip.rz }]; if (D.hcn) return [{ k: 'h0', x: D.hcn[0], z: 0 }, { k: 'h1', x: 0, z: D.hcn[1] }]; return [{ k: 'r', x: D.vuong ? D.r : banR(0), z: 0 }]; }
  // tay nắm khác (Q367): sân, đường vòng, đại lộ, suối, vùng nước, vùng đi (hẻm), tâm đảo bầu dục
  function tayKhac() {
    const K = S.K, o = [], c45 = Math.SQRT1_2;
    if (K.dao.elip) { const E = K.dao.elip; o.push({ ten: 'tâm đảo bầu dục', x: E.x, z: E.z, dat: (x, z) => { E.x = x; E.z = z; } }); }
    if (K.san?.r) { o.push({ ten: 'san.r', x: -K.san.r * c45, z: K.san.r * c45, dat: (x, z) => { K.san.r = Math.max(2, r2(Math.hypot(x, z))); } }); if (K.san.nuoc) o.push({ ten: 'san.nuoc', x: 0, z: -K.san.nuoc, dat: (x, z) => { K.san.nuoc = Math.max(0.5, r2(Math.hypot(x, z))); } }); }
    if (K.duongVong?.r) { const D = K.duongVong; o.push({ ten: 'duongVong.r', x: D.r * c45, z: -D.r * c45, dat: (x, z) => { D.r = Math.max(3, r2(Math.hypot(x, z))); } }); o.push({ ten: 'duongVong.rong', x: (D.r + D.rong / 2) * c45, z: (D.r + D.rong / 2) * c45, dat: (x, z) => { D.rong = Math.max(1, r2(2 * Math.abs(Math.hypot(x, z) - D.r))); } }); }
    if (K.daiLo?.rong) { const L = K.daiLo, x0 = (K.san?.r || 10) + 4; o.push({ ten: 'daiLo.rong', x: x0, z: L.rong / 2, dat: (x, z) => { L.rong = Math.max(1, r2(2 * Math.abs(z))); } }); }
    (K.suoi?.diem || []).forEach((p, j) => o.push({ ten: `suoi.diem[${j}]`, x: p[0], z: p[1], dat: (x, z) => { K.suoi.diem[j] = [x, z]; } }));
    for (const ten of ['nuoc', 'vung']) { const ds = ten === 'nuoc' ? K.nuoc : K.dao.vung; (ds || []).forEach((q, j) => {
      o.push({ ten: `${ten}[${j}] góc 1`, x: q[0], z: q[2], dat: (x, z) => { q[0] = Math.min(x, q[1] - 0.5); q[2] = Math.min(z, q[3] - 0.5); } });
      o.push({ ten: `${ten}[${j}] góc 2`, x: q[1], z: q[3], dat: (x, z) => { q[1] = Math.max(x, q[0] + 0.5); q[3] = Math.max(z, q[2] + 0.5); } });
      o.push({ ten: `${ten}[${j}] dời`, x: (q[0] + q[1]) / 2, z: (q[2] + q[3]) / 2, tron: true, dat: (x, z) => { const w = q[1] - q[0], h = q[3] - q[2]; q[0] = r2(x - w / 2); q[1] = r2(x + w / 2); q[2] = r2(z - h / 2); q[3] = r2(z + h / 2); } });
    }); }
    return o;
  }
  const banR = (a) => (S.K.dao.song || []).reduce((r, [am, k, ph]) => r + am * Math.sin(k * a + ph), S.K.dao.r);
  const trongDaGiac = (P, x, z) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) if ((P[i][1] > z) !== (P[j][1] > z) && x < (P[j][0] - P[i][0]) * (z - P[i][1]) / (P[j][1] - P[i][1]) + P[i][0]) c = !c; return c; };
  const dDoan = (x, z, [ax, az], [bx, bz]) => { const dx = bx - ax, dz = bz - az, L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L)); return Math.hypot(x - ax - dx * t, z - az - dz * t); };
  function trung(x, z) {   // mục dưới con trỏ (toạ độ thế giới)
    const tol = 9 / S.cam.s;
    if (S.chon?.loai === 'loi') { const p = S.K.loi[S.chon.i]; for (let j = 0; j < p.diem.length; j++) if (Math.hypot(p.diem[j][0] - x, p.diem[j][1] - z) < tol) return { ...S.chon, dinh: j }; }
    if (S.chon?.loai === 'vat') { const [hx, hz] = tayXoay(lay(S.chon)); if (Math.hypot(hx - x, hz - z) < tol * 1.2) return { ...S.chon, xoay: true }; }
    for (const h of tayDao()) if (Math.hypot(h.x - x, h.z - z) < tol) return { loai: 'dao', tay: h.k };
    for (const h of tayKhac()) if (Math.hypot(h.x - x, h.z - z) < tol) return { loai: 'tay', h };
    const diem = [...(S.K.cong || []).map((_, i) => ({ loai: 'cong', i })), ...DS_DIEM.flatMap((k) => (S.K[k] || []).map((_, i) => ({ loai: k, i }))), ...(S.K.cay?.lum || []).map((_, i) => ({ loai: 'lum', i })), ...(S.K.cay?.diem || []).map((_, i) => ({ loai: 'diem', i })), ...khacDs()];
    let best = null; for (const c of diem) { const p = viTri(c), d = Math.hypot(p.x - x, p.z - z); if (d < tol * 1.1 && (!best || d < best.d)) best = { c, d }; } if (best) return best.c;
    for (let i = (S.K.vat || []).length - 1; i >= 0; i--) { if (trongDaGiac(gocHop(S.K.vat[i]), x, z)) return { loai: 'vat', i }; }
    for (const [i, p] of (S.K.loi || []).entries()) for (let j = 1; j < p.diem.length; j++) if (dDoan(x, z, p.diem[j - 1], p.diem[j]) < Math.max(tol, (+p.rong || 1) / 2)) return { loai: 'loi', i, doan: j };
    return null;
  }

  // ---- vẽ ----
  const MAU_LOI = { dat: '#D6B98A', da: '#CFC8BA', go: '#A7744A', tham: '#C0504A', lat: '#D8D2C4' };
  function ve() {
    if (!S.K) return;
    const dpr = devicePixelRatio || 1, w = W(), h = H(); if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = '#BFDCEB'; ctx.fillRect(0, 0, w, h);
    const s = S.cam.s, P = (x, z) => toMH(x, z), K = S.K;
    // lưới mét
    const buoc = s > 14 ? 1 : s > 5 ? 5 : 10, [x0, z0] = toTG(0, 0), [x1, z1] = toTG(w, h);
    ctx.lineWidth = 1;
    for (let x = Math.floor(x0 / buoc) * buoc; x <= x1; x += buoc) { const [sx] = P(x, 0); ctx.strokeStyle = x === 0 ? 'rgba(40,60,90,.45)' : x % (buoc * 5) === 0 ? 'rgba(40,60,90,.22)' : 'rgba(40,60,90,.09)'; ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, h); ctx.stroke(); }
    for (let z = Math.floor(z0 / buoc) * buoc; z <= z1; z += buoc) { const [, sz] = P(0, z); ctx.strokeStyle = z === 0 ? 'rgba(40,60,90,.45)' : z % (buoc * 5) === 0 ? 'rgba(40,60,90,.22)' : 'rgba(40,60,90,.09)'; ctx.beginPath(); ctx.moveTo(0, sz); ctx.lineTo(w, sz); ctx.stroke(); }
    // đảo
    const vien = vienDao(K.dao); ctx.beginPath(); vien.forEach(([x, z], i) => { const [a, b] = P(x, z); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.closePath();
    ctx.fillStyle = K.dao.trong ? '#E8D6B8' : K.dao.mauNen || '#B5D98C'; ctx.fill(); ctx.strokeStyle = '#6E8A4A'; ctx.lineWidth = 2; ctx.stroke();
    for (const [a, b, c, d] of K.dao.vung || []) { const [p, q] = P(a, c), [r, t] = P(b, d); ctx.fillStyle = 'rgba(200,190,170,.5)'; ctx.fillRect(p, q, r - p, t - q); }
    for (const [a, b, c, d] of K.nuoc || []) { const [p, q] = P(a, c), [r, t] = P(b, d); ctx.fillStyle = 'rgba(90,160,210,.6)'; ctx.fillRect(p, q, r - p, t - q); }
    if (S.nen.on && S.nen.img?.complete && S.nen.vb) { ctx.globalAlpha = S.nen.op; const [vx, vz, vw, vh] = S.nen.vb, [a, b] = P(vx, vz); ctx.drawImage(S.nen.img, a, b, vw * s, vh * s); ctx.globalAlpha = 1; }
    if (S.tay.on && S.tay.img && S.tay.vb) { const [vx, vz, vw, vh] = S.tay.vb, [a, b] = P(vx, vz); ctx.drawImage(S.tay.img, a, b, vw * s, vh * s); }
    if (K.san && !S.tay.on) { const [a, b] = P(0, 0); ctx.fillStyle = 'rgba(232,224,208,.8)'; ctx.beginPath(); ctx.arc(a, b, K.san.r * s, 0, 7); ctx.fill(); }
    // lối
    const veLoi = (p, ao) => { const d = p.diem || []; if (d.length < 2) return; ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = MAU_LOI[p.kieu] || (LAT.has(p.kieu) ? '#D8D2C4' : '#D6B98A'); ctx.globalAlpha = ao ? 0.7 : 1; ctx.lineWidth = Math.max(2, (+p.rong || 1.5) * s); ctx.beginPath(); d.forEach(([x, z], i) => { const [a, b] = P(x, z); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.stroke(); ctx.globalAlpha = 1; };
    (K.loi?.length ? [] : loiAo(K)).forEach((p) => veLoi(p, true)); (K.loi || []).forEach((p) => veLoi(p));
    if (K.suoi?.diem) { ctx.strokeStyle = '#6FB3DE'; ctx.lineWidth = Math.max(2, 1.6 * s); ctx.beginPath(); K.suoi.diem.forEach(([x, z], i) => { const [a, b] = P(x, z); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.stroke(); }
    const loiCo = new Set(S.loiCo.filter((l) => l.loai === 'loi').map((l) => l.i));
    (K.loi || []).forEach((p, i) => { if (loiCo.has(i)) { ctx.setLineDash([6, 4]); ctx.strokeStyle = '#E0403A'; ctx.lineWidth = 2; ctx.beginPath(); p.diem.forEach(([x, z], j) => { const [a, b] = P(x, z); j ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.stroke(); ctx.setLineDash([]); } });
    // cây
    const veCay = (x, z, r, c) => { const [a, b] = P(x, z); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(a, b, Math.max(3, r * s), 0, 7); ctx.fill(); ctx.strokeStyle = '#3F7A30'; ctx.lineWidth = 1; ctx.stroke(); };
    (K.cay?.lum || []).forEach(([x, z, n, to]) => { veCay(x, z, to ? 2.2 : 1.6, 'rgba(95,168,82,.85)'); if (n > 1) { ctx.fillStyle = '#fff'; ctx.font = '10px system-ui'; const [a, b] = P(x, z); ctx.fillText(n, a - 3, b + 3); } });
    (K.cay?.diem || []).forEach(([x, z, sc]) => veCay(x, z, 1.3 * (sc || 1), 'rgba(95,168,82,.85)'));
    // vật
    const vatCo = new Set(S.loiCo.filter((l) => l.loai === 'vat').map((l) => l.i));
    (K.vat || []).forEach((v, i) => {
      const g = gocHop(v), coModel = !!M.modelMap[v.loai]; ctx.beginPath(); g.forEach(([x, z], j) => { const [a, b] = P(x, z); j ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.closePath();
      ctx.fillStyle = v.xam ? 'rgba(160,160,170,.75)' : v.toi ? 'rgba(240,190,120,.85)' : coModel ? 'rgba(201,162,240,.75)' : 'rgba(230,220,200,.75)'; ctx.fill();
      ctx.strokeStyle = vatCo.has(i) ? '#E0403A' : '#5A4A6A'; ctx.lineWidth = vatCo.has(i) ? 2.5 : 1; ctx.setLineDash(coModel ? [] : [4, 3]); ctx.stroke(); ctx.setLineDash([]);
      const { x, z } = vatXY(v), t = vatRot(v), [a, b] = P(x, z), [c, d] = P(x + Math.cos(t) * 0.8, z - Math.sin(t) * 0.8); ctx.strokeStyle = '#5A4A6A'; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke();
      if (vatCo.has(i)) { ctx.fillStyle = '#E0403A'; ctx.beginPath(); ctx.arc(g[1] ? P(...g[1])[0] : a, P(...g[1])[1], 7, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold 10px system-ui'; ctx.fillText('!', P(...g[1])[0] - 2, P(...g[1])[1] + 4); }
    });
    // điểm
    const cham = (x, z, c, chu) => { const [a, b] = P(x, z); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(a, b, 7, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); if (chu) { ctx.fillStyle = '#fff'; ctx.font = 'bold 9px system-ui'; ctx.textAlign = 'center'; ctx.fillText(chu, a, b + 3); ctx.textAlign = 'left'; } };
    (K.cong || []).forEach((c) => { const p = congXY(c, K.dao); cham(p.x, p.z, '#C4553F', c.id); });
    (K.npc || []).forEach((n) => cham(n.x, n.z, '#4FA9C8', 'N'));
    (K.gocAnh || []).forEach((n) => cham(n.x, n.z, '#E0A020', '◉'));
    khacDs().forEach((c) => { const p = viTri(c); cham(p.x, p.z, 'rgba(120,110,140,.8)', ''); });
    if (K.xuatHien) cham(K.xuatHien[0], K.xuatHien[1], '#3A9A5A', '★');
    // nhãn
    if (S.an.nhan) { ctx.font = '11px system-ui'; ctx.fillStyle = '#2A2030';
      (K.vat || []).forEach((v) => { if (!v.diaDanh && s < 6) return; const { x, z } = vatXY(v), [a, b] = P(x, z), t = v.diaDanh?.ten || v.id || v.loai; ctx.fillStyle = 'rgba(255,255,255,.75)'; const tw = ctx.measureText(t).width; ctx.fillRect(a - tw / 2 - 2, b - 19, tw + 4, 13); ctx.fillStyle = '#2A2030'; ctx.fillText(t, a - tw / 2, b - 9); });
      if (s > 6) (K.npc || []).forEach((n) => { const [a, b] = P(n.x, n.z); ctx.fillText(n.ten, a + 9, b + 4); });
      if (s > 6) (K.gocAnh || []).forEach((n) => { const [a, b] = P(n.x, n.z); ctx.fillText(n.ten, a + 9, b + 4); }); }
    // chỗ cũ của vật đã đổi (so với bản gói sẵn)
    for (const [v, con] of vatKhac()) { const g = gocHop(v); ctx.setLineDash([5, 4]); ctx.strokeStyle = con ? '#E8892A' : '#E0403A'; ctx.lineWidth = 1.5; ctx.beginPath(); g.forEach(([x, z], j) => { const [a, b] = P(x, z); j ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.closePath(); ctx.stroke(); ctx.setLineDash([]); }
    // chọn
    if (S.chon) {
      ctx.strokeStyle = '#1F6FEB'; ctx.lineWidth = 2;
      if (S.chon.loai === 'vat') { const v = lay(S.chon), g = gocHop(v); ctx.beginPath(); g.forEach(([x, z], j) => { const [a, b] = P(x, z); j ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.closePath(); ctx.stroke(); const { x, z } = vatXY(v), [hx, hz] = tayXoay(v), [a, b] = P(x, z), [c, d] = P(hx, hz); ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); ctx.fillStyle = '#1F6FEB'; ctx.beginPath(); ctx.arc(c, d, 7, 0, 7); ctx.fill(); }
      else if (S.chon.loai === 'loi') { const p = lay(S.chon); p.diem.forEach(([x, z]) => { const [a, b] = P(x, z); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(a, b, 6, 0, 7); ctx.fill(); ctx.stroke(); }); }
      else if (S.chon.loai !== 'dao') { const p = viTri(S.chon); if (p) { const [a, b] = P(p.x, p.z); ctx.beginPath(); ctx.arc(a, b, 11, 0, 7); ctx.stroke(); } }
    }
    for (const t of tayDao()) { const [a, b] = P(t.x, t.z); ctx.fillStyle = S.chon?.loai === 'dao' ? '#1F6FEB' : '#fff'; ctx.strokeStyle = '#1F6FEB'; ctx.lineWidth = 2; ctx.fillRect(a - 5, b - 5, 10, 10); ctx.strokeRect(a - 5, b - 5, 10, 10); }
    for (const t of tayKhac()) { const [a, b] = P(t.x, t.z); ctx.fillStyle = '#FFE2B8'; ctx.strokeStyle = '#E8892A'; ctx.lineWidth = 2; ctx.beginPath(); t.tron ? ctx.arc(a, b, 5, 0, 7) : ctx.rect(a - 4.5, b - 4.5, 9, 9); ctx.fill(); ctx.stroke(); }
    // lối đang vẽ
    if (S.loiMoi?.length) { ctx.strokeStyle = '#1F6FEB'; ctx.setLineDash([5, 4]); ctx.lineWidth = 2; ctx.beginPath(); S.loiMoi.forEach(([x, z], i) => { const [a, b] = P(x, z); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); if (S.troi) { const [a, b] = P(...S.troi); ctx.lineTo(a, b); } ctx.stroke(); ctx.setLineDash([]); }
    // đo đi bộ
    if (S.doKq) { ctx.strokeStyle = '#D0306A'; ctx.lineWidth = 3; ctx.setLineDash([8, 5]); ctx.beginPath(); S.doKq.duong.forEach(([x, z], i) => { const [a, b] = P(x, z); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.stroke(); ctx.setLineDash([]); }
    S.do.forEach((p, i) => cham(p.x, p.z, '#D0306A', 'AB'[i]));
    if (S.doKq) { const [x, z] = S.doKq.duong[Math.floor(S.doKq.duong.length / 2)], [a, b] = P(x, z), t = `${fmt(S.doKq.t)} giây · ${fmt(S.doKq.m)} m`; ctx.font = 'bold 13px system-ui'; const tw = ctx.measureText(t).width; ctx.fillStyle = '#D0306A'; ctx.fillRect(a - tw / 2 - 6, b - 24, tw + 12, 20); ctx.fillStyle = '#fff'; ctx.fillText(t, a - tw / 2, b - 9); }
    // thước tỷ lệ
    const m10 = buoc * 2; ctx.fillStyle = '#2A2030'; ctx.fillRect(12, h - 18, m10 * s, 4); ctx.font = '11px system-ui'; ctx.fillText(`${m10} m`, 14, h - 24);
  }

  // ---- thuộc tính ----
  function oNhap(nhanTxt, gt, datGt) {
    let inp;
    if (typeof gt === 'number') inp = el('input', { type: 'number', step: 'any', value: gt });
    else if (typeof gt === 'boolean') inp = el('input', { type: 'checkbox', checked: gt });
    else if (typeof gt === 'string') inp = el('input', { type: 'text', value: gt });
    else { inp = el('textarea', { rows: Math.min(8, JSON.stringify(gt).length / 40 + 1 | 0) }); inp.value = JSON.stringify(gt); }
    inp.addEventListener('change', () => {
      let v; if (inp.type === 'number') v = inp.value === '' ? null : +inp.value; else if (inp.type === 'checkbox') v = inp.checked; else if (inp.tagName === 'TEXTAREA') { try { v = JSON.parse(inp.value); inp.classList.remove('sai'); } catch { inp.classList.add('sai'); return; } } else v = inp.value === 'tam' && nhanTxt === 'quay' ? 'tam' : inp.value;
      if (nhanTxt === 'quay' && inp.type === 'text' && inp.value !== 'tam' && !isNaN(+inp.value)) v = +inp.value;
      ghi(); datGt(v); doi();
    });
    return el('label', { class: 'truong' }, el('span', {}, nhanTxt), inp);
  }
  function veTT() {
    if (!S.K) return;
    const c = S.chon, o = lay(c), kq = [];
    if (!c || !o) {
      kq.push(el('h3', {}, S.K.ten || S.id), el('p', { class: 'nho' }, 'Bấm một vật để sửa. Ô vuông xanh ở mép đảo kéo được để đổi bán kính.'));
      kq.push(el('h4', {}, 'Đảo (dao)'));
      for (const [k, v] of Object.entries(S.K.dao)) if (k !== 'ghiChu') kq.push(oNhap(k, v, (nv) => { S.K.dao[k] = nv; }));
      kq.push(el('h4', {}, 'Thuộc tính khu'));
      for (const [k, v] of Object.entries(S.K)) if (!BO_QUA.has(k) && k !== 'dao' && k !== 'ghiChu' && k !== 'id') kq.push(oNhap(k, v, (nv) => { S.K[k] = nv; }));
      kq.push(el('h4', {}, 'Cây (cay)'), oNhap('cay', S.K.cay, (nv) => { S.K.cay = nv; }));
    } else {
      kq.push(el('h3', {}, nhan(c)), el('p', { class: 'nho' }, { vat: 'Vật', cong: 'Cổng', loi: 'Lối', npc: 'Chỗ NPC', gocAnh: 'Góc ảnh', lum: 'Lùm cây [x, z, số cây, to]', diem: 'Cây [x, z, cỡ]', khac: 'Mảng ' + c.k, dao: 'Đảo' }[c.loai] + (c.loai === 'vat' && !M.modelMap[o.loai] ? ' · chưa có model .glb (vẽ hộp theo r)' : '')));
      if (Array.isArray(o)) { const ten = c.loai === 'lum' ? ['x', 'z', 'số cây', 'to'] : ['x', 'z', 'cỡ']; o.forEach((v, j) => kq.push(oNhap(ten[j] || String(j), v, (nv) => { o[j] = nv; }))); }
      else {
        if (c.loai === 'vat') { const cv2 = coVat(o, M); if (cv2) kq.push(el('p', { class: 'nho' }, `Cỡ model: ${fmt(cv2.w, 2)} × ${fmt(cv2.d, 2)} × cao ${fmt(cv2.h, 2)} m` + (cv2.mat != null && cv2.m.matDT > 0.2 ? ` · mặt trên ${fmt(cv2.mat, 2)} m` : ''))); }
        if (c.loai === 'loi') kq.push(el('p', { class: 'nho' }, `Dài ${fmt(o.diem.slice(1).reduce((t, p, j) => t + Math.hypot(p[0] - o.diem[j][0], p[1] - o.diem[j][1]), 0))} m · ${o.diem.length} đỉnh`));
        for (const [k, v] of Object.entries(o)) kq.push(oNhap(k, v, (nv) => { if (nv === null || nv === '') delete o[k]; else o[k] = nv; }));
        const kMoi = el('input', { type: 'text', placeholder: 'tên trường mới' });
        kq.push(el('div', { class: 'hang' }, kMoi, el('button', { onclick: () => { const k = kMoi.value.trim(); if (!k || k in o) return; ghi(); o[k] = ''; doi(true); } }, '+ Trường')));
      }
      kq.push(el('div', { class: 'hang' }, el('button', { onclick: nhanBan }, '⧉ Nhân bản'), el('button', { onclick: xoa }, '✕ Xoá'), el('button', { onclick: () => { const p = viTri(c); if (p) X3.nhinToi(p.x, p.z); } }, '⧈ Xem 3D')));
    }
    thuocTinh.replaceChildren(...kq);
  }

  // ---- kiểm tra cỡ ----
  function veKiem() {
    if (!S.K) return;
    const L = S.loiCo, kq = [el('h3', {}, `Sai chuẩn cỡ: ${L.length}`), el('p', { class: 'nho' }, 'Chuẩn CLAUDE.md (Q361), dung sai 10 %. Bấm dòng để chọn.')];
    kq.push(el('ul', { class: 'ds-loi' }, L.map((l) => el('li', { onclick: () => { S.chon = { loai: l.loai, i: l.i }; const p = viTri(S.chon); S.cam.x = p.x; S.cam.z = p.z; tabPhai('tt'); ve(); veTT(); } }, el('b', { class: 'huy' }, '!'), ` ${l.id} · ${l.nhom}: ${l.doDo} ${fmt(l.val, 2)} m (chuẩn ${fmt(l.min, 2)}–${fmt(l.max, 2)})`))));
    if (!L.length) kq.push(el('p', {}, 'Mọi vật và lối đều đúng chuẩn.'));
    kq.push(el('h3', {}, 'Đi bộ cổng → điểm chính'), el('p', { class: 'nho' }, `Tìm đường tránh vật cản (vòng va chạm vật, nước, mép đảo) trên lưới 0,5 m: cỏ/đất ${fmt(V_CO)} m/s, đường lát ${fmt(V_LAT)} m/s.`));
    for (const g of congToiDiem(S.K)) kq.push(el('details', {}, el('summary', {}, `Cổng ${g.cong.id} (${g.cong.ten || g.cong.toi}) · gần nhất ${g.ds[0] ? fmt(g.ds[0].t) + ' s' : '–'}`), el('table', {}, g.ds.map((d) => el('tr', {}, el('td', {}, d.p.ten), el('td', { class: 'so' }, fmt(d.t) + ' s'), el('td', { class: 'so' }, fmt(d.m, 0) + ' m'))))));
    if (!S.K.dao?.trong) {
      const kc = khoangCachXem(S.K);
      kq.push(el('h3', {}, 'Khoảng cách điểm đáng xem'), el('p', { class: 'nho' }, 'Điểm gần nhất, chuẩn 17–27 m.'), el('table', {}, kc.map((k) => el('tr', { class: k.ok ? '' : 'sai' }, el('td', {}, k.p.ten), el('td', {}, k.gan?.ten || '–'), el('td', { class: 'so' }, fmt(k.d) + ' m')))));
    }
    kq.push(el('p', { class: 'nho' }, 'Đo hai điểm bất kỳ: dùng công cụ ⏱ Đo đi bộ.'));
    kiemTra.replaceChildren(...kq);
  }

  // ---- thao tác ----
  function them(loai, x, z) {
    ghi(); const K = S.K;
    if (loai === 'vat') { const m = M.modelMap[S.model], base = S.model; let n = 1; while ((K.vat || []).some((v) => v.id === `${base}-${n}`)) n++; (K.vat ||= []).push({ id: `${base}-${n}`, loai: S.model, x: r2(x), z: r2(z), quay: 0, r: r2(Math.max(m.w, m.d) / 2) }); S.chon = { loai: 'vat', i: K.vat.length - 1 }; }
    else if (loai === 'npc') { (K.npc ||= []).push({ ten: 'NPC mới', x: r2(x), z: r2(z), gio: [6, 20] }); S.chon = { loai: 'npc', i: K.npc.length - 1 }; }
    else if (loai === 'anh') { (K.gocAnh ||= []).push({ ten: 'Góc ảnh mới', x: r2(x), z: r2(z) }); S.chon = { loai: 'gocAnh', i: K.gocAnh.length - 1 }; }
    else if (loai === 'cay') { K.cay ||= { lum: [] }; (K.cay.lum ||= []).push([r2(x), r2(z), 1]); S.chon = { loai: 'lum', i: K.cay.lum.length - 1 }; }
    doi();
  }
  function xoa() {
    const c = S.chon; if (!c || c.loai === 'dao') return; ghi();
    const ds = c.loai === 'lum' ? S.K.cay.lum : c.loai === 'diem' ? S.K.cay.diem : c.loai === 'khac' ? S.K[c.k] : S.K[c.loai];
    ds.splice(c.i, 1); S.chon = null; doi();
  }
  function nhanBan() {
    const c = S.chon; if (!c || c.loai === 'dao') return; ghi();
    const ds = c.loai === 'lum' ? S.K.cay.lum : c.loai === 'diem' ? S.K.cay.diem : c.loai === 'khac' ? S.K[c.k] : S.K[c.loai];
    const o = JSON.parse(JSON.stringify(ds[c.i])); if (o.id) { let n = 2; const b = o.id.replace(/-\d+$/, ''); while (ds.some((v) => v.id === `${b}-${n}`)) n++; o.id = `${b}-${n}`; }
    ds.push(o); S.chon = { ...c, i: ds.length - 1 }; const p = viTri(S.chon); datViTri(S.chon, p.x + 2, p.z + 2); doi();
  }
  function ketThucLoi() {
    if (S.loiMoi && S.loiMoi.length >= 2) { ghi(); let n = 1; while ((S.K.loi || []).some((p) => p.id === `loi-moi-${n}`)) n++; (S.K.loi ||= []).push({ id: `loi-moi-${n}`, kieu: S.K.dao?.trong ? 'tham' : 'dat', rong: 2, diem: S.loiMoi }); S.chon = { loai: 'loi', i: S.K.loi.length - 1 }; S.loiMoi = null; doi(); }
    S.loiMoi = null; S.troi = null;
  }

  // ---- con trỏ: chuột, bút, chạm (chụm 2 ngón) ----
  const ngon = new Map(); let keo = null, chum = null;
  const diemTG = (e) => { const b = cv.getBoundingClientRect(); return toTG(e.clientX - b.left, e.clientY - b.top); };
  cv.addEventListener('pointerdown', (e) => {
    cv.focus(); cv.setPointerCapture(e.pointerId); ngon.set(e.pointerId, [e.clientX, e.clientY]);
    if (ngon.size === 2) { keo = null; const [a, b] = [...ngon.values()]; chum = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), s: S.cam.s, c: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], cam: { ...S.cam } }; return; }
    const [x, z] = diemTG(e);
    if (e.button === 1 || e.button === 2) { keo = { cuon: true, sx: e.clientX, sz: e.clientY, cam: { ...S.cam } }; return; }
    if (S.tool === 'them-vat') { if (S.model) them('vat', snap(x), snap(z)); return; }
    if (S.tool === 'npc' || S.tool === 'anh' || S.tool === 'cay') { them(S.tool, snap(x), snap(z)); return; }
    if (S.tool === 'do') { if (S.do.length >= 2) { S.do = []; S.doKq = null; } S.do.push({ x, z }); if (S.do.length === 2) { const L = luoiDi(S.K); S.doKq = (L && diBoTranh(L, S.do[0], S.do[1])) || diBo(doThi(S.K), S.do[0], S.do[1]); } ve(); return; }
    const h = trung(x, z);
    if (S.tool === 'loi' && !(h?.loai === 'loi' && h.i === S.chon?.i && S.chon?.loai === 'loi')) {
      if (e.detail >= 2) { ketThucLoi(); return; }
      (S.loiMoi ||= []).push([snap(x), snap(z)]); ve(); return;
    }
    if (h?.loai === 'loi' && h.dinh != null && e.altKey) { const p = S.K.loi[h.i]; if (p.diem.length > 2) { ghi(); p.diem.splice(h.dinh, 1); doi(); } return; }
    if (h?.loai === 'loi' && h.doan != null && S.chon?.loai === 'loi' && S.chon.i === h.i) { ghi(); S.K.loi[h.i].diem.splice(h.doan, 0, [snap(x), snap(z)]); keo = { c: { ...h, dinh: h.doan }, dau: true }; doi(true); return; }
    if (h?.loai === 'tay') { S.chon = null; keo = { tay2: h.h.ten, dau: false }; ve(); veTT(); trangThai.textContent = 'Kéo: ' + h.h.ten; return; }
    if (h) {
      const coDinh = h.dinh != null, xoay = h.xoay, tay = h.tay;
      S.chon = { loai: h.loai, i: h.i, k: h.k }; if (h.loai === 'dao') S.chon = { loai: 'dao' };
      const p = viTri(S.chon) || { x, z };
      keo = { c: h, dinh: coDinh ? h.dinh : null, xoay, tay, ox: p.x - x, oz: p.z - z, dau: false };
      ve(); veTT(); return;
    }
    S.chon = null; ve(); veTT();
    keo = { cuon: true, sx: e.clientX, sz: e.clientY, cam: { ...S.cam } };
  });
  cv.addEventListener('pointermove', (e) => {
    if (ngon.has(e.pointerId)) ngon.set(e.pointerId, [e.clientX, e.clientY]);
    if (chum && ngon.size === 2) { const [a, b] = [...ngon.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]), c = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; S.cam.s = Math.max(0.5, Math.min(200, chum.s * d / chum.d)); S.cam.x = chum.cam.x - (c[0] - chum.c[0]) / S.cam.s; S.cam.z = chum.cam.z - (c[1] - chum.c[1]) / S.cam.s; ve(); return; }
    const [x, z] = diemTG(e);
    if (S.tool === 'loi' && S.loiMoi) { S.troi = [snap(x), snap(z)]; ve(); }
    if (!keo) { const h = S.tool === 'chon' ? trung(x, z) : null; cv.style.cursor = h ? (h.xoay ? 'grab' : 'move') : S.tool === 'chon' ? 'default' : 'crosshair'; trangThai.dataset.xz = `x ${fmt(x)} · z ${fmt(z)}`; trangThai.title = trangThai.dataset.xz; return; }
    if (keo.cuon) { S.cam.x = keo.cam.x - (e.clientX - keo.sx) / S.cam.s; S.cam.z = keo.cam.z - (e.clientY - keo.sz) / S.cam.s; ve(); return; }
    if (!keo.dau) { ghi(); keo.dau = true; }
    const c = keo.c;
    if (keo.tay2) { const h = tayKhac().find((t) => t.ten === keo.tay2); if (h) h.dat(snap(x), snap(z)); doi(true); return; }
    if (keo.tay) { const D = S.K.dao; if (keo.tay === 'r') D.r = r2(Math.max(3, D.vuong ? snap(x) : snap(Math.hypot(x, z)))); else if (keo.tay === 'rx') D.elip.rx = Math.max(3, snap(x - D.elip.x)); else if (keo.tay === 'rz') D.elip.rz = Math.max(3, snap(z - D.elip.z)); else if (keo.tay === 'h0') D.hcn[0] = Math.max(2, snap(x)); else if (keo.tay === 'h1') D.hcn[1] = Math.max(2, snap(z)); }
    else if (keo.xoay) { const v = lay(c), p = vatXY(v); let q = Math.round(Math.atan2(-(z - p.z), x - p.x) / DEG); if (!e.shiftKey) q = Math.round(q / 15) * 15; v.quay = q; delete v.lech; }
    else if (keo.dinh != null || c.dinh != null) { const j = keo.dinh ?? c.dinh; S.K.loi[c.i].diem[j] = [snap(x), snap(z)]; }
    else datViTri(S.chon, snap(x + keo.ox), snap(z + keo.oz));
    doi(true);
  });
  const tha = (e) => { ngon.delete(e.pointerId); if (ngon.size < 2) chum = null; if (keo?.dau) doi(); keo = null; };
  cv.addEventListener('pointerup', tha); cv.addEventListener('pointercancel', tha);
  cv.addEventListener('contextmenu', (e) => e.preventDefault());
  cv.addEventListener('dblclick', () => { if (S.tool === 'loi') ketThucLoi(); });
  cv.addEventListener('wheel', (e) => { e.preventDefault(); const b = cv.getBoundingClientRect(), [x, z] = toTG(e.clientX - b.left, e.clientY - b.top); S.cam.s = Math.max(0.5, Math.min(200, S.cam.s * Math.exp(-e.deltaY * 0.0015))); const [x2, z2] = toTG(e.clientX - b.left, e.clientY - b.top); S.cam.x += x - x2; S.cam.z += z - z2; ve(); }, { passive: false });
  addEventListener('keydown', (e) => {
    if (root.hidden || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) return;
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && k === 'z') { e.preventDefault(); e.shiftKey ? lamLai() : hoanTac(); }
    else if ((e.ctrlKey || e.metaKey) && k === 'y') { e.preventDefault(); lamLai(); }
    else if ((e.ctrlKey || e.metaKey) && k === 'd') { e.preventDefault(); nhanBan(); }
    else if (k === 'delete' || k === 'backspace') xoa();
    else if (k === 'enter') ketThucLoi();
    else if (k === 'escape') { S.loiMoi = null; S.chon = null; ve(); veTT(); }
    else if (!e.ctrlKey && !e.metaKey && { v: 1, a: 1, p: 1, n: 1, o: 1, t: 1, m: 1 }[k]) datTool({ v: 'chon', a: 'them-vat', p: 'loi', n: 'npc', o: 'anh', t: 'cay', m: 'do' }[k]);
    else if (S.chon && S.chon.loai !== 'dao' && k.startsWith('arrow')) { e.preventDefault(); const p = viTri(S.chon), d = e.shiftKey ? 2 : SNAP; ghi(); datViTri(S.chon, p.x + (k === 'arrowleft' ? -d : k === 'arrowright' ? d : 0), p.z + (k === 'arrowup' ? -d : k === 'arrowdown' ? d : 0)); doi(); }
  });
  new ResizeObserver(() => ve()).observe(cv);
  cv.addEventListener('dragover', (e) => { e.preventDefault(); });
  cv.addEventListener('drop', (e) => { e.preventDefault(); const f = e.dataTransfer?.files?.[0]; if (f) moTep(f); });

  // ---- xuất ----
  const jsonKhu = () => ghiGon(S.K, S.goc);
  function xuatJSON() { taiXuong(`${S.id}.json`, jsonKhu()); }
  const tomTat = () => tomTatKhu(S.id, JSON.parse(S.goc), S.K, kiemKhu(S.K, M));
  function xuatTomTat() { taiXuong(`${S.id}-thay-doi.txt`, tomTat(), 'text/plain'); }
  function xuatPNG() { ve(); cv.toBlob((b) => taiXuong(`${S.id}-ban-do.png`, b), 'image/png'); }

  return { moKhu, S, jsonKhu, tomTat, ve, moTep };
}
