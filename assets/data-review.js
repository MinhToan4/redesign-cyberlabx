/* Dữ liệu chi tiết duyệt bài tập cho Admin:
   Gắn vào window.CLX_REVIEW.
   Cung cấp thông tin đề bài, các bước thực hiện, thông số môi trường và tiêu chí chấm tự động cho từng bài chờ duyệt. */
(function () {
  var details = {
    'rv-01': {
      code: 'rv-01',
      summary: 'Thực hành cấu hình hệ thống phát hiện xâm nhập mạng Snort phiên bản 3 trên máy ảo Linux để phát hiện các mẫu tấn công quét cổng và DoS cơ bản.',
      course: 'INT1449 · An toàn & Bảo mật HTTT',
      targetAudience: 'Sinh viên năm 3 chuyên ngành An toàn thông tin',
      vmImage: 'clx-ubuntu-snort3:latest',
      ram: '2,048 MB',
      cpu: '1 vCPU',
      network: 'Mạng nội bộ cách ly (192.168.10.0/24)',
      steps: [
        {
          num: 1,
          name: 'Khởi động dịch vụ Snort và kiểm tra tệp cấu hình snort.lua',
          detail: 'Kiểm tra cú pháp cấu hình snort.lua bằng lệnh snort -c /etc/snort/snort.lua -T và đảm bảo không có cảnh báo nghiêm trọng.',
          verify: 'snort -c /etc/snort/snort.lua -T trả về exit code 0'
        },
        {
          num: 2,
          name: 'Soạn thảo luật phát hiện gói tin ICMP ping bất thường',
          detail: 'Tạo tệp quy tắc /etc/snort/rules/local.rules chứa luật cảnh báo khi nhận gói ICMP echo-request có độ dài payload lớn hơn 100 bytes.',
          verify: 'Luật đúng cú pháp và bắt được gói tin test'
        },
        {
          num: 3,
          name: 'Khai thác kịch bản quét cổng Nmap và ghi nhật ký cảnh báo',
          detail: 'Dùng kịch bản quét SYN từ máy tấn công 192.168.10.5, kiểm tra tệp /var/log/snort/alert_fast ghi nhận sự kiện SCAN SYN.',
          verify: 'Nhật ký /var/log/snort/alert_fast chứa dòng khớp quy tắc'
        }
      ],
      grading: {
        mode: 'Tự động kiểm tra máy ảo (VM Agent)',
        timeout: '15 phút',
        maxScore: 100,
        criteria: [
          { name: 'Cú pháp cấu hình hợp lệ', score: '30 điểm', check: 'Kiểm tra tệp snort.lua không lỗi' },
          { name: 'Quy tắc phát hiện ICMP chính xác', score: '35 điểm', check: 'Gửi 5 gói tin ICMP kích hoạt đúng alert' },
          { name: 'Ghi nhật ký quét SYN đầy đủ', score: '35 điểm', check: 'Kiểm tra dòng log có IP nguồn và cờ SYN' }
        ]
      }
    },
    'rv-02': {
      code: 'rv-02',
      summary: 'Bài lập trình mô phỏng tấn công giả mạo ARP (ARP Spoofing) bằng thư viện Scapy trong Python để đầu độc bảng định tuyến ARP giữa máy nạn nhân và cổng mặc định.',
      course: 'WEB3021 · Kiểm thử xâm nhập',
      targetAudience: 'Sinh viên năm 3 lớp Kiểm thử xâm nhập',
      vmImage: 'clx-kali-scapy:2026.2',
      ram: '2,048 MB',
      cpu: '1 vCPU',
      network: 'Mạng ảo LAN kép (Attacker, Victim, Gateway)',
      steps: [
        {
          num: 1,
          name: 'Xác định địa chỉ IP và MAC của Gateway và Target',
          detail: 'Sử dụng lệnh arp-scan hoặc thư viện Scapy để tìm đúng địa chỉ MAC tương ứng với 192.168.1.1 và 192.168.1.50.',
          verify: 'Tạo đúng bản ghi tương ứng trong mã nguồn script.py'
        },
        {
          num: 2,
          name: 'Viết mã gửi gói tin ARP Reply giả mạo theo chu kỳ',
          detail: 'Gửi gói ARP op=2 liên tục mỗi 2 giây, thông báo MAC của máy tấn công là địa chỉ IP của Gateway tới Victim.',
          verify: 'Bảng ARP của Victim ánh xạ IP Gateway về MAC của Attacker'
        },
        {
          num: 3,
          name: 'Phục hồi bảng ARP ban đầu khi kết thúc kịch bản',
          detail: 'Bắt tín hiệu ngắt SIGINT để gửi các gói ARP hợp lệ hoàn trả lại bảng định tuyến cho hai bên.',
          verify: 'Bảng ARP trở lại trạng thái sạch sau khi dừng script'
        }
      ],
      grading: {
        mode: 'Chạy kiểm thử tự động với Scapy Mock',
        timeout: '10 phút',
        maxScore: 100,
        criteria: [
          { name: 'Tạo gói tin ARP hợp chuẩn', score: '40 điểm', check: 'Phân tích pcap gói tin sinh ra từ script' },
          { name: 'Duy trì luồng đầu độc bảng ARP', score: '30 điểm', check: 'Tỷ lệ gói tin giả mạo đạt chu kỳ 2s' },
          { name: 'Khôi phục trạng thái mạng khi ngắt', score: '30 điểm', check: 'Kiểm tra gói ARP restore khi SIGINT' }
        ]
      }
    },
    'rv-03': {
      code: 'rv-03',
      summary: 'Thiết lập đường hầm bảo mật VPN IPsec site-to-site giữa hai mạng chi nhánh sử dụng phần mềm strongSwan, xác thực khóa chia sẻ trước (PSK) và mã hóa AES-GCM.',
      course: 'INT1449 · An toàn & Bảo mật HTTT',
      targetAudience: 'Sinh viên chuyên ngành An toàn thông tin',
      vmImage: 'clx-strongswan:5.9.11',
      ram: '3,072 MB',
      cpu: '2 vCPU',
      network: 'Topo 3 máy: Router-A, Router-B và Wan-Emulation',
      steps: [
        {
          num: 1,
          name: 'Cấu hình định tuyến và địa chỉ IP cho giao diện mạng',
          detail: 'Cấu hình ipsec.conf trên Router-A và Router-B chỉ định subnet trái 10.10.1.0/24 và subnet phải 10.10.2.0/24.',
          verify: 'strongswan statusall hiển thị cấu hình connection đúng'
        },
        {
          num: 2,
          name: 'Cấu hình tệp bí mật ipsec.secrets với PSK',
          detail: 'Đặt khóa chia sẻ chung độ phức tạp cao, phân quyền tệp 600 an toàn trên cả hai nút mạng.',
          verify: 'Quyền tệp 0600 và ipsec secrets đọc không cảnh báo'
        },
        {
          num: 3,
          name: 'Khởi tạo kết nối IPsec và kiểm tra SA (Security Association)',
          detail: 'Thực thi lệnh ipsec up site-to-site và ping kiểm tra thông suốt giữa hai máy trạm bên trong hai mạng nội bộ.',
          verify: 'Lệnh ipsec status hiển thị ESTABLISHED; ping latency < 5ms'
        }
      ],
      grading: {
        mode: 'Kiểm tra bắt gói tin mã hóa ESP',
        timeout: '20 phút',
        maxScore: 100,
        criteria: [
          { name: 'Phiên IPsec IKEv2 ESTABLISHED', score: '40 điểm', check: 'Kiểm tra trạng thái strongSwan daemon' },
          { name: 'Lưu lượng truyền đi được đóng gói ESP', score: '35 điểm', check: 'Gói tin giữa 2 router là protocol 50 (ESP)' },
          { name: 'Thông suốt hai mạng LAN 10.10.x.x', score: '25 điểm', check: 'Ping thành công 5/5 gói giữa hai trạm' }
        ]
      }
    },
    'rv-04': {
      code: 'rv-04',
      summary: 'Bài tập trắc nghiệm và câu hỏi tính toán mật mã Vigenère nhiều khóa, phân tích chỉ số trùng khớp (Index of Coincidence) và phương pháp Kasiski để ước lượng độ dài khóa.',
      course: 'CRY2010 · Mật mã học ứng dụng',
      targetAudience: 'Sinh viên lớp Mật mã học ứng dụng',
      vmImage: 'Không dùng VM (chấm tự động trên nền tảng)',
      ram: '512 MB',
      cpu: '1 vCPU',
      network: 'Không yêu cầu mạng',
      steps: [
        {
          num: 1,
          name: 'Tìm khoảng cách giữa các chuỗi trùng lặp trong bản mã',
          detail: 'Xác định các cặp chuỗi lặp có độ dài >= 3 và tính ước chung lớn nhất của các khoảng cách theo phương pháp Kasiski.',
          verify: 'Trả về đúng ước lượng độ dài khóa d = 5'
        },
        {
          num: 2,
          name: 'Tính chỉ số trùng khớp IC cho từng lớp đồng dư',
          detail: 'Chia bản mã thành d dòng và tính IC của từng dòng để kiểm chứng gần bằng giá trị 0.065 của tiếng Anh.',
          verify: 'Giá trị tính toán sai số không quá 0.005'
        },
        {
          num: 3,
          name: 'Xác định từ khóa chính xác và giải mã hoàn chỉnh',
          detail: 'Dùng phân tích tần suất ký tự trên từng vị trí để khôi phục toàn bộ chuỗi khóa giải mã.',
          verify: 'Bản rõ đầu ra trùng khớp 100% với đề kiểm tra'
        }
      ],
      grading: {
        mode: 'Chấm tự động câu trả lời và hàm giải mã Python',
        timeout: '5 phút',
        maxScore: 100,
        criteria: [
          { name: 'Ước lượng độ dài khóa chính xác', score: '30 điểm', check: 'Kết quả Kasiski đúng' },
          { name: 'Tính toán IC chính xác', score: '30 điểm', check: 'Bảng IC sai số < 0.005' },
          { name: 'Khôi phục từ khóa và bản rõ', score: '40 điểm', check: 'Khóa giải mã khớp hoàn toàn' }
        ]
      }
    },
    'rv-05': {
      code: 'rv-05',
      summary: 'Khai thác lỗ hổng tràn bộ đệm trên ngăn xếp (stack-based buffer overflow) trên kiến trúc Linux x86 để ghi đè địa chỉ trả về EIP và chuyển hướng luồng thực thi vào hàm bí mật print_flag().',
      course: 'INT1449 · An toàn & Bảo mật HTTT',
      targetAudience: 'Sinh viên chuyên ngành An toàn thông tin',
      vmImage: 'clx-pwn-x86:debian-11',
      ram: '1,024 MB',
      cpu: '1 vCPU',
      network: 'Mạng nội bộ cổng 9999 (TCP service)',
      steps: [
        {
          num: 1,
          name: 'Phân tích nhị phân bằng GDB và tìm khoảng cách bù (offset)',
          detail: 'Sử dụng pattern create / pattern offset trong pwndbg để xác định số byte chính xác đến con trỏ lệnh EIP.',
          verify: 'Offset được xác định chính xác là 76 bytes'
        },
        {
          num: 2,
          name: 'Xác định địa chỉ hàm mục tiêu print_flag trong tệp nhị phân',
          detail: 'Dùng lệnh objdump -d hoặc gdb info address print_flag để trích xuất địa chỉ thực thi ở định dạng Little-Endian.',
          verify: 'Địa chỉ 0x0804856b được đóng gói chính xác'
        },
        {
          num: 3,
          name: 'Viết payload khai thác và lấy cờ từ máy chủ',
          detail: 'Sử dụng Python pwntools kết nối socket tới cổng 9999, gửi chuỗi padding 76 bytes + EIP để lấy chuỗi cờ flag{...}.',
          verify: 'Nhận được cờ đúng định dạng từ máy ảo chấm bài'
        }
      ],
      grading: {
        mode: 'Gửi payload qua socket tới dịch vụ thử nghiệm',
        timeout: '10 phút',
        maxScore: 100,
        criteria: [
          { name: 'Kiểm soát EIP thành công', score: '40 điểm', check: 'Crash log ghi nhận EIP bị đè' },
          { name: 'Chuyển hướng thành công vào hàm print_flag', score: '30 điểm', check: 'Hàm print_flag được gọi' },
          { name: 'Nhận đúng cờ nộp bài', score: '30 điểm', check: 'Cờ khớp với mã kiểm thử bí mật' }
        ]
      }
    },
    'rv-06': {
      code: 'rv-06',
      summary: 'Phân tích tệp nhật ký lưu lượng mạng PCAP bằng Wireshark và tshark để truy vết kẻ tấn công thực hiện trích xuất dữ liệu nhạy cảm qua giao thức DNS tunneling.',
      course: 'INT1449 · An toàn & Bảo mật HTTT',
      targetAudience: 'Sinh viên năm 3 An toàn thông tin',
      vmImage: 'clx-wireshark:latest',
      ram: '2,048 MB',
      cpu: '1 vCPU',
      network: 'Không cần mạng bên ngoài (làm việc trên tệp trace.pcap)',
      steps: [
        {
          num: 1,
          name: 'Lọc các truy vấn DNS có kích thước subdomain bất thường',
          detail: 'Sử dụng bộ lọc dns.flags.response == 0 && dns.qry.name.len > 40 để khoanh vùng các gói tin chứa dữ liệu mã hóa base64.',
          verify: 'Xác định đúng tên miền đích data-exfil.xyz'
        },
        {
          num: 2,
          name: 'Trích xuất toàn bộ chuỗi subdomain và ghép nối',
          detail: 'Dùng tshark -r trace.pcap -Y "dns.qry.name" -T fields -e dns.qry.name để xuất danh sách và ghép theo số thứ tự gói.',
          verify: 'Tạo thành công tệp dữ liệu mã hóa base32/base64'
        },
        {
          num: 3,
          name: 'Giải mã tệp tài liệu bí mật và nộp mã băm MD5',
          detail: 'Giải mã luồng dữ liệu trích xuất thành tệp PDF gốc và tính mã băm MD5 để chứng minh thu hồi tài liệu toàn vẹn.',
          verify: 'Mã băm MD5 khớp chính xác với bản gốc'
        }
      ],
      grading: {
        mode: 'Kiểm tra tệp nhật ký và đáp án trắc nghiệm + mã băm',
        timeout: '15 phút',
        maxScore: 100,
        criteria: [
          { name: 'Bộ lọc truy vấn DNS chính xác', score: '30 điểm', check: 'Xác định đúng IP nguồn và domain đích' },
          { name: 'Trích xuất luồng dữ liệu liên tục', score: '35 điểm', check: 'Số gói tin trích xuất đầy đủ 100%' },
          { name: 'Mã băm MD5 tài liệu chính xác', score: '35 điểm', check: 'Mã băm khớp tệp dữ liệu đề bài' }
        ]
      }
    },
    'rv-07': {
      code: 'rv-07',
      summary: 'Thực hiện gia cố an ninh (hardening) máy chủ OpenSSH trên hệ điều hành Ubuntu Server 22.04 LTS theo chuẩn bảo mật CIS Benchmark.',
      course: 'INT1449 · An toàn & Bảo mật HTTT',
      targetAudience: 'Sinh viên chuyên ngành An toàn thông tin',
      vmImage: 'clx-ubuntu-ssh:cis-bench',
      ram: '1,536 MB',
      cpu: '1 vCPU',
      network: 'Mạng quản trị 192.168.100.0/24',
      steps: [
        {
          num: 1,
          name: 'Vô hiệu hóa đăng nhập người dùng root và đổi cổng SSH',
          detail: 'Thiết lập PermitRootLogin no và Port 2222 trong tệp cấu hình /etc/ssh/sshd_config.',
          verify: 'sshd -t kiểm tra cấu hình hợp lệ'
        },
        {
          num: 2,
          name: 'Cấu hình xác thực khóa công khai và tắt xác thực mật khẩu',
          detail: 'Thiết lập PasswordAuthentication no và PubkeyAuthentication yes, cấu hình đúng quyền 700 thư mục ~/.ssh.',
          verify: 'Đăng nhập mật khẩu bị từ chối; chỉ chấp nhận khóa SSH'
        },
        {
          num: 3,
          name: 'Giới hạn số lần thử và cài đặt tường lửa UFW',
          detail: 'Thiết lập MaxAuthTries 3, kích hoạt UFW chỉ cho phép kết nối vào cổng 2222 từ dải mạng quản trị.',
          verify: 'ufw status verbose hiển thị đúng quy tắc cho phép'
        }
      ],
      grading: {
        mode: 'Quét tự động CIS Benchmark Script',
        timeout: '15 phút',
        maxScore: 100,
        criteria: [
          { name: 'Cổng SSH và cấm root', score: '30 điểm', check: 'Nmap kiểm tra cổng 2222 mở, 22 đóng; root bị chặn' },
          { name: 'Bắt buộc khóa SSH', score: '40 điểm', check: 'SSH handshake từ chối auth password' },
          { name: 'Cấu hình UFW và số lần thử', score: '30 điểm', check: 'Kiểm tra quy tắc UFW và MaxAuthTries' }
        ]
      }
    },
    'rv-08': {
      code: 'rv-08',
      summary: 'Bộ 20 câu hỏi trắc nghiệm chuyên sâu về phân tầng mạng mô hình OSI 7 tầng và bộ giao thức TCP/IP, kèm bài toán phân mảnh gói tin IP.',
      course: 'INT1449 · An toàn & Bảo mật HTTT',
      targetAudience: 'Sinh viên học phần Mạng máy tính & ATTT',
      vmImage: 'Không dùng VM (chấm trắc nghiệm)',
      ram: '512 MB',
      cpu: '1 vCPU',
      network: 'Không yêu cầu mạng',
      rejectionReason: 'Thiếu kịch bản kiểm tra bước 3 và chưa có flag mẫu kiểm thử cho bài toán phân mảnh gói tin IP.',
      steps: [
        {
          num: 1,
          name: '20 câu hỏi trắc nghiệm khách quan mô hình OSI và TCP/IP',
          detail: 'Ngân hàng câu hỏi trắc nghiệm xáo trộn ngẫu nhiên.',
          verify: 'Hệ thống tự động chấm điểm'
        },
        {
          num: 2,
          name: 'Bài toán tính toán phân mảnh gói tin IP qua mạng MTU 1500',
          detail: 'Tính số đoạn phân mảnh, offset và cờ MF.',
          verify: 'Kiểm tra kết quả tính toán'
        }
      ],
      grading: {
        mode: 'Chấm trắc nghiệm trực tuyến',
        timeout: '30 phút',
        maxScore: 100,
        criteria: [
          { name: 'Trắc nghiệm lý thuyết', score: '60 điểm', check: '12/20 câu đúng' },
          { name: 'Bài toán phân mảnh', score: '40 điểm', check: 'Tính đúng MTU và offset' }
        ]
      }
    }
  };

  window.CLX_REVIEW = details;
})();
