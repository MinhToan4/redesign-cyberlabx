// Sinh trang Trợ giảng (ta/) từ trang Giảng viên (teacher/).
// Trợ giảng dùng chung bộ màn hình với Giảng viên; khác biệt quyền được xử lý trong từng trang qua document.body.dataset.role.
// Dùng: node tools/build-ta.js   (ghi đè các file trong ta/; KHÔNG sửa tay các file đó, hãy sửa bản teacher/ rồi chạy lại)
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const PAGES = ['statistics', 'classes', 'class-detail', 'assignments', 'exams', 'exam-monitor']; // không có qa: Trợ giảng không có Hỏi đáp 1-1
const BANNER = '<!-- Tệp được sinh bởi tools/build-ta.js từ teacher/%s.html. Không sửa tay: sửa bản teacher/ rồi chạy lại. -->\n';

fs.mkdirSync(path.join(root, 'ta'), { recursive: true });
let n = 0;
for (const page of PAGES) {
  const src = fs.readFileSync(path.join(root, 'teacher', page + '.html'), 'utf8');
  if (!/data-role="teacher"/.test(src)) throw new Error('teacher/' + page + '.html thiếu data-role="teacher"');
  const out = src
    .replace('data-role="teacher"', 'data-role="ta"')
    .replace(/^(<!doctype html>\s*)/i, '$1' + BANNER.replace('%s', page));
  fs.writeFileSync(path.join(root, 'ta', page + '.html'), out);
  n++;
}
console.log('Đã sinh ' + n + ' trang Trợ giảng trong ta/.');
