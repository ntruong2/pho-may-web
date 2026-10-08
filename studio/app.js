// Phố Mây Studio (Q366): trang tĩnh, dữ liệu gói lúc dựng (tools/studio/dung-studio.mjs), sửa xong tải tệp gửi Claude ghép.
import { $, luu, taiManifest } from './chung.js';
import { taoDungMap } from './dung-map.js';
import { taoThuVien } from './thu-vien.js';

const M = await taiManifest();
const map = taoDungMap($('#map'), M);
let tv = null;
function moTab(t) {
  document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('chon', b.dataset.tab === t));
  document.querySelectorAll('.trang').forEach((p) => { p.hidden = p.id !== t; });
  if (t === 'thu-vien' && !tv) tv = taoThuVien($('#thu-vien'), M);
  if (t === 'map') map.ve();
}
document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => moTab(b.dataset.tab)));
const [tab, arg] = location.hash.slice(1).split('/');
const khu = (tab === 'map' && arg) || luu.get('khu') || 'quang-truong';
await map.moKhu(M.khu.some((k) => k.id === khu) ? khu : 'quang-truong');
if (tab === 'thu-vien') { moTab('thu-vien'); if (arg && M.modelMap[arg]) tv.mo(arg); }
$('#cho').remove();
if (M.lech?.length) $('.dau').append(Object.assign(document.createElement('span'), { className: 'nho', textContent: `⚠ data/khu khác bản game: ${M.lech.join(', ')} (Studio dùng bản game)` }));
$('.logo').title = `Dữ liệu: ${M.nguon || 'data/'} · gói lúc ${M.dung}`;
window.__studioApp = { map, M, moTab, tv: () => tv };
