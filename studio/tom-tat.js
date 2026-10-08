// Tóm tắt thay đổi một khu (bản gốc A → bản mới B), dùng trong Studio và tools/studio/ghep.mjs.
export function tomTatKhu(id, A, B, L = []) {
    const dong = [`Phố Mây Studio · thay đổi khu ${id} (${B.ten || ''}) · ${new Date().toLocaleString('vi-VN')}`, `Tệp đích: data/khu/${id}.json`, ''];
    const tenMuc = (o, i) => (o && typeof o === 'object' && !Array.isArray(o) ? o.id || o.ten || `#${i}` : `#${i}`);
    const keys = new Set([...Object.keys(A), ...Object.keys(B)]);
    for (const k of keys) {
      const a = A[k], b = B[k]; if (JSON.stringify(a) === JSON.stringify(b)) continue;
      if (Array.isArray(a) && Array.isArray(b) && [...a, ...b].every((o) => o && typeof o === 'object' && !Array.isArray(o) && (o.id || o.ten))) {
        const key = (o) => o.id || o.ten, ma = new Map(a.map((o) => [key(o), o])), mb = new Map(b.map((o) => [key(o), o]));
        for (const [id, o] of mb) { if (!ma.has(id)) dong.push(`+ ${k}: thêm “${id}” ${JSON.stringify(o)}`); else if (JSON.stringify(ma.get(id)) !== JSON.stringify(o)) { const oa = ma.get(id); const tr = [...new Set([...Object.keys(oa), ...Object.keys(o)])].filter((f) => JSON.stringify(oa[f]) !== JSON.stringify(o[f])).map((f) => `${f}: ${JSON.stringify(oa[f])} → ${JSON.stringify(o[f])}`); dong.push(`~ ${k}: “${id}” ${tr.join('; ')}`); } }
        for (const id of ma.keys()) if (!mb.has(id)) dong.push(`- ${k}: xoá “${id}”`);
      } else if (Array.isArray(a) && Array.isArray(b)) {
        const n = Math.max(a.length, b.length); for (let i = 0; i < n; i++) if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) dong.push(`${a[i] === undefined ? '+' : b[i] === undefined ? '-' : '~'} ${k}[${i}] ${tenMuc(a[i] || b[i], i)}: ${JSON.stringify(a[i]) ?? '—'} → ${JSON.stringify(b[i]) ?? '—'}`);
      } else if (a && b && typeof a === 'object' && typeof b === 'object') {
        for (const f of new Set([...Object.keys(a), ...Object.keys(b)])) if (JSON.stringify(a[f]) !== JSON.stringify(b[f])) dong.push(`~ ${k}.${f}: ${JSON.stringify(a[f]) ?? '—'} → ${JSON.stringify(b[f]) ?? '—'}`);
      } else dong.push(`~ ${k}: ${JSON.stringify(a) ?? '—'} → ${JSON.stringify(b) ?? '—'}`);
    }
    if (dong.length === 3) dong.push('(không có thay đổi)');
    dong.push('', `Kiểm tra cỡ: ${L.length} chỗ sai chuẩn.`, ...L.map((l) => `  ! ${l.id} · ${l.nhom}: ${l.doDo} ${String(Math.round(l.val * 100) / 100).replace('.', ',')} m (chuẩn ${l.min}–${l.max})`));
    return dong.join('\n') + '\n';
  }
