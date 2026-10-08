// Thư viện model: lưới ảnh thu nhỏ của assets/model/vat/*.glb, xem 3D xoay quanh, cỡ w×d×h, nhân vật 1,9 m, bảng màu và thử đổi màu.
import { $, el, fmt, taiXuong } from './chung.js';
import { taiGLB, chibi, canhCoBan } from './xem-3d.js';

export function taoThuVien(root, M) {
  const THREE = window.THREE, mau = { ...M.bangMau.mau }, doi = {};
  const luoi = el('div', { class: 'tv-luoi' }), tim = el('input', { type: 'search', placeholder: 'Tìm model…', class: 'tv-tim' });
  const cv = el('canvas', { class: 'tv-3d' }), info = el('div', { class: 'tv-info' }), bang = el('div', { class: 'tv-bang' });
  root.append(el('div', { class: 'tv-trai' }, tim, luoi), el('div', { class: 'tv-phai' }, cv, info, el('h3', {}, 'Bảng màu (art/bang-mau.json)'),
    el('p', { class: 'nho' }, 'Bấm ô màu để đổi; model đang xem đổi ngay. Màu của model đang xem đứng đầu.'),
    el('div', { class: 'hang' }, el('button', { onclick: () => { taiXuong('bang-mau.json', JSON.stringify({ ...M.bangMau, mau }, null, 2) + '\n'); } }, 'Tải bảng màu JSON'),
      el('button', { onclick: () => { Object.assign(mau, M.bangMau.mau); for (const k in doi) delete doi[k]; veBang(); toMau(); } }, 'Hoàn tác màu')), bang));
  const C = canhCoBan(cv); C.scene.background = new THREE.Color('#F4EEE2').convertSRGBToLinear();
  const san = new THREE.Mesh(new THREE.CircleGeometry(12, 48), new THREE.MeshLambertMaterial({ color: new THREE.Color('#E2D6BF').convertSRGBToLinear() })); san.rotation.x = -Math.PI / 2; C.scene.add(san);
  const nv = chibi(); C.scene.add(nv);
  const luoiSan = new THREE.GridHelper(24, 24, '#b8a888', '#d0c4aa'); luoiSan.position.y = 0.01; C.scene.add(luoiSan);
  let dang = null, dangId = null;
  const toMau = () => { if (!dang) return; dang.traverse((o) => { if (o.isMesh) for (const m of [].concat(o.material)) { const k = m.userData.ten ?? (m.userData.ten = m.name); if (mau[k]) m.color.set(mau[k]).convertSRGBToLinear?.(); } }); };
  function veBang() {
    const cua = dangId ? M.modelMap[dangId].vatLieu : [];
    const ds = [...cua.filter((k) => mau[k]), ...Object.keys(mau).filter((k) => !cua.includes(k))];
    bang.replaceChildren(...ds.map((k) => {
      const inp = el('input', { type: 'color', value: mau[k].slice(0, 7) });
      inp.addEventListener('input', () => { mau[k] = inp.value.toUpperCase(); doi[k] = true; toMau(); o.classList.add('doi'); });
      const o = el('label', { class: 'o-mau' + (cua.includes(k) ? ' cua' : '') + (doi[k] ? ' doi' : ''), title: k }, inp, el('span', {}, k));
      return o;
    }));
  }
  async function mo(id) {
    dangId = id; const m = M.modelMap[id];
    luoi.querySelectorAll('.the').forEach((t) => t.classList.toggle('chon', t.dataset.id === id));
    if (dang) C.scene.remove(dang);
    const o = await taiGLB(id); if (dangId !== id) return; dang = o; if (o) { C.scene.add(o); toMau(); }
    nv.position.set(m.max[0] + 0.8, 0, 0);
    const R = Math.max(m.w, m.d, m.h, 2.5); C.camera.position.set(R * 1.2, R * 0.9, R * 1.6); C.ctl.target.set(m.w / 4, m.h / 2.5, 0);
    info.innerHTML = `<b>${id}</b> · rộng ${fmt(m.w, 2)} × sâu ${fmt(m.d, 2)} × cao ${fmt(m.h, 2)} m${m.matTren != null && m.matDT > 0.2 ? ` · mặt trên ${fmt(m.matTren, 2)} m` : ''} · ${m.kb} KB${m.kb > 120 ? ' <span class="do">quá 120 KB</span>' : ''}<br><span class="nho">Nhân vật đứng cạnh cao 1,9 m. Vật liệu: ${m.vatLieu.join(', ')}</span>`;
    veBang();
    try { history.replaceState(null, '', '#thu-vien/' + id); } catch { /* bỏ qua */ }
  }
  // ảnh thu nhỏ: một renderer phụ dựng lần lượt
  const tr = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true }); tr.setSize(160, 160); tr.outputEncoding = THREE.sRGBEncoding;
  const ts = new THREE.Scene(); ts.add(new THREE.HemisphereLight('#fff', '#9a8a70', 0.9)); const sun = new THREE.DirectionalLight('#fff4e0', 0.8); sun.position.set(5, 10, 7); ts.add(sun);
  const tc = new THREE.PerspectiveCamera(35, 1, 0.05, 500);
  const the = M.model.map((m) => { const img = el('img', { alt: m.id }); const t = el('button', { class: 'the', 'data-id': m.id, onclick: () => mo(m.id) }, img, el('span', {}, m.id), el('small', {}, `${fmt(m.w)}×${fmt(m.d)}×${fmt(m.h)}`), m.nhom === 'ai' ? el('small', { class: 'nhan-ai', title: 'Sinh bằng Lò Model AI' }, `AI · ${m.loai}`) : null); luoi.append(t); return [m, img]; });
  tim.addEventListener('input', () => luoi.querySelectorAll('.the').forEach((t) => { t.hidden = !t.dataset.id.includes(tim.value.trim()); }));
  (async () => { for (const [m, img] of the) { const o = await taiGLB(m.id); if (!o) continue; ts.add(o); const R = Math.max(m.w, m.d, m.h) || 1, cx = (m.min[0] + m.max[0]) / 2, cz = (m.min[2] + m.max[2]) / 2; tc.position.set(cx + R * 1.1, m.h * 0.6 + R * 0.7, cz + R * 1.5); tc.lookAt(cx, m.h * 0.4, cz); tr.render(ts, tc); img.src = tr.domElement.toDataURL(); ts.remove(o); } root.dataset.thuNho = 'xong'; })();
  return { mo };
}
