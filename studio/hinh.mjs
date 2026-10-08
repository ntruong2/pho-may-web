// Hình học dùng chung cho dữ liệu khu (data/khu/*.json): mép đảo, đường vòng, đại lộ, lối, vật và vòng va chạm.
// Hai kiểu khu: có sân giữa + đường vòng + đại lộ ra cổng (Quảng Trường), hoặc chỉ có các lối gấp khúc 'loi' (Đồng Lúa).
// Bản mẫu 3D (prototype/mau-3d.html) tính y hệt các công thức này; sửa ở đây thì sửa cả ở đó.
export const DEG = Math.PI / 180;

export function hinhKhu(K) {
  const song = (r0, s) => (a) => s.reduce((r, [amp, k, ph]) => r + amp * Math.sin(k * a + ph), r0);
  // mép đảo: đường cong quanh tâm, hoặc hình vuông nửa cạnh dao.r (nông trại riêng) viết dưới dạng bán kính theo góc
  const ISLE_R = K.dao.hcn ? (a) => Math.min(K.dao.hcn[0] / Math.max(Math.abs(Math.cos(a)), 1e-9), K.dao.hcn[1] / Math.max(Math.abs(Math.sin(a)), 1e-9)) : K.dao.vuong ? (a) => K.dao.r / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a))) : song(K.dao.r, K.dao.song);
  const LOOP_R = K.duongVong ? song(K.duongVong.r, K.duongVong.song) : () => NaN;
  const edgeAt = (x, z) => ISLE_R(Math.atan2(z, x));
  const BALCONIES = K.dao.banCong.map((d) => d * DEG);
  const inBalcony = (x, z, m = 0) => BALCONIES.some((a) => {
    const al = x * Math.cos(a) + z * Math.sin(a), ac = -x * Math.sin(a) + z * Math.cos(a), e = ISLE_R(a);
    return al > e - 1 && al < e + 4 - m && Math.abs(ac) < 2.1 - m;
  });
  // khu hẻm: vùng đi là hợp các hình chữ nhật dao.vung; chừa mép m bằng cách thử 8 điểm quanh (không tạo khe ở chỗ hai hình nối nhau)
  // Q365: đảo bầu dục 'dao.elip' (tâm lệch, mép gợn) quanh khối nhà hẻm: vành cỏ trong mép đảo, ngoài nền khối nhà cộng bờ kè cũng đi được
  const EL = K.dao.elip, elR = EL ? (a) => (1 / Math.hypot(Math.cos(a) / EL.rx, Math.sin(a) / EL.rz)) * (1 + (EL.song || []).reduce((t, [am, k, ph]) => t + am * Math.sin(k * a + ph), 0)) : null;
  const inEl = (x, z) => Math.hypot(x - EL.x, z - EL.z) < elR(Math.atan2(z - EL.z, x - EL.x));
  const KE = EL && K.dao.nen ? [K.dao.nen[0] - (EL.ke || 0), K.dao.nen[1] + (EL.ke || 0), K.dao.nen[2] - (EL.ke || 0), K.dao.nen[3] + (EL.ke || 0)] : null;
  const inRing = (x, z) => inEl(x, z) && !(KE && x > KE[0] && x < KE[1] && z > KE[2] && z < KE[3]);
  // cổng ở miệng hẻm: chỗ qua cầu là mép đảo theo hướng cổng
  const mepCong = (x, z, h) => { let t = 0; while (t < 90 && inEl(x + Math.cos(h) * t, z + Math.sin(h) * t)) t += 0.1; return t; };
  const VUNG = K.dao.vung, inU = (x, z) => VUNG.some(([x0, x1, z0, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1) || (!!EL && inRing(x, z));
  const inEdge = VUNG ? (x, z, m = 0) => inU(x, z) && (m <= 0 || [[1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7], [-0.7, -0.7]].every(([u, w]) => inU(x + u * m, z + w * m)))
    : (x, z, m = 0) => Math.hypot(x, z) < edgeAt(x, z) - m || inBalcony(x, z, m);
  const PLAZA_R = K.san ? K.san.r : 0, half = K.daiLo ? K.daiLo.rong / 2 : 0, loopHalf = K.duongVong ? K.duongVong.rong / 2 : 0;
  // tâm khu (đo ngân sách đi bộ): bậc thềm quanh đài phun, hoặc sân 'tam' của khu không có sân lớn
  // khu có sông: tâm là hai đầu cầu (danh sách điểm)
  const TAM = [].concat(K.tam || { x: 0, z: 0, r: K.san.nuoc + 1.3 });
  const LOI = (K.loi || []).map((l) => ({ ...l, half: l.rong / 2 }));
  const segD = (x, z, [ax, az], [bx, bz]) => { const dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1))); return Math.hypot(x - ax - dx * t, z - az - dz * t); };
  const onLoi = (x, z, pad) => LOI.some((l) => l.diem.some((p, i) => i && segD(x, z, l.diem[i - 1], p) < l.half + pad));
  // vùng nước (sông, vũng): không đi được, trừ trên lối gỗ (cầu, cầu tàu); m > 0 là chừa thêm quanh mép nước
  const NUOC = K.nuoc || [];
  // suối (Rừng Đom Đóm): đường gấp khúc có bề rộng, cũng là nước
  const SUOI = K.suoi ? [K.suoi] : [];
  const inWater = (x, z, m = 0) => NUOC.some(([x0, x1, z0, z1]) => x > x0 - m && x < x1 + m && z > z0 - m && z < z1 + m) ||
    SUOI.some((u) => u.diem.some((p, i) => i && segD(x, z, u.diem[i - 1], p) < u.rong / 2 + m));
  const onBridge = (x, z) => LOI.some((l) => l.kieu === 'go' && l.diem.some((p, i) => i && segD(x, z, l.diem[i - 1], p) < l.half));
  const inIsle = (x, z, m = 0) => inEdge(x, z, m) && (!inWater(x, z, m) || onBridge(x, z));
  // a: góc đặt cổng trên mép; h: hướng cổng quay ra (cầu, bến), mặc định trùng góc đặt
  // cổng có x, z (khu hẻm): đặt đúng chỗ đó trên mép vùng đi; không có thì đặt trên mép đảo theo góc a
  const ROADS = K.cong.map((c) => { const a = c.goc * DEG, e = ISLE_R(a), h = (c.huong ?? c.goc) * DEG, px = c.x ?? Math.cos(a) * e, pz = c.z ?? Math.sin(a) * e, t = EL && c.x != null ? mepCong(px, pz, h) : 0;
    return { ...c, a, h, from: PLAZA_R, end: e + 0.4, px, pz, qx: px + Math.cos(h) * t, qz: pz + Math.sin(h) * t }; });
  const onAxis = (rd, along, across) => [Math.cos(rd.a) * along - Math.sin(rd.a) * across, Math.sin(rd.a) * along + Math.cos(rd.a) * across];
  const roadCoord = (rd, x, z) => [x * Math.cos(rd.a) + z * Math.sin(rd.a), -x * Math.sin(rd.a) + z * Math.cos(rd.a)];
  const onRoad = (x, z, pad) => onLoi(x, z, pad) || Math.abs(Math.hypot(x, z) - LOOP_R(Math.atan2(z, x))) < loopHalf + pad ||
    !!K.daiLo && ROADS.some((rd) => { const [al, ac] = roadCoord(rd, x, z); return al > PLAZA_R && al < rd.end + 1 && Math.abs(ac) < half + pad; });
  // cổng: điểm đứng trước cổng (phía trong đảo)
  const gateFront = (rd) => [rd.qx - Math.cos(rd.h) * 0.9, rd.qz - Math.sin(rd.h) * 0.9];
  return { EL, elR, inEl, inRing, KE, ISLE_R, LOOP_R, edgeAt, BALCONIES, inBalcony, inIsle, inWater, onBridge, PLAZA_R, TAM, LOI, segD, ROADS, onAxis, roadCoord, onRoad, gateFront };
}

// toạ độ, hướng quay và các vòng va chạm của một vật
export const viTri = (v) => (v.goc != null && v.cach != null ? [Math.cos(v.goc * DEG) * v.cach, Math.sin(v.goc * DEG) * v.cach] : [v.x, v.z]);
export function huong(v) {
  const [x, z] = viTri(v);
  if (v.quay === 'tam') return Math.atan2(-x, -z) + (v.lech || 0) * DEG;
  return (v.quay || 0) * DEG;
}
export function vongVaCham(v) {
  const [x, z] = viTri(v), q = huong(v);
  if (v.khoi) return v.khoi.map(([a, b, r]) => ({ x: x + Math.cos(q) * a + Math.sin(q) * b, z: z - Math.sin(q) * a + Math.cos(q) * b, r }));
  return v.r ? [{ x, z, r: v.r }] : [];
}
