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
- **Một điểm nhấn:** `--accent` (cam hổ phách, tham khảo bảng màu aws-quest). Màu khác chỉ để báo trạng thái. Nếu đang cân nhắc thêm màu thứ hai để "cho đẹp", dừng lại: dùng độ đậm chữ, khoảng cách, hoặc viền thay thế.
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
| Hình khối | `--r-tag` 2, `--r-control` 3, `--r-card` 4, `--r-panel` 4 | bo góc GẦN VUÔNG (2–4px), đối xứng: vuông vức, chắc chắn. Không hình tròn, không viên thuốc |
| Khác | `--shadow-pop` | popover/menu nổi, nút nổi: CHỈ là viền 1px, không đổ bóng |
| Chữ | `--font`, `--mono` | họ chữ |
| Chuyển động | `--dur` 140ms, `--ease` | mọi transition |

Quy tắc dùng màu:
1. Một màn hình chỉ có **tối đa một** vùng nền `--accent` đặc (nút chính). Không có hai nút chính cạnh nhau.
2. Màu trạng thái luôn đi kèm **chữ hoặc mã** (AC, "Hạn hôm nay"), không bao giờ chỉ có màu (người mù màu).
3. Nền `*-soft` dùng cho chip/badge; không dùng làm nền cả card.
4. **Không glow, không đổ bóng, không gradient, không kính mờ (`backdrop-filter`/`blur`), không `filter: drop-shadow`, không `text-shadow`.** Không `box-shadow` có độ mờ (blur) khác 0 ở bất kỳ thành phần nào, kể cả focus: focus dùng viền `--accent` (ô nhập) hoặc `outline` 2px (nút/liên kết). Chỉ cho phép vòng 1px `0 0 0 1px` (là viền, không phải bóng). Không viền màu dày > 1px (trừ vạch nhấn 2px của nav/tab đang chọn).
5. **Màu theo aws-quest, hình khối riêng.** Nền tối gần đen trung tính: `--bg` #08090b, `--surface` #101113, `--surface-2` #181a1e, `--surface-3` #22252a; nền sáng TRẮNG THUẦN (`--bg` và `--surface` đều #ffffff, không pha kem; bậc nền xám trung tính #f4f4f5 / #e7e7e9); điểm nhấn cam hổ phách (tối #e9a33b, sáng #a6530b; chữ đặt trên nền nhấn dùng `--accent-ink`). Tuyệt đối không ngả xanh/tím, không dựng lớp nền màu để "tạo chiều sâu": chiều sâu chỉ đến từ bậc nền và viền hairline. **Bo góc gần vuông:** mọi bề mặt dùng token `--r-*` (2–4px, cả bốn góc bằng nhau); không tự đặt `border-radius` ngoài token; không hình tròn hay viên thuốc (avatar, chấm trạng thái, nút nổi, thanh tiến độ đều vuông vức). Lý do: góc vuông gợi sự nghiêm túc, chính xác, vững chắc, hợp sản phẩm an toàn thông tin (xem `docs/design-research.md`).
6. Sáng và tối đều phải đúng: đổi `data-theme` trên `<html>`, không bao giờ kiểm tra theme bằng JS để chọn màu.

## 3. Chữ

- Font: IBM Plex Sans (400, 500; 600 chỉ cho `h1`, `h2`, tên thương hiệu), có sẵn dấu tiếng Việt. Mono: IBM Plex Mono (400, 500), CHỈ cho mã (mã lớp, mã bài, ID, dấu chấm bài, giờ trong nhật ký), không dùng mono làm "mùi kỹ thuật" cho chữ thường hay số liệu lớn.
- Thang cỡ (px / line-height): 12/16 chú thích, chip; 13/20 nhãn, phụ; **14/20 nội dung mặc định**; 15/24 `h2`, tiêu đề topbar; 18/28 giá trị nhấn trong card; 20/28 `h1` (hiếm, chỉ trang không có topbar title như đăng nhập); 28/36 chỉ số lớn (`.stat .value`).
- Cấm: weight 700–900, italic, chữ hoa toàn bộ (`text-transform: uppercase`), tracking dương lớn, tracking âm với chữ nhỏ, gạch chân trang trí.
- Số: dùng `.tnum` (hoặc `font-variant-numeric: tabular-nums`) cho mọi cột số, điểm, thời gian, để thẳng hàng.
- Độ dài dòng ≤ 72 ký tự cho đoạn văn. Cắt dài bằng `.trunc` (một dòng) và luôn kèm `title` nếu bị cắt.

## 4. Lưới và khoảng cách

- Mọi khoảng cách là bội số của 4: 4, 8, 12, 16, 20, 24, 32, 48, 64.
- Padding: card `20` (`.card-pad`), vùng nội dung `28 32` (16 trên mobile), hàng bảng `0 20` cao ≥ 48, nút cao 36 (`.btn-sm` 30), ô nhập cao 36, hàng nav cao 34.
- Khoảng giữa các khối lớn trong một cột: `.stack` (24). Giữa tiêu đề mục và nội dung: `.section-head` (margin dưới 12). Giữa các phần tử nhỏ liên quan: 8 hoặc 12.
- Khoảng cách phải **có nhịp**: cùng cấp thì cùng khoảng. Không có hai giá trị gần nhau (14 và 16) ở cùng một vai trò.
- Bo góc lồng nhau: bo ngoài − padding ≥ 4 (panel 12 chứa nút 6 cách mép 20 là hợp lệ; không bo tròn viên thuốc).

## 5. Khung và bố cục

- Khung ứng dụng do `assets/shell.js` vẽ: sidebar 240px (logo, 6 mục nav, tiến trình học kỳ, menu người dùng), topbar 56px (tên trang, đổi sáng/tối, thông báo). **Không tự vẽ lại khung.** Trang chỉ có `<main class="content" id="content">`.
- Tiêu đề trang nằm ở topbar (`data-title`, tùy chọn `data-crumb` cho trang con). **Không lặp lại tiêu đề lớn trong nội dung.** Không dòng mô tả "cho có".
- Tận dụng bề ngang màn hình: nội dung tối đa 1600px (skin quest của Sinh viên: 1880px), lề ngang co giãn theo màn hình (`clamp(24px, 3vw, 56px)`), không để hai bên trống. Trang 2 cột dùng `.cols` (cột chính + cột phụ co giãn 352–460px), tự xếp 1 cột dưới 1080px. Cột bảng chia theo tỉ lệ (`fr`) thay vì một cột `1fr` kèm nhiều cột cố định nhỏ, để thông tin phủ đều bề ngang; màn rộng (từ 1700px) có thể hiện thêm cột phụ có ích. Viền giao diện sáng đủ đậm (`--line` 20%, `--line-strong` 40%) để thấy rõ khối.
- Một trang có tối đa **3 mức** thị giác: (1) tiêu đề mục `h2`, (2) nội dung card, (3) chú thích `--text-3`. Nhiều hơn là rối.
- Chỉ **một** thao tác chính trên mỗi vùng nhìn. Các thao tác phụ dùng `.btn` viền hoặc `.btn-ghost`.
- Danh sách nhiều dòng luôn có phân trang bằng `CLXUI.pager` (20–40 dòng/trang; mã mẫu ở `references/components.md`), không tự viết HTML phân trang. Đổi bộ lọc/tìm kiếm thì về trang 1. Bảng dùng CSS grid (`.tbl`), **không dùng `<table>`**.
- Trang chi tiết mở ra ở đầu trang (scroll về 0). Hành động hủy/xóa luôn có hộp xác nhận.
- Mobile (≤ 900px): sidebar thành ngăn kéo, `.cols` thành 1 cột, bảng nhiều cột chuyển thành danh sách thẻ hoặc ẩn bớt cột phụ. Không bao giờ để cuộn ngang cả trang.

## 6. Thành phần (tên class; mã mẫu ở `references/components.md`)

Nút `.btn` (`.btn-primary`, `.btn-ghost`, `.btn-sm`), `.icon-btn`; card `.card`, `.card-pad`, `.card-head`, `.section-head`; chip `.chip` (`-mono -ok -err -warn -info -accent`); kết quả `.verdict.v-AC|WA|WF|WFN|CPY`; `.progress`; `.avatar`; `.stat-strip` / `.stat`; bảng `.tbl`, `.tbl-row`, `.tbl-head`, `.is-me`; `.tabs`, `.segmented`; form `.field`, `.input`, `.select`, `.textarea`, `.search`, `.toolbar`, `.form-grid`; `.pager`; `.kv`; `.empty`; `.popover`, `.fab`; biểu đồ `CLXCharts.radar/heatmap`.

Quy tắc chung:
- **Tái dùng trước, viết mới sau.** Nếu cần kiểu mới ở ≥ 2 trang, báo người điều phối (ghi `NOTES.md`) để đưa vào `components.css`; một trang riêng lẻ thì đặt `<style>` trong trang, vẫn bằng token.
- Nút: động từ cụ thể ("Nộp bài", "Lưu thay đổi"), không "OK"/"Submit". Icon (nếu có) đứng trước chữ, 16px, nét 1.75.
- Chip trạng thái: tối đa 1–2 từ. Không dùng chip để trang trí.
- Điểm nhấn thứ bậc bằng **độ đậm chữ và màu chữ** (`--text` / `--text-2` / `--text-3`), không bằng cỡ chữ lớn.

## 7. Icon và hình ảnh

- Icon: bộ riêng `assets/icons.js` (phong cách bảo mật: lưới 24px, nét 1.75, đầu nét vuông, góc nhọn, góc lớn vát 45°). Dùng `<i data-lucide="tên"></i>` + `window.clxIcons()`; tên chưa có trong bộ tự lùi về Lucide và được vẽ cùng kiểu nét. Muốn thêm icon: vẽ trong `icons.js` theo đúng ngôn ngữ trên, không dùng icon bo tròn mềm. Một nghĩa một icon, dùng nhất quán ở mọi trang (bảng ánh xạ ở `references/components.md`).
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
- [ ] Khoảng cách toàn bội số 4, cùng cấp thì cùng khoảng; bo góc gần vuông theo token.
- [ ] Mọi danh sách có phân trang; bảng là CSS grid; đổi bộ lọc về trang 1.
- [ ] Hover, focus-visible, disabled, rỗng, lỗi đều có.
- [ ] Sáng và tối đều đọc được; 390px không cuộn ngang; vùng bấm ≥ 32px.
- [ ] Icon thuộc bộ `assets/icons.js` (nét 1.75, đầu vuông, góc vát), nhất quán nghĩa; icon-only có `aria-label`.
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

## 15. Ngôn ngữ thiết kế v2: chi tiết đặc trưng của CyberLabX

Mục tiêu: nhìn là biết đây là hệ thống chấm bài lab, không phải mẫu dashboard chung. Mọi chi tiết dưới đây **lấy từ nghiệp vụ** (bước lab, lượt nộp, hạn nộp, phiếu chấm), không phải mốt giao diện. Dùng đúng chỗ, đừng rải khắp nơi.

| Chi tiết | Class / hàm | Dùng khi | Không dùng khi |
|---|---|---|---|
| **Dấu chấm bài** | `.verdict.v-AC` … (viền mảnh, mã monospace, nền trong) | Mọi nơi hiện kết quả bài nộp | Làm nhãn trạng thái khác (dùng `.status`) |
| **Thanh vạch** | `CLXUI.ticks(n, done, '')`, kind `is-error` / `is-ok` | Đại lượng đếm được và nhỏ (≤ 20): lượt nộp đã dùng / tối đa, bước lab, mức cấp bậc, mức tải máy (20 vạch) | Phần trăm liên tục lớn (dùng `.progress`) |
| **Thước hạn nộp** | `.ruler` (xem `dashboard.html`) | Trục thời gian ngắn có các mốc thật (hạn nộp, ca thi trong tuần) | Trang trí |
| **Bảng sổ cái** | `.ledger` + `.no` (cột số thứ tự mono, đường kẻ lề) | Nhật ký, lịch sử, danh sách dài có thứ tự | Bảng ngắn dưới 6 dòng |
| **Hàng bấm được** | `a.tbl-row` / `.is-link` (vạch nhấn trái khi hover) | Hàng dẫn tới trang chi tiết | Hàng không bấm được |
| **Phím tắt** | `.kbd`; bảng lệnh Ctrl K do `shell.js` dựng sẵn | Gợi ý thao tác bàn phím | Nhãn trang trí |
| **Trạng thái chấm + chữ** | `.status.s-ok|s-err|s-warn|s-info` | Trạng thái của đối tượng (tài khoản, máy chủ, ca thi) | Kết quả bài nộp |
| **Thanh so sánh** | `.bar-row` (xám, một hàng nổi bằng `is-hi`) | So sánh theo lớp/môn/ngày | Nhiều series nhiều màu |
| **Khung xương** | `.skeleton` (tĩnh, không nhấp nháy) | Trạng thái đang tải | Trang đã có dữ liệu |

Quy tắc nhịp: vào trang có một chuyển động duy nhất (mờ dần + trượt 8px, các khối cách nhau 40ms, đã có sẵn trong `base.css`). Hover đổi bậc nền hoặc hiện vạch nhấn, không phóng to. Nhấn nút co nhẹ 0.98.

Nhận diện: ô vuông đặc chữ X + một chấm nhấn (do `shell.js` vẽ). Không tự vẽ lại logo.

## 16. Vai trò, cấu trúc thư mục và cách dựng trang

Tính cách chung: **một hệ thống, bốn vai trò**. Cùng token, cùng thành phần, cùng khung; khác nhau ở nội dung, mật độ và việc ưu tiên. Màu nhấn KHÔNG đổi theo vai trò.

| Vai trò | Thư mục | `data-role` | Việc ưu tiên (đặt lên đầu trang) | Mật độ |
|---|---|---|---|---|
| Sinh viên | gốc `/` | `student` | Bài sắp đến hạn, lượt nộp còn lại, tiến độ | Thoáng vừa |
| Giảng viên | `teacher/` | `teacher` | Việc cần xử lý: bài chờ duyệt, hỏi đáp chưa trả lời, ca thi sắp tới, SV dưới ngưỡng cảnh báo | Vừa, dày dần |
| Trợ giảng | `ta/` | `ta` | Như Giảng viên nhưng KHÔNG có Hỏi đáp 1-1, không xóa bài, không sửa ngưỡng cảnh báo; có ca thi được phân công giám sát | Vừa, dày dần |
| Admin | `admin/` | `admin` | Sức khỏe hệ thống (máy chủ, máy ảo), hàng đợi duyệt, bất thường trong nhật ký | Dày |

Trang ngoài thư mục gốc dùng `../assets/...` cho CSS/JS. Mẫu đầu trang và thứ tự script (trang nhân viên):

```html
<body data-role="teacher" data-page="statistics" data-title="Thống kê">
  <main class="content" id="content"> … </main>
  <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
  <script src="../assets/data.js"></script>
  <script src="../assets/data-staff.js"></script>
  <script src="../assets/charts.js"></script>
  <script src="../assets/shell.js"></script>
  <script> /* script riêng của trang; cuối cùng gọi window.clxIcons() */ </script>
</body>
```

- `data-page` là mã mục nav trong `shell.js` (`NAV[role]`); trang con (chi tiết lớp, theo dõi ca thi) dùng mã của mục cha và thêm `data-crumb`.
- Dữ liệu chung nằm ở `window.CLX_STAFF` (`assets/data-staff.js`, KHÔNG sửa). Cần dữ liệu riêng của trang → tạo `assets/data-<tên-trang>.js` và gắn vào `window.CLX_<TÊN>`.
- Trang dùng chung giữa Giảng viên và Trợ giảng viết MỘT lần, có kiểm `document.body.dataset.role` để ẩn hành động Trợ giảng không có. Bản `ta/` được sinh từ bản `teacher/` bằng script, nên đừng đặt đường dẫn tuyệt đối tới `teacher/` trong trang.
- Mục điều hướng chưa có trang hiển thị mờ, không bấm được (đã xử lý ở `shell.js`).
- Để tìm nhanh bằng Ctrl K, trang/dữ liệu có thể thêm `window.CLX_SEARCH = [{ role, group, label, hint, href }]` TRƯỚC khi nạp `shell.js`.

## 17. Biểu đồ

- Mỗi trang tối đa **một** biểu đồ chính, chiếm ≥ 2/3 chiều rộng, cao 240–320px; phần còn lại là danh sách hoặc bảng hẹp hơn.
- Dải xám trung tính cho dữ liệu nền, **một** màu `--accent` cho điều cần nhìn nhất. Không cầu vồng, không nhiều series nhiều màu, không cột bo tròn, không đổ bóng.
- Lưới mờ `--line`, nhãn trục 11–12px `--text-3`, số dùng `.tnum`. Không dựng sparkline trang trí trong thẻ chỉ số.
- Vẽ bằng SVG/HTML thuần (xem `assets/charts.js`: `radar`, `heatmap`; được phép thêm hàm mới vào file riêng của trang). Luôn có `role="img"` + `aria-label` và bản tóm tắt chữ cho trình đọc màn hình.

## 18. Trạng thái dữ liệu (làm cùng lúc với trạng thái "có dữ liệu")

- **Rỗng:** `.empty` + một câu nêu việc kế tiếp + (nếu có) một nút hành động.
- **Đang tải:** `.skeleton` đúng bố cục của nội dung thật (không spinner xoay).
- **Lỗi:** khối `--err-soft` nêu nguyên nhân + nút "Tải lại".
- **Không đủ quyền (vai trò):** ẩn hành động, không hiện nút rồi báo lỗi; nếu cần giải thích thì chú thích ngắn bằng `--text-3`.
- Mỗi trang nhân viên có ít nhất một ví dụ trạng thái rỗng hoạt động thật (ví dụ lọc ra 0 kết quả).

## 19. Mùi AI cần tránh thêm (đã gặp ở bản v1)

- Nhãn đánh số "01 / 02 / 03" trước tiêu đề mục. Huy hiệu "Mới", "Pro", "Beta". Nhãn viên thuốc cho mọi thứ.
- Hàng thẻ thống kê bằng nhau, mỗi thẻ một icon trong ô vuông tô màu. Thay bằng `.stat-strip` hoặc một bảng số liệu, độ rộng cột khác nhau theo nội dung.
- Icon đặt trên tiêu đề trong mọi card. Card nào cũng có tiêu đề + mô tả + nút. Hãy để vài khối chỉ có nội dung.
- Sparkline/thanh mini trong mọi thẻ. Biểu đồ không biểu thị số liệu thật.
- Dữ liệu giả kiểu "John Doe", "Lorem ipsum", số tròn trịa (1,000 / 500 / 100%). Dùng tên Việt Nam thật hợp lý, số lẻ, mã đúng định dạng (`B23DCAT001`, `INT1449.01`).
- Mọi cột bảng cùng độ rộng, mọi hàng cùng thông tin. Hãy cho cột số căn phải, cột mã hẹp, cột tên rộng, cột trạng thái cố định.
- Mọi chuyển động đều "fade-in". Một kiểu vào trang duy nhất là đủ.
- Lời tựa tiếng Việt kiểu khẩu hiệu ("Quản lý thông minh, hiệu quả vượt trội"). Nhãn phải nêu việc, không quảng cáo.

## 20. Duyệt trước khi báo xong (bổ sung cho mục 13)

- [ ] Có dùng ít nhất một chi tiết đặc trưng ở mục 15 ĐÚNG chỗ (không rải khắp nơi).
- [ ] Trang nhân viên: việc ưu tiên của vai trò nằm ở đầu trang (mục 16).
- [ ] Có trạng thái rỗng/tải/lỗi thật cho ít nhất một danh sách (mục 18).
- [ ] Biểu đồ theo mục 17; không sparkline trang trí.
- [ ] Dữ liệu lấy từ `CLX`/`CLX_STAFF`/file dữ liệu riêng; tên và số hợp lý, định dạng nhất quán.
- [ ] Nội dung từ dữ liệu được chèn bằng `CLXUI.esc` hoặc `textContent`, không nối chuỗi người dùng vào `innerHTML`.
- [ ] Chụp ảnh sáng + tối + mobile (khung 390px) và xem lại ảnh trước khi báo xong.

## 21. Skin "quest" cho vai trò Sinh viên

Trang Sinh viên (thư mục gốc, trừ `index.html`) tự đặt `<html data-skin="quest">` (xem `assets/theme.js`) và nạp `assets/skin-quest.css`, bám ngôn ngữ thiết kế của dự án aws-quest:
- **Chữ lớn dễ đọc:** nội dung 16px; tiêu đề Chakra Petch 700 (h1 34px, h2 22px, h3 18px); nội dung Be Vietnam Pro; nhãn nhỏ dùng IBM Plex Mono viết hoa giãn chữ 12.5px (`.kicker`, `.nav-label`, `.stat .label`, tiêu đề cột).
- **Thanh bên rộng 248px:** hàng nav cao 42px, chữ 14.5px, icon 20px; mục đang chọn có viền và nền `--surface-2`, icon đổi màu nhấn; tên thương hiệu "CyberLabX." có dấu chấm cam.
- **Thành phần cỡ lớn:** nút và ô nhập cao 46px, hàng bảng cao 60px, chip 26px, số liệu lớn 42px, thẻ padding 28px.
- **Icon:** Lucide gốc, nét 1.75, đầu tròn (không dùng bộ `icons.js` vuông của skin mặc định); dấu hiệu nhận diện là khiên có dấu kiểm và tia sáng cam.
- **Họa tiết nền:** lưới thoi rất mờ (SVG, độ trong suốt 3.5–4%), cố định khi cuộn.
- Các vai trò khác (Giảng viên, Trợ giảng, Admin) dùng skin mặc định cho đến khi được duyệt chuyển sang skin này.
Trang Sinh viên viết MỚI: dùng đúng class của `components.css`, không đặt cỡ chữ dưới 13px, không tự đặt `border-radius`.

## 22. Chống nhấp nháy khi chuyển trang (bắt buộc giữ)

Mỗi lần đổi trang là một lần tải lại, nên:
- **Không** nạp font hay icon từ CDN. Dùng `assets/vendor/fonts.css` và `assets/vendor/lucide.min.js` (tự lưu), kèm tiền tố `../` ở thư mục con.
- `theme.js` (nạp trong `<head>`) đặt `data-theme`, `data-skin` và chỉ đặt `data-ready` khi DOM đã dựng và font đã tải (chờ tối đa 0.8 giây); `base.css` ẩn `body` cho tới lúc đó (tự hiện sau 2 giây nếu script lỗi). Đừng bỏ `theme.js` khỏi `<head>`.
- `html { scrollbar-gutter: stable }` để nội dung không xê dịch khi trang dài/ngắn khác nhau.
- Không dùng hiệu ứng vào trang (mờ dần, trượt) cho khối chính: nó chạy lại ở mọi lần chuyển trang và trông như nhấp nháy.
- Không dùng `requestAnimationFrame` để điều khiển việc hiện trang (không chạy khi trình duyệt chưa vẽ khung).
- Không đặt `font-family` hay `font-size` gốc riêng trong từng trang; cỡ chữ nằm trong skin của vai trò.
