# Hướng dẫn chạy prototype CyberLabX (giao diện Sinh viên)

Đây là prototype tĩnh (HTML/CSS/JS thuần), không cần build, không cần cài gói. Có 2 cách xem.

> Font và icon đã được lưu sẵn trong `assets/vendor/`, nên prototype chạy được cả khi không có mạng. Muốn tải lại hoặc nâng phiên bản: `node tools/vendor-assets.js` (cần mạng).

## Cách 1 — Mở thẳng file (nhanh nhất)

Bấm đúp `index.html` ở thư mục gốc. Trình duyệt tự chuyển tới `dashboard.html`.

## Cách 2 — Chạy máy chủ cục bộ (khuyên dùng khi duyệt)

Cần Node.js (đã có sẵn trên máy này). Từ thư mục gốc `D:\redesign-cyberlabx`:

- Bấm đúp `huong-dan-chay\chay.bat`, hoặc
- Gõ lệnh: `node huong-dan-chay/serve.js` (đổi cổng: `node huong-dan-chay/serve.js 5300`)

Mở http://localhost:5200/ . Dừng bằng `Ctrl+C` (hoặc đóng cửa sổ).

Máy chủ chỉ nghe trên `127.0.0.1` (máy bạn), không mở ra mạng LAN, và không cache nên sửa file xong chỉ cần F5.

## Các trang

Mở `/index.html` để chọn vai trò và xem toàn bộ 28 màn hình (có ô lọc nhanh).

| Vai trò | Trang |
|---|---|
| Sinh viên | `/dashboard.html`, `/assignments.html` (thêm `?class=INT1449.01&code=nmap-discovery` để mở một bài), `/history.html`, `/leaderboard.html`, `/guide.html`, `/chatbot.html`, `/account.html` (`?tab=skills`), `/login.html` |
| Giảng viên | `/teacher/statistics.html`, `classes.html`, `class-detail.html?class=INT1449.01`, `assignments.html`, `exams.html`, `exam-monitor.html`, `qa.html` |
| Trợ giảng | `/ta/statistics.html`, `classes.html`, `class-detail.html?class=INT1449.01`, `assignments.html`, `exams.html`, `exam-monitor.html` (sinh từ bản Giảng viên, xem `tools/build-ta.js`) |
| Admin | `/admin/statistics.html`, `resources.html`, `accounts.html`, `classes.html`, `assignment-review.html`, `audit-logs.html`, `config-system.html` |

Bấm `Ctrl K` ở mọi trang để tìm nhanh trang, bài tập và lớp (gõ không dấu cũng được).

Chuyển sáng/tối bằng nút mặt trời–trăng trên topbar (nhớ lại lần sau). Ép giao diện qua URL: thêm `?theme=light` hoặc `?theme=dark` (không lưu lại).

## Xem trên điện thoại / khung hẹp

- Trình duyệt máy tính: F12, bật chế độ thiết bị (Ctrl+Shift+M), chọn rộng 390px.
- Hoặc dùng khung có sẵn: `/_audit/mobile.html?src=../dashboard.html` (iframe rộng đúng 390px).
- Xem trên điện thoại thật cùng Wi-Fi cần mở cổng ra mạng; mặc định máy chủ KHÔNG làm vậy.

## Chụp ảnh kiểm tra (Chrome headless)

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,900 --virtual-time-budget=5000 \
  --screenshot="D:\redesign-cyberlabx\_audit\anh.png" "file:///D:/redesign-cyberlabx/dashboard.html?theme=light"
```

Chrome headless không cho cửa sổ hẹp hơn khoảng 500px, nên ảnh mobile phải chụp qua khung `_audit/mobile.html` (cửa sổ 500x900).

## Cấu trúc thư mục

```
index.html, *.html     các trang
assets/                tokens.css (màu, bo góc), base.css (khung), components.css (thành phần),
                       data.js (dữ liệu mẫu), charts.js (radar, heatmap), shell.js (sidebar + topbar), theme.js
skills/cyberlabx-ui/   chuẩn giao diện cho người và agent (SKILL.md, references/components.md)
AGENTS.md, CLAUDE.md, GEMINI.md   trỏ agent tới chuẩn trên
NOTES.md               ghi chú của các agent (dữ liệu bổ sung, đề xuất chung)
_audit/                ảnh bản cũ (cur-*) và bản mới (final-*), khung mobile.html
huong-dan-chay/        thư mục này
```

## Sửa giao diện

- Màu, bo góc, chữ: chỉ sửa ở `assets/tokens.css`. Đừng viết màu trong trang.
- Thành phần dùng chung: `assets/components.css`. Dữ liệu mẫu: `assets/data.js`.
- Trước khi sửa hay nhờ agent sửa, đọc `skills/cyberlabx-ui/SKILL.md` (không glow/đổ bóng, nền xám-đen thuần, một màu nhấn, tiếng Việt, v.v.).

## Lỗi thường gặp

| Hiện tượng | Cách xử lý |
|---|---|
| Icon không hiện, chữ lạ | Thiếu thư mục `assets/vendor/` (chưa kéo đủ repo). Kéo lại repo hoặc chạy `node tools/vendor-assets.js` (cần mạng). |
| Trang trắng, Console báo `CLX is not defined` | `assets/data.js` không nạp được. Mở bằng máy chủ (Cách 2) hoặc kiểm tra đường dẫn. |
| `Error: listen EADDRINUSE` | Cổng đang bận. Chạy `node huong-dan-chay/serve.js 5300`. |
| `node` không được nhận ra | Cài Node.js từ nodejs.org, mở lại cửa sổ lệnh. |
| Sửa file nhưng không thấy đổi | Nhấn Ctrl+F5 (xóa cache). |
| Giao diện sáng/tối bị kẹt | F12 → Application → Local Storage → xóa khóa `clx-theme`. |

## Công cụ kiểm tra (thư mục `tools/`)

| Lệnh | Việc làm |
|---|---|
| `node tools/lint-pages.js` | Kiểm tra tĩnh mọi trang: cú pháp JS nội tuyến, màu ngoài token, gradient, đổ bóng, emoji, `<table>`, thiếu `data-role`/`data-page`, h1 lặp tên trang. Thoát mã 1 nếu có lỗi. |
| `node tools/build-ta.js` | Sinh lại `ta/*.html` từ `teacher/*.html` sau khi sửa trang Giảng viên. Không sửa tay thư mục `ta/`. |
| `tools/overflow-check.html` | Đo tràn ngang ở 390, 1280 và 1920px. Chạy: `chrome --headless=new --allow-file-access-from-files --virtual-time-budget=60000 --dump-dom "file:///…/tools/overflow-check.html?pages=dashboard.html,teacher/classes.html"`, đọc thẻ `<title>` (`"OK"` là sạch). |
