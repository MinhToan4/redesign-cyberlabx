/* Dữ liệu mẫu dùng chung cho mọi trang prototype (rút gọn từ studentData.js của bản đang chạy).
   Gắn vào window.CLX để trang tĩnh dùng được khi mở trực tiếp từ ổ đĩa (file://). */
(function () {
  const student = {
    name: 'Vũ Trung Đức', short: 'Đức', initials: 'VĐ', code: 'B23DCCN135', classCode: 'D23CQAT01-B',
    org: 'PTIT · Khoa CNTT1 · Chuyên ngành An toàn thông tin',
    level: 42, xp: 8420, labsDone: 46, streak: 12, termProgress: 64,
    gender: 'Nam', birthday: '2005-03-14', phone: '0987 654 321', address: 'Hà Đông, Hà Nội',
  };

  const rank = { title: 'Elite Hacker', level: 42, xp: 8420, toNext: 1580, nextLevel: 43, pct: 84 };
  const streakTiers = [{ min: 0, label: 'Script Kiddie' }, { min: 7, label: 'Pro Hacker' }, { min: 15, label: 'Elite Hacker' }];
  const activityTotal = 347;

  const verdicts = [
    { code: 'AC', label: 'Accepted', desc: 'Kết quả đúng' },
    { code: 'WA', label: 'Wrong Answer', desc: 'Kết quả sai' },
    { code: 'WF', label: 'Wrong File Format', desc: 'Sai định dạng' },
    { code: 'WFN', label: 'Wrong File Name', desc: 'Sai tên tệp' },
    { code: 'CPY', label: 'Copy From Other', desc: 'Sao chép' },
  ];

  const classes = [
    {
      code: 'INT1449.01', course: 'INT1449', name: 'An toàn & Bảo mật HTTT', group: 'Nhóm 01', credits: 3, teacher: 'ThS. Nguyễn Văn An',
      done: 12, total: 100, deadline: '20/10/2026',
      assignments: [
        { code: 'nmap-discovery', title: 'Quét mạng và dịch vụ cơ bản', group: 'Quét mạng', topic: 'Công cụ quét mạng', diff: 1, xp: 50, solved: 32, status: 'AC', attempts: '4/4', deadline: '2026-09-20 23:59' },
        { code: 'backup2', title: 'Sao lưu và phục hồi dữ liệu', group: 'Quản trị hệ thống', topic: 'Backup', diff: 1, xp: 60, solved: 28, status: 'WFN', attempts: '0/1', deadline: '2026-09-22 23:59' },
        { code: 'firewall-config', title: 'Cấu hình tường lửa iptables', group: 'Phòng thủ mạng', topic: 'Firewall', diff: 2, xp: 100, solved: 14, status: 'AC', attempts: '4/4', deadline: '2026-09-18 23:59' },
        { code: 'nmap-advanced', title: 'Quét mạng và dịch vụ nâng cao', group: 'Quét mạng', topic: 'Công cụ quét mạng', diff: 2, xp: 90, solved: 9, status: 'WF', attempts: '0/1', deadline: '2026-09-25 23:59' },
        { code: 'linux-privesc', title: 'Leo thang đặc quyền Linux', group: 'Khai thác', topic: 'PrivEsc', diff: 3, xp: 150, solved: 4, status: 'CPY', attempts: '0/4', deadline: '2026-09-30 23:59' },
        { code: 'ids-snort', title: 'Phát hiện xâm nhập với Snort', group: 'Phòng thủ mạng', topic: 'IDS', diff: 2, xp: 100, solved: 6, status: null, attempts: null, deadline: '2026-10-05 23:59' },
      ],
    },
    {
      code: 'WEB3021.01', course: 'WEB3021', name: 'Kiểm thử xâm nhập', group: 'Nhóm 02', credits: 3, teacher: 'TS. Trần Thị Bích',
      done: 11, total: 100, deadline: '05/11/2026',
      assignments: [
        { code: 'gdb-debug', title: 'Gỡ rối chương trình với GDB', group: 'Khai thác nhị phân', topic: 'Debugging', diff: 2, xp: 50, solved: 12, status: 'WA', attempts: '6/8', deadline: '2026-09-24 23:59' },
        { code: 'metasploit-intro', title: 'Khai thác lỗ hổng với Metasploit', group: 'Khai thác', topic: 'Metasploit', diff: 2, xp: 120, solved: 8, status: 'WA', attempts: '3/4', deadline: '2026-09-20 23:59' },
        { code: 'sqli-basic', title: 'Khai thác SQL Injection cơ bản', group: 'Web', topic: 'SQL Injection', diff: 1, xp: 70, solved: 26, status: 'WA', attempts: '2/4', deadline: '2026-09-28 23:59' },
        { code: 'xss-stored', title: 'Stored XSS trên diễn đàn mẫu', group: 'Web', topic: 'XSS', diff: 2, xp: 90, solved: 15, status: null, attempts: null, deadline: '2026-10-02 23:59' },
      ],
    },
    {
      code: 'CRY2010.01', course: 'CRY2010', name: 'Mật mã học ứng dụng', group: 'Nhóm 01', credits: 2, teacher: 'PGS.TS. Lê Hoàng Cường',
      done: 9, total: 100, deadline: '15/11/2026',
      assignments: [
        { code: 'classic-cipher', title: 'Giải mã cổ điển', group: 'Mật mã', topic: 'Cổ điển', diff: 1, xp: 40, solved: 38, status: 'AC', attempts: '3/3', deadline: '2026-09-15 23:59' },
        { code: 'rsa-weak', title: 'Bẻ khóa RSA modulus yếu', group: 'Mật mã', topic: 'RSA', diff: 3, xp: 140, solved: 5, status: 'WA', attempts: '1/3', deadline: '2026-10-08 23:59' },
        { code: 'hash-collide', title: 'Va chạm băm MD5', group: 'Mật mã', topic: 'Hàm băm', diff: 2, xp: 80, solved: 11, status: null, attempts: null, deadline: '2026-10-12 23:59' },
      ],
    },
  ];

  // Bài làm dở, hiển thị ở Dashboard
  const inProgress = [
    { course: 'WEB3021', code: 'gdb-debug', title: 'Gỡ rối chương trình với GDB', topic: 'Kiểm thử xâm nhập', xp: 50, attempts: '6/8', status: 'WA', deadline: '24/09 23:59', dueSoon: true },
    { course: 'INT1449', code: 'backup2', title: 'Sao lưu và phục hồi dữ liệu', topic: 'An toàn & Bảo mật HTTT', xp: 60, attempts: '0/1', status: 'WFN', deadline: '22/09 23:59', dueSoon: true },
    { course: 'WEB3021', code: 'metasploit-intro', title: 'Khai thác lỗ hổng với Metasploit', topic: 'Kiểm thử xâm nhập', xp: 120, attempts: '3/4', status: 'WA', deadline: '20/09 23:59', dueSoon: false },
  ];

  const skills = [
    { name: 'Network', value: 72 }, { name: 'Crypto', value: 60 }, { name: 'Web', value: 85 },
    { name: 'Pwn', value: 48 }, { name: 'Reverse', value: 55 }, { name: 'Forensics', value: 66 },
  ];

  const skillCards = [
    { name: 'Web Exploitation', level: 78, status: 'Thành thạo' }, { name: 'Cryptography', level: 62, status: 'Trung cấp' },
    { name: 'Reverse Engineering', level: 55, status: 'Trung cấp' }, { name: 'Network Security', level: 84, status: 'Chuyên gia' },
    { name: 'Binary Exploitation', level: 48, status: 'Cơ bản' }, { name: 'Digital Forensics', level: 66, status: 'Thành thạo' },
    { name: 'Cloud Security', level: 70, status: 'Thành thạo' }, { name: 'Incident Response', level: 58, status: 'Trung cấp' },
    { name: 'Secure Coding', level: 75, status: 'Thành thạo' },
  ];

  const badges = [
    { name: 'First Blood', desc: 'Nộp thành công bài lab đầu tiên đạt Accepted', icon: 'target', unlocked: true, date: '12/03/2026' },
    { name: 'Network Scout', desc: 'Hoàn thành trọn bộ bài lab Quét mạng Nmap', icon: 'radar', unlocked: true, date: '28/04/2026' },
    { name: 'Cipher Cracker', desc: 'Giải mã thành công bản mã cổ điển và RSA', icon: 'key-round', unlocked: true, date: '15/05/2026' },
    { name: 'Streak 7 Days', desc: 'Duy trì chuỗi học tập liên tục trong 7 ngày', icon: 'flame', unlocked: true, date: '02/06/2026' },
    { name: 'Bug Hunter', desc: 'Khai thác thành công lỗ hổng Web Stored XSS & SQLi', icon: 'bug', unlocked: false, progress: '3/5 bài' },
    { name: 'Root Master', desc: 'Vượt qua bài lab leo thang đặc quyền Linux Root', icon: 'terminal', unlocked: false, progress: '1/3 bài' },
  ];

  const notifications = [
    { from: 'Thầy Khánh', title: 'Lịch thi thực hành ATTT dời sang 14/07, phòng 2A05. Các em chuẩn bị máy ảo trước.', time: '10 phút trước', unread: true, level: 'Quan trọng' },
    { from: 'Hệ thống PTIT', title: 'Điểm bài "Khai thác lỗ hổng với Metasploit" đã được cập nhật: 3/4 (WA).', time: '2 giờ trước', unread: true, level: 'Bình thường' },
    { from: 'Hệ thống PTIT', title: 'Thông báo xét học bổng khuyến khích học tập học kỳ 2 năm học 2025-2026.', time: 'Hôm qua', unread: false, level: 'Thông tin' },
    { from: 'Thầy Khánh', title: 'Nhắc nộp bài "Cấu hình tường lửa iptables" trước 23:59 hôm nay.', time: '2 ngày trước', unread: false, level: 'Quan trọng' },
  ];

  const historyTpl = [
    ['An toàn & Bảo mật HTTT', 'Sao lưu và phục hồi dữ liệu', '0/1', 'WFN'], ['An toàn & Bảo mật HTTT', 'Quét mạng và dịch vụ cơ bản', '4/4', 'AC'],
    ['Kiểm thử xâm nhập', 'Gỡ rối chương trình với GDB', '6/8', 'WA'], ['An toàn & Bảo mật HTTT', 'Quét mạng và dịch vụ nâng cao', '0/1', 'WF'],
    ['Kiểm thử xâm nhập', 'Khai thác lỗ hổng với Metasploit', '3/4', 'WA'], ['Mật mã học ứng dụng', 'Giải mã cổ điển', '3/3', 'AC'],
    ['An toàn & Bảo mật HTTT', 'Leo thang đặc quyền Linux', '0/4', 'CPY'], ['An toàn & Bảo mật HTTT', 'Cấu hình tường lửa iptables', '4/4', 'AC'],
    ['Kiểm thử xâm nhập', 'Khai thác SQL Injection cơ bản', '2/4', 'WA'], ['Mật mã học ứng dụng', 'Bẻ khóa RSA modulus yếu', '1/3', 'WA'],
  ];
  const history = Array.from({ length: 40 }, (_, i) => {
    const [course, title, score, status] = historyTpl[i % historyTpl.length];
    const dn = 5 - Math.floor(i / 5);
    const month = dn > 0 ? '07' : '06';
    const day = String(dn > 0 ? dn : 30 + dn).padStart(2, '0');
    const hour = String(23 - (i % 12)).padStart(2, '0');
    const minute = String((((54 - i * 7) % 60) + 60) % 60).padStart(2, '0');
    return { id: 72191 - i * 37, time: `2026-${month}-${day} ${hour}:${minute}`, course, title, score, status };
  });

  const names = ['Bùi Vũ Minh Phi', 'Vũ Trung Đức', 'Lê Việt Anh', 'Nguyễn Khắc Nam Anh', 'Phạm Thu Hà', 'Trần Đăng Khoa', 'Đỗ Minh Quân', 'Ngô Bảo Ngọc', 'Hoàng Gia Huy', 'Đinh Thảo Vy', 'Lương Quốc Bảo', 'Phan Khánh Linh'];
  const leaderboard = names.map((name, i) => {
    const tried = 36 - (i > 5 ? i - 5 : 0);
    const correct = Math.max(8, 31 - i - (i > 2 ? 1 : 0));
    return {
      rank: i + 1, name, account: `B23DCAT${String(i + 1).padStart(3, '0')}`, classCode: 'INT1449.01', correct, tried,
      trend: [0, 0, 1, -1, 0, 2, 0, -2, 1, 0, 0, -1][i], xp: 9800 - i * 410,
      initials: name.split(' ').slice(-2).map((w) => w[0]).join(''), me: name === student.name,
    };
  });

  const guide = [
    { h: 'Chọn bài thực hành', p: 'Vào mục Bài tập, chọn môn học tương ứng rồi bấm vào bài lab bạn muốn làm trong danh sách. Có thể dùng ô tìm kiếm và bộ lọc theo nhóm, độ khó, chủ đề.' },
    { h: 'Đọc kỹ hướng dẫn đề bài', p: 'Trang chi tiết mô tả yêu cầu và liệt kê đầy đủ các bước cần thực hiện. Làm tuần tự tất cả các bước trên máy ảo Labtainer đã cài trên máy của bạn.' },
    { h: 'Xuất file kết quả .lab', p: 'Sau khi hoàn thành, chạy lệnh kết thúc lab để hệ thống ghi lại toàn bộ tiến trình và sinh ra một file .lab chứa bằng chứng của mọi bước bạn đã làm.' },
    { h: 'Nộp bài và nhận kết quả', p: 'Quay lại trang chi tiết, mở khu Nộp bài, duyệt đúng file .lab rồi bấm Nộp bài. Hệ thống chấm tự động và cập nhật kết quả vào trang Lịch sử.' },
  ];

  const chat = [
    { from: 'bot', text: 'Chào bạn, mình có thể giúp gì về bài tập, môi trường lab hoặc cách nộp bài?' },
    { from: 'me', text: 'Em nộp file .lab nhưng báo WFN, là lỗi gì ạ?' },
    { from: 'bot', text: 'WFN là Wrong File Name: tên tệp không khớp quy tắc. Không đổi tên tệp .lab sinh ra sau khi chạy lệnh kết thúc lab. Bạn thử nộp lại đúng tệp gốc nhé.' },
  ];

  // Lưới hoạt động 52 tuần x 7 ngày, mức 0-4, sinh từ hạt giống cố định để mỗi lần mở giống nhau.
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const heat = Array.from({ length: 52 * 7 }, (_, i) => {
    const weekday = i % 7;
    const r = rnd();
    if (weekday === 0 || weekday === 6) return r > 0.75 ? 1 : 0;
    return r > 0.88 ? 4 : r > 0.7 ? 3 : r > 0.5 ? 2 : r > 0.3 ? 1 : 0;
  });

  window.CLX = { student, rank, streakTiers, activityTotal, verdicts, classes, inProgress, skills, skillCards, badges, notifications, history, leaderboard, guide, chat, heat };
})();


/* Dữ liệu mở rộng cho trang Bài tập (Assignments): Bản đồ bài tập Public, Bình luận, và Chi tiết đề bài */
(function () {
  if (!window.CLX) return;

  const publicLabMapStages = [
    {
      id: 'stage_1',
      title: 'Chặng 1: Thăm dò & Quét mạng',
      subtitle: 'Reconnaissance & Network Discovery',
      desc: 'Kỹ năng thu thập thông tin mục tiêu, quét cổng, phân tích dịch vụ và định danh lỗ hổng mạng.',
      icon: 'radar',
      labs: [
        { code: 'nmap-discovery', title: 'Quét mạng và dịch vụ cơ bản', diff: 'Mức 1', points: 50, skill: 'Network', solveRate: 94, status: 'completed' },
        { code: 'dns-enum', title: 'Liệt kê thông tin DNS và Zone Transfer', diff: 'Mức 1', points: 50, skill: 'Recon', solveRate: 88, status: 'completed' },
        { code: 'nmap-adv', title: 'Quét mạng nâng cao vượt tường lửa', diff: 'Mức 2', points: 120, skill: 'Network', solveRate: 65, status: 'in_progress' },
        { code: 'smb-enum', title: 'Liệt kê chia sẻ SMB Null Session', diff: 'Mức 1', points: 50, skill: 'System', solveRate: 80, status: 'completed' },
      ],
    },
    {
      id: 'stage_2',
      title: 'Chặng 2: Quản trị & Phòng thủ hệ thống',
      subtitle: 'System Hardening & Perimeter Defense',
      desc: 'Thiết lập tường lửa iptables, cơ chế sao lưu tự động và cấu hình phòng thủ chống tấn công vét cạn.',
      icon: 'shield',
      labs: [
        { code: 'backup2', title: 'Sao lưu và phục hồi dữ liệu tự động', diff: 'Mức 1', points: 60, skill: 'System', solveRate: 82, status: 'completed' },
        { code: 'firewall-config', title: 'Cấu hình tường lửa iptables', diff: 'Mức 2', points: 100, skill: 'Firewall', solveRate: 58, status: 'in_progress' },
        { code: 'fail2ban', title: 'Chống brute-force SSH với Fail2ban', diff: 'Mức 1', points: 50, skill: 'Hardening', solveRate: 71, status: 'available' },
        { code: 'snort-ids', title: 'Triển khai phát hiện xâm nhập Snort', diff: 'Mức 2', points: 120, skill: 'IDS/IPS', solveRate: 46, status: 'available' },
      ],
    },
    {
      id: 'stage_3',
      title: 'Chặng 3: Tấn công Web & Khai thác phần mềm',
      subtitle: 'Web Penetration & Binary Exploitation',
      desc: 'Phân tích các lỗ hổng OWASP Top 10 phổ biến, leo thang đặc quyền Linux và kiểm thử xâm nhập.',
      icon: 'code',
      labs: [
        { code: 'metasploit', title: 'Khai thác lỗ hổng với Metasploit', diff: 'Mức 2', points: 120, skill: 'Pwn', solveRate: 62, status: 'completed' },
        { code: 'sql-inj', title: 'Khai thác SQL Injection cơ bản', diff: 'Mức 2', points: 120, skill: 'Web', solveRate: 55, status: 'in_progress' },
        { code: 'xss-stored', title: 'Khai thác Stored XSS vượt cookie', diff: 'Mức 2', points: 120, skill: 'Web', solveRate: 48, status: 'available' },
        { code: 'privesc-linux', title: 'Leo thang đặc quyền Linux qua SUID', diff: 'Mức 3', points: 200, skill: 'PrivEsc', solveRate: 32, status: 'available' },
      ],
    },
    {
      id: 'stage_4',
      title: 'Chặng 4: Mật mã học & Dịch ngược mã độc',
      subtitle: 'Advanced Cryptography & Reverse Engineering',
      desc: 'Bẻ khóa mật mã đối xứng, tấn công RSA modulus yếu, dịch ngược file nhị phân ELF và điều tra số.',
      icon: 'lock',
      labs: [
        { code: 'classic-cipher', title: 'Giải mã bản mã cổ điển Caesar / Vigenere', diff: 'Mức 1', points: 40, skill: 'Crypto', solveRate: 91, status: 'completed' },
        { code: 'rsa-weak', title: 'Bẻ khóa RSA modulus yếu với Fermat', diff: 'Mức 3', points: 200, skill: 'Crypto', solveRate: 38, status: 'in_progress' },
        { code: 'reverse-elf', title: 'Dịch ngược file ELF x64 với Ghidra/GDB', diff: 'Mức 3', points: 200, skill: 'Reverse', solveRate: 29, status: 'locked' },
        { code: 'pcap-analyze', title: 'Điều tra số lưu lượng mạng độc hại Wireshark', diff: 'Mức 2', points: 100, skill: 'Forensics', solveRate: 42, status: 'locked' },
      ],
    },
  ];

  const baseComments = [
    {
      id: 'SCM-001',
      userId: 7,
      parentId: null,
      account: 'B23DCCN135',
      name: 'Vũ Trung Đức',
      role: 'Sinh viên',
      time: '2026-07-05',
      content: 'Máy ảo của em bị lag quá, khởi động Labtainer mất gần 5 phút mới vào được terminal. Có ai bị giống em không ạ?',
    },
    {
      id: 'SCM-002',
      userId: 1,
      parentId: 'SCM-001',
      account: 'gv.khanh',
      name: 'Thầy Khánh',
      role: 'Giảng viên',
      time: '2026-07-05',
      content: 'Em thử kiểm tra lại dung lượng RAM cấp cho máy ảo nhé. Cần tối thiểu 4GB RAM để Labtainer hoạt động trơn tru.',
    },
    {
      id: 'SCM-003',
      userId: 7,
      parentId: 'SCM-002',
      account: 'B23DCCN135',
      name: 'Vũ Trung Đức',
      role: 'Sinh viên',
      time: '2026-07-05',
      content: 'Dạ em tăng lên 4GB RAM thì chạy mượt rồi ạ, em cảm ơn thầy!',
    },
    {
      id: 'SCM-004',
      userId: 9,
      parentId: null,
      account: 'B23DCAT051',
      name: 'Trần Thu Trang',
      role: 'Sinh viên',
      time: '2026-07-04',
      content: 'Bước 3 mình chạy nmap -sV mãi không hiện version của dịch vụ, thử thêm cờ -Pn thì được nhé mọi người.',
    },
    {
      id: 'SCM-005',
      userId: 4,
      parentId: 'SCM-004',
      account: 'tg.linh',
      name: 'Cô Thùy Linh',
      role: 'Trợ giảng',
      time: '2026-07-04',
      content: 'Đúng rồi Trang nhé. Cờ -Pn bỏ qua bước host discovery (ping probe), rất hữu ích khi máy đích chặn gói tin ICMP.',
    },
  ];

  const assignmentDetails = {
    'nmap-discovery': {
      title: 'Quét mạng và dịch vụ cơ bản',
      courseName: 'An toàn & Bảo mật HTTT',
      classCode: 'INT1449.01',
      group: 'Quét mạng',
      sub: 'Công cụ quét mạng',
      diff: 'Mức 1',
      points: 50,
      attempts: '4/4',
      status: 'AC',
      deadline: '2026-09-20 23:59',
      codeMetrics: { testCases: '6/6 tests', timeLimit: '1.0s', memoryLimit: '256MB', rubric: 'Chấm tự động .lab (Chức năng 70%, Tối ưu 30%)' },
      desc: 'Sử dụng Nmap để phát hiện host còn sống, quét cổng và định danh dịch vụ đang chạy trên dải mạng mục tiêu.',
      steps: [
        { n: 1, t: 'Khởi động Labtainer', d: 'Chạy lệnh khởi tạo lab và xác nhận môi trường máy ảo đã sẵn sàng.' },
        { n: 2, t: 'Quét host sống', d: 'Dùng nmap -sn quét toàn dải mạng để liệt kê host đang hoạt động.' },
        { n: 3, t: 'Quét cổng & dịch vụ', d: 'Chạy nmap -sV trên host mục tiêu, ghi lại cổng mở và phiên bản dịch vụ.' },
        { n: 4, t: 'Lưu kết quả', d: 'Xuất kết quả, hệ thống tự sinh file .lab để nộp.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'backup2': {
      title: 'Sao lưu và phục hồi dữ liệu',
      courseName: 'An toàn & Bảo mật HTTT',
      classCode: 'INT1449.01',
      group: 'Quản trị hệ thống',
      sub: 'Backup',
      diff: 'Mức 1',
      points: 60,
      attempts: '0/1',
      status: 'WFN',
      deadline: '2026-09-22 23:59',
      codeMetrics: { testCases: '5/5 tests', timeLimit: '2.0s', memoryLimit: '512MB', rubric: 'Chấm tự động cron script và khôi phục dữ liệu' },
      desc: 'Cấu hình sao lưu tự động, mô phỏng sự cố mất dữ liệu và thực hiện phục hồi hệ thống từ bản backup.',
      steps: [
        { n: 1, t: 'Tạo lịch sao lưu', d: 'Cấu hình cron job sao lưu định kỳ thư mục dữ liệu.' },
        { n: 2, t: 'Mô phỏng sự cố', d: 'Xoá dữ liệu gốc để giả lập mất mát.' },
        { n: 3, t: 'Phục hồi', d: 'Khôi phục dữ liệu từ bản backup gần nhất.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'firewall-config': {
      title: 'Cấu hình tường lửa iptables',
      courseName: 'An toàn & Bảo mật HTTT',
      classCode: 'INT1449.01',
      group: 'Phòng thủ mạng',
      sub: 'Firewall',
      diff: 'Mức 2',
      points: 100,
      attempts: '4/4',
      status: 'AC',
      deadline: '2026-09-18 23:59',
      codeMetrics: { testCases: '10/10 tests', timeLimit: '1.5s', memoryLimit: '256MB', rubric: 'Lọc gói tin INPUT/FORWARD và chính sách DROP' },
      desc: 'Thiết lập bộ luật iptables lọc lưu lượng, chặn cổng không cần thiết và ghi log kết nối đáng ngờ.',
      steps: [
        { n: 1, t: 'Xác định chính sách', d: 'Đặt policy mặc định DROP cho INPUT và FORWARD.' },
        { n: 2, t: 'Cho phép dịch vụ cần thiết', d: 'Mở cổng SSH và HTTP theo yêu cầu.' },
        { n: 3, t: 'Ghi log kết nối', d: 'Thêm luật LOG cho gói tin bị chặn.' },
        { n: 4, t: 'Kiểm thử', d: 'Dùng nmap từ máy ngoài để xác nhận luật.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'nmap-advanced': {
      title: 'Quét mạng và dịch vụ nâng cao',
      courseName: 'An toàn & Bảo mật HTTT',
      classCode: 'INT1449.01',
      group: 'Quét mạng',
      sub: 'Công cụ quét mạng',
      diff: 'Mức 2',
      points: 90,
      attempts: '0/1',
      status: 'WF',
      deadline: '2026-09-25 23:59',
      codeMetrics: { testCases: '8/8 tests', timeLimit: '2.0s', memoryLimit: '256MB', rubric: 'Vượt qua bộ lọc firewall và trích xuất đúng banner' },
      desc: 'Thực hiện kỹ thuật quét mạng tránh né hệ thống phát hiện xâm nhập (IDS), quét phân mảnh gói tin và phát hiện phiên bản dịch vụ.',
      steps: [
        { n: 1, t: 'Cấu hình kỹ thuật né tránh', d: 'Sử dụng kỹ thuật decoy và phân mảnh MTU với Nmap.' },
        { n: 2, t: 'Quét sâu phiên bản dịch vụ', d: 'Chạy Nmap script engine (NSE) trên các cổng lọc.' },
        { n: 3, t: 'Ghi nhận và xuất chứng chỉ', d: 'Đóng gói chứng nhận thực hành sang file .lab.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'linux-privesc': {
      title: 'Leo thang đặc quyền Linux',
      courseName: 'An toàn & Bảo mật HTTT',
      classCode: 'INT1449.01',
      group: 'Khai thác',
      sub: 'PrivEsc',
      diff: 'Mức 3',
      points: 150,
      attempts: '0/4',
      status: 'CPY',
      deadline: '2026-09-30 23:59',
      codeMetrics: { testCases: '8/8 tests', timeLimit: '3.0s', memoryLimit: '512MB', rubric: 'Khai thác SUID binary & lấy root flag hợp lệ' },
      desc: 'Khai thác cấu hình sudo sai, SUID binary và cron job để leo thang từ user thường lên quyền root.',
      steps: [
        { n: 1, t: 'Thu thập thông tin hệ thống', d: 'Liệt kê kernel, quyền sudo và binary có cờ SUID.' },
        { n: 2, t: 'Xác định vector tấn công', d: 'Phân tích cấu hình sai có thể khai thác leo quyền.' },
        { n: 3, t: 'Thực thi khai thác', d: 'Thực thi payload leo quyền lên root.' },
        { n: 4, t: 'Thu thập cờ chứng minh', d: 'Truy cập thư mục /root và ghi bằng chứng hoàn thành.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'ids-snort': {
      title: 'Phát hiện xâm nhập với Snort',
      courseName: 'An toàn & Bảo mật HTTT',
      classCode: 'INT1449.01',
      group: 'Phòng thủ mạng',
      sub: 'IDS',
      diff: 'Mức 2',
      points: 100,
      attempts: null,
      status: null,
      deadline: '2026-10-05 23:59',
      codeMetrics: { testCases: '7/7 tests', timeLimit: '2.0s', memoryLimit: '256MB', rubric: 'Bắt đúng gói tin tấn công và ghi alert log chuẩn' },
      desc: 'Cấu hình hệ thống phát hiện xâm nhập Snort, viết rule phát hiện quét cổng và tấn công DoS.',
      steps: [
        { n: 1, t: 'Khởi tạo môi trường IDS', d: 'Kiểm tra tệp snort.conf và các interface mạng.' },
        { n: 2, t: 'Viết luật phát hiện', d: 'Thêm rule bắt gói tin ICMP echo và TCP SYN flood.' },
        { n: 3, t: 'Mô phỏng tấn công & kiểm tra alert', d: 'Chạy tấn công giả lập và kiểm tra alert log.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'gdb-debug': {
      title: 'Gỡ rối chương trình với GDB',
      courseName: 'Kiểm thử xâm nhập',
      classCode: 'WEB3021.01',
      group: 'Khai thác nhị phân',
      sub: 'Debugging',
      diff: 'Mức 2',
      points: 50,
      attempts: '6/8',
      status: 'WA',
      deadline: '2026-09-24 23:59',
      codeMetrics: { testCases: '8/8 tests', timeLimit: '2.0s', memoryLimit: '256MB', rubric: 'Gỡ rối lỗi bộ nhớ và tìm vị trí crash' },
      desc: 'Sử dụng GDB đặt breakpoint, kiểm tra thanh ghi và tìm nguyên nhân lỗi của một chương trình C++.',
      steps: [
        { n: 1, t: 'Biên dịch kèm debug symbol', d: 'Compile chương trình với cờ -g giữ symbol.' },
        { n: 2, t: 'Đặt breakpoint và quan sát', d: 'Dừng tại hàm nghi ngờ, quan sát biến và thanh ghi.' },
        { n: 3, t: 'Phân tích nguyên nhân crash', d: 'Xác định dòng lệnh gây lỗi và sửa lỗi bộ nhớ.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'metasploit-intro': {
      title: 'Khai thác lỗ hổng với Metasploit',
      courseName: 'Kiểm thử xâm nhập',
      classCode: 'WEB3021.01',
      group: 'Khai thác',
      sub: 'Metasploit',
      diff: 'Mức 2',
      points: 120,
      attempts: '3/4',
      status: 'WA',
      deadline: '2026-09-20 23:59',
      codeMetrics: { testCases: '10/10 tests', timeLimit: '3.0s', memoryLimit: '512MB', rubric: 'Chiếm Meterpreter shell và thu thập chứng cứ' },
      desc: 'Dùng Metasploit Framework tìm kiếm, cấu hình và thực thi module khai thác trên dịch vụ mục tiêu.',
      steps: [
        { n: 1, t: 'Tìm module khai thác', d: 'Tìm module phù hợp với phiên bản dịch vụ.' },
        { n: 2, t: 'Cấu hình payload', d: 'Thiết lập RHOSTS, LHOST và reverse shell.' },
        { n: 3, t: 'Thực thi khai thác', d: 'Chạy exploit và xác nhận phiên Meterpreter.' },
        { n: 4, t: 'Hậu khai thác', d: 'Thu thập thông tin hệ thống và trích xuất cờ.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'sqli-basic': {
      title: 'Khai thác SQL Injection cơ bản',
      courseName: 'Kiểm thử xâm nhập',
      classCode: 'WEB3021.01',
      group: 'Web',
      sub: 'SQL Injection',
      diff: 'Mức 1',
      points: 70,
      attempts: '2/4',
      status: 'WA',
      deadline: '2026-09-28 23:59',
      codeMetrics: { testCases: '9/9 tests', timeLimit: '2.0s', memoryLimit: '256MB', rubric: 'Trích xuất thành công bảng người dùng và mật khẩu' },
      desc: 'Phát hiện và khai thác lỗ hổng SQL Injection dạng Union-based trên ứng dụng web mẫu để trích xuất dữ liệu đăng nhập quản trị.',
      steps: [
        { n: 1, t: 'Thăm dò tham số đầu vào', d: 'Chèn ký tự đặc biệt kiểm tra lỗi SQL trả về.' },
        { n: 2, t: 'Xác định số cột bằng ORDER BY', d: 'Tìm số cột và kiểu dữ liệu trả về của truy vấn.' },
        { n: 3, t: 'Trích xuất dữ liệu qua UNION SELECT', d: 'Đọc tên bảng, cột và giá trị mật khẩu hash.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'xss-stored': {
      title: 'Stored XSS trên diễn đàn mẫu',
      courseName: 'Kiểm thử xâm nhập',
      classCode: 'WEB3021.01',
      group: 'Web',
      sub: 'XSS',
      diff: 'Mức 2',
      points: 90,
      attempts: null,
      status: null,
      deadline: '2026-10-02 23:59',
      codeMetrics: { testCases: '7/7 tests', timeLimit: '1.5s', memoryLimit: '256MB', rubric: 'Thực thi script JavaScript và lấy cookie quản trị' },
      desc: 'Phân tích tính năng bình luận của diễn đàn mẫu, khai thác lỗ hổng Stored XSS để đánh cắp phiên làm việc của quản trị viên.',
      steps: [
        { n: 1, t: 'Kiểm tra cơ chế lọc đầu vào', d: 'Thử nghiệm các thẻ HTML và thuộc tính sự kiện.' },
        { n: 2, t: 'Xây dựng payload Stored XSS', d: 'Chèn mã script gửi cookie về máy chủ kiểm thử.' },
        { n: 3, t: 'Xác nhận cướp phiên', d: 'Đăng nhập vào trang quản trị bằng session cookie vừa lấy.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'classic-cipher': {
      title: 'Giải mã cổ điển',
      courseName: 'Mật mã học ứng dụng',
      classCode: 'CRY2010.01',
      group: 'Mật mã',
      sub: 'Cổ điển',
      diff: 'Mức 1',
      points: 40,
      attempts: '3/3',
      status: 'AC',
      deadline: '2026-09-15 23:59',
      codeMetrics: { testCases: '6/6 tests', timeLimit: '1.0s', memoryLimit: '128MB', rubric: 'Khôi phục bản rõ đúng tần suất ký tự' },
      desc: 'Phân tích tần suất và giải mã các bản mã Caesar, Vigenere và substitution cơ bản.',
      steps: [
        { n: 1, t: 'Phân tích tần suất', d: 'Thống kê tần suất xuất hiện ký tự.' },
        { n: 2, t: 'Dự đoán khóa giải mã', d: 'Suy luận độ dịch và khóa bí mật.' },
        { n: 3, t: 'Giải mã và khôi phục bản rõ', d: 'Khôi phục thông điệp gốc và trích xuất cờ.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'rsa-weak': {
      title: 'Bẻ khóa RSA modulus yếu',
      courseName: 'Mật mã học ứng dụng',
      classCode: 'CRY2010.01',
      group: 'Mật mã',
      sub: 'RSA',
      diff: 'Mức 3',
      points: 140,
      attempts: '1/3',
      status: 'WA',
      deadline: '2026-10-08 23:59',
      codeMetrics: { testCases: '8/8 tests', timeLimit: '4.0s', memoryLimit: '512MB', rubric: 'Tách nhân tử p, q bằng thuật toán Fermat' },
      desc: 'Phân tích modulus RSA có thừa số gần nhau, dùng Fermat factorization để khôi phục khóa riêng.',
      steps: [
        { n: 1, t: 'Thu thập public key', d: 'Trích xuất số mũ e và modulus n.' },
        { n: 2, t: 'Phân tích nhân tử bằng Fermat', d: 'Fermat factorization tách p và q.' },
        { n: 3, t: 'Tính khóa riêng và giải mã', d: 'Tính số mũ riêng d và giải mã ciphertext.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
    'hash-collide': {
      title: 'Va chạm băm MD5',
      courseName: 'Mật mã học ứng dụng',
      classCode: 'CRY2010.01',
      group: 'Mật mã',
      sub: 'Hàm băm',
      diff: 'Mức 2',
      points: 80,
      attempts: null,
      status: null,
      deadline: '2026-10-12 23:59',
      codeMetrics: { testCases: '6/6 tests', timeLimit: '3.0s', memoryLimit: '256MB', rubric: 'Tạo hai tệp khác nhau có cùng hash MD5' },
      desc: 'Mô phỏng kỹ thuật tạo hai tệp nhị phân có nội dung khác nhau nhưng cho ra cùng một mã băm MD5 bằng thuật toán Fastcoll.',
      steps: [
        { n: 1, t: 'Khởi tạo tiền tố tệp', d: 'Chuẩn bị tệp nhị phân mẫu với tiền tố cố định.' },
        { n: 2, t: 'Sinh cặp khối va chạm', d: 'Sử dụng công cụ Fastcoll sinh hai khối dữ liệu va chạm.' },
        { n: 3, t: 'Kiểm tra mã băm MD5', d: 'So sánh md5sum và sha256sum của hai tệp kết quả.' },
      ],
      expected: 'File kết quả phải ghi đầy đủ tiến trình của mọi bước mới được hệ thống chấm Accepted.',
    },
  };

  window.CLX.publicLabMapStages = publicLabMapStages;
  window.CLX.baseComments = baseComments;
  window.CLX.assignmentDetails = assignmentDetails;
})();


/* Dữ liệu bổ sung: nội quy phòng thi và danh sách sinh viên bảng xếp hạng (phục vụ phân trang) */
(function () {
  if (!window.CLX) return;
  window.CLX.examRules = [
    'Không gian lận, trao đổi bài dưới mọi hình thức trong suốt ca thi.',
    'Không sử dụng công cụ AI (ChatGPT, Copilot...) để làm bài.',
    'Không chuyển tab, mở ứng dụng ngoài hay tìm kiếm trên Internet.',
    'Chỉ nộp file .lab được sinh tự động, không tự chỉnh sửa tên file.',
    'Mọi thao tác đều được ghi log; vi phạm sẽ bị hủy kết quả ca thi.'
  ];

  const moreNames = [
    'Nguyễn Minh Hoàng', 'Trịnh Bá Đạt', 'Lê Quỳnh Nga', 'Đào Duy Anh', 'Vũ Quốc Huy',
    'Tạ Thị Mai', 'Dương Văn Lâm', 'Hồ Ngọc Hà', 'Bùi Đức Trọng', 'Cao Tiến Dũng',
    'Mai Văn Tài', 'Trương Hoài Nam', 'Đoàn Mỹ Duyên', 'Lý Hải Đăng', 'Nguyễn Thị Yến',
    'Phạm Văn Cương', 'Nguyễn Văn Kiên', 'Trần Hoài An'
  ];
  moreNames.forEach(function (name) {
    const i = window.CLX.leaderboard.length;
    const tried = Math.max(12, 30 - Math.floor(i * 0.7));
    const correct = Math.max(4, Math.floor(tried * 0.65));
    window.CLX.leaderboard.push({
      rank: i + 1,
      name: name,
      account: 'B23DCAT' + String(i + 1).padStart(3, '0'),
      classCode: 'INT1449.01',
      correct: correct,
      tried: tried,
      trend: [0, 1, -1, 0, 2, -1, 0][i % 7],
      xp: Math.max(2100, 9800 - i * 260),
      initials: name.split(' ').slice(-2).map(function (w) { return w[0]; }).join(''),
      me: false
    });
  });
})();

/* Mốc "hôm nay" cố định của dữ liệu mẫu (các hạn nộp trong data.js nằm quanh ngày này) để giao diện luôn giống nhau mỗi lần mở. */
window.CLX.today = '2026-09-18';
