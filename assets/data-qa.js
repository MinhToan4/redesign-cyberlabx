/* Dữ liệu hội thoại chi tiết cho trang Hỏi đáp 1-1 của Giảng viên.
   Gắn vào window.CLX_QA. */
(function () {
  var threads = {
    'B23DCCN135': [
      { id: 1, sender: 'student', senderName: 'Vũ Trung Đức', time: '10:15', text: 'Thưa thầy, em vừa nộp bài Sao lưu và phục hồi dữ liệu (backup2) nhưng hệ thống báo lỗi WFN ạ.' },
      { id: 2, sender: 'teacher', senderName: 'ThS. Nguyễn Văn An', time: '10:20', text: 'Chào Đức, mã WFN là Wrong File Name. Em kiểm tra lại quy tắc đặt tên tệp kết quả từ câu lệnh stoplab.' },
      { id: 3, sender: 'student', senderName: 'Vũ Trung Đức', time: '10:28', text: 'Dạ em đổi tên tệp thành backup2.lab theo tên bài nhưng máy chấm vẫn không nhận.' },
      { id: 4, sender: 'student', senderName: 'Vũ Trung Đức', time: '10:32', text: 'Em nộp file .lab nhưng báo WFN, em phải làm sao ạ?' }
    ],
    'B23DCAT003': [
      { id: 1, sender: 'student', senderName: 'Lê Việt Anh', time: '09:05', text: 'Thầy cho em hỏi bài Cấu hình tường lửa iptables, em đã chạy lệnh iptables -A INPUT -p tcp --dport 22 -j DROP trên máy trạm.' },
      { id: 2, sender: 'teacher', senderName: 'ThS. Nguyễn Văn An', time: '09:18', text: 'Chào Việt Anh, kịch bản chấm bài kiểm tra rule ở chuỗi FORWARD giữa hai subnet thay vì INPUT của loopback.' },
      { id: 3, sender: 'student', senderName: 'Lê Việt Anh', time: '09:45', text: 'Bài iptables em chặn được cổng 22 nhưng vẫn WA ở bước 3.' }
    ],
    'B23DCAT005': [
      { id: 1, sender: 'student', senderName: 'Phạm Thu Hà', time: 'Hôm qua 15:10', text: 'Thưa thầy, em gặp lỗi permission denied khi ghi log vào /var/log/snort ở bài Quét mạng.' },
      { id: 2, sender: 'teacher', senderName: 'ThS. Nguyễn Văn An', time: 'Hôm qua 15:30', text: 'Em kiểm tra nhóm quyền người dùng của tiến trình snort, cần chạy dưới sudo hoặc thêm quyền ghi thư mục log.' },
      { id: 3, sender: 'student', senderName: 'Phạm Thu Hà', time: 'Hôm qua 16:02', text: 'Cảm ơn thầy, em đã nộp lại và được AC.' }
    ],
    'B23DCAT006': [
      { id: 1, sender: 'student', senderName: 'Trần Đăng Khoa', time: 'Hôm qua 14:20', text: 'Em chào thầy ạ. Máy ảo Labtainer của em không khởi động được, báo thiếu RAM.' }
    ],
    'B23DCAT007': [
      { id: 1, sender: 'student', senderName: 'Đỗ Minh Quân', time: '13/09 08:30', text: 'Kính gửi thầy, hôm qua em bị sốt xuất huyết phải vào viện truyền dịch nên chưa kịp hoàn thiện bài backup.' },
      { id: 2, sender: 'student', senderName: 'Đỗ Minh Quân', time: '13/09 08:35', text: 'Em xin gia hạn bài backup2 thêm một ngày vì ốm.' },
      { id: 3, sender: 'teacher', senderName: 'ThS. Nguyễn Văn An', time: '13/09 09:10', text: 'Được em nhé, thầy đã mở thêm 24 giờ cho tài khoản của em trên hệ thống. Giữ gìn sức khỏe.' }
    ],
    'B23DCAT008': [
      { id: 1, sender: 'student', senderName: 'Ngô Bảo Ngọc', time: '12/09 16:15', text: 'Thầy cho em hỏi quy tắc đặt tên tệp .lab khi xuất từ lệnh stoplab.' },
      { id: 2, sender: 'teacher', senderName: 'ThS. Nguyễn Văn An', time: '12/09 17:00', text: 'Tệp sinh ra tự động có dạng <tên_lab>.<email_sv>.lab trong thư mục ~/labtainer_xfer. Em không sửa tên tệp này trước khi tải lên hệ thống nhé.' }
    ]
  };

  window.CLX_QA = {
    threads: threads,
    assignmentMap: {
      'B23DCCN135': { code: 'backup2', title: 'Sao lưu và phục hồi dữ liệu', course: 'INT1449.01' },
      'B23DCAT003': { code: 'firewall-config', title: 'Cấu hình tường lửa iptables', course: 'INT1449.01' },
      'B23DCAT005': { code: 'nmap-discovery', title: 'Quét mạng và dịch vụ cơ bản', course: 'INT1449.01' },
      'B23DCAT006': { code: 'ids-snort', title: 'Phát hiện xâm nhập với Snort', course: 'INT1449.01' },
      'B23DCAT007': { code: 'backup2', title: 'Sao lưu và phục hồi dữ liệu', course: 'INT1449.01' },
      'B23DCAT008': { code: 'nmap-discovery', title: 'Quét mạng và dịch vụ cơ bản', course: 'INT1449.01' }
    }
  };
})();
