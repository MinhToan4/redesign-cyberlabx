/* Chạy ở <head> để đặt giao diện sáng/tối và bộ giao diện (skin) trước khi vẽ, tránh nhấp nháy.
   Hỗ trợ ?theme=light|dark trên URL (dùng để chụp ảnh kiểm tra, không lưu lại). Giá trị lưu không hợp lệ bị bỏ qua.
   Trang Sinh viên (thư mục gốc, trừ index.html) dùng skin "quest" (assets/skin-quest.css); các vai trò khác dùng skin mặc định. */
(function () {
  var ok = function (v) { return v === 'light' || v === 'dark' ? v : null; };
  var theme = 'dark';
  try {
    theme = ok(new URLSearchParams(location.search).get('theme')) || ok(localStorage.getItem('clx-theme')) || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  } catch (e) {}
  var root = document.documentElement;
  root.setAttribute('data-theme', theme);
  var path = location.pathname.replace(/\\/g, '/');
  var staff = /\/(teacher|ta|admin|tools|huong-dan-chay)\//.test(path);
  var hub = /\/index\.html$/.test(path) || /\/$/.test(path);
  if (!staff && !hub) root.setAttribute('data-skin', 'quest');
})();
