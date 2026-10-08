// Ghi JSON giữ đúng dạng tệp gốc (Q367): phần không đổi chép nguyên văn từ tệp gốc (cả dấu cách, xuống dòng giữa các phần tử);
// phần đổi ghi lại đúng chỗ đó, phần mới theo kiểu một dòng của tệp khu ([1, 2], { "a": 1 }). Dùng khi tải JSON khu và trong tools/studio/ghep.mjs.
function phanTich(s) {   // → nút { v, a, b, k: 'o'|'a'|'s', con: [{ ka, key, n }] }
  let i = 0;
  const ws = () => { while (i < s.length && /\s/.test(s[i])) i++; };
  const gt = () => {
    ws(); const a = i, c = s[i];
    if (c === '{' || c === '[') {
      const obj = c === '{', dong = obj ? '}' : ']', con = [], v = obj ? {} : []; i++; ws();
      if (s[i] === dong) { i++; return { v, a, b: i, k: obj ? 'o' : 'a', con }; }
      for (;;) {
        ws(); const ka = i; let key = null;
        if (obj) { key = gt().v; ws(); i++; }
        const n = gt(); con.push({ ka, key, n }); if (obj) v[key] = n.v; else v.push(n.v);
        ws(); if (s[i] === ',') { i++; continue; } i++; break;
      }
      return { v, a, b: i, k: obj ? 'o' : 'a', con };
    }
    if (c === '"') { i++; while (s[i] !== '"') { if (s[i] === '\\') i++; i++; } i++; return { v: JSON.parse(s.slice(a, i)), a, b: i, k: 's' }; }
    while (i < s.length && /[-+0-9.eEtruefalsn]/.test(s[i])) i++;
    return { v: JSON.parse(s.slice(a, i)), a, b: i, k: 's' };
  };
  return gt();
}
const giong = (x, y) => JSON.stringify(x) === JSON.stringify(y);
const laObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
export function motDong(v) {
  if (Array.isArray(v)) return '[' + v.map(motDong).join(', ') + ']';
  if (laObj(v)) { const t = Object.entries(v).map(([k, x]) => JSON.stringify(k) + ': ' + motDong(x)).join(', '); return t ? '{ ' + t + ' }' : '{}'; }
  return JSON.stringify(v);
}
function moi(v, ind) {   // giá trị mới không có mẫu: một dòng nếu ngắn, không thì mỗi phần tử một dòng
  const m = motDong(v); if (m.length + ind.length <= 150 || v === null || typeof v !== 'object') return m;
  const n = ind + '  ';
  if (Array.isArray(v)) return '[\n' + v.map((x) => n + moi(x, n)).join(',\n') + '\n' + ind + ']';
  return '{\n' + Object.entries(v).map(([k, x]) => n + JSON.stringify(k) + ': ' + moi(x, n)).join(',\n') + '\n' + ind + '}';
}
const thutLe = (s, p) => s.slice(s.lastIndexOf('\n', p - 1) + 1, p).match(/^\s*/)[0];

function ghi(v, n, s) {
  if (giong(v, n.v)) return s.slice(n.a, n.b);
  const ind = thutLe(s, n.a);
  if (!((Array.isArray(v) && n.k === 'a') || (laObj(v) && n.k === 'o')) || !n.con.length) return moi(v, ind);
  const obj = n.k === 'o';
  // ghép phần tử mới với phần tử gốc: đối tượng theo khoá, mảng đối tượng có id theo id, còn lại theo chỉ số
  const theoId = !obj && n.con.every((c) => laObj(c.n.v) && c.n.v.id != null) && v.every((x) => laObj(x) && x.id != null);
  const goc = obj ? new Map(n.con.map((c, j) => [c.key, j])) : theoId ? new Map(n.con.map((c, j) => [c.n.v.id, j])) : null;
  const ds = obj ? Object.entries(v) : v.map((x, j) => [j, x]);
  const sepGoc = (j) => s.slice(n.con[j].n.b, n.con[j + 1].ka);
  const sepMacDinh = n.con.length > 1 ? sepGoc(0) : (/\n/.test(s.slice(n.a, n.b)) ? ',\n' + thutLe(s, n.con[0].ka) : ', ');
  const indCon = thutLe(s, n.con[0].ka);
  let out = s.slice(n.a, n.con[0].ka), truoc = -2;
  ds.forEach(([k, x], j) => {
    const jg = obj ? goc.get(k) : theoId ? goc.get(x.id) : (k < n.con.length ? k : undefined);
    if (j > 0) out += jg !== undefined && truoc >= 0 && jg === truoc + 1 ? sepGoc(truoc) : sepMacDinh;
    if (jg !== undefined) { const c = n.con[jg]; out += s.slice(c.ka, c.n.a) + ghi(x, c.n, s); }
    else out += (obj ? JSON.stringify(k) + ': ' : '') + moi(x, indCon);
    truoc = jg ?? -2;
  });
  const cuoi = n.con[n.con.length - 1];
  return out + s.slice(cuoi.n.b, n.b);
}

// v: giá trị mới; goc: văn bản tệp gốc (rỗng thì ghi thụt 2)
export function ghiGon(v, goc) {
  if (!goc) return JSON.stringify(v, null, 2) + '\n';
  const n = phanTich(goc);
  return goc.slice(0, n.a) + ghi(v, n, goc) + goc.slice(n.b);
}
