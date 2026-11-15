/* Khung dùng chung cho mọi vai trò: sidebar + topbar + bảng lệnh Ctrl K.
   Mỗi trang cần: <body data-role="student|teacher|ta|admin" data-page="<mã mục nav>" data-title="Tên trang" [data-crumb="Mục cha"]>
   và một <main class="content" id="content">. Trang vai trò khác Sinh viên nằm trong thư mục riêng (teacher/, ta/, admin/),
   nên đường dẫn tài nguyên là ../assets/. Icon dùng Lucide: <i data-lucide="tên"></i>; sau khi tự vẽ HTML bằng JS gọi window.clxIcons(). */
(function () {
  var D = window.CLX;
  var body = document.body;
  var role = body.dataset.role || 'student';
  var page = body.dataset.page;
  var title = body.dataset.title || '';
  var crumb = body.dataset.crumb || '';
  var up = role === 'student' ? '' : '../'; // tiền tố để về thư mục gốc (đăng nhập, trang tổng hợp)

  /* ---------- Tiện ích dùng chung cho script của trang ---------- */
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }
  /* Thanh vạch: n bước, done bước đã xong. kind: '' | 'is-ok' | 'is-error' */
  function ticks(n, done, kind) {
    var s = '<div class="ticks ' + (kind || '') + '" role="img" aria-label="' + done + '/' + n + '">';
    for (var i = 0; i < n; i++) s += '<i' + (i < done ? ' class="on"' : '') + '></i>';
    return s + '</div>';
  }
  function verdict(code) { return '<span class="verdict v-' + esc(code) + '">' + esc(code) + '</span>'; }
  
  /* Cắt mảng theo trang (page tính từ 1). */
  function paginate(arr, page, size) { var start = (page - 1) * size; return arr.slice(start, start + size); }

  /* Danh sách số trang có dấu ba chấm: luôn có trang đầu, trang cuối và trang hiện tại ± 1. */
  function pageWindow(page, pages) {
    var out = [], last = 0;
    for (var p = 1; p <= pages; p++) {
      if (p === 1 || p === pages || Math.abs(p - page) <= 1 || (page <= 3 && p <= 4) || (page >= pages - 2 && p >= pages - 3)) {
        if (p - last > 1) out.push('gap');
        out.push(p); last = p;
      }
    }
    return out;
  }

  /* Phân trang chuẩn của CyberLabX. Dùng cho MỌI danh sách nhiều dòng.
     host: phần tử chứa (nên là <div class="pager-host"> đặt ngay dưới bảng, trong cùng .card).
     opts: { total, page = 1, size = 20, sizes = [20, 40, 60], onChange(page, size) }
     Trả về { set({ total, page, size }) } để cập nhật khi dữ liệu hoặc bộ lọc đổi (đổi bộ lọc: gọi set với page: 1).
     total = 0 thì ẩn hẳn thanh phân trang. Trang nào cũng có nhãn truy cập tiếng Việt, dùng được bằng bàn phím. */
  function pager(host, opts) {
    var st = { total: opts.total || 0, page: opts.page || 1, size: opts.size || 20 };
    var sizes = opts.sizes || [20, 40, 60];
    function pages() { return Math.max(1, Math.ceil(st.total / st.size)); }
    function go(p, s) {
      var size = s || st.size;
      var max = Math.max(1, Math.ceil(st.total / size));
      st.size = size; st.page = Math.min(Math.max(1, p), max);
      render();
      if (opts.onChange) opts.onChange(st.page, st.size);
    }
    function btn(label, aria, p, disabled, current, cls) {
      return '<button type="button"' + (cls ? ' class="' + cls + '"' : '') + ' data-p="' + p + '" aria-label="' + esc(aria) + '"' + (disabled ? ' disabled' : '') + (current ? ' aria-current="page"' : '') + '>' + label + '</button>';
    }
    function render() {
      if (!st.total) { host.innerHTML = ''; host.hidden = true; return; }
      host.hidden = false;
      var n = pages(), from = (st.page - 1) * st.size + 1, to = Math.min(st.total, st.page * st.size);
      var chev = function (name) { return '<i data-lucide="' + name + '"></i>'; };
      var nums = pageWindow(st.page, n).map(function (p) {
        return p === 'gap' ? '<span class="gap" aria-hidden="true">…</span>' : btn(p, 'Trang ' + p, p, false, p === st.page);
      }).join('');
      var sizeSel = sizes.length > 1 ? '<label class="size"><span>Số dòng</span><select class="select" aria-label="Số dòng mỗi trang">' + sizes.map(function (s) { return '<option value="' + s + '"' + (s === st.size ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></label>' : '';
      host.innerHTML =
        '<nav class="pager" aria-label="Phân trang">' +
          '<div class="range tnum"><b>' + from + '–' + to + '</b> trên ' + st.total + '</div>' + sizeSel +
          '<div class="pages">' +
            btn(chev('chevrons-left'), 'Trang đầu', 1, st.page === 1, false, 'edge') +
            btn(chev('chevron-left'), 'Trang trước', st.page - 1, st.page === 1) +
            '<span class="nums">' + nums + '</span><span class="now tnum">Trang ' + st.page + '/' + n + '</span>' +
            btn(chev('chevron-right'), 'Trang sau', st.page + 1, st.page === n) +
            btn(chev('chevrons-right'), 'Trang cuối', n, st.page === n, false, 'edge') +
          '</div>' +
        '</nav>';
      if (window.clxIcons) window.clxIcons();
    }
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-p]');
      if (b && !b.disabled) { go(+b.dataset.p); var cur = host.querySelector('button[aria-current="page"]'); if (cur) cur.focus(); }
    });
    host.addEventListener('change', function (e) { if (e.target.matches('select')) go(1, +e.target.value); });
    render();
    return {
      /* Cập nhật tổng/trang/cỡ. Nếu trang bị ép lại vì tổng giảm (ví dụ xóa dòng cuối của trang cuối) thì onChange được gọi
         với trang mới, và giá trị trả về luôn là trạng thái thật { page, size, total } để bên gọi cắt mảng đúng. */
      set: function (n) {
        var before = st.page;
        if (n.total != null) st.total = n.total;
        if (n.page != null) st.page = n.page;
        if (n.size != null) st.size = n.size;
        st.page = Math.max(1, Math.min(st.page, pages()));
        render();
        if (st.page !== before && n.page == null && opts.onChange) opts.onChange(st.page, st.size);
        return { page: st.page, size: st.size, total: st.total };
      },
      get: function () { return { page: st.page, size: st.size, total: st.total }; },
    };
  }

  
  /* Quản lý hộp thoại tự dựng. scrim là phần tử phủ (đang hidden), bên trong có hộp thoại (nên có role="dialog" aria-modal="true" và nhãn).
     const m = CLXUI.modal(scrimEl, { initialFocus: '#ten-o', onClose: function () {} });  m.open();  m.close();
     Tự lo: nền ngoài hộp thoại inert, Tab/Shift+Tab bị giữ trong hộp, Escape đóng, trả focus về phần tử đã mở hộp (nếu còn trong trang). */
  function modal(scrim, o) {
    o = o || {};
    var last = null;
    var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    function items() { return Array.prototype.filter.call(scrim.querySelectorAll(FOCUSABLE), function (e) { return !e.closest('[hidden]') && e.offsetParent !== null; }); }
    function setInert(on) {
      var top = scrim; while (top.parentElement && top.parentElement !== document.body) top = top.parentElement;
      Array.prototype.forEach.call(document.body.children, function (c) { if (c !== top && c.tagName !== 'SCRIPT') c.inert = on; });
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
      if (e.key !== 'Tab') return;
      var list = items(); if (!list.length) { e.preventDefault(); return; }
      var first = list[0], lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    }
    function open() {
      last = document.activeElement;
      scrim.hidden = false; setInert(true);
      scrim.addEventListener('keydown', onKey);
      var target = o.initialFocus ? (typeof o.initialFocus === 'string' ? scrim.querySelector(o.initialFocus) : o.initialFocus) : null;
      (target || items()[0] || scrim).focus();
    }
    function close() {
      if (scrim.hidden) return;
      scrim.hidden = true; setInert(false);
      scrim.removeEventListener('keydown', onKey);
      if (last && document.contains(last) && last.focus) last.focus();
      last = null;
      if (o.onClose) o.onClose();
    }
    scrim.addEventListener('mousedown', function (e) { if (e.target === scrim) close(); });
    return { open: open, close: close, isOpen: function () { return !scrim.hidden; } };
  }

  window.CLXUI = { esc: esc, ticks: ticks, verdict: verdict, paginate: paginate, pager: pager, modal: modal };

  /* ---------- Cấu hình điều hướng theo vai trò ---------- */
  // [mã, tệp, icon, nhãn, sẵn sàng?]. Mục chưa có trong prototype hiện mờ và không bấm được.
  var NAV = {
    student: [
      [null, 'Học tập'],
      ['dashboard', 'dashboard.html', 'layout-dashboard', 'Tổng quan', 1],
      ['assignments', 'assignments.html', 'flask-conical', 'Bài tập', 1],
      ['history', 'history.html', 'history', 'Lịch sử', 1],
      ['leaderboard', 'leaderboard.html', 'trophy', 'Bảng xếp hạng', 1],
      ['guide', 'guide.html', 'book-open', 'Hướng dẫn', 1],
      ['chatbot', 'chatbot.html', 'bot', 'ChatBot', 1],
    ],
    teacher: [
      [null, 'Giảng dạy'],
      ['statistics', 'statistics.html', 'chart-no-axes-column', 'Thống kê', 1],
      ['classes', 'classes.html', 'graduation-cap', 'Lớp học phần', 1],
      ['assignments', 'assignments.html', 'flask-conical', 'Bài tập', 1],
      ['exams', 'exams.html', 'timer', 'Ca thi', 1],
      [null, 'Tương tác'],
      ['qa', 'qa.html', 'messages-square', 'Hỏi đáp 1-1', 1],
      ['comments', 'comments.html', 'message-square', 'Bình luận', 0],
      ['leaderboard', 'leaderboard.html', 'trophy', 'Bảng xếp hạng', 0],
    ],
    ta: [
      [null, 'Trợ giảng'],
      ['statistics', 'statistics.html', 'chart-no-axes-column', 'Thống kê', 1],
      ['classes', 'classes.html', 'graduation-cap', 'Lớp học phần', 1],
      ['assignments', 'assignments.html', 'flask-conical', 'Bài tập', 1],
      ['exams', 'exams.html', 'timer', 'Ca thi', 1],
      [null, 'Tương tác'],
      ['comments', 'comments.html', 'message-square', 'Bình luận', 0],
      ['leaderboard', 'leaderboard.html', 'trophy', 'Bảng xếp hạng', 0],
    ],
    admin: [
      [null, 'Thống kê'],
      ['statistics', 'statistics.html', 'chart-no-axes-column', 'Thống kê hệ thống', 1],
      [null, 'Bài tập'],
      ['assignment-review', 'assignment-review.html', 'clipboard-check', 'Duyệt bài tập', 1],
      ['assignments', 'assignments.html', 'flask-conical', 'Quản lý bài tập', 0],
      [null, 'Người dùng và lớp'],
      ['accounts', 'accounts.html', 'users', 'Tài khoản', 1],
      ['classes', 'classes.html', 'graduation-cap', 'Lớp học phần', 1],
      ['exams', 'exams.html', 'timer', 'Ca thi', 0],
      ['comments', 'comments.html', 'message-square', 'Bình luận', 0],
      ['leaderboard', 'leaderboard.html', 'trophy', 'Bảng xếp hạng', 0],
      [null, 'Vận hành'],
      ['resources', 'resources.html', 'server', 'Giám sát tài nguyên', 1],
      ['audit-logs', 'audit-logs.html', 'scroll-text', 'Nhật ký hoạt động', 1],
      ['backups', 'backups.html', 'database-backup', 'Sao lưu', 0],
      [null, 'Cấu hình'],
      ['config-system', 'config-system.html', 'settings-2', 'Cấu hình hệ thống', 1],
      ['config-catalog', 'config-catalog.html', 'list-tree', 'Môn học, học kỳ, chủ đề', 0],
    ],
  };
  var PROFILE = {
    student: { name: D.student.name, initials: D.student.initials, sub: 'Sinh viên · Lv.' + D.student.level, label: '', home: 'dashboard.html', account: 'account.html' },
    teacher: { name: 'ThS. Nguyễn Văn An', initials: 'NA', sub: 'Giảng viên · Khoa CNTT1', label: 'Giảng viên', home: 'statistics.html', account: '#' },
    ta: { name: 'Đinh Quang Huy', initials: 'QH', sub: 'Trợ giảng · Khoa CNTT1', label: 'Trợ giảng', home: 'statistics.html', account: '#' },
    admin: { name: 'Lương Minh Quân', initials: 'MQ', sub: 'Quản trị hệ thống', label: 'Quản trị', home: 'statistics.html', account: '#' },
  };
  var me = PROFILE[role] || PROFILE.student;
  var nav = NAV[role] || NAV.student;

  var notes = (D.notificationsByRole && D.notificationsByRole[role]) || D.notifications;
  var unread = notes.filter(function (n) { return n.unread; }).length;

  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  /* Dấu hiệu nhận diện: ô vuông đặc, chữ X tạo bởi hai nét, một chấm nhấn ở góc */
  var MARK = '<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M8 0h20v20l-8 8H0V8z" fill="var(--accent)"/><path d="M10 10l8 8M18 10l-8 8" stroke="var(--accent-ink)" stroke-width="2.4" stroke-linecap="square" fill="none"/></svg>';

  var navHtml = nav.map(function (n) {
    if (n[0] === null) return '<div class="nav-label">' + esc(n[1]) + '</div>';
    var current = n[0] === page ? ' aria-current="page"' : '';
    var icon = '<i data-lucide="' + n[2] + '"></i>';
    if (!n[4]) return '<span class="nav-off" aria-disabled="true" title="Chưa có trong bản prototype">' + icon + esc(n[3]) + '</span>';
    return '<a href="' + n[1] + '"' + current + '>' + icon + esc(n[3]) + '</a>';
  }).join('');

  var foot = role === 'student'
    ? '<div class="term-progress"><div class="row"><span>Tiến trình học kỳ</span><span class="tnum">' + D.student.termProgress + '%</span></div><div class="progress"><i style="width:' + D.student.termProgress + '%"></i></div></div>'
    : '<div class="term-progress"><div class="row"><span>Học kỳ hiện tại</span></div><div style="font-size:13px">Học kỳ 1 (2026-2027)</div></div>';

  var sidebar = el(
    '<aside class="sidebar" aria-label="Điều hướng chính">' +
      '<a class="brand" href="' + me.home + '"><span class="brand-mark">' + MARK + '</span><span class="brand-name">CyberLabX</span></a>' +
      '<div class="role-tag">' + esc(me.label || 'Sinh viên') + '</div>' +
      '<nav class="nav">' + navHtml + '</nav>' +
      '<div class="sidebar-foot">' + foot +
        '<div style="position:relative">' +
          '<button class="user" id="user-btn" aria-haspopup="true" aria-expanded="false"><span class="avatar">' + esc(me.initials) + '</span><span class="who"><b>' + esc(me.name) + '</b><span>' + esc(me.sub) + '</span></span></button>' +
          '<div class="popover" id="user-menu" hidden style="left:0;bottom:calc(100% + 6px);min-width:100%">' +
            '<a class="item" href="' + me.account + '"><i data-lucide="user-round"></i>Tài khoản của tôi</a>' +
            '<a class="item" href="' + up + 'index.html"><i data-lucide="layout-grid"></i>Đổi vai trò (xem thiết kế)</a>' +
            '<a class="item" href="' + up + 'login.html"><i data-lucide="log-out"></i>Đăng xuất</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</aside>');

  var topbar = el(
    '<header class="topbar">' +
      '<button class="icon-btn menu-btn" id="menu-btn" aria-label="Mở menu"><i data-lucide="menu"></i></button>' +
      '<div class="page-title">' + (crumb ? '<span class="crumb">' + esc(crumb) + ' / </span>' : '') + esc(title) + '</div>' +
      '<div class="spacer"></div>' +
      '<div class="actions">' +
        '<button class="search-btn" id="cmdk-btn" aria-label="Tìm kiếm"><i data-lucide="search"></i><span>Tìm kiếm</span><kbd class="kbd">Ctrl</kbd><kbd class="kbd">K</kbd></button>' +
        '<button class="icon-btn" id="theme-btn" aria-label="Đổi giao diện sáng/tối"><i data-lucide="sun-moon"></i></button>' +
        '<div style="position:relative">' +
          '<button class="icon-btn" id="bell-btn" aria-label="Thông báo" aria-haspopup="true" aria-expanded="false"><i data-lucide="bell"></i>' + (unread ? '<span class="badge-dot"></span>' : '') + '</button>' +
          '<div class="popover" id="bell-menu" hidden style="right:0;top:calc(100% + 6px);width:360px;max-width:calc(100vw - 32px)">' +
            '<div class="row-between" style="padding:8px 10px 6px"><b style="font-weight:500">Thông báo</b><span class="faint" style="font-size:12px">' + unread + ' chưa đọc</span></div>' +
            notes.map(function (n) {
              return '<div class="item"><span class="dot" style="margin-top:8px;color:' + (n.unread ? 'var(--accent)' : 'transparent') + '"></span><div style="min-width:0"><div style="font-size:13px">' + esc(n.title) + '</div><div class="faint" style="font-size:12px;margin-top:2px">' + esc(n.from) + ' · ' + esc(n.time) + '</div></div></div>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</header>');

  var content = document.getElementById('content');
  var main = el('<div class="main"></div>');
  var app = el('<div class="app"></div>');
  body.insertBefore(app, content);
  app.appendChild(sidebar);
  app.appendChild(main);
  main.appendChild(topbar);
  main.appendChild(content);

  if (role === 'student' && page !== 'chatbot') {
    body.appendChild(el('<a class="fab" href="chatbot.html" aria-label="Mở ChatBot"><i data-lucide="bot"></i></a>'));
  }

  /* ---------- Popover ---------- */
  var pops = [];
  function closeAll(except) {
    pops.forEach(function (p) { if (p.menu !== except) { p.menu.hidden = true; p.btn.setAttribute('aria-expanded', 'false'); } });
  }
  function toggle(btn, menu) {
    pops.push({ btn: btn, menu: menu });
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      closeAll(open ? menu : null);
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
  }
  toggle(document.getElementById('user-btn'), document.getElementById('user-menu'));
  toggle(document.getElementById('bell-btn'), document.getElementById('bell-menu'));
  document.addEventListener('click', function (e) { if (!e.target.closest('.popover')) closeAll(null); });

  /* ---------- Ngăn kéo sidebar trên màn hẹp ---------- */
  var narrow = window.matchMedia('(max-width: 900px)');
  var menuBtn = document.getElementById('menu-btn');
  function syncDrawer() {
    var closed = narrow.matches && !body.classList.contains('nav-open');
    sidebar.inert = closed;
    menuBtn.setAttribute('aria-expanded', String(narrow.matches && !closed));
  }
  function closeDrawer(returnFocus) { body.classList.remove('nav-open'); syncDrawer(); if (returnFocus) menuBtn.focus(); }
  narrow.addEventListener('change', syncDrawer);
  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    body.classList.toggle('nav-open');
    syncDrawer();
    if (body.classList.contains('nav-open')) { var first = sidebar.querySelector('a[href]:not([aria-disabled])'); if (first) first.focus(); }
  });
  content.addEventListener('click', function () { if (body.classList.contains('nav-open')) closeDrawer(false); });
  syncDrawer();

  /* ---------- Giao diện sáng/tối ---------- */
  document.getElementById('theme-btn').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('clx-theme', next); } catch (e) {}
  });

  /* ---------- Bảng lệnh Ctrl K ---------- */
  // Nguồn: các mục nav của vai trò + window.CLX_SEARCH (trang/ file dữ liệu bổ sung: { group, label, hint, href }).
  var items = [];
  nav.forEach(function (n) { if (n[0] !== null && n[4]) items.push({ group: 'Trang', label: n[3], hint: '', href: n[1] }); });
  if (role === 'student') {
    D.classes.forEach(function (c) {
      items.push({ group: 'Lớp học phần', label: c.name, hint: c.code, href: 'assignments.html?class=' + encodeURIComponent(c.code) });
      c.assignments.forEach(function (a) { items.push({ group: 'Bài tập', label: a.title, hint: a.code, href: 'assignments.html?class=' + encodeURIComponent(c.code) + '&code=' + encodeURIComponent(a.code) }); });
    });
    items.push({ group: 'Trang', label: 'Tài khoản của tôi', hint: '', href: 'account.html' });
  }
  var shared = window.CLX_SEARCH || [];
  items = items.concat(shared.filter(function (s) { return !s.role || s.role === role; }));

  var scrim = el('<div class="cmdk-scrim" hidden><div class="cmdk" role="dialog" aria-modal="true" aria-label="Tìm kiếm"><input id="cmdk-input" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list" placeholder="Tìm trang, bài tập, lớp" autocomplete="off" aria-label="Từ khóa"><ul id="cmdk-list" role="listbox" aria-label="Kết quả"></ul></div></div>');
  body.appendChild(scrim);
  var input = scrim.querySelector('input');
  var list = scrim.querySelector('ul');
  var shown = [];
  var sel = 0;
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
  function renderCmdk() {
    var q = norm(input.value.trim());
    shown = items.filter(function (it) { return !q || norm(it.label + ' ' + it.hint).indexOf(q) !== -1; }).slice(0, 30);
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    if (!shown.length) { list.innerHTML = '<li class="none">Không có kết quả cho "' + esc(input.value) + '"</li>'; return; }
    var html = '', last = '';
    shown.forEach(function (it, i) {
      if (it.group !== last) { html += '<li class="group">' + esc(it.group) + '</li>'; last = it.group; }
      html += '<li role="option" id="cmdk-o' + i + '" aria-selected="' + (i === sel) + '"><a href="' + esc(it.href) + '" tabindex="-1" data-i="' + i + '" aria-selected="' + (i === sel) + '"><span class="trunc">' + esc(it.label) + '</span><span class="hint mono">' + esc(it.hint) + '</span></a></li>';
    });
    list.innerHTML = html;
    input.setAttribute('aria-activedescendant', 'cmdk-o' + sel);
    var cur = list.querySelector('a[aria-selected="true"]');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  }
  var lastFocus = null;
  // Phần nền ngoài hộp thoại bị inert khi bảng lệnh mở: Tab không thoát ra ngoài.
  function setBackdropInert(on) { Array.prototype.forEach.call(body.children, function (c) { if (c !== scrim) c.inert = on; }); }
  function openCmdk() { closeAll(null); lastFocus = document.activeElement; scrim.hidden = false; setBackdropInert(true); input.value = ''; sel = 0; renderCmdk(); input.focus(); }
  function closeCmdk() { scrim.hidden = true; setBackdropInert(false); if (lastFocus && lastFocus.focus) lastFocus.focus(); lastFocus = null; }
  document.getElementById('cmdk-btn').addEventListener('click', function (e) { e.stopPropagation(); openCmdk(); });
  scrim.addEventListener('mousedown', function (e) { if (e.target === scrim) closeCmdk(); });
  input.addEventListener('input', function () { sel = 0; renderCmdk(); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') { e.preventDefault(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); renderCmdk(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); renderCmdk(); }
    else if (e.key === 'Enter' && shown[sel]) { e.preventDefault(); location.href = shown[sel].href; }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); scrim.hidden ? openCmdk() : closeCmdk(); return; }
    if (e.key !== 'Escape') return;
    if (!scrim.hidden) { closeCmdk(); return; }
    var openPop = pops.filter(function (p) { return !p.menu.hidden; })[0];
    closeAll(null);
    if (openPop) openPop.btn.focus();
    else if (body.classList.contains('nav-open')) closeDrawer(true);
  });

  if (!window.CLX_ICONS) window.clxIcons = function () { if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.75, 'stroke-linecap': 'square', 'stroke-linejoin': 'miter' } }); };
  window.clxIcons();
})();
