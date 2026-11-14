/* Khung dùng chung: sidebar + topbar. Mỗi trang chỉ cần
   <body data-page="dashboard" data-title="Tổng quan"> và một <main class="content" id="content">.
   Icon dùng Lucide (nét 1.5): <i data-lucide="tên"></i>. Sau khi tự vẽ HTML bằng JS, gọi window.clxIcons(). */
(function () {
  var D = window.CLX;
  var page = document.body.dataset.page;
  var title = document.body.dataset.title || '';
  var crumb = document.body.dataset.crumb || '';

  var NAV = [
    ['dashboard', 'dashboard.html', 'layout-dashboard', 'Tổng quan'],
    ['assignments', 'assignments.html', 'flask-conical', 'Bài tập'],
    ['history', 'history.html', 'history', 'Lịch sử'],
    ['leaderboard', 'leaderboard.html', 'trophy', 'Bảng xếp hạng'],
    ['guide', 'guide.html', 'book-open', 'Hướng dẫn'],
    ['chatbot', 'chatbot.html', 'message-square', 'ChatBot'],
  ];

  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  var unread = D.notifications.filter(function (n) { return n.unread; }).length;

  var sidebar = el(
    '<aside class="sidebar" aria-label="Điều hướng chính">' +
      '<a class="brand" href="dashboard.html"><span class="brand-mark"><i data-lucide="terminal" style="width:16px;height:16px;stroke-width:2"></i></span><span class="brand-name">CyberLabX</span></a>' +
      '<nav class="nav">' + NAV.map(function (n) {
        return '<a href="' + n[1] + '"' + (n[0] === page ? ' aria-current="page"' : '') + '><i data-lucide="' + n[2] + '"></i>' + n[3] + '</a>';
      }).join('') + '</nav>' +
      '<div class="sidebar-foot">' +
        '<div class="term-progress"><div class="row"><span>Tiến trình học kỳ</span><span class="tnum">' + D.student.termProgress + '%</span></div><div class="progress"><i style="width:' + D.student.termProgress + '%"></i></div></div>' +
        '<div style="position:relative">' +
          '<button class="user" id="user-btn" aria-haspopup="true" aria-expanded="false"><span class="avatar">' + D.student.initials + '</span><span class="who"><b>' + D.student.name + '</b><span>Sinh viên · Lv.' + D.student.level + '</span></span></button>' +
          '<div class="popover" id="user-menu" hidden style="left:0;bottom:calc(100% + 6px);min-width:100%">' +
            '<a class="item" href="account.html"><i data-lucide="user-round" style="width:16px;height:16px;stroke-width:1.5"></i>Tài khoản của tôi</a>' +
            '<a class="item" href="login.html"><i data-lucide="log-out" style="width:16px;height:16px;stroke-width:1.5"></i>Đăng xuất</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</aside>');

  var topbar = el(
    '<header class="topbar">' +
      '<button class="icon-btn menu-btn" id="menu-btn" aria-label="Mở menu"><i data-lucide="menu"></i></button>' +
      '<div class="page-title">' + (crumb ? '<span class="crumb">' + crumb + ' / </span>' : '') + title + '</div>' +
      '<div class="spacer"></div>' +
      '<div class="actions">' +
        '<button class="icon-btn" id="theme-btn" aria-label="Đổi giao diện sáng/tối"><i data-lucide="sun-moon"></i></button>' +
        '<div style="position:relative">' +
          '<button class="icon-btn" id="bell-btn" aria-label="Thông báo" aria-haspopup="true" aria-expanded="false"><i data-lucide="bell"></i>' + (unread ? '<span class="badge-dot"></span>' : '') + '</button>' +
          '<div class="popover" id="bell-menu" hidden style="right:0;top:calc(100% + 6px);width:360px;max-width:calc(100vw - 32px)">' +
            '<div class="row-between" style="padding:8px 10px 6px"><b style="font-weight:500">Thông báo</b><span class="faint" style="font-size:12px">' + unread + ' chưa đọc</span></div>' +
            D.notifications.map(function (n) {
              return '<div class="item"><span class="dot" style="margin-top:8px;color:' + (n.unread ? 'var(--accent)' : 'transparent') + '"></span><div style="min-width:0"><div style="font-size:13px">' + n.title + '</div><div class="faint" style="font-size:12px;margin-top:2px">' + n.from + ' · ' + n.time + '</div></div></div>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</header>');

  var content = document.getElementById('content');
  var main = el('<div class="main"></div>');
  var app = el('<div class="app"></div>');
  document.body.insertBefore(app, content);
  app.appendChild(sidebar);
  app.appendChild(main);
  main.appendChild(topbar);
  main.appendChild(content);

  if (page !== 'chatbot') {
    document.body.appendChild(el('<a class="fab" href="chatbot.html" aria-label="Mở ChatBot"><i data-lucide="message-square"></i></a>'));
  }

  // Mọi popover đóng qua một hàm duy nhất để hidden và aria-expanded luôn khớp nhau.
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

  // Sidebar dạng ngăn kéo (<= 900px): khi đóng phải inert để Tab không vào các liên kết đang nằm ngoài màn hình.
  var narrow = window.matchMedia('(max-width: 900px)');
  var menuBtn = document.getElementById('menu-btn');
  function syncDrawer() {
    var closed = narrow.matches && !document.body.classList.contains('nav-open');
    sidebar.inert = closed;
    menuBtn.setAttribute('aria-expanded', String(narrow.matches && !closed));
  }
  function closeDrawer(returnFocus) {
    document.body.classList.remove('nav-open');
    syncDrawer();
    if (returnFocus) menuBtn.focus();
  }
  narrow.addEventListener('change', syncDrawer);
  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    document.body.classList.toggle('nav-open');
    syncDrawer();
    if (document.body.classList.contains('nav-open')) { var first = sidebar.querySelector('a'); if (first) first.focus(); }
  });
  content.addEventListener('click', function () { if (document.body.classList.contains('nav-open')) closeDrawer(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openPop = pops.filter(function (p) { return !p.menu.hidden; })[0];
    closeAll(null);
    if (openPop) openPop.btn.focus();
    else if (document.body.classList.contains('nav-open')) closeDrawer(true);
  });
  syncDrawer();

  document.getElementById('theme-btn').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('clx-theme', next); } catch (e) {}
  });

  window.clxIcons = function () { if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } }); };
  window.clxIcons();
})();
