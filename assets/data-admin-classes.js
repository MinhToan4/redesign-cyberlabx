/* Dữ liệu mở rộng lớp học phần dành cho trang Quản trị (Admin Classes).
   Gắn vào window.CLX_ADMIN_CLASSES.
   Xây dựng mở rộng từ nguồn dùng chung CLX_STAFF.classes để đồng bộ số liệu (tiến độ, sĩ số tối đa, trợ giảng). */
(function () {
  var teachersMap = {
    'gv01': 'ThS. Nguyễn Văn An',
    'gv02': 'TS. Trần Thị Bích',
    'gv03': 'PGS.TS. Lê Hoàng Cường',
    'gv04': 'TS. Hoàng Tuấn Anh',
    'gv05': 'ThS. Đỗ Thùy Trang'
  };

  var staffClasses = (window.CLX_STAFF && window.CLX_STAFF.classes) || [];

  /* 1. Ánh xạ từ nguồn dùng chung CLX_STAFF.classes của học kỳ hiện tại */
  var classes = staffClasses.map(function (c, idx) {
    return {
      id: 'cls-' + (idx + 1),
      code: c.code,
      course: c.course,
      name: c.name,
      group: c.group,
      teacherId: c.teacher,
      teacher: teachersMap[c.teacher] || c.teacher,
      tas: c.assistants ? c.assistants.length : 0,
      students: c.students,
      maxStudents: c.capacity,
      semester: 'Học kỳ 1 (2026-2027)',
      status: c.status || 'active',
      progress: c.progress,
      atRisk: c.atRisk,
      submissions7d: c.submissions7d,
      threshold: c.threshold
    };
  });

  /* 2. Bổ sung các lớp học phần khác của học kỳ 1 (2026-2027) */
  var extraCurrent = [
    { code: 'NET1010.01', course: 'NET1010', name: 'Mạng máy tính căn bản', group: 'Nhóm 01', teacherId: 'gv04', teacher: 'TS. Hoàng Tuấn Anh', tas: 2, students: 62, maxStudents: 65, semester: 'Học kỳ 1 (2026-2027)', status: 'active', progress: 61, atRisk: 3, submissions7d: 430, threshold: 30 },
    { code: 'NET1010.02', course: 'NET1010', name: 'Mạng máy tính căn bản', group: 'Nhóm 02', teacherId: 'gv04', teacher: 'TS. Hoàng Tuấn Anh', tas: 2, students: 59, maxStudents: 65, semester: 'Học kỳ 1 (2026-2027)', status: 'active', progress: 58, atRisk: 5, submissions7d: 395, threshold: 30 },
    { code: 'SEC3010.01', course: 'SEC3010', name: 'Phân tích mã độc', group: 'Nhóm 01', teacherId: 'gv05', teacher: 'ThS. Đỗ Thùy Trang', tas: 1, students: 38, maxStudents: 45, semester: 'Học kỳ 1 (2026-2027)', status: 'active', progress: 44, atRisk: 7, submissions7d: 210, threshold: 25 },
    { code: 'SYS2020.01', course: 'SYS2020', name: 'Quản trị hệ thống Linux', group: 'Nhóm 01', teacherId: 'gv01', teacher: 'ThS. Nguyễn Văn An', tas: 1, students: 53, maxStudents: 60, semester: 'Học kỳ 1 (2026-2027)', status: 'active', progress: 67, atRisk: 2, submissions7d: 480, threshold: 35 },
    { code: 'SYS2020.02', course: 'SYS2020', name: 'Quản trị hệ thống Linux', group: 'Nhóm 02', teacherId: 'gv01', teacher: 'ThS. Nguyễn Văn An', tas: 1, students: 55, maxStudents: 60, semester: 'Học kỳ 1 (2026-2027)', status: 'active', progress: 62, atRisk: 4, submissions7d: 442, threshold: 35 },
    { code: 'FOR4010.01', course: 'FOR4010', name: 'Điều tra số (Digital Forensics)', group: 'Nhóm 01', teacherId: 'gv02', teacher: 'TS. Trần Thị Bích', tas: 1, students: 34, maxStudents: 40, semester: 'Học kỳ 1 (2026-2027)', status: 'active', progress: 38, atRisk: 6, submissions7d: 190, threshold: 25 },
    { code: 'INT1449.03', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 03', teacherId: 'gv05', teacher: 'ThS. Đỗ Thùy Trang', tas: 0, students: 0, maxStudents: 60, semester: 'Học kỳ 1 (2026-2027)', status: 'inactive', progress: 0, atRisk: 0, submissions7d: 0, threshold: 25 },
    { code: 'WEB3021.03', course: 'WEB3021', name: 'Kiểm thử xâm nhập', group: 'Nhóm 03', teacherId: 'gv04', teacher: 'TS. Hoàng Tuấn Anh', tas: 0, students: 0, maxStudents: 55, semester: 'Học kỳ 1 (2026-2027)', status: 'inactive', progress: 0, atRisk: 0, submissions7d: 0, threshold: 30 }
  ];

  extraCurrent.forEach(function (c, idx) {
    c.id = 'cls-' + (classes.length + 1);
    classes.push(c);
  });

  /* 3. Lịch sử các lớp học phần ở học kỳ trước */
  var pastClasses = [
    /* Học kỳ 2 (2025-2026) */
    { code: 'INT1449.01-252', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', teacherId: 'gv01', teacher: 'ThS. Nguyễn Văn An', tas: 2, students: 56, maxStudents: 60, semester: 'Học kỳ 2 (2025-2026)', status: 'inactive', progress: 84, atRisk: 0, submissions7d: 0, threshold: 25 },
    { code: 'INT1449.02-252', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 02', teacherId: 'gv01', teacher: 'ThS. Nguyễn Văn An', tas: 1, students: 57, maxStudents: 60, semester: 'Học kỳ 2 (2025-2026)', status: 'inactive', progress: 81, atRisk: 0, submissions7d: 0, threshold: 25 },
    { code: 'WEB3021.01-252', course: 'WEB3021', name: 'Kiểm thử xâm nhập', group: 'Nhóm 01', teacherId: 'gv02', teacher: 'TS. Trần Thị Bích', tas: 2, students: 48, maxStudents: 50, semester: 'Học kỳ 2 (2025-2026)', status: 'inactive', progress: 89, atRisk: 0, submissions7d: 0, threshold: 30 },
    { code: 'WEB3021.02-252', course: 'WEB3021', name: 'Kiểm thử xâm nhập', group: 'Nhóm 02', teacherId: 'gv02', teacher: 'TS. Trần Thị Bích', tas: 1, students: 50, maxStudents: 50, semester: 'Học kỳ 2 (2025-2026)', status: 'inactive', progress: 86, atRisk: 0, submissions7d: 0, threshold: 30 },
    { code: 'CRY2010.01-252', course: 'CRY2010', name: 'Mật mã học ứng dụng', group: 'Nhóm 01', teacherId: 'gv03', teacher: 'PGS.TS. Lê Hoàng Cường', tas: 1, students: 45, maxStudents: 50, semester: 'Học kỳ 2 (2025-2026)', status: 'inactive', progress: 78, atRisk: 0, submissions7d: 0, threshold: 20 },
    { code: 'NET1010.01-252', course: 'NET1010', name: 'Mạng máy tính căn bản', group: 'Nhóm 01', teacherId: 'gv04', teacher: 'TS. Hoàng Tuấn Anh', tas: 2, students: 60, maxStudents: 65, semester: 'Học kỳ 2 (2025-2026)', status: 'inactive', progress: 92, atRisk: 0, submissions7d: 0, threshold: 30 },
    { code: 'SYS2020.01-252', course: 'SYS2020', name: 'Quản trị hệ thống Linux', group: 'Nhóm 01', teacherId: 'gv01', teacher: 'ThS. Nguyễn Văn An', tas: 1, students: 54, maxStudents: 60, semester: 'Học kỳ 2 (2025-2026)', status: 'inactive', progress: 88, atRisk: 0, submissions7d: 0, threshold: 35 },

    /* Học kỳ 1 (2025-2026) */
    { code: 'INT1449.01-251', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', teacherId: 'gv01', teacher: 'ThS. Nguyễn Văn An', tas: 1, students: 52, maxStudents: 55, semester: 'Học kỳ 1 (2025-2026)', status: 'inactive', progress: 85, atRisk: 0, submissions7d: 0, threshold: 25 },
    { code: 'WEB3021.01-251', course: 'WEB3021', name: 'Kiểm thử xâm nhập', group: 'Nhóm 01', teacherId: 'gv02', teacher: 'TS. Trần Thị Bích', tas: 1, students: 46, maxStudents: 50, semester: 'Học kỳ 1 (2025-2026)', status: 'inactive', progress: 90, atRisk: 0, submissions7d: 0, threshold: 30 },
    { code: 'CRY2010.01-251', course: 'CRY2010', name: 'Mật mã học ứng dụng', group: 'Nhóm 01', teacherId: 'gv03', teacher: 'PGS.TS. Lê Hoàng Cường', tas: 1, students: 42, maxStudents: 45, semester: 'Học kỳ 1 (2025-2026)', status: 'inactive', progress: 79, atRisk: 0, submissions7d: 0, threshold: 20 },
    { code: 'NET1010.01-251', course: 'NET1010', name: 'Mạng máy tính căn bản', group: 'Nhóm 01', teacherId: 'gv04', teacher: 'TS. Hoàng Tuấn Anh', tas: 1, students: 58, maxStudents: 60, semester: 'Học kỳ 1 (2025-2026)', status: 'inactive', progress: 87, atRisk: 0, submissions7d: 0, threshold: 30 },
    { code: 'SEC3010.01-251', course: 'SEC3010', name: 'Phân tích mã độc', group: 'Nhóm 01', teacherId: 'gv05', teacher: 'ThS. Đỗ Thùy Trang', tas: 1, students: 36, maxStudents: 40, semester: 'Học kỳ 1 (2025-2026)', status: 'inactive', progress: 82, atRisk: 0, submissions7d: 0, threshold: 25 }
  ];

  pastClasses.forEach(function (c) {
    c.id = 'cls-' + (classes.length + 1);
    classes.push(c);
  });

  window.CLX_ADMIN_CLASSES = {
    classes: classes,
    teachersMap: teachersMap
  };
})();
