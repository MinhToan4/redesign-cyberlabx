# Nghiên cứu: bo góc và hình khối cho giao diện CyberLabX

Yêu cầu: giao diện vuông vức, mạnh mẽ, chắc chắn, không dùng bo góc tròn. Ngày tìm hiểu: 15/11/2026.

## Điều nguồn nói được

| Nội dung | Kết luận | Nguồn |
|---|---|---|
| Góc 0px | Gắn với sự nghiêm túc, chính xác, chuyên nghiệp, cảm giác ổn định và có cấu trúc; hợp tài chính và công nghệ cao cấp. Nhược điểm: có thể lạnh. | [How to Choose the Right Corner Radius for Your UI](https://personal-website-mohan.pages.dev/blogs/how_to_choose_the_corner_radius_for_web_interface) |
| Góc 2–4px | Lựa chọn "an toàn" phổ biến nhất của SaaS: vẫn gọn, bớt gắt; dễ trông chung chung nếu thiếu chi tiết riêng. | cùng nguồn trên |
| Góc 6–12px | Hiện đại, thân thiện, năng động (ứng dụng di động, startup). Dùng không nhất quán thì rối. | cùng nguồn trên |
| Bo tròn hoàn toàn | Rất mềm; tốn chỗ, khó dùng cho ô nhập, dropdown, bảng dữ liệu. | cùng nguồn trên |
| Vật thể có cạnh sắc | Nghiên cứu về hình dạng cho thấy người ta thường ưa vật cong hơn, và cạnh sắc gợi mối đe dọa (liên tưởng dao). Cần dùng tiết chế. | [UXPA Journal (Zhuo, 2025)](https://uxpajournal.org/wp-content/uploads/sites/7/pdf/UXPA_Zhuo_05012025.pdf) |
| Giao diện bo tròn | Gợi sự ấm áp, an toàn, thân thiện. | [Why do rounded corners make apps feel safer to use](https://weareaffective.com/learning-centre/why-do-rounded-corners-make-apps-feel-safer-to-use) |

## Điều nguồn KHÔNG chứng minh

Không có nguồn nào tìm được gắn trực tiếp góc vuông với "nam tính". Các nguồn chỉ hỗ trợ ý "nghiêm túc, chính xác, vững chắc, chuyên nghiệp". Cũng không tìm được tài liệu ngôn ngữ thiết kế chính thức của CrowdStrike hay Hack The Box để đối chiếu hình khối. Vì vậy quyết định dưới đây là quyết định thiết kế của dự án, dựa trên bốn ý đầu của bảng, không phải bằng chứng về giới tính.

## Quyết định áp dụng

- Bán kính gần vuông: `--r-tag` 2px, `--r-control` 3px, `--r-card` 4px, `--r-panel` 4px; cả bốn góc bằng nhau; không viên thuốc, không hình tròn (avatar, chấm, nút nổi, thanh tiến độ đều vuông vức).
- Chọn 2–4px thay vì 0px để tránh lạnh và gắt (theo nhược điểm của 0px), đồng thời bù cho nguy cơ "chung chung" của dải này bằng chi tiết riêng: tiêu đề Chakra Petch góc cạnh, nhãn mono viết hoa giãn chữ, dấu chấm bài AC/WA/WF/WFN/CPY, thanh vạch, thước hạn nộp, bảng sổ cái.
- Màu theo dự án aws-quest (đọc từ token và ảnh giao diện của chính dự án): nền gần đen, một màu nhấn cam hổ phách.
- Các kích thước lớn, dễ đọc (nội dung 16px) học từ `DESIGN-LANGUAGE.md` của aws-quest (chữ nội dung tối thiểu 16px, vùng chạm lớn).
