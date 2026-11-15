/* Chạy ở <head> để đặt giao diện sáng/tối trước khi vẽ, tránh nhấp nháy.
   Hỗ trợ ?theme=light|dark trên URL (dùng để chụp ảnh kiểm tra, không lưu lại). Giá trị lưu không hợp lệ bị bỏ qua. */
(function () {
  var ok = function (v) { return v === 'light' || v === 'dark' ? v : null; };
  var theme = 'dark';
  try {
    theme = ok(new URLSearchParams(location.search).get('theme')) || ok(localStorage.getItem('clx-theme')) || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme);
})();
