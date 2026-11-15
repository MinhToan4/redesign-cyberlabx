/* Dữ liệu danh sách lớp học phần lịch sử qua các học kỳ trước cho Giảng viên / Trợ giảng / Admin.
   Số liệu học kỳ hiện tại (2026-1) được lấy trực tiếp từ CLX_STAFF.classes để đồng bộ 100%.
   Gắn vào window.CLX_CLASSES_DATA. Tuân thủ nguyên tắc không bịa đặt: dùng mã môn,
   tên môn, mã cán bộ chuẩn từ CLX và CLX_STAFF. */
(function () {
  // Lịch sử các lớp học phần qua các học kỳ trước
  var history = [
    // Học kỳ 2 (2025-2026)
    { code: 'INT1449.01', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 60, progress: 84, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2025-2', semesterName: 'Học kỳ 2 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1449.02', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 57, progress: 81, atRisk: 1, submissions7d: 0, threshold: 25, semester: '2025-2', semesterName: 'Học kỳ 2 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.01', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 62, progress: 91, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2025-2', semesterName: 'Học kỳ 2 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.02', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 58, progress: 88, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2025-2', semesterName: 'Học kỳ 2 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.01', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 55, progress: 86, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2025-2', semesterName: 'Học kỳ 2 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.02', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 54, progress: 83, atRisk: 2, submissions7d: 0, threshold: 25, semester: '2025-2', semesterName: 'Học kỳ 2 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },

    // Học kỳ 1 (2025-2026)
    { code: 'INT1449.01', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 55, progress: 88, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2025-1', semesterName: 'Học kỳ 1 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1449.02', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 56, progress: 82, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2025-1', semesterName: 'Học kỳ 1 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1449.03', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 03', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 53, progress: 79, atRisk: 2, submissions7d: 0, threshold: 25, semester: '2025-1', semesterName: 'Học kỳ 1 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.01', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 61, progress: 89, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2025-1', semesterName: 'Học kỳ 1 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.02', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 59, progress: 86, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2025-1', semesterName: 'Học kỳ 1 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.01', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 52, progress: 85, atRisk: 1, submissions7d: 0, threshold: 25, semester: '2025-1', semesterName: 'Học kỳ 1 (2025-2026)', status: 'closed', statusLabel: 'Đã kết thúc' },

    // Học kỳ 2 (2024-2025)
    { code: 'INT1449.01', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 58, progress: 87, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2024-2', semesterName: 'Học kỳ 2 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1449.02', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 55, progress: 80, atRisk: 1, submissions7d: 0, threshold: 25, semester: '2024-2', semesterName: 'Học kỳ 2 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.01', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 60, progress: 92, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2024-2', semesterName: 'Học kỳ 2 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.02', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 62, progress: 85, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2024-2', semesterName: 'Học kỳ 2 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.01', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 50, progress: 81, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2024-2', semesterName: 'Học kỳ 2 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.02', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 53, progress: 78, atRisk: 3, submissions7d: 0, threshold: 25, semester: '2024-2', semesterName: 'Học kỳ 2 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },

    // Học kỳ 1 (2024-2025)
    { code: 'INT1449.01', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 56, progress: 86, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2024-1', semesterName: 'Học kỳ 1 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1449.02', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 54, progress: 84, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2024-1', semesterName: 'Học kỳ 1 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.01', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 57, progress: 90, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2024-1', semesterName: 'Học kỳ 1 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.02', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 60, progress: 87, atRisk: 1, submissions7d: 0, threshold: 25, semester: '2024-1', semesterName: 'Học kỳ 1 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.01', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 51, progress: 82, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2024-1', semesterName: 'Học kỳ 1 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.02', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 48, progress: 80, atRisk: 2, submissions7d: 0, threshold: 25, semester: '2024-1', semesterName: 'Học kỳ 1 (2024-2025)', status: 'closed', statusLabel: 'Đã kết thúc' },

    // Học kỳ 2 (2023-2024)
    { code: 'INT1449.01', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 57, progress: 85, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2023-2', semesterName: 'Học kỳ 2 (2023-2024)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1449.02', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 53, progress: 81, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2023-2', semesterName: 'Học kỳ 2 (2023-2024)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1332.01', course: 'INT1332', name: 'An toàn mạng máy tính', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 59, progress: 88, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2023-2', semesterName: 'Học kỳ 2 (2023-2024)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.01', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 01', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 54, progress: 83, atRisk: 0, submissions7d: 0, threshold: 25, semester: '2023-2', semesterName: 'Học kỳ 2 (2023-2024)', status: 'closed', statusLabel: 'Đã kết thúc' },
    { code: 'INT1412.02', course: 'INT1412', name: 'Quản trị hệ thống & mạng', group: 'Nhóm 02', teacher: 'gv01', teacherName: 'ThS. Nguyễn Văn An', ta: 'ta01', taName: 'Đinh Quang Huy', students: 50, progress: 79, atRisk: 1, submissions7d: 0, threshold: 25, semester: '2023-2', semesterName: 'Học kỳ 2 (2023-2024)', status: 'closed', statusLabel: 'Đã kết thúc' },
  ];

  var semesters = [
    { code: '', label: 'Tất cả học kỳ' },
    { code: '2026-1', label: 'Học kỳ 1 (2026-2027)' },
    { code: '2025-2', label: 'Học kỳ 2 (2025-2026)' },
    { code: '2025-1', label: 'Học kỳ 1 (2025-2026)' },
    { code: '2024-2', label: 'Học kỳ 2 (2024-2025)' },
    { code: '2024-1', label: 'Học kỳ 1 (2024-2025)' },
    { code: '2023-2', label: 'Học kỳ 2 (2023-2024)' },
    { code: '2025-summer', label: 'Học kỳ hè (2025-2026)' },
  ];

  /* Sinh danh sách lớp học phần của học kỳ hiện tại (2026-1) từ nguồn chuẩn CLX_STAFF.classes */
  function getCurrentSemesterClasses() {
    var S = window.CLX_STAFF;
    if (!S || !S.classes) return [];
    var teacherMap = {}, taMap = {};
    (S.teachers || []).forEach(function (t) { teacherMap[t.id] = t.name; });
    (S.assistants || []).forEach(function (a) { taMap[a.id] = a.name; });
    return S.classes.map(function (c) {
      var taId = (c.assistants && c.assistants[0]) || '';
      return {
        code: c.code,
        course: c.course,
        name: c.name,
        group: c.group,
        teacher: c.teacher,
        teacherName: teacherMap[c.teacher] || '',
        ta: taId,
        taName: taMap[taId] || '',
        assistants: c.assistants || [],
        students: c.students,
        progress: c.progress,
        atRisk: c.atRisk,
        submissions7d: c.submissions7d,
        threshold: c.threshold,
        semester: '2026-1',
        semesterName: 'Học kỳ 1 (2026-2027)',
        status: c.status || 'active',
        statusLabel: (c.status === 'active' || !c.status) ? 'Đang giảng dạy' : 'Đã kết thúc',
      };
    });
  }

  window.CLX_CLASSES_DATA = {
    history: history,
    semesters: semesters,
    getCurrentSemesterClasses: getCurrentSemesterClasses,
    get classes() {
      return getCurrentSemesterClasses().concat(history);
    }
  };
})();
