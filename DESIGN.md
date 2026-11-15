# CyberLabX — thiết kế lại giao diện Sinh viên (prototype)

Mở `index.html` bằng trình duyệt (cần mạng cho font IBM Plex Sans/Mono và icon Lucide). Không có bước build.

- Chuẩn giao diện đầy đủ (dành cho người và agent): `skills/cyberlabx-ui/SKILL.md`
- Mã mẫu thành phần: `skills/cyberlabx-ui/references/components.md`
- Trang mẫu: `dashboard.html`
- Dữ liệu mẫu: `assets/data.js` · Ảnh kiểm tra: `_audit/`

## Hướng thiết kế

"Sổ tay phòng lab" phong cách an toàn thông tin: yên tĩnh, chính xác, nhiều dữ liệu, ít trang trí. Nền gần đen và một màu nhấn cam hổ phách (tham khảo aws-quest), màu còn lại chỉ để báo kết quả bài nộp. Góc vát 45° và bộ icon riêng nét vuông. Chữ monospace chỉ cho mã. Chip kết quả AC/WA/WF/WFN/CPY là chi tiết đặc trưng.

## Đã bỏ so với bản hiện tại

Ảnh 3D và icon phát sáng, viền glow, gradient, banner hero minh họa, tiêu đề cỡ lớn lặp tên trang, logo giữa topbar, ba nút icon lạ ở topbar, nút nổi ChatBot phát sáng, tiêu đề tiếng Anh.
Giữ nguyên: 6 mục điều hướng, các trang, các cột/bộ lọc/hành động đang có; chỉ sắp xếp lại cho gọn.
