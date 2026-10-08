// Bút vẽ tranh bản đồ tay: bản JS của tools/ban-do/but.py (Q367). Cùng nét run tay, Catmull-Rom, bảng màu, khung,
// và cùng bộ sinh số ngẫu nhiên của Python (Mersenne Twister, random.Random(hạt)) nên cùng hạt cho cùng chuỗi số.
export class PyRandom {
  constructor(seed) {
    this.mt = new Uint32Array(624); this.i = 625;
    const key = []; let s = Math.abs(Math.floor(seed)); do { key.push(s % 4294967296); s = Math.floor(s / 4294967296); } while (s > 0);
    this.initArray(key);
  }
  initGen(s) { const mt = this.mt; mt[0] = s >>> 0; for (let i = 1; i < 624; i++) { const p = mt[i - 1] ^ (mt[i - 1] >>> 30); mt[i] = (Math.imul(1812433253, p) + i) >>> 0; } this.i = 624; }
  initArray(key) {
    this.initGen(19650218); const mt = this.mt; let i = 1, j = 0;
    for (let k = Math.max(624, key.length); k; k--) { const p = mt[i - 1] ^ (mt[i - 1] >>> 30); mt[i] = ((mt[i] ^ Math.imul(p, 1664525)) + key[j] + j) >>> 0; i++; j++; if (i >= 624) { mt[0] = mt[623]; i = 1; } if (j >= key.length) j = 0; }
    for (let k = 623; k; k--) { const p = mt[i - 1] ^ (mt[i - 1] >>> 30); mt[i] = ((mt[i] ^ Math.imul(p, 1566083941)) - i) >>> 0; i++; if (i >= 624) { mt[0] = mt[623]; i = 1; } }
    mt[0] = 0x80000000;
  }
  u32() {
    const mt = this.mt;
    if (this.i >= 624) {
      for (let k = 0; k < 624; k++) { const y = (mt[k] & 0x80000000) | (mt[(k + 1) % 624] & 0x7fffffff); mt[k] = mt[(k + 397) % 624] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0); }
      this.i = 0;
    }
    let y = mt[this.i++]; y ^= y >>> 11; y ^= (y << 7) & 0x9d2c5680; y ^= (y << 15) & 0xefc60000; y ^= y >>> 18; return y >>> 0;
  }
  random() { const a = this.u32() >>> 5, b = this.u32() >>> 6; return (a * 67108864 + b) / 9007199254740992; }
  uniform(a, b) { return a + (b - a) * this.random(); }
  randbelow(n) { const k = Math.floor(Math.log2(n)) + 1; let r; do { r = this.u32() >>> (32 - k); } while (r >= n); return r; }
  choice(a) { return a[this.randbelow(a.length)]; }
}

export const MAP_R = 47, MUC = '#5B3A26', BONG = 'rgba(58,84,38,.28)';
export const f = (v) => { if (Math.abs(v) < 0.005) return '0'; let t = v.toFixed(2); if (t.includes('.')) t = t.replace(/0+$/, '').replace(/\.$/, ''); return t === '-0' ? '0' : t; };
export function bangMau(goc) {
  return { ...goc, co: '#B9DD8E', 'co-sang': '#CDE8A6', 'co-toi': '#9FCB78', 'co-dam': '#86B866', vach: '#B98B5E', 'vach-toi': '#8E6440', 'vach-sang': '#D2A877', dat: '#EAD7AE', 'dat-vien': '#C9A87A', 'da-lat': '#F1E6CC', nuoc: '#8FD0DE', 'nuoc-sau': '#6DB9CC', 'nuoc-sang': '#DDF3F6', 'may-nen': '#D7EAF2', 'may-bong': '#B9D6E6', rom: '#E2B85C', 'rom-toi': '#C89A3E' };
}
const P = (x, z) => `${f(x)} ${f(z)}`;

export class Tranh {
  constructor(id, MAU, hat = 7, khung = MAP_R) { this.id = id; this.MAU = MAU; this.R = khung; this.net_k = khung / MAP_R; this.r = new PyRandom(hat); this.lop = []; }
  add(s) { this.lop.push(s); }
  run(pts, bien = 0.18, buoc = 0.9, kin = false, tan = 1.0) {
    if (pts.length > 40) buoc = Math.max(buoc, 1.4);
    const out = [], n = pts.length, segs = kin ? n : n - 1, ph = this.r.random() * 10; let dem = 0;
    for (let i = 0; i < segs; i++) {
      const [x0, z0] = pts[i], [x1, z1] = pts[(i + 1) % n], d = Math.hypot(x1 - x0, z1 - z0), k = Math.max(1, Math.floor(d / buoc));
      const [nx, nz] = d ? [-(z1 - z0) / d, (x1 - x0) / d] : [0, 0];
      for (let j = 0; j < k; j++) { const t = j / k; dem++; const w = bien * (Math.sin(dem * 0.9 * tan + ph) * 0.6 + Math.sin(dem * 2.3 * tan + ph * 1.7) * 0.4); out.push([x0 + (x1 - x0) * t + nx * w, z0 + (z1 - z0) * t + nz * w]); }
    }
    if (!kin) out.push(pts[n - 1]);
    return Tranh.cong(out, kin);
  }
  static cong(p, kin = false) {
    if (p.length < 3) return 'M' + p.map(([x, z]) => P(x, z)).join(' L');
    const n = p.length, d = [`M${P(p[0][0], p[0][1])}`], m = (i) => ((i % n) + n) % n;
    for (let i = 0; i < (kin ? n : n - 1); i++) {
      const p0 = kin || i > 0 ? p[m(i - 1)] : p[i], p1 = p[i], p2 = p[m(i + 1)], p3 = kin || i + 2 < n ? p[m(i + 2)] : p2;
      const c1 = [(p2[0] - p0[0]) / 6, (p2[1] - p0[1]) / 6], c2 = [p2[0] - p1[0] - (p3[0] - p1[0]) / 6, p2[1] - p1[1] - (p3[1] - p1[1]) / 6];
      d.push(`c${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0] - p1[0])} ${f(p2[1] - p1[1])}`);
    }
    if (kin) d.push('Z');
    return d.join(' ');
  }
  vong(cx, cz, rx, rz = null, bien = 0.12, n = null) { rz = rz ?? rx; n = n || Math.max(10, Math.floor((rx + rz) * 3)); const o = []; for (let i = 0; i < n; i++) o.push([cx + Math.cos(i / n * 2 * Math.PI) * rx, cz + Math.sin(i / n * 2 * Math.PI) * rz]); return o; }
  hinh(pts, to, { net = MUC, day = 0.16, bien = 0.14, mo = 1.0, them = '' } = {}) {
    const d = this.run(pts, bien, 0.9, true), nn = net ? ` stroke="${net}" stroke-width="${f(day)}" stroke-linejoin="round"` : '';
    this.add(`<path d="${d}" fill="${to}"${nn} opacity="${f(mo)}"${them}/>`);
  }
  net(pts, mau = MUC, day = 0.16, { bien = 0.1, mo = 1.0, them = '' } = {}) { this.add(`<path d="${this.run(pts, bien)}" fill="none" stroke="${mau}" stroke-width="${f(day)}" stroke-linecap="round" stroke-linejoin="round" opacity="${f(mo)}"${them}/>`); }
  bong(pts, dx = 0.45, dz = 0.55) { this.hinh(pts.map(([x, z]) => [x + dx, z + dz]), BONG, { net: null, bien: 0.2 }); }
  static xoay(pts, cx, cz, goc) { const g = goc * (Math.PI / 180), c = Math.cos(g), s = Math.sin(g); return pts.map(([x, z]) => [cx + x * c - z * s, cz + x * s + z * c]); }
  static chu_nhat(rong, sau) { return [[-rong / 2, -sau / 2], [rong / 2, -sau / 2], [rong / 2, sau / 2], [-rong / 2, sau / 2]]; }
  bien_may(cum) { const R = this.R; this.add(`<rect x="-${R}" y="-${R}" width="${2 * R}" height="${2 * R}" fill="url(#nenMay)"/>`); for (const [cx, cz, k] of cum) this.dam_may(cx, cz, k); }
  dam_may(cx, cz, k = 1.0) {
    const bup = [[-2.2, 0.4, 1.6], [-0.6, -0.5, 2.1], [1.3, 0, 1.7], [2.8, 0.6, 1.1], [0.3, 0.9, 1.5]], M = this.MAU;
    for (const [dx, dz, rr] of bup) this.add(`<circle cx="${f(cx + dx * k + 0.35)}" cy="${f(cz + dz * k + 0.6)}" r="${f(rr * k)}" fill="${M['may-bong']}" opacity=".7"/>`);
    for (const [dx, dz, rr] of bup) this.add(`<circle cx="${f(cx + dx * k)}" cy="${f(cz + dz * k)}" r="${f(rr * k)}" fill="#FFFFFF"/>`);
    this.add(`<path d="${this.run([[cx - 3 * k, cz + 1.2 * k], [cx + 3.4 * k, cz + 1.3 * k]], 0.1)}" stroke="${M['may-bong']}" stroke-width="${f(0.18 * k)}" fill="none" stroke-linecap="round"/>`);
  }
  // mép đảo: danh sách điểm (đa giác) thay cho hàm bán kính, để dùng chung cho đảo tròn, vuông, bầu dục
  dao(mep, day_vach = 1.6) {
    const M = this.MAU, zMin = Math.min(...mep.map((p) => p[1]));
    this.add(`<path d="${this.run(mep.map(([x, z]) => [x + 0.8, z + day_vach + 1.4]), 0.3, 0.9, true)}" fill="${M['may-bong']}" opacity=".8"/>`);
    this.hinh(mep.map(([x, z]) => [x, z + day_vach]), M.vach, { day: 0.22, bien: 0.22 });
    for (const k of [0.5, 1.0]) { const lop = mep.filter(([, z]) => z > zMin * 0.2).map(([x, z]) => [x, z + day_vach * k]); if (lop.length > 3) this.net(lop, M['vach-toi'], 0.14, { bien: 0.18, mo: 0.55 }); }
    this.hinh(mep, M.co, { day: 0.24, bien: 0.16 }); this.mep = mep; return mep;
  }
  mang_co(trong, so = 26, rong = 40) {
    const r = this.r, M = this.MAU;
    for (let i = 0; i < so; i++) {
      let x, z, ok = false; for (let t = 0; t < 30; t++) { x = r.uniform(-rong, rong); z = r.uniform(-rong, rong); if (trong(x, z, 3)) { ok = true; break; } }
      if (!ok) continue;
      const rx = r.uniform(2.5, 6), rz = r.uniform(1.8, 4); this.hinh(this.vong(x, z, rx, rz), M[i % 2 ? 'co-sang' : 'co-toi'], { net: null, bien: 0.4, mo: 0.45 });
    }
    const g = []; for (let i = 0; i < so * 7; i++) { const x = r.uniform(-rong, rong), z = r.uniform(-rong, rong); if (trong(x, z, 1.5)) g.push(`M${f(x - 0.25)} ${f(z)}l.25 -.45l.25 .45`); }
    this.add(`<path d="${g.join(' ')}" stroke="${M['co-dam']}" stroke-width=".12" fill="none" stroke-linecap="round" opacity=".55"/>`);
  }
  lan_can_tre(mep, buoc = 6) { const M = this.MAU, pts = mep.map(([x, z]) => [x * 0.985, z * 0.985]); this.net([...pts, pts[0]], M['tre-dam'], 0.22, { bien: 0.06 }); for (let i = 0; i < pts.length; i += buoc) this.add(`<circle cx="${f(pts[i][0])}" cy="${f(pts[i][1])}" r=".28" fill="${M['tre-xanh']}" stroke="${MUC}" stroke-width=".08"/>`); }
  duong(diem, rong, kieu = 'dat') {
    const M = this.MAU, [vien, to] = kieu === 'dat' ? [M['dat-vien'], M.dat] : ['#C9B089', M['da-lat']], d = this.run(diem, 0.12);
    this.add(`<path d="${d}" fill="none" stroke="${vien}" stroke-width="${f(rong + 0.5)}" stroke-linecap="round" stroke-linejoin="round"/>`);
    this.add(`<path d="${d}" fill="none" stroke="${to}" stroke-width="${f(rong)}" stroke-linecap="round" stroke-linejoin="round"/>`);
    if (kieu === 'da') this.add(`<path d="${d}" fill="none" stroke="#D9C8A4" stroke-width="${f(rong * 0.55)}" stroke-dasharray=".55 .7" stroke-linecap="round"/>`);
    else this.add(`<path d="${d}" fill="none" stroke="${vien}" stroke-width=".14" stroke-dasharray=".2 1.6" opacity=".7"/>`);
  }
  cay(x, z, k = 1.0, la = null) {
    const M = this.MAU; la = la || [M['nhuom-la'], M['nhuom-la-2']][this.r.random() < 0.5 ? 1 : 0]; const r = 1.15 * k;
    this.add(`<ellipse cx="${f(x + 0.55 * k)}" cy="${f(z + 0.7 * k)}" rx="${f(r * 1.05)}" ry="${f(r * 0.8)}" fill="${BONG}"/>`);
    const d = [[0, 0, 1], [-0.45, 0.25, 0.75], [0.45, 0.3, 0.72], [0.05, -0.4, 0.7]].map(([bx, bz, br]) => `M${f(x + bx * k + br * r)} ${f(z + bz * k)}a${f(br * r)} ${f(br * r)} 0 1 0 ${f(-2 * br * r)} 0a${f(br * r)} ${f(br * r)} 0 1 0 ${f(2 * br * r)} 0`).join(' ');
    this.add(`<path d="${d}" fill="${la}" stroke="${MUC}" stroke-width=".13" opacity=".98"/>`); this.add(`<path d="${d}" fill="${la}"/>`);
    this.add(`<ellipse cx="${f(x - 0.35 * k)}" cy="${f(z - 0.35 * k)}" rx="${f(0.45 * k)}" ry="${f(0.3 * k)}" fill="#FFFFFF" opacity=".28"/>`);
  }
  bui(x, z, k = 0.6) { this.add(`<ellipse cx="${f(x + 0.25)}" cy="${f(z + 0.3)}" rx="${f(0.9 * k)}" ry="${f(0.6 * k)}" fill="${BONG}"/>`); this.hinh(this.vong(x, z, 0.9 * k, 0.7 * k, 0.12, 9), this.MAU['nhuom-la-2'], { day: 0.1, bien: 0.12 }); }
  da(x, z, k = 0.5) { this.hinh(this.vong(x, z, 0.8 * k, 0.55 * k, 0.12, 7), this.MAU['da-xam'], { day: 0.1, bien: 0.1 }); this.add(`<path d="M${f(x - 0.3 * k)} ${f(z - 0.15 * k)}q${f(0.3 * k)} ${f(-0.2 * k)} ${f(0.6 * k)} 0" stroke="#FFFFFF" stroke-width=".08" fill="none" opacity=".6"/>`); }
  hoa(x, z, mau = null) { mau = mau || this.r.choice(['#FF9FC6', '#FFD45A', '#FFFFFF', '#FF8A4C']); for (let i = 0; i < 5; i++) { const a = i / 5 * 2 * Math.PI; this.add(`<circle cx="${f(x + Math.cos(a) * 0.28)}" cy="${f(z + Math.sin(a) * 0.28)}" r=".17" fill="${mau}"/>`); } this.add(`<circle cx="${f(x)}" cy="${f(z)}" r=".12" fill="${this.MAU['vang-dong']}"/>`); }
  rom(x, z) { const M = this.MAU; this.add(`<ellipse cx="${f(x + 0.3)}" cy="${f(z + 0.35)}" rx=".9" ry=".55" fill="${BONG}"/>`); this.hinh(this.vong(x, z, 0.75, 0.6, 0.12, 9), M.rom, { day: 0.1, bien: 0.08 }); this.add(`<path d="M${f(x - 0.45)} ${f(z - 0.1)}q.45 -.3 .9 0M${f(x - 0.4)} ${f(z + 0.2)}q.4 -.25 .8 0" stroke="${M['rom-toi']}" stroke-width=".1" fill="none"/>`); }
  nam(x, z) { this.add(`<path d="M${f(x - 0.3)} ${f(z)}a.3 .22 0 0 1 .6 0z" fill="#E0503F" stroke="${MUC}" stroke-width=".07"/><circle cx="${f(x - 0.08)}" cy="${f(z - 0.1)}" r=".05" fill="#fff"/>`); }
  mai(x, z, rong, sau, { goc = 0, mau = null, toi = null, xam = false, rom = false, tuong = true, cao = 1.1 } = {}) {
    const M = this.MAU, X = Tranh.xoay, C = Tranh.chu_nhat;
    mau = mau || (xam ? M['xam-soc'] : rom ? M.rom : M['ngoi-do']); toi = toi || (xam ? '#9A9AA6' : rom ? M['rom-toi'] : '#B9503A');
    this.bong(X(C(rong + 0.5, sau + 0.5), x, z, goc).map(([px, pz]) => [px, pz + cao * 0.6]), 0.7, 0.9);
    if (tuong) {
      const than = X(C(rong, sau), x, z, goc).map(([px, pz]) => [px, pz + cao]);
      this.hinh(than, xam ? '#C9C2B2' : M['tuong-kem'], { day: 0.14, bien: 0.04 });
      const day_ = Math.max(...than.map((p) => p[1])), trai = Math.min(...than.map((p) => p[0])), phai = Math.max(...than.map((p) => p[0])), cx = (trai + phai) / 2;
      const o = [`<rect x="${f(cx - 0.4)}" y="${f(day_ - 0.95)}" width=".8" height=".95" rx=".1" fill="${xam ? '#8A8680' : M['go-dam']}" stroke="${MUC}" stroke-width=".07"/>`];
      for (const k of [-1, 1]) { const wx = cx + k * Math.min(1.3, (phai - trai) / 2 - 0.6); if (Math.abs(wx - cx) > 0.8) o.push(`<rect x="${f(wx - 0.32)}" y="${f(day_ - 0.85)}" width=".64" height=".5" fill="${xam ? '#9A968E' : M['kinh-trong']}" stroke="${MUC}" stroke-width=".07"/>`); }
      this.add(o.join(''));
    }
    this.hinh(X([[-rong / 2 - 0.25, -sau / 2 - 0.25], [rong / 2 + 0.25, -sau / 2 - 0.25], [rong / 2 + 0.25, 0], [-rong / 2 - 0.25, 0]], x, z, goc), toi, { day: 0.15, bien: 0.05 });
    this.hinh(X([[-rong / 2 - 0.25, 0], [rong / 2 + 0.25, 0], [rong / 2 + 0.25, sau / 2 + 0.25], [-rong / 2 - 0.25, sau / 2 + 0.25]], x, z, goc), mau, { day: 0.15, bien: 0.05 });
    const vach = []; for (let k = 1; k < 4; k++) for (const s of [-1, 1]) { const zz = s * (sau / 2 + 0.25) * k / 4, [[a, b], [c, d]] = X([[-rong / 2, zz], [rong / 2, zz]], x, z, goc); vach.push(`M${f(a)} ${f(b)}L${f(c)} ${f(d)}`); }
    this.add(`<path d="${vach.join(' ')}" stroke="${MUC}" stroke-width=".07" opacity=".35" stroke-dasharray="${rom ? '.25 .2' : 'none'}"/>`);
    const [[a, b], [c, d]] = X([[-rong / 2 - 0.25, 0], [rong / 2 + 0.25, 0]], x, z, goc);
    this.add(`<path d="M${f(a)} ${f(b)}L${f(c)} ${f(d)}" stroke="${MUC}" stroke-width=".22" stroke-linecap="round"/>`);
    if (xam) { const [[p, q]] = X([[rong * 0.15, sau * 0.18]], x, z, goc); this.add(`<path d="M${f(p)} ${f(q)}l.5 .35l-.2 .45l.55 .3" stroke="${MUC}" stroke-width=".09" fill="none" opacity=".6"/>`); }
  }
  bat_mau(cx, cz, rong, sau, goc = 0, mau = ['#E0503F', '#FFF4DE'], so = 6) {
    const X = Tranh.xoay, ngoai = X(Tranh.chu_nhat(rong, sau), cx, cz, goc); this.bong(ngoai); const w = rong / so;
    for (let i = 0; i < so; i++) this.hinh(X([[-rong / 2 + i * w, -sau / 2], [-rong / 2 + (i + 1) * w, -sau / 2], [-rong / 2 + (i + 1) * w, sau / 2], [-rong / 2 + i * w, sau / 2]], cx, cz, goc), mau[i % 2], { net: null, bien: 0.03 });
    this.hinh(ngoai, 'none', { day: 0.15, bien: 0.04 });
    const [[a, b], [c, d]] = X([[-rong / 2, sau / 2], [rong / 2, sau / 2]], cx, cz, goc), n = so * 2, L = Math.max(1e-6, Math.hypot(c - a, d - b)), q = [];
    for (let i = 0; i < n; i++) q.push(`Q${f(a + (c - a) * (i + 0.5) / n + (d - b) / L * -0.35)} ${f(b + (d - b) * (i + 0.5) / n + (c - a) / L * 0.35)} ${f(a + (c - a) * (i + 1) / n)} ${f(b + (d - b) * (i + 1) / n)}`);
    this.add(`<path d="M${f(a)} ${f(b)} ${q.join(' ')}" fill="${mau[0]}" stroke="${MUC}" stroke-width=".1"/>`);
  }
  ghe(x, z, goc = 0) { this.hinh(Tranh.xoay(Tranh.chu_nhat(1.4, 0.5), x, z, goc), this.MAU['go-nau'], { day: 0.1, bien: 0.03 }); }
  la_ban(x, z, k = 1.0) {
    const M = this.MAU;
    this.add(`<g transform="translate(${f(x)} ${f(z)}) scale(${f(k)})"><circle r="3" fill="${M.kem}" stroke="${MUC}" stroke-width=".15" opacity=".92"/><circle r="2.3" fill="none" stroke="${MUC}" stroke-width=".07" stroke-dasharray=".2 .25"/>`
      + `<path d="M0 -2.7L.55 0L0 .5L-.55 0Z" fill="${M['do-son']}" stroke="${MUC}" stroke-width=".08"/><path d="M0 2.7L.55 0L0 -.5L-.55 0Z" fill="${M.kem}" stroke="${MUC}" stroke-width=".08"/>`
      + `<path d="M-2.4 0L0 .45L2.4 0L0 -.45Z" fill="${M['go-sang']}" stroke="${MUC}" stroke-width=".08"/><text y="-3.35" text-anchor="middle" font-size="1.5" font-weight="800" fill="${MUC}" font-family="Baloo 2, Nunito, sans-serif">B</text></g>`);
  }
  svg() {
    const M = this.MAU, R = this.R;
    const defs = `<defs><radialGradient id="nenMay" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#E6F2F7"/><stop offset="1" stop-color="${M['may-nen']}"/></radialGradient>`
      + '<filter id="giay" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .36  0 0 0 0 .23  0 0 0 0 .15  0 0 0 .09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>';
    let than = this.lop.join('\n');
    if (this.net_k !== 1) than = than.replace(/stroke-width="(-?[\d.]+)"/g, (_, v) => `stroke-width="${f(parseFloat(v) * this.net_k)}"`);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-${R} -${R} ${2 * R} ${2 * R}" width="1024" height="1024"><!-- Tranh bản đồ ${this.id}: vẽ trong Phố Mây Studio (studio/but.js) -->${defs}<g>${than}</g><rect x="-${R}" y="-${R}" width="${2 * R}" height="${2 * R}" filter="url(#giay)"/></svg>`;
  }
}
