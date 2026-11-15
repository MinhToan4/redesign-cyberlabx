# Hướng dẫn cho mọi agent làm việc trong thư mục này

Đây là bản thiết kế lại giao diện CyberLabX (prototype tĩnh HTML/CSS/JS, không build).

**BẮT BUỘC** đọc trước khi tạo hoặc sửa bất kỳ giao diện nào:

1. `skills/cyberlabx-ui/SKILL.md` — chuẩn giao diện (token, chữ, lưới, bố cục, trạng thái, nội dung, truy cập, checklist chống slop).
2. `skills/cyberlabx-ui/references/components.md` — mã mẫu từng thành phần, bảng icon.
3. `dashboard.html` — trang mẫu chuẩn.

Luật ngắn: nền tối gần đen trung tính (#08090b), nền sáng trắng thuần, điểm nhấn cam hổ phách, bo góc ĐỐI XỨNG theo token `--r-*`, icon bộ riêng `assets/icons.js` (nét vuông); TUYỆT ĐỐI không glow/đổ bóng/blur quanh viền, nút, card, ô nhập (focus chỉ đổi màu viền); chỉ dùng token/class trong `assets/`; không hex, gradient, emoji, dấu chấm than; không tiêu đề lớn lặp tên trang; một màu nhấn; bảng là CSS grid + phân trang; tiếng Việt có dấu; không bịa dữ liệu (lấy từ `assets/data.js`); không sửa `assets/*` khi chưa được giao, ghi nhu cầu vào `NOTES.md` (sổ tạm cục bộ).
Làm xong phải tự chụp ảnh (cách chụp ở mục 12 của SKILL.md), xem lại sáng + tối, 1440px + 390px, và duyệt checklist mục 13.

Vai trò khác Sinh viên nằm trong `teacher/`, `ta/`, `admin/` (xem mục 16 SKILL.md: `data-role`, `../assets/`, `assets/data-staff.js`). Chi tiết đặc trưng và quy tắc biểu đồ: mục 15 và 17. Phông chữ: IBM Plex Sans/Mono (không Inter).
