// Kiểm tra tĩnh các trang prototype: cú pháp JS nội tuyến, mẫu bị cấm, đường dẫn tài nguyên, tiêu đề lặp.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const pages = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
  if (e.name.startsWith('.') || e.name === '_audit' || e.name === 'node_modules' || e.name === 'skills' || e.name === 'huong-dan-chay' || e.name === 'tools' || e.name === 'assets') continue;
  const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) pages.push(p); } })(root);

const rules = [
  ['hex/rgb trong trang', /#[0-9a-fA-F]{3,8}\b(?![^<]*<\/title)|rgba?\(|hsla?\(/g, (m, ctx) => !/var\(--scrim\)|class="mono">#/.test(ctx)],
  ['gradient', /linear-gradient|radial-gradient|conic-gradient/g],
  ['box-shadow có blur / glow', /box-shadow:\s*([^;}"]*)/g, (m) => /^box-shadow:\s*(none|0 0 0 1px [^,]*|inset 0 0 0 1px [^,]*|var\(--shadow-pop\)|0 0 0 3px var\(--accent-soft\))\s*$/.test(m.trim()) === false],
  ['backdrop/filter/text-shadow', /backdrop-filter|drop-shadow|text-shadow|filter:\s*blur/g],
  ['transition: all', /transition:\s*all/g],
  ['font-weight >= 700', /font-weight:\s*(700|800|900|bold)/g],
  ['italic', /font-style:\s*italic/g],
  ['uppercase', /text-transform:\s*uppercase/g],
  ['dấu chấm than trong chữ', />[^<>{}]*[A-Za-zÀ-ỹ]!(?:\s|<)/g],
  ['emoji', /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu],
  ['<table> hiển thị (bảng sr-only cho biểu đồ thì được)', /<table[\s>]/g, (m, ctx) => !/sr-only/.test(ctx)],
  ['animate width/height', /transition:[^;]*\b(width|height|top|left)\b/g],
  ['Inter/JetBrains', /Inter\b|JetBrains/g],
  ['nạp font/icon từ CDN (dùng assets/vendor để khỏi nhấp nháy)', /fonts\.googleapis\.com|fonts\.gstatic\.com|unpkg\.com/g],
  ['thiếu theme.js trong <head> (chống nhấp nháy)', /^(?![\s\S]*assets\/theme\.js)[\s\S]*$/g],
];
let bad = 0;
for (const f of pages) {
  const rel = path.relative(root, f).replace(/\\/g, '/');
  const src = fs.readFileSync(f, 'utf8');
  const out = [];
  // 1) cú pháp script nội tuyến
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g; let m;
  while ((m = re.exec(src))) { try { new vm.Script(m[1]); } catch (e) { out.push('JS lỗi cú pháp: ' + e.message); } }
  // 2) mẫu bị cấm (chỉ trong phần style + script + html, bỏ qua title)
  for (const [name, rx, ok] of rules) {
    const hits = [...src.matchAll(rx)].filter((h) => !ok || ok(h[0], src.slice(Math.max(0, h.index - 30), h.index + 60)));
    if (hits.length) out.push(name + ' x' + hits.length + ' (vd: ' + hits[0][0].trim().slice(0, 50) + ')');
  }
  // 3) tài nguyên và thuộc tính bắt buộc
  const sub = rel.includes('/');
  const need = sub ? '../assets/' : 'assets/';
  if (!/index\.html$|login\.html$/.test(rel) || rel === 'login.html') { /* login/index tự đứng */ }
  if (!/login\.html$|^index\.html$/.test(rel)) {
    if (!src.includes(need + 'shell.js')) out.push('thiếu ' + need + 'shell.js');
    if (!/data-page="/.test(src)) out.push('thiếu data-page');
    if (!/data-title="/.test(src)) out.push('thiếu data-title');
    const role = (src.match(/data-role="(\w+)"/) || [])[1];
    const want = rel.startsWith('teacher/') ? 'teacher' : rel.startsWith('ta/') ? 'ta' : rel.startsWith('admin/') ? 'admin' : null;
    if (want && role !== want) out.push('data-role=' + role + ' nhưng thư mục là ' + want);
    if (sub && /(?:src|href)="assets\//.test(src)) out.push('đường dẫn assets/ thiếu ../');
  }
  if (!/<html lang="vi"/.test(src)) out.push('thiếu lang="vi"');
  if (!/<meta name="viewport"/.test(src)) out.push('thiếu viewport');
  // 4) tiêu đề lớn lặp tên trang
  const title = (src.match(/data-title="([^"]*)"/) || [])[1];
  if (title && new RegExp('<h1[^>]*>\\s*' + title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*</h1>').test(src)) out.push('h1 lặp tiêu đề topbar');
  if (out.length) { bad++; console.log('\n' + rel + '\n  - ' + out.join('\n  - ')); }
}
console.log('\n' + pages.length + ' trang, ' + bad + ' trang có vấn đề');
process.exit(bad ? 1 : 0);
