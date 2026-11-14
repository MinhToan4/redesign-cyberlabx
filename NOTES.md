# Ghi chú phát triển & điều phối giao diện

## Trang Bài tập (`assignments.html`)

### 1. Dữ liệu đã bổ sung vào cuối `assets/data.js`
- `publicLabMapStages`: Đầy đủ 4 chặng của lộ trình Public Learning Map (`stage_1` đến `stage_4`) cùng danh sách các bài lab, điểm XP, độ khó, tỷ lệ hoàn thành và trạng thái.
- `baseComments`: Dữ liệu cây bình luận mẫu đa cấp từ `studentData.js` (gồm Giảng viên, Trợ giảng, Sinh viên).
- `assignmentDetails`: Chi tiết đề bài (mô tả đề bài, các bước thực hiện tuần tự, thông số kiểm thử `codeMetrics`, tiêu chuẩn chấm điểm và kết quả cần đạt `expected`) cho các bài lab của 3 lớp học phần và lộ trình public.

### 2. Các chế độ xem được hỗ trợ trên `assignments.html`
- **Chế độ 1 - Tổng quan:** Hỗ trợ 2 tab chuyển đổi mượt mà giữa "Bài tập theo Lớp học phần" (danh sách 3 lớp với tiến độ, giảng viên, tín chỉ, nút Luyện tập) và "Bản đồ bài tập Public (Learning Map)" (thống kê 4 chỉ số, bộ lọc theo chặng/trạng thái/tìm kiếm, 4 chặng với các bài lab).
- **Chế độ 2 - Danh sách bài của một lớp (`?class=...`):** Hỗ trợ tìm kiếm, lọc theo Nhóm / Độ khó / Chủ đề / Trạng thái, phân trang, chuyển đổi linh hoạt giữa dạng bảng (CSS grid `.tbl`) và dạng lưới (Grid cards).
- **Chế độ 3 - Chi tiết bài tập (`?code=...` hoặc `?class=...&code=...`):**
  - Cột chính: Thông số kiểm thử & rubric, mô tả đề bài, các bước thực hiện dạng timeline, khối kết quả cần đạt, lịch sử nộp bài của sinh viên cho riêng bài tập đó, và khu vực bình luận đa cấp có chức năng gửi bình luận và phản hồi (@).
  - Cột phụ (340px): Thẻ thông tin bài tập (môn, nhóm, chủ đề, độ khó, XP, số lượt nộp) và Thẻ nộp bài tệp `.lab` (hỗ trợ kéo thả/chọn file thật hoặc chọn nhanh tệp mẫu đúng quy chuẩn, nút Nộp bài mô phỏng chấm kết quả AC/WFN/WA với chi tiết từng bước, cập nhật ngay vào lịch sử và tiến độ).
- Xử lý đồng bộ cả hai tham số query/hash từ Dashboard (`assignments.html?class=<mã môn>&code=<mã bài>`) và hỗ trợ điều hướng lịch sử trình duyệt (`popstate`, Back/Forward).

## Trang Lịch sử (`history.html`), Bảng xếp hạng (`leaderboard.html`), Hướng dẫn (`guide.html`)

### 1. Dữ liệu đã bổ sung vào cuối `assets/data.js`
- `examRules`: 5 điều nội quy phòng thi chuẩn từ `studentData.js` phục vụ trang `guide.html`.
- Mở rộng thêm 18 bản ghi sinh viên mẫu cho `leaderboard` để bảng xếp hạng đạt 30 sinh viên, phục vụ kiểm thử phân trang nhiều trang thực tế.

### 2. Thiết kế và tính năng đã hoàn thiện
- **`history.html` (Lịch sử nộp bài):**
  - Bảng CSS Grid (`.tbl`) với phân trang chuẩn 20 dòng/trang.
  - Bộ công cụ lọc: tìm kiếm tức thì theo tên bài hoặc mã ID, lọc theo môn học, lọc theo mã kết quả (`AC`, `WA`, `WF`, `WFN`, `CPY`). Tự động về trang 1 khi đổi bộ lọc.
  - Chú giải mã kết quả rút gọn, phân loại chuẩn ngay dưới bảng.
  - Đáp ứng mobile (390px): tự động chuyển sang layout thẻ danh sách 2 dòng, ẩn cột ID và môn học ở chế độ hẹp để tránh cuộn ngang.
- **`leaderboard.html` (Bảng xếp hạng):**
  - Loại bỏ hoàn toàn banner hero 3D cúp phát sáng; bắt đầu ngay vào nội dung.
  - Chuyển đổi linh hoạt phạm vi bằng `.segmented`: "Theo lớp học phần" (đi kèm dropdown chọn lớp) và "Toàn khóa (XP)".
  - Bục vinh danh Top 3 gọn gàng, yên tĩnh, card #1 nhấn nhẹ tinh tế. Trên mobile xếp thứ tự #1 lên đầu theo chiều dọc.
  - Bảng xếp hạng phân trang 10 dòng/trang; hàng của sinh viên (`Vũ Trung Đức`) luôn được gán class `is-me` (nền `var(--accent-soft)` + nhãn "Bạn").
  - Thanh ghim thông tin vị trí của chính mình đặt ngay trên bảng kèm nút "Đến dòng của tôi" để nhảy nhanh đến đúng trang và dòng của mình.
- **`guide.html` (Hướng dẫn & Nội quy):**
  - Bố cục 2 cột gọn gàng: Cột chính hiển thị 4 bước thực hiện tuần tự kèm lưu ý nổi bật về định dạng tệp `.lab` để tránh lỗi WFN; Cột phụ chứa 5 nội quy ca thi bắt buộc và bảng thông số lệnh môi trường Labtainer (`labtainer`, `stoplab`, `~/labtainer_xfer`).
  - Dễ quét, phân cấp rõ ràng, tự động xếp chồng 1 cột trên màn hình nhỏ.
