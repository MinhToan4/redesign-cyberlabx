# Mã mẫu thành phần (copy rồi đổi nội dung)

Tất cả dùng class trong `assets/components.css`. Không thêm style nội tuyến cho màu/bo góc.

## Khung trang tối thiểu

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tên trang · CyberLabX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/tokens.css">
  <link rel="stylesheet" href="assets/base.css">
  <link rel="stylesheet" href="assets/components.css">
  <script src="assets/theme.js"></script>
</head>
<body data-page="history" data-title="Lịch sử nộp bài">
  <main class="content" id="content"> … </main>
  <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
  <script src="assets/data.js"></script>
  <script src="assets/charts.js"></script>
  <script src="assets/shell.js"></script>
  <script> /* script riêng; gọi window.clxIcons() cuối cùng */ </script>
</body>
</html>
```
`data-page` phải là một trong: `dashboard assignments history leaderboard guide chatbot account` (quyết định mục nav sáng). Trang con thêm `data-crumb="Bài tập"`.

## Bố cục

```html
<div class="cols">                    <!-- cột chính + cột phụ 340px -->
  <div class="stack"> … </div>        <!-- khối cách nhau 24 -->
  <aside class="stack"> … </aside>
</div>
<section>
  <div class="section-head"><h2>Tiêu đề mục</h2><span class="meta">Thông tin phụ</span></div>
  <div class="card"> … </div>
</section>
```

## Nút

```html
<button class="btn btn-primary"><i data-lucide="send"></i>Nộp bài</button>
<button class="btn">Hủy</button>
<button class="btn btn-ghost btn-sm">Xem thêm</button>
<button class="icon-btn" aria-label="Làm mới"><i data-lucide="refresh-cw"></i></button>
<a class="link" href="#">Chi tiết</a>
```

## Chip và kết quả bài nộp

```html
<span class="chip chip-mono">INT1449.01</span>
<span class="chip chip-accent">Mức 2</span>
<span class="chip chip-ok"><span class="dot"></span>Đã làm</span>
<span class="verdict v-AC">AC</span>  <!-- v-AC v-WA v-WF v-WFN v-CPY -->
```

Độ khó luôn ghi "Mức 1 / Mức 2 / Mức 3" (không "Dễ/Khó"). Độ khó là thuộc tính, không phải trạng thái, nên cả ba mức dùng cùng một `chip` trung tính, không tô màu theo mức.

## Số liệu

```html
<section class="card stat-strip">
  <div class="stat"><div class="label">Lab hoàn thành</div><div class="value">46</div></div>
  <div class="stat"><div class="label">Tổng điểm XP</div><div class="value">8,420</div></div>
  <div class="stat"><div class="label">Chuỗi ngày</div><div class="value">12</div><div class="hint">Pro Hacker</div></div>
</section>
```

## Danh sách dạng hàng trong card

```html
<div class="card">
  <a class="tbl-row is-link" style="--cols: 76px minmax(0,1fr) auto" href="…">
    <span class="chip chip-mono">WEB3021</span>
    <div style="min-width:0"><div class="trunc" style="font-weight:500">Tên bài</div><div class="faint" style="font-size:12.5px">Chủ đề · 50 XP</div></div>
    <span class="btn btn-sm">Tiếp tục<i data-lucide="arrow-right"></i></span>
  </a>
</div>
```

## Bảng (CSS grid)

```html
<div class="card">
  <div class="tbl" style="--cols: 80px 160px minmax(0,1fr) 120px 80px" role="table" aria-label="Lịch sử nộp bài">
    <div class="tbl-row tbl-head" role="row">
      <span role="columnheader">ID</span><span role="columnheader">Thời gian</span><span role="columnheader">Bài tập</span><span role="columnheader">Môn học</span><span role="columnheader" class="num">Kết quả</span>
    </div>
    <div class="tbl-row" role="row">
      <span class="mono tnum">72191</span><span class="mono faint tnum">2026-07-05 23:54</span><span class="trunc">Sao lưu và phục hồi dữ liệu</span><span class="dim trunc">An toàn & Bảo mật HTTT</span><span class="num"><span class="verdict v-WFN">WFN</span></span>
    </div>
  </div>
  <div class="pager"><span class="tnum">1–20 / 40</span><div class="pages"><button disabled aria-label="Trang trước"><i data-lucide="chevron-left"></i></button><button aria-current="page">1</button><button>2</button><button aria-label="Trang sau"><i data-lucide="chevron-right"></i></button></div></div>
</div>
```
Hàng của chính mình: thêm `is-me`. Hàng bấm được: thêm `is-link` (hoặc dùng `<a class="tbl-row">`).

## Thanh công cụ lọc

```html
<div class="toolbar">
  <div class="search" style="min-width:240px"><i data-lucide="search"></i><input class="input" placeholder="Tìm theo tên hoặc mã bài" aria-label="Tìm bài tập"></div>
  <select class="select" style="width:auto" aria-label="Độ khó"><option>Mọi độ khó</option><option>Mức 1</option></select>
  <div class="segmented" role="group" aria-label="Trạng thái"><button aria-pressed="true">Tất cả</button><button aria-pressed="false">Đã làm</button><button aria-pressed="false">Chưa làm</button></div>
</div>
```

## Tab

```html
<div class="tabs" role="tablist">
  <button role="tab" aria-selected="true">Thông tin tài khoản</button>
  <button role="tab" aria-selected="false">Kỹ năng</button>
</div>
```

## Form

```html
<div class="form-grid">
  <div class="field"><label for="f1">Mã sinh viên</label><input id="f1" class="input" value="B23DCCN135" readonly></div>
  <div class="field"><label for="f2">Số điện thoại</label><input id="f2" class="input" value="0987 654 321"></div>
  <div class="field"><label for="f3">Giới tính</label><select id="f3" class="select"><option>Nam</option><option>Nữ</option></select></div>
</div>
<div class="row-gap" style="margin-top:20px"><button class="btn btn-primary">Lưu thay đổi</button><button class="btn">Hủy</button></div>
```

## Cặp khóa–giá trị, trạng thái rỗng, thanh tiến độ

```html
<dl class="kv"><dt>Giảng viên</dt><dd>ThS. Nguyễn Văn An</dd><dt>Hạn nộp</dt><dd class="tnum">20/10/2026</dd></dl>
<div class="empty">Chưa có lượt nộp nào. Chọn một bài trong mục Bài tập để bắt đầu.</div>
<div class="progress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><i style="width:75%"></i></div>
```

## Bảng ánh xạ icon Lucide (giữ nhất quán)

| Nghĩa | Icon | Nghĩa | Icon |
|---|---|---|---|
| Tổng quan | `layout-dashboard` | Bài tập / lab | `flask-conical` |
| Lịch sử | `history` | Xếp hạng | `trophy` |
| Hướng dẫn | `book-open` | ChatBot / bình luận | `message-square` |
| Tài khoản | `user-round` | Đăng xuất | `log-out` |
| Thông báo | `bell` | Sáng/tối | `sun-moon` |
| Tìm kiếm | `search` | Lọc | `list-filter` |
| Nộp bài / gửi | `send` | Tải tệp lên | `upload` |
| Tải xuống | `download` | Tiếp tục / đi tới | `arrow-right` |
| Quay lại | `arrow-left` | Hạn nộp / thời gian | `clock` |
| Đã đạt | `check` | Lỗi | `circle-alert` |
| Khóa / mật khẩu | `lock` | Kỹ năng | `radar` |
| Lớp học phần | `graduation-cap` | Giảng viên | `user-round` |
| Chuỗi ngày | `flame` | Danh hiệu | `award` |
| Sao chép | `copy` | Đóng | `x` |
| Trước / sau | `chevron-left` / `chevron-right` | Mở rộng / thu gọn | `chevron-down` / `chevron-up` |

## Phân trang chuẩn (BẮT BUỘC dùng cho mọi danh sách nhiều dòng)

Không tự viết HTML phân trang. Dùng `CLXUI.pager` (trong `assets/shell.js`): có khoảng hiển thị ("21–40 trên 58"), chọn số dòng mỗi trang, trang đầu/trước/số trang có dấu ba chấm/sau/cuối, trên mobile rút gọn còn "Trang x/y" + trước/sau. Nút nào cũng có nhãn tiếng Việt, dùng được bàn phím.

```html
<div class="card">
  <div class="tbl" id="list"> … hàng được vẽ bằng JS … </div>
  <div class="pager-host" id="pager"></div>   <!-- ngay dưới bảng, trong cùng .card -->
</div>
```
```js
var state = { rows: allRows, page: 1, size: 20 };
var pg = CLXUI.pager(document.getElementById('pager'), {
  total: state.rows.length, page: 1, size: 20, sizes: [20, 40, 60],
  onChange: function (page, size) { state.page = page; state.size = size; draw(); }
});
function draw() {
  var slice = CLXUI.paginate(state.rows, state.page, state.size);   // cắt đúng trang
  /* vẽ slice vào #list; nếu rỗng thì vẽ .empty */
  window.clxIcons();
}
// Khi lọc/tìm kiếm đổi: lọc lại rows rồi đưa về trang 1
function onFilterChange() { state.rows = applyFilters(); state.page = 1; pg.set({ total: state.rows.length, page: 1 }); draw(); }
```
Quy tắc: kích thước mặc định 20 (bảng dày: 40); đổi bộ lọc/tìm kiếm/số dòng luôn về trang 1; `total = 0` thì thanh phân trang tự ẩn và trang hiện `.empty`; danh sách dưới 1 trang vẫn hiện thanh để thấy tổng số (trừ khi total = 0).


## Hộp thoại (BẮT BUỘC dùng CLXUI.modal cho mọi hộp thoại tự dựng)

```html
<div class="dlg-scrim" id="dlg" hidden>          <!-- phủ toàn màn hình: nền var(--scrim) -->
  <div class="card card-pad" role="dialog" aria-modal="true" aria-labelledby="dlg-title" style="width:min(440px,calc(100vw - 32px))">
    <h2 id="dlg-title">Từ chối bài tập</h2>
    <div class="field"><label for="reason">Lý do (bắt buộc)</label><textarea id="reason" class="textarea"></textarea></div>
    <div class="row-gap" style="justify-content:flex-end;margin-top:16px"><button class="btn" data-close>Hủy</button><button class="btn btn-primary" id="ok">Từ chối</button></div>
  </div>
</div>
```
```js
var m = CLXUI.modal(document.getElementById('dlg'), { initialFocus: '#reason' });
openBtn.addEventListener('click', m.open);
dlg.querySelector('[data-close]').addEventListener('click', m.close);
```
Tự lo: nền ngoài hộp inert, Tab/Shift+Tab bị giữ trong hộp, Escape đóng, trả focus về nút đã mở hộp. Không tự viết bẫy focus riêng. CSS phủ: `position:fixed; inset:0; z-index:80; background:var(--scrim); display:grid; place-items:center` (`[hidden]` phải ẩn thật).
