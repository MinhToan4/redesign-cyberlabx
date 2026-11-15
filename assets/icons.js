/* Bộ icon CyberLabX: phong cách an toàn thông tin.
   Lưới 24px, nét 1.75px, đầu nét VUÔNG, góc nhọn (miter); các góc lớn được VÁT 45° đều cả bốn góc (đối xứng).
   Dùng như Lucide: <i data-lucide="tên"></i> rồi gọi window.clxIcons(). Tên chưa có trong bộ này tự lùi về Lucide,
   được vẽ cùng kiểu nét (vuông đầu, góc nhọn) để cả hệ thống đồng nhất.
   Thêm icon: khai báo markup bên trong <svg> (path/polyline, không đặt stroke/fill riêng trừ khi cần tô đặc), thêm alias nếu cần. */
(function () {
  var I = {
    /* Điều hướng */
    'layout-dashboard': '<path d="M4 4h7v7H4z"/><path d="M13 4h7v4h-7z"/><path d="M13 10h7v10h-7z"/><path d="M4 13h7v7H4z"/>',
    'terminal': '<path d="M7 4h10l3 3v10l-3 3H7l-3-3V7z"/><path d="M8 10l3 2.5L8 15"/><path d="M13 15.5h4"/>',
    'log': '<path d="M7 3h10l3 3v12l-3 3H7l-3-3V6z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h4"/>',
    'trophy': '<path d="M7 4h10v7l-3 3h-4l-3-3z"/><path d="M7 6H4v3l3 3"/><path d="M17 6h3v3l-3 3"/><path d="M12 14v4"/><path d="M8 20h8"/>',
    'book': '<path d="M3 5h7l2 2 2-2h7v13h-7l-2 2-2-2H3z"/><path d="M12 7v13"/>',
    'bot': '<path d="M8 8h8l3 3v5l-3 3H8l-3-3v-5z"/><path d="M12 8V4"/><path d="M10 4h4"/><path d="M9 13v1.5"/><path d="M15 13v1.5"/><path d="M3 12v3"/><path d="M21 12v3"/>',
    'user-badge': '<path d="M10 4h4l2 2v3l-2 2h-4L8 9V6z"/><path d="M5 20v-3l3-3h8l3 3v3z"/>',
    'menu': '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    'search': '<path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/><path d="M16 16l5 5"/>',
    'bell': '<path d="M7 17v-6l3-6h4l3 6v6l2 2H5z"/><path d="M10 21h4"/>',
    'contrast': '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/>',
    'log-out': '<path d="M11 4H5v16h6"/><path d="M15 8l4 4-4 4"/><path d="M19 12H9"/>',
    /* Hành động */
    'arrow-right': '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H5"/><path d="M11 6l-6 6 6 6"/>',
    'chevron-right': '<path d="M9 5l7 7-7 7"/>',
    'chevron-left': '<path d="M15 5l-7 7 7 7"/>',
    'chevron-down': '<path d="M5 9l7 7 7-7"/>',
    'chevron-up': '<path d="M5 15l7-7 7 7"/>',
    'chevrons-left': '<path d="M12 6l-6 6 6 6"/><path d="M19 6l-6 6 6 6"/>',
    'chevrons-right': '<path d="M5 6l6 6-6 6"/><path d="M12 6l6 6-6 6"/>',
    'check': '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    'x': '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
    'plus': '<path d="M12 5v14"/><path d="M5 12h14"/>',
    'upload': '<path d="M12 16V5"/><path d="M7 9l5-5 5 5"/><path d="M5 15v5h14v-5"/>',
    'download': '<path d="M12 4v11"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/>',
    'send': '<path d="M21 3L3 10l7 3 3 7z"/><path d="M10 13L21 3"/>',
    'clock': '<path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z"/><path d="M12 7v5l3 3"/>',
    'circle-alert': '<path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z"/><path d="M12 8v5"/><path d="M12 16.5v.5"/>',
    /* Bảo mật */
    'shield': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9.5C7.5 20 4 17 4 12V6z"/>',
    'shield-check': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9.5C7.5 20 4 17 4 12V6z"/><path d="M9 12l2.5 2.5L15.5 9.5"/>',
    'lock': '<path d="M5 11h14v10H5z"/><path d="M8 11V7l2-3h4l2 3v4"/><path d="M12 15v3"/>',
    'key-round': '<path d="M8 4h4l3 3v4l-3 3H8l-3-3V7z"/><path d="M13 13l7 7"/><path d="M18 18l-2 2"/>',
    'radar': '<path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7.5a4.5 4.5 0 1 0 4.5 4.5"/><path d="M12 12l6-6"/>',
    'bug': '<path d="M9 7V5l3-2 3 2v2"/><path d="M7 7h10v8l-2.5 4h-5L7 15z"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M4 19l3-2.5"/><path d="M20 19l-3-2.5"/><path d="M4 5l3 2"/><path d="M20 5l-3 2"/>',
  };
  /* Tên đang dùng trong các trang → icon của bộ này */
  var A = {
    'flask-conical': 'terminal', 'square-terminal': 'terminal', 'terminal-square': 'terminal',
    'history': 'log', 'scroll-text': 'log',
    'book-open': 'book', 'book-key': 'book',
    'user-round': 'user-badge', 'user': 'user-badge', 'fingerprint': 'user-badge',
    'sun-moon': 'contrast',
    'timer': 'clock',
  };

  var ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"';

  /* Thay mọi <i data-lucide="..."> có trong bộ này bằng svg riêng; phần còn lại để Lucide xử lý (cùng kiểu nét). */
  function render(root) {
    var quest = document.documentElement.getAttribute('data-skin') === 'quest';
    (root || document).querySelectorAll('i[data-lucide]').forEach(function (el) {
      if (quest) return; /* skin quest: dùng Lucide gốc */
      var name = el.getAttribute('data-lucide');
      var key = I[name] ? name : A[name];
      if (!key) return;
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.innerHTML = I[key];
      ATTRS.replace(/(\S+)="([^"]*)"/g, function (_, k, v) { svg.setAttribute(k, v); return ''; });
      svg.setAttribute('class', ('lucide lucide-' + name + ' ' + (el.getAttribute('class') || '')).trim());
      if (el.getAttribute('style')) svg.setAttribute('style', el.getAttribute('style'));
      Array.prototype.forEach.call(el.attributes, function (a) {
        if (a.name !== 'data-lucide' && a.name !== 'class' && a.name !== 'style') svg.setAttribute(a.name, a.value);
      });
      el.replaceWith(svg);
    });
    if (window.lucide) window.lucide.createIcons({ attrs: quest ? { 'stroke-width': 1.75 } : { 'stroke-width': 1.75, 'stroke-linecap': 'square', 'stroke-linejoin': 'miter' } });
  }

  window.CLX_ICONS = { set: I, alias: A, render: render };
  window.clxIcons = function () { render(document); };
})();
