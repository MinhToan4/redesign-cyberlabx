# Hướng dẫn cho mọi agent làm việc trong thư mục này

Đây là bản thiết kế lại giao diện CyberLabX (prototype tĩnh HTML/CSS/JS, không build).

**BẮT BUỘC** đọc trước khi tạo hoặc sửa bất kỳ giao diện nào:

1. `skills/cyberlabx-ui/SKILL.md` — chuẩn giao diện (token, chữ, lưới, bố cục, trạng thái, nội dung, truy cập, checklist chống slop).
2. `skills/cyberlabx-ui/references/components.md` — mã mẫu từng thành phần, bảng icon.
3. `dashboard.html` — trang mẫu chuẩn.

Luật ngắn: nền tối xám-đen thuần kiểu LeetCode (không xanh/tím); TUYỆT ĐỐI không glow/đổ bóng/blur quanh viền, nút, card, ô nhập (focus chỉ đổi màu viền); chỉ dùng token/class trong `assets/`; không hex, gradient, glow, emoji, dấu chấm than; không tiêu đề lớn lặp tên trang; một màu nhấn; bảng là CSS grid + phân trang; tiếng Việt có dấu; không bịa dữ liệu (lấy từ `assets/data.js`); không sửa `assets/*` khi chưa được giao, ghi nhu cầu vào `NOTES.md`.
Làm xong phải tự chụp ảnh (cách chụp ở mục 12 của SKILL.md), xem lại sáng + tối, 1440px + 390px, và duyệt checklist mục 13.
