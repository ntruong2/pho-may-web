// Xem 3D bằng three.js r128 (cùng CDN với game; THREE, GLTFLoader, OrbitControls là biến toàn cục).
import { DEG, vatXY, vatRot, vienDao, congXY, loiAo, LAT } from './chung.js';

const T = () => window.THREE;
const cacheGLB = new Map();
export function taiGLB(id) {
  if (!cacheGLB.has(id)) cacheGLB.set(id, new Promise((ok) => new (T().GLTFLoader)().load(`data/model/${id}.glb`, (g) => ok(g.scene), undefined, () => ok(null))));
  return cacheGLB.get(id).then((s) => (s ? s.clone(true) : null));
}
// nhân vật đứng thay 1,9 m (chibi: đầu to)
export function chibi() {
  const THREE = T(), g = new THREE.Group(), m = (c) => new THREE.MeshLambertMaterial({ color: new THREE.Color(c).convertSRGBToLinear() });
  const than = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.95, 16), m('#F2A65A')); than.position.y = 0.48; g.add(than);
  const dau = new THREE.Mesh(new THREE.SphereGeometry(0.47, 20, 14), m('#FFE0C2')); dau.position.y = 1.43; g.add(dau);
  const toc = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), m('#4A3428')); toc.position.y = 1.47; g.add(toc);
  g.userData.chibi = true; g.traverse((o) => { o.userData.chibi = true; });
  return g;
}
export function canhCoBan(canvas) {
  const THREE = T(), renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#CFE8F5').convertSRGBToLinear();
  scene.add(new THREE.HemisphereLight('#ffffff', '#9a8a70', 0.85));
  const sun = new THREE.DirectionalLight('#fff4e0', 0.9); sun.position.set(30, 60, 20); scene.add(sun);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
  const ctl = new THREE.OrbitControls(camera, canvas); ctl.enableDamping = true;
  const khung = () => { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; if (canvas.width !== Math.round(w * renderer.getPixelRatio())) renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  let chay = true;
  const vong = () => { if (!chay) return; requestAnimationFrame(vong); if (!canvas.offsetParent) return; khung(); ctl.update(); renderer.render(scene, camera); };
  vong();
  return { THREE, renderer, scene, camera, ctl, dung: () => { chay = false; } };
}

// ---- xem trước khu ----
export function taoXemKhu(canvas, M) {
  const C = canhCoBan(canvas), { THREE, scene, camera, ctl } = C;
  let nhom = new THREE.Group(); scene.add(nhom);
  const nv = chibi(); scene.add(nv);
  let lanDau = true, phien = 0;
  const mat = (c) => new THREE.MeshLambertMaterial({ color: new THREE.Color(c).convertSRGBToLinear() });
  async function dung(K) {
    const me = ++phien;
    scene.remove(nhom); nhom = new THREE.Group(); scene.add(nhom);
    const dao = K.dao || { r: 20 }, vien = vienDao(dao);
    const sh = new THREE.Shape(vien.map(([x, z]) => new THREE.Vector2(x, z)));
    const geo = new THREE.ExtrudeGeometry(sh, { depth: 1.5, bevelEnabled: false }); geo.rotateX(Math.PI / 2);
    const dat = new THREE.Mesh(geo, mat(dao.trong ? '#D9C2A0' : dao.mauNen || '#9CCB6E')); nhom.add(dat);
    for (const p of (K.loi?.length ? K.loi : loiAo(K))) {
      const d = p.diem || [], c = mat(p.kieu === 'tham' ? '#C0504A' : p.kieu === 'go' ? '#A7744A' : LAT.has(p.kieu) ? '#D8D2C4' : '#D6B98A');
      for (let i = 1; i < d.length; i++) { const [ax, az] = d[i - 1], [bx, bz] = d[i], L = Math.hypot(bx - ax, bz - az); const b = new THREE.Mesh(new THREE.BoxGeometry(L + (+p.rong || 1.5), 0.04, +p.rong || 1.5), c); b.position.set((ax + bx) / 2, 0.02 + i * 0.0005, (az + bz) / 2); b.rotation.y = -Math.atan2(bz - az, bx - ax); nhom.add(b); }
    }
    for (const c of K.cong || []) { const p = congXY(c, dao), g = new THREE.Group(); for (const s of [-1.2, 1.2]) { const cot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 2.4, 8), mat('#C4553F')); cot.position.set(s, 1.2, 0); g.add(cot); } const xa = new THREE.Mesh(new THREE.BoxGeometry(3, 0.25, 0.3), mat('#C4553F')); xa.position.y = 2.4; g.add(xa); g.position.set(p.x, 0, p.z); g.rotation.y = -Math.atan2(p.z, p.x) + Math.PI / 2; nhom.add(g); }
    const cay = (x, z, s = 1) => { const g = new THREE.Group(), t = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * s, 0.25 * s, 1.6 * s, 6), mat('#8A5A3A')); t.position.y = 0.8 * s; g.add(t); const l = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3 * s, 0), mat('#5FA852')); l.position.y = 2.5 * s; g.add(l); g.position.set(x, 0, z); nhom.add(g); };
    for (const [x, z, n, to] of K.cay?.lum || []) for (let k = 0; k < Math.max(1, n); k++) cay(x + (k ? Math.cos(k * 2.4) * 2.2 : 0), z + (k ? Math.sin(k * 2.4) * 2.2 : 0), k === 0 && to ? to * 1.4 : 1.1);
    for (const [x, z, s] of K.cay?.diem || []) cay(x, z, s || 1);
    for (const v of K.vat || []) {
      const { x, z } = vatXY(v), ry = vatRot(v);
      const ch = new THREE.Group(); ch.position.set(x, 0, z); ch.rotation.y = ry; nhom.add(ch);
      const r = +v.r || 1, hop = new THREE.Mesh(new THREE.BoxGeometry(r * 1.6, 1.2, r * 1.6), mat('#C9A2F0')); hop.position.y = 0.6; ch.add(hop);
      if (M.modelMap[v.loai]) taiGLB(v.loai).then((o) => { if (!o || me !== phien) return; const s = +v.to || +v.co || 1; o.scale.setScalar(s); ch.remove(hop); ch.add(o); });
    }
    for (const n of K.npc || []) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 1.7, 10), mat('#4FA9C8')); c.position.set(n.x || 0, 0.85, n.z || 0); nhom.add(c); }
    const R = Math.max(...vien.map(([x, z]) => Math.hypot(x, z)));
    if (lanDau) { lanDau = false; camera.position.set(R * 0.2, R * 0.9, R * 1.2); ctl.target.set(0, 0, 0); }
    if (!nv.userData.dat) { const xh = K.xuatHien || [0, 2]; nv.position.set(xh[0], 0, xh[1]); }
  }
  // kéo nhân vật trên mặt đất
  const ray = new THREE.Raycaster(), mp = new THREE.Vector2(), mat0 = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit = new THREE.Vector3();
  let keo = false;
  const toaDo = (e) => { const b = canvas.getBoundingClientRect(); mp.set((e.clientX - b.left) / b.width * 2 - 1, -(e.clientY - b.top) / b.height * 2 + 1); ray.setFromCamera(mp, camera); };
  canvas.addEventListener('pointerdown', (e) => { toaDo(e); if (ray.intersectObject(nv, true).length) { keo = true; ctl.enabled = false; canvas.setPointerCapture(e.pointerId); } });
  canvas.addEventListener('pointermove', (e) => { if (!keo) return; toaDo(e); if (ray.ray.intersectPlane(mat0, hit)) { nv.position.set(hit.x, 0, hit.z); nv.userData.dat = true; } });
  const tha = () => { keo = false; ctl.enabled = true; }; canvas.addEventListener('pointerup', tha); canvas.addEventListener('pointercancel', tha);
  return { dung, nhinToi: (x, z) => { const d = camera.position.clone().sub(ctl.target); ctl.target.set(x, 0, z); camera.position.set(x + d.x, d.y, z + d.z); } };
}
