/* Chạy ở <head> để đặt giao diện sáng/tối trước khi vẽ, tránh nhấp nháy.
   Hỗ trợ ?theme=light|dark trên URL (dùng để chụp ảnh kiểm tra, không lưu lại). */
(function () {
  var theme = 'dark';
  try {
    var q = new URLSearchParams(location.search).get('theme');
    theme = q === 'light' || q === 'dark' ? q : localStorage.getItem('clx-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme);
})();
