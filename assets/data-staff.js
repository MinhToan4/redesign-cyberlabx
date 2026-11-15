/* Dữ liệu mẫu CHUNG cho Giảng viên, Trợ giảng, Admin. Nạp sau data.js:
   <script src="../assets/data.js"></script><script src="../assets/data-staff.js"></script>
   Gắn vào window.CLX_STAFF. Sinh từ hạt giống cố định nên mỗi lần mở đều giống nhau, và các con số khớp nhau
   (sĩ số = số dòng danh sách, số SV dưới ngưỡng = số dòng risk, tổng theo giờ/ngày tính từ chuỗi gốc).
   Cần thêm dữ liệu riêng cho một trang thì tạo file assets/data-<trang>.js, KHÔNG sửa file này. */
(function () {
  var seed = 11;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function int(a, b) { return a + Math.floor(rnd() * (b - a + 1)); }
  var pad = function (n, w) { return String(n).padStart(w || 2, '0'); };
  var sum = function (a) { return a.reduce(function (x, y) { return x + y; }, 0); };

  var D = window.CLX;
  var teachers = [
    { id: 'gv01', name: 'ThS. Nguyễn Văn An', initials: 'NA' },
    { id: 'gv02', name: 'TS. Trần Thị Bích', initials: 'TB' },
    { id: 'gv03', name: 'PGS.TS. Lê Hoàng Cường', initials: 'LC' },
  ];
  var assistants = [
    { id: 'ta01', name: 'Đinh Quang Huy' }, { id: 'ta02', name: 'Phan Khánh Linh' }, { id: 'ta03', name: 'Lương Quốc Bảo' },
    { id: 'ta04', name: 'Hoàng Gia Huy' }, { id: 'ta05', name: 'Đinh Thảo Vy' }, { id: 'ta06', name: 'Tạ Hoàng Long' },
  ];

  /* Sinh viên lớp INT1449.01: 58 người đúng bằng sĩ số. 30 tên đầu lấy từ bảng xếp hạng của Sinh viên, phần sau ghép từ họ + đệm + tên. */
  var head = D.leaderboard.map(function (s) { return s.name; });
  var extra = ['Vũ Hải Đăng', 'Nguyễn Thùy Dương', 'Trịnh Công Sơn', 'Bùi Ngọc Anh', 'Lê Quang Vinh', 'Hồ Thị Mai', 'Đặng Tuấn Kiệt', 'Phạm Gia Bảo', 'Võ Thanh Tùng', 'Mai Phương Thảo', 'Cao Minh Đức', 'Dương Khánh Vân', 'Lâm Quốc Huy', 'Ngô Đức Thịnh', 'Phan Thị Lan', 'Đoàn Văn Hậu', 'Chu Bảo Trâm'];
  var ho = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Vũ', 'Đỗ', 'Bùi', 'Đặng'], dem = ['Văn', 'Thị', 'Minh', 'Quốc', 'Ngọc', 'Hữu', 'Thanh', 'Gia'], ten = ['Sơn', 'Hạnh', 'Phong', 'Nhi', 'Thành', 'Yến', 'Hiếu', 'Trang', 'Dũng', 'Châu', 'Khải', 'Uyên', 'Tâm', 'Giang', 'Hùng', 'Oanh', 'Lộc', 'Hiền', 'Nam', 'Ly'];
  var names = head.concat(extra);
  for (var k = 0; names.length < 58; k++) names.push(ho[k % ho.length] + ' ' + dem[(k * 3) % dem.length] + ' ' + ten[k % ten.length]);
  var CLASS_RISK = 9;
  var roster = names.map(function (name, i) {
    var risk = i >= names.length - CLASS_RISK;
    var progress = risk ? 24 - (i - (names.length - CLASS_RISK)) - int(0, 2) : 88 - Math.floor(i * 1.3) - int(0, 3);
    var solved = Math.round(progress * 0.36);
    return {
      name: name, account: name === 'Vũ Trung Đức' ? 'B23DCCN135' : 'B23DCAT' + pad(i + 1, 3), classCode: 'INT1449.01',
      progress: progress, solved: solved, tried: solved + int(2, 12),
      lastSeen: risk ? int(9, 30) + ' ngày trước' : int(0, 6) + ' ngày trước', risk: risk,
    };
  });

  /* Lớp học phần của học kỳ hiện tại. progress = % bài đúng trung bình; atRisk = SV dưới ngưỡng tiến độ (threshold, %). */
  var classes = [
    { code: 'INT1449.01', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', teacher: 'gv01', assistants: ['ta01', 'ta02'], students: roster.length, capacity: 60, progress: Math.round(sum(roster.map(function (s) { return s.progress; })) / roster.length), atRisk: CLASS_RISK, submissions7d: 312, threshold: 25, status: 'active' },
    { code: 'INT1449.02', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 02', teacher: 'gv01', assistants: ['ta01'], students: 54, capacity: 60, progress: 36, atRisk: 12, submissions7d: 241, threshold: 25, status: 'active' },
    { code: 'WEB3021.01', course: 'WEB3021', name: 'Kiểm thử xâm nhập', group: 'Nhóm 01', teacher: 'gv02', assistants: ['ta03'], students: 49, capacity: 50, progress: 52, atRisk: 4, submissions7d: 405, threshold: 30, status: 'active' },
    { code: 'WEB3021.02', course: 'WEB3021', name: 'Kiểm thử xâm nhập', group: 'Nhóm 02', teacher: 'gv02', assistants: ['ta03', 'ta04'], students: 51, capacity: 55, progress: 47, atRisk: 6, submissions7d: 366, threshold: 30, status: 'active' },
    { code: 'CRY2010.01', course: 'CRY2010', name: 'Mật mã học ứng dụng', group: 'Nhóm 01', teacher: 'gv03', assistants: ['ta05'], students: 44, capacity: 50, progress: 29, atRisk: 14, submissions7d: 158, threshold: 20, status: 'active' },
    { code: 'CRY2010.02', course: 'CRY2010', name: 'Mật mã học ứng dụng', group: 'Nhóm 02', teacher: 'gv03', assistants: ['ta05', 'ta06'], students: 46, capacity: 50, progress: 33, atRisk: 10, submissions7d: 174, threshold: 20, status: 'active' },
  ];

  var exams = [
    { code: 'EX-INT1449-GK', name: 'Giữa kỳ An toàn & Bảo mật HTTT', classCode: 'INT1449.01', start: '2026-09-18 13:30', minutes: 90, status: 'live', students: 58, joined: 55, submitted: 21 },
    { code: 'EX-WEB3021-TH', name: 'Thực hành Kiểm thử xâm nhập 1', classCode: 'WEB3021.01', start: '2026-09-18 15:30', minutes: 120, status: 'upcoming', students: 49, joined: 0, submitted: 0 },
    { code: 'EX-CRY2010-GK', name: 'Giữa kỳ Mật mã học ứng dụng', classCode: 'CRY2010.01', start: '2026-09-22 07:30', minutes: 60, status: 'upcoming', students: 44, joined: 0, submitted: 0 },
    { code: 'EX-INT1449-TH', name: 'Thực hành ATTT: Quét mạng', classCode: 'INT1449.02', start: '2026-09-12 09:30', minutes: 90, status: 'done', students: 54, joined: 53, submitted: 53 },
    { code: 'EX-WEB3021-15', name: 'Kiểm tra 15 phút: SQL Injection', classCode: 'WEB3021.02', start: '2026-09-08 09:15', minutes: 15, status: 'done', students: 51, joined: 50, submitted: 50 },
  ];

  /* Thí sinh ca đang diễn ra (EX-INT1449-GK): 55 người đã vào phòng; đúng 21 đã nộp. heartbeat = số giây từ lần ping cuối. */
  var warnedAt = { 25: 1, 31: 2, 40: 1 }, lostAt = { 28: 1, 45: 1 };
  var examStudents = roster.slice(0, 55).map(function (s, i) {
    var state = i < 21 ? 'submitted' : warnedAt[i] ? 'warned' : lostAt[i] ? 'lost' : 'working';
    return { name: s.name, account: s.account, state: state, heartbeat: state === 'lost' ? int(35, 90) : state === 'submitted' ? 0 : int(1, 8), solved: state === 'submitted' ? int(3, 5) : int(0, 4), warnings: warnedAt[i] || 0, ip: '10.20.' + int(1, 8) + '.' + int(10, 250) };
  });

  var qa = [
    { student: 'Vũ Trung Đức', account: 'B23DCCN135', classCode: 'INT1449.01', last: 'Em nộp file .lab nhưng báo WFN, em phải làm sao ạ?', time: '10 phút trước', unread: 2 },
    { student: 'Lê Việt Anh', account: 'B23DCAT003', classCode: 'INT1449.01', last: 'Bài iptables em chặn được cổng 22 nhưng vẫn WA ở bước 3.', time: '1 giờ trước', unread: 1 },
    { student: 'Phạm Thu Hà', account: 'B23DCAT005', classCode: 'INT1449.01', last: 'Cảm ơn thầy, em đã nộp lại và được AC.', time: 'Hôm qua', unread: 0 },
    { student: 'Trần Đăng Khoa', account: 'B23DCAT006', classCode: 'INT1449.01', last: 'Máy ảo Labtainer của em không khởi động được, báo thiếu RAM.', time: 'Hôm qua', unread: 1 },
    { student: 'Đỗ Minh Quân', account: 'B23DCAT007', classCode: 'INT1449.01', last: 'Em xin gia hạn bài backup2 thêm một ngày vì ốm.', time: '2 ngày trước', unread: 0 },
    { student: 'Ngô Bảo Ngọc', account: 'B23DCAT008', classCode: 'INT1449.01', last: 'Thầy cho em hỏi quy tắc đặt tên tệp .lab.', time: '3 ngày trước', unread: 0 },
  ];

  /* Bài tập chờ duyệt (Admin duyệt; GV/TA chỉ xem trạng thái). status: 0 chờ, 1 đã duyệt, 2 từ chối. Tác giả, vai trò, loại bài khai báo cố định. */
  var T1 = { name: teachers[0].name, role: 'Giảng viên' }, T2 = { name: teachers[1].name, role: 'Giảng viên' }, T3 = { name: teachers[2].name, role: 'Giảng viên' }, A1 = { name: assistants[0].name, role: 'Trợ giảng' };
  var reviewRows = [
    ['Phát hiện xâm nhập với Snort', 'Lab', 'IDS', 2, T1, 0], ['Tấn công ARP spoofing trong LAN', 'Mô phỏng tấn công', 'Tấn công mạng', 2, T1, 0],
    ['Cấu hình VPN IPsec site-to-site', 'Lab', 'VPN', 3, T2, 0], ['Giải mã Vigenère nhiều khóa', 'Lập trình', 'Mật mã', 2, T3, 0],
    ['Khai thác buffer overflow cơ bản', 'CTF', 'Khai thác', 3, T2, 0], ['Phân tích gói tin với Wireshark', 'Lab', 'Giám sát', 1, A1, 0],
    ['Hardening SSH trên Ubuntu', 'Lab', 'Phòng thủ', 1, T1, 1], ['Trắc nghiệm: mô hình OSI và TCP/IP', 'Trắc nghiệm', 'Nền tảng', 1, A1, 2],
  ];
  var review = reviewRows.map(function (r, i) {
    return { code: 'rv-' + pad(i + 1), title: r[0], type: r[1], topic: r[2], diff: r[3], author: r[4].name, authorRole: r[4].role, requestedAt: '2026-09-' + pad(17 - (i % 6)) + ' ' + pad(8 + i) + ':' + pad(int(0, 59)), version: 1 + (i % 3), status: r[5] };
  });

  /* Tài khoản: 3 giảng viên + 6 trợ giảng + 39 sinh viên = 48, mã tài khoản duy nhất */
  var accounts = [];
  teachers.forEach(function (t, i) { accounts.push({ id: 1000 + accounts.length, name: t.name, account: t.id, role: 'Giảng viên', faculty: 'CNTT1', classCode: '', status: 'active', lastLogin: '2026-09-' + pad(18 - i) + ' ' + pad(7 + i * 3) + ':' + pad(int(0, 59)) }); });
  assistants.forEach(function (a, i) { accounts.push({ id: 1000 + accounts.length, name: a.name, account: a.id, role: 'Trợ giảng', faculty: 'CNTT1', classCode: '', status: i === 5 ? 'inactive' : 'active', lastLogin: '2026-09-' + pad(18 - (i % 5)) + ' ' + pad(8 + i) + ':' + pad(int(0, 59)) }); });
  for (var s = 0; accounts.length < 48; s++) {
    var st = roster[s];
    accounts.push({ id: 1000 + accounts.length, name: st.name, account: st.account, role: 'Sinh viên', faculty: 'CNTT1', classCode: 'D23CQAT01-B', status: s % 17 === 5 ? 'inactive' : 'active', lastLogin: '2026-09-' + pad(18 - (s % 9)) + ' ' + pad(int(6, 23)) + ':' + pad(int(0, 59)) });
  }

  var nodes = [
    { code: 'node-01', host: 'docker-01.lab', cpu: 62, ram: 71, disk: 48, instances: 14, max: 20, status: 'active' },
    { code: 'node-02', host: 'docker-02.lab', cpu: 38, ram: 52, disk: 41, instances: 9, max: 20, status: 'active' },
    { code: 'node-03', host: 'docker-03.lab', cpu: 91, ram: 88, disk: 63, instances: 19, max: 20, status: 'active' },
    { code: 'node-04', host: 'docker-04.lab', cpu: 12, ram: 24, disk: 30, instances: 3, max: 20, status: 'maintenance' },
    { code: 'node-05', host: 'docker-05.lab', cpu: 0, ram: 0, disk: 0, instances: 0, max: 20, status: 'down' },
  ];
  var activeLabs = sum(nodes.map(function (n) { return n.instances; }));

  var actors = ['admin', 'gv01', 'gv02', 'ta02', 'system'];
  var actions = [['Duyệt bài tập', 'rv-07'], ['Đăng nhập', '—'], ['Sửa cấu hình', 'exam.maxConcurrentStudents'], ['Ngừng tài khoản', 'B23DCAT031'], ['Tạo ca thi', 'EX-WEB3021-TH'], ['Từ chối bài tập', 'rv-08'], ['Cấp lại mật khẩu', 'B23DCAT014'], ['Sao lưu', 'clx-backup-0917'], ['Gán bài vào lớp', 'INT1449.02'], ['Xuất CSV', 'Nhật ký ca thi']];
  var audit = Array.from({ length: 60 }, function (_, i) {
    var a = actions[i % actions.length];
    return { id: 9000 - i, time: '2026-09-' + pad(18 - Math.floor(i / 8)) + ' ' + pad(23 - (i % 16)) + ':' + pad((i * 7) % 60) + ':' + pad((i * 13) % 60), actor: actors[i % actors.length], action: a[0], target: a[1], ip: '10.20.' + (1 + (i % 6)) + '.' + (20 + i) };
  });

  var settings = [
    { group: 'Bảo mật và truy cập', items: [
      { key: 'auth.maxLoginAttempts', label: 'Số lần đăng nhập sai tối đa', value: '5', unit: 'lần', hint: 'Vượt quá sẽ khóa tạm tài khoản.' },
      { key: 'auth.lockMinutes', label: 'Thời gian khóa tạm', value: '15', unit: 'phút', hint: '' },
      { key: 'auth.allowEarlyLogin', label: 'Cho phép đăng nhập trước giờ thi', value: 'off', unit: '', hint: 'Sinh viên vào phòng chờ sớm hơn giờ bắt đầu ca thi.' },
    ] },
    { group: 'Ca thi', items: [
      { key: 'exam.maxConcurrentStudents', label: 'Số thí sinh đồng thời tối đa', value: '120', unit: 'sinh viên', hint: 'Giới hạn theo tài nguyên máy ảo.' },
      { key: 'exam.heartbeatSeconds', label: 'Chu kỳ nhịp tim phòng thi', value: '10', unit: 'giây', hint: 'Quá 3 chu kỳ không có nhịp sẽ báo mất kết nối.' },
    ] },
    { group: 'Bảng xếp hạng', items: [
      { key: 'leaderboard.defaultLimit', label: 'Số dòng hiển thị mặc định', value: '30', unit: 'dòng', hint: '' },
    ] },
    { group: 'Sao lưu', items: [
      { key: 'backup.schedule', label: 'Lịch sao lưu', value: '02:00 hằng ngày', unit: '', hint: 'Giờ máy chủ.' },
      { key: 'backup.keepCount', label: 'Số bản giữ lại', value: '14', unit: 'bản', hint: 'Bản cũ hơn bị xóa tự động.' },
    ] },
  ];

  /* Số liệu hệ thống: tổng 24 giờ và 7 ngày được TÍNH từ chuỗi gốc để luôn khớp. Ngày cuối của perDay = tổng 24 giờ. */
  var perHour = [31, 22, 14, 9, 6, 8, 17, 42, 88, 120, 133, 109, 76, 101, 142, 157, 139, 121, 98, 147, 188, 176, 122, 70];
  var perDay = [812, 934, 1020, 760, 410, 388, 1103, 1248, 1311, 1190, 1042, 540, 512, sum(perHour)];
  var system = {
    students: 1280, teachers: teachers.length, assistants: 41, classes: 38,
    submissions24h: sum(perHour), submissions7d: sum(perDay.slice(-7)), activeLabs: activeLabs, maxLabs: sum(nodes.map(function (n) { return n.max; })) - 20,
    perHour: perHour, perDay: perDay,
  };

  window.CLX_STAFF = { teachers: teachers, assistants: assistants, classes: classes, roster: roster, exams: exams, examStudents: examStudents, qa: qa, review: review, accounts: accounts, nodes: nodes, audit: audit, settings: settings, system: system };

  D.notificationsByRole = {
    teacher: [
      { from: 'Hệ thống', title: 'Bài "Phát hiện xâm nhập với Snort" của bạn đang chờ Admin duyệt.', time: '30 phút trước', unread: true },
      { from: 'Hệ thống', title: 'Ca thi "Giữa kỳ An toàn & Bảo mật HTTT" đang diễn ra, 3 thí sinh bị cảnh cáo.', time: '1 giờ trước', unread: true },
      { from: 'Hệ thống', title: 'Lớp INT1449.02 có 12 sinh viên dưới ngưỡng cảnh báo tiến độ.', time: 'Hôm qua', unread: false },
    ],
    ta: [
      { from: 'Hệ thống', title: 'Ca thi "Giữa kỳ An toàn & Bảo mật HTTT" đang diễn ra, bạn được phân công giám sát.', time: '1 giờ trước', unread: true },
      { from: 'Hệ thống', title: 'Lớp INT1449.02 có 12 sinh viên dưới ngưỡng cảnh báo tiến độ.', time: 'Hôm qua', unread: false },
    ],
    admin: [
      { from: 'Hệ thống', title: 'node-03 vượt 90% CPU trong 10 phút.', time: '5 phút trước', unread: true },
      { from: 'Hệ thống', title: 'node-05 mất kết nối, 0 máy ảo đang chạy.', time: '2 giờ trước', unread: true },
      { from: 'Hệ thống', title: '6 bài tập đang chờ duyệt.', time: 'Hôm qua', unread: false },
    ],
  };
})();
