---
name: cyberlabx-ui
description: Chuẩn giao diện CyberLabX (hệ thống bài tập an toàn thông tin, bản thiết kế lại). Dùng BẮT BUỘC mỗi khi tạo, sửa hoặc review bất kỳ màn hình, thành phần, CSS, HTML/JSX nào của CyberLabX, mọi vai trò (Sinh viên, Giảng viên, Trợ giảng, Admin). Quy định token màu, chữ, lưới, bố cục, thành phần, trạng thái, nội dung tiếng Việt, truy cập, và checklist chống "AI slop".
---

# CyberLabX UI — chuẩn giao diện

Đọc hết file này trước khi viết một dòng giao diện. Danh sách đoạn mã mẫu nằm ở `references/components.md`; trang mẫu chuẩn là `dashboard.html`. Mọi vai trò dùng CHUNG một hệ thống này; Admin, Giảng viên, Trợ giảng khác nhau ở nội dung, không khác ở phong cách.

Nguồn thật của hệ thống: `assets/tokens.css`, `assets/base.css`, `assets/components.css`. Nếu tài liệu này và các file đó mâu thuẫn, **file CSS thắng**, và phải sửa tài liệu này.

## 1. Tinh thần (đọc để quyết định khi gặp tình huống không có trong luật)

- **Sản phẩm:** công cụ làm việc hằng ngày của sinh viên và giảng viên. Người dùng đến để làm bài, nộp bài, xem kết quả, chấm bài. Giao diện phải biến mất khi họ đang làm việc.
- **Tính cách:** sổ tay phòng lab. Yên tĩnh, chính xác, nhiều dữ liệu, ít trang trí. Không cyberpunk, không neon, không "game hóa" phô trương.
- **Thế giới:** bàn làm việc ban đêm, dòng lệnh, nhật ký chấm bài. Chỉ chữ monospace mới "mang mùi terminal", và chỉ dành cho mã (mã lớp, mã bài, ID, điểm, kết quả chấm).
- **Một điểm nhấn:** `--accent` (xanh mực). Màu khác chỉ để báo trạng thái. Nếu đang cân nhắc thêm màu thứ hai để "cho đẹp", dừng lại: dùng độ đậm chữ, khoảng cách, hoặc viền thay thế.
- **Chi tiết đặc trưng:** chip kết quả `AC / WA / WF / WFN / CPY` (monospace, đúng một kiểu ở mọi nơi). Đây là thứ duy nhất được phép "riêng" của CyberLabX.
- Khi phân vân giữa "thêm" và "bớt": bớt. Khi phân vân giữa "đẹp" và "dễ đọc/dễ quét": dễ quét.

## 2. Token (chỉ dùng qua `var(--...)`, không bao giờ viết hex/rgb/hsl trong trang)

| Nhóm | Token | Dùng cho |
|---|---|---|
| Nền | `--bg` | nền trang |
| | `--surface` | card, ô nhập, panel |
| | `--surface-2` | nền nhấn nhẹ: mục nav đang chọn, ô chỉ đọc |
| | `--surface-3` | thanh tiến độ (nền), avatar, nút đang nhấn |
| Viền | `--line` | hairline mặc định (card, dòng bảng, phân cách) |
| | `--line-strong` | viền ô nhập, nút viền, popover |
| Chữ | `--text` | nội dung chính, tiêu đề |
| | `--text-2` | nhãn, mô tả phụ, nav chưa chọn |
| | `--text-3` | gợi ý, thời gian, chú thích, tiêu đề cột |
| Nhấn | `--accent` | nút chính, liên kết, mục đang chọn, tiến độ, focus |
| | `--accent-ink` | chữ TRÊN nền `--accent` (đã đạt tương phản ≥ 4.5:1) |
| | `--accent-soft` | nền chip nhấn, hàng của chính mình, vòng focus |
| Trạng thái | `--ok` `--err` `--warn` `--info` (+ `-soft`) | chỉ kết quả bài nộp, báo lỗi/thành công/cảnh báo |
| | `--mute-soft` | hover trên nền trơn, chip trung tính |
| Heatmap | `--heat-0` … `--heat-4` | lưới hoạt động |
| Hình khối | `--r-control` 8, `--r-card` 12, `--r-panel` 14 | bo góc |
| Khác | `--shadow-pop` | popover/menu nổi, nút nổi: CHỈ là viền 1px, không đổ bóng |
| Chữ | `--font`, `--mono` | họ chữ |
| Chuyển động | `--dur` 140ms, `--ease` | mọi transition |

Quy tắc dùng màu:
1. Một màn hình chỉ có **tối đa một** vùng nền `--accent` đặc (nút chính). Không có hai nút chính cạnh nhau.
2. Màu trạng thái luôn đi kèm **chữ hoặc mã** (AC, "Hạn hôm nay"), không bao giờ chỉ có màu (người mù màu).
3. Nền `*-soft` dùng cho chip/badge; không dùng làm nền cả card.
4. **Không glow, không đổ bóng, không gradient, không kính mờ (`backdrop-filter`/`blur`), không `filter: drop-shadow`, không `text-shadow`.** Không `box-shadow` có độ mờ (blur) khác 0 ở bất kỳ thành phần nào, kể cả focus: focus dùng viền `--accent` (ô nhập) hoặc `outline` 2px (nút/liên kết). Chỉ cho phép vòng 1px `0 0 0 1px` (là viền, không phải bóng). Không viền màu dày > 1px (trừ vạch nhấn 2px của nav/tab đang chọn).
5. **Nền tối là xám-đen THUẦN (không ngả xanh, tím, lam), cùng họ với LeetCode:** `--bg` #161616, `--surface` #202020, `--surface-2` #282828, `--surface-3` #323232. Nền sáng cũng trung tính (#f5f5f5 / #fff). Tuyệt đối không thay bằng navy/xanh đêm/tím, không thêm sắc nhiễm vào xám, không dựng lớp nền màu để "tạo chiều sâu". Chiều sâu chỉ đến từ bậc nền (`--bg` → `--surface` → `--surface-2`) và viền hairline.
6. Sáng và tối đều phải đúng: đổi `data-theme` trên `<html>`, không bao giờ kiểm tra theme bằng JS để chọn màu.

## 3. Chữ

- Font: Inter (400, 500; 600 chỉ cho `h1`, `h2`, tên thương hiệu). Mono: JetBrains Mono (400, 500), chỉ cho mã và số liệu kỹ thuật.
- Thang cỡ (px / line-height): 12/16 chú thích, chip; 13/20 nhãn, phụ; **14/20 nội dung mặc định**; 15/24 `h2`, tiêu đề topbar; 18/28 giá trị nhấn trong card; 20/28 `h1` (hiếm, chỉ trang không có topbar title như đăng nhập); 28/36 chỉ số lớn (`.stat .value`).
- Cấm: weight 700–900, italic, chữ hoa toàn bộ (`text-transform: uppercase`), tracking dương lớn, tracking âm với chữ nhỏ, gạch chân trang trí.
- Số: dùng `.tnum` (hoặc `font-variant-numeric: tabular-nums`) cho mọi cột số, điểm, thời gian, để thẳng hàng.
- Độ dài dòng ≤ 72 ký tự cho đoạn văn. Cắt dài bằng `.trunc` (một dòng) và luôn kèm `title` nếu bị cắt.

## 4. Lưới và khoảng cách

- Mọi khoảng cách là bội số của 4: 4, 8, 12, 16, 20, 24, 32, 48, 64.
- Padding: card `20` (`.card-pad`), vùng nội dung `28 32` (16 trên mobile), hàng bảng `0 20` cao ≥ 48, nút cao 36 (`.btn-sm` 30), ô nhập cao 36, hàng nav cao 34.
- Khoảng giữa các khối lớn trong một cột: `.stack` (24). Giữa tiêu đề mục và nội dung: `.section-head` (margin dưới 12). Giữa các phần tử nhỏ liên quan: 8 hoặc 12.
- Khoảng cách phải **có nhịp**: cùng cấp thì cùng khoảng. Không có hai giá trị gần nhau (14 và 16) ở cùng một vai trò.
- Bo góc lồng nhau: bo ngoài − padding ≥ 4 (card 14 chứa chip 6; card 12 chứa nút 8).

## 5. Khung và bố cục

- Khung ứng dụng do `assets/shell.js` vẽ: sidebar 240px (logo, 6 mục nav, tiến trình học kỳ, menu người dùng), topbar 56px (tên trang, đổi sáng/tối, thông báo). **Không tự vẽ lại khung.** Trang chỉ có `<main class="content" id="content">`.
- Tiêu đề trang nằm ở topbar (`data-title`, tùy chọn `data-crumb` cho trang con). **Không lặp lại tiêu đề lớn trong nội dung.** Không dòng mô tả "cho có".
- Chiều rộng nội dung tối đa 1200px, căn giữa. Trang 2 cột dùng `.cols` (cột chính + cột phụ 340px), tự xếp 1 cột dưới 1080px.
- Một trang có tối đa **3 mức** thị giác: (1) tiêu đề mục `h2`, (2) nội dung card, (3) chú thích `--text-3`. Nhiều hơn là rối.
- Chỉ **một** thao tác chính trên mỗi vùng nhìn. Các thao tác phụ dùng `.btn` viền hoặc `.btn-ghost`.
- Danh sách nhiều dòng luôn có phân trang (20–40 dòng/trang). Đổi bộ lọc/tìm kiếm thì về trang 1. Bảng dùng CSS grid (`.tbl`), **không dùng `<table>`**.
- Trang chi tiết mở ra ở đầu trang (scroll về 0). Hành động hủy/xóa luôn có hộp xác nhận.
- Mobile (≤ 900px): sidebar thành ngăn kéo, `.cols` thành 1 cột, bảng nhiều cột chuyển thành danh sách thẻ hoặc ẩn bớt cột phụ. Không bao giờ để cuộn ngang cả trang.

## 6. Thành phần (tên class; mã mẫu ở `references/components.md`)

Nút `.btn` (`.btn-primary`, `.btn-ghost`, `.btn-sm`), `.icon-btn`; card `.card`, `.card-pad`, `.card-head`, `.section-head`; chip `.chip` (`-mono -ok -err -warn -info -accent`); kết quả `.verdict.v-AC|WA|WF|WFN|CPY`; `.progress`; `.avatar`; `.stat-strip` / `.stat`; bảng `.tbl`, `.tbl-row`, `.tbl-head`, `.is-me`; `.tabs`, `.segmented`; form `.field`, `.input`, `.select`, `.textarea`, `.search`, `.toolbar`, `.form-grid`; `.pager`; `.kv`; `.empty`; `.popover`, `.fab`; biểu đồ `CLXCharts.radar/heatmap`.

Quy tắc chung:
- **Tái dùng trước, viết mới sau.** Nếu cần kiểu mới ở ≥ 2 trang, báo người điều phối (ghi `NOTES.md`) để đưa vào `components.css`; một trang riêng lẻ thì đặt `<style>` trong trang, vẫn bằng token.
- Nút: động từ cụ thể ("Nộp bài", "Lưu thay đổi"), không "OK"/"Submit". Icon (nếu có) đứng trước chữ, 16px, nét 1.5.
- Chip trạng thái: tối đa 1–2 từ. Không dùng chip để trang trí.
- Điểm nhấn thứ bậc bằng **độ đậm chữ và màu chữ** (`--text` / `--text-2` / `--text-3`), không bằng cỡ chữ lớn.

## 7. Icon và hình ảnh

- Icon: Lucide, nét 1.5, 16 hoặc 18px, màu kế thừa `currentColor`. Một nghĩa một icon, dùng nhất quán ở mọi trang (bảng ánh xạ ở `references/components.md`).
- Không emoji, không icon 3D/PNG, không ảnh minh họa trang trí, không logo phát sáng. Hình ảnh duy nhất cho phép: ảnh người dùng thật (avatar), ảnh chụp sản phẩm thật, biểu đồ.
- Trạng thái trống/đầu tiên dùng chữ + một hành động, không minh họa.

## 8. Trạng thái (mọi thành phần tương tác đều phải có đủ)

Mặc định, hover (`--mute-soft` hoặc nhích nền), focus-visible (vòng `--accent` 2px, **không bao giờ bỏ outline**), active, disabled (opacity .45, `cursor: not-allowed`), đang tải (khung xương `--surface-2` hoặc chữ "Đang tải…", không spinner quay quá 1 chỗ), rỗng (`.empty`: một câu nêu việc kế tiếp), lỗi (chip/khối `--err-soft` + chữ nêu nguyên nhân và cách sửa).
Vùng bấm tối thiểu 32×32 (ưu tiên 36).

## 9. Chuyển động

- Chỉ `background-color`, `color`, `border-color`, `transform`, `opacity`. Không animate `width/height/top/left`. Không `transition: all`.
- Một đường cong (`--ease`), thời lượng `--dur` (140ms); ngăn kéo/popover tối đa 200ms.
- Không animation lặp vô hạn, không nảy, không parallax. Tôn trọng `prefers-reduced-motion` (đã có trong `base.css`).

## 10. Nội dung (tiếng Việt)

- Mọi chữ giao diện bằng tiếng Việt có dấu. Ngoại lệ giữ nguyên: mã kết quả (AC/WA/…), thuật ngữ kỹ thuật không có từ thay thế phổ biến (lab, flag, hash, token), tên riêng (Labtainer, Nmap).
- Giọng: trực tiếp, trung tính, ngắn. Câu bắt đầu bằng việc người dùng cần làm hoặc sự thật. Không chào hỏi ("Chào mừng trở lại, agent!"), không dấu chấm than, không hô khẩu hiệu, không "Hãy cùng…".
- Nhãn trường nhập ngắn, đặt TRÊN ô nhập. Placeholder là ví dụ, không thay nhãn.
- Thông báo lỗi: nêu chuyện gì xảy ra + làm gì tiếp ("Tên tệp không khớp. Nộp lại đúng tệp .lab gốc."), không đổ lỗi cho người dùng.
- Số: ngăn nghìn bằng dấu phẩy ở số kỹ thuật/XP (`8,420`) theo dữ liệu mẫu hiện có; ngày `dd/mm/yyyy` hoặc `dd/mm hh:mm`; thời gian máy `yyyy-mm-dd hh:mm` (mono) ở bảng nhật ký.
- Không bịa dữ liệu. Số, tên, mã lấy từ `assets/data.js`. Thiếu thì thêm vào cuối `data.js`, không đổi dữ liệu cũ.

## 11. Truy cập

- Tương phản chữ ≥ 4.5:1 (token đã đạt; đừng ghi đè màu chữ bằng giá trị ngoài token).
- Dùng đúng thẻ: `button` cho hành động, `a` cho điều hướng, `h1/h2` đúng cấp, `nav`, `main`, `aside`, `section` có nhãn khi cần.
- Icon-only button bắt buộc `aria-label`. Hình trang trí `aria-hidden="true"`. Trạng thái chọn dùng `aria-current` / `aria-selected` / `aria-pressed` (CSS đã dựa vào các thuộc tính này).
- Toàn bộ thao tác dùng được bằng bàn phím; thứ tự Tab theo thứ tự đọc; Esc đóng popover.

## 12. Cách làm một trang mới

1. Sao `dashboard.html`. Đổi `<title>`, `data-page`, `data-title` (+ `data-crumb`), nội dung `<main>`, script riêng.
2. Dựng cấu trúc bằng `.cols` / `.stack` / `.card` trước, chưa tô gì. Xác định mức thị giác (mục 5).
3. Gắn dữ liệu từ `window.CLX`. Vẽ bằng JS thì gọi `window.clxIcons()` cuối cùng.
4. Duyệt checklist mục 13, ở sáng + tối, 1440px + 390px.
5. Chụp ảnh để tự kiểm: `chrome --headless=new --window-size=1440,1000 --virtual-time-budget=6000 --screenshot=out.png file:///.../trang.html` rồi xem lại ảnh, so với `dashboard.html`.
   Mobile: Chrome headless không cho cửa sổ hẹp hơn ~500px nên ảnh `--window-size=390,…` bị cắt sai. Dùng khung bọc: `--window-size=500,900 "file:///…/_audit/mobile.html?src=../ten-trang.html"` (iframe rộng đúng 390px). Giao diện sáng: thêm `?theme=light` vào URL trang (ví dụ `file:///…/dashboard.html?theme=light`); với khung mobile truyền `src=..%2Ften-trang.html%3Ftheme%3Dlight`.

## 13. Checklist "không còn slop" (tự duyệt trước khi báo xong)

- [ ] Không hex/rgb/hsl/`linear-gradient`/`radial-gradient` trong trang; không `box-shadow` có blur, `backdrop-filter`, `drop-shadow`, `text-shadow` (không glow).
- [ ] Nền tối là xám-đen thuần theo token, không ngả xanh/tím.
- [ ] Không emoji, không dấu chấm than, không chữ hoa toàn bộ, không weight ≥ 700, không italic.
- [ ] Không tiêu đề lớn lặp lại tên trang; không dòng mô tả thừa; không banner minh họa.
- [ ] Chỉ 1 màu nhấn; màu trạng thái luôn kèm chữ/mã.
- [ ] Khoảng cách toàn bội số 4, cùng cấp thì cùng khoảng; bo góc theo bậc 8/12/14.
- [ ] Mọi danh sách có phân trang; bảng là CSS grid; đổi bộ lọc về trang 1.
- [ ] Hover, focus-visible, disabled, rỗng, lỗi đều có.
- [ ] Sáng và tối đều đọc được; 390px không cuộn ngang; vùng bấm ≥ 32px.
- [ ] Icon Lucide nét 1.5, nhất quán nghĩa; icon-only có `aria-label`.
- [ ] Chữ tiếng Việt có dấu, nhất quán thuật ngữ; số dùng `.tnum`; không số bịa.
- [ ] Không `transition: all`, không animate kích thước/vị trí.
- [ ] Mỗi màn hình có đúng 1 thao tác chính nổi bật.
- [ ] Không sửa `assets/*` trừ khi được giao; thiếu gì thì ghi `NOTES.md`.

## 14. Mẫu hỏng thường gặp (và cách thay)

| Slop | Thay bằng |
|---|---|
| Banner hero + ảnh 3D + lời chào | Bắt đầu thẳng vào nội dung; thông tin cần biết là một dòng trong `.section-head .meta` |
| Mỗi chỉ số một thẻ có icon phát sáng | `.stat-strip`: các chỉ số trong một card, ngăn bằng hairline |
| Viền/neon/glow/bóng quanh card, nút, ô nhập, popover | `1px solid var(--line)`; focus = đổi màu viền, không vòng sáng |
| Nền navy/xanh đêm/tím/gradient mờ ảo | Xám-đen thuần theo token, bậc nền + hairline |
| Tiêu đề tiếng Anh ("Skill Profile") | Tiếng Việt ngắn ("Kỹ năng") |
| Nhiều màu cho từng loại thẻ | Một dải neutral + một accent |
| Bảng với nền xen kẽ + viền dày | Hairline giữa các dòng, hover `--mute-soft` |
| Nút gradient lớn, hai nút chính | Một `.btn-primary`, còn lại `.btn` viền |
| Icon to trong ô vuông tô màu | Icon 16–18px, không nền (hoặc `--surface-2` khi cần nhóm) |
| Card lồng card lồng card | Phẳng: card → dòng, ngăn bằng hairline |
| Chữ nhỏ tô màu để "nhấn" | `--text-2` / `--text-3`, nhấn bằng weight 500 |
