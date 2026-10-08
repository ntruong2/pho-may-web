# PHỐ MÂY — GDD tóm tắt v0.2 (bản la bàn, 2 trang)

> Bản này là **nguồn chỉ hướng** cho mọi yêu cầu mới: việc gì không phục vụ các mục dưới đây thì để sau.
> Chi tiết từng hệ thống vẫn ở [GDD đầy đủ v0.1](GDD-Pho-May.md), [Kinh tế](Kinh-te-Can-bang.md), [Phong cách đồ hoạ](phong-cach-do-hoa.html), [Bản đồ 3D](ban-do-3d.html).
> Cập nhật 08/10/2026. Khi GDD đầy đủ và bản này khác nhau, **bản này thắng**.

## 1. Game là gì (một câu)
Life-sim chill, không chiến đấu: bạn chuyển lên **Phố Mây** (quần đảo trên mây đang xám đi vì Cơn Bão Xám — ẩn dụ của cô đơn), sống một nhịp sống Việt hiện đại — trồng rau, câu cá, nấu ăn, may đồ, chơi minigame — và **làm từng khu hồi sinh màu sắc** cùng hàng xóm.

| Mục | Chốt |
|---|---|
| Thể loại | Cozy life-sim, chơi một mình được, có yếu tố cộng đồng sau |
| Góc nhìn, đồ hoạ | **3D chibi** (three.js), camera nghiêng từ trên, màu pastel, model low-poly bằng script Blender. *(GDD v0.1 ghi 2D pixel art — đã đổi)* |
| Nhân vật | Chibi cao 1,9 m, mọi vật dựng theo [chuẩn kích thước](../CLAUDE.md) |
| Nền tảng | Web trước (điện thoại + máy tính), đóng gói app sau |
| Phiên chơi | 5–30 phút, 2–4 lần/ngày |
| Trụ cột | **Thư giãn · Sưu tầm · Sáng tạo · Kết nối** |
| Không có | Chiến đấu, PvP, bán sức mạnh/tốc độ, thể lực trả tiền |

## 2. Ba vòng chơi
- **10 giây – 2 phút:** hành động (tưới, câu, nấu, may) → phản hồi đẹp (tiếng, hạt sáng) → đồ + XP.
- **Một phiên (5–20 phút):** thu hoạch → việc vặt ngày → làm nghề → bán/tặng → minigame → trang trí nhà/đổi áo → gieo hạt mới (lý do quay lại).
- **Dài hạn:** chương truyện hồi sinh khu xám → lên cấp nghề → sưu tầm (cá, áo, nội thất) → nâng nhà → sự kiện mùa.

Vòng kinh tế: **sản xuất** (trồng, câu, nuôi) → **chế biến** (nấu, may, mộc, pha chế) → **bán / tặng / dùng** → Xu → nhà, áo, hạt tốt hơn.

## 3. Đang có trong bản chơi thử (thực tế, 10/2026)
- **14 khu**: Quảng Trường, Đồng Lúa Gió, Bến Sông Trăng, Hẻm Đèn Dầu, Chợ Đêm, Sân Chơi Cầu Vồng, Khu Nhà Mái Ngói, Rừng Đom Đóm, Vịnh San Hô Mây, Đỉnh Đèo Sương, Đảo Bão Xám, Nông trại riêng, Sân vườn, Sân thượng — cùng nhiều cảnh trong nhà (Phòng Trọ, Xưởng Tre, Atelier, Tháp Đồng Hồ, Đài Khí Tượng, Tiệm Hoa…).
- **Nghề**: nông, ngư (câu cá), bếp, Thợ Mộc, Thợ May, Pha Chế, Nghệ Sĩ Phố; chữ ký thợ, đồ 1–3 sao.
- **Hệ thống**: ngày/đêm, thời tiết, NPC có lịch sinh hoạt, nhiệm vụ, hồi sinh theo chương, Linh Mây đồng hành, nhà riêng + trang trí, tủ đồ, minigame (Ô Ăn Quan, Kéo Co, Họa Sĩ Nhí, Đua Thuyền Thúng…).
- **Chưa có (cần máy chủ)**: người chơi thật gặp nhau, chat, ghé nhà, Chợ chung, Dự Án Phố toàn server, mốc cư dân. Trong bản thử, NPC giả làm "người chơi khác".

## 4. Hướng đi đã chốt
1. **Bản offline hoàn chỉnh trước, online sau.** Mọi hệ thống phải vui khi chơi một mình; phần cộng đồng là lớp thêm.
2. **Chất lượng hơn số lượng.** Không thêm khu mới cho tới khi Chương 1 trọn vẹn và đẹp.
3. **Văn hoá Việt hiện đại + fantasy nhẹ** là bản sắc: cà phê muối, xe bánh mì, ban công hoa giấy, chợ đêm, thuyền thúng, cá phát sáng.
4. **Mọi thay đổi lớn đi qua bản phác 2D** rồi mới dựng 3D.

## 5. Mốc tiếp theo
| Mốc | Nội dung | Xong khi |
|---|---|---|
| **M1. Nền móng** | Tái cấu trúc code (Vite + module), dọn repo, lưu game có phiên bản | Bộ kiểm tra đạt, trang nhẹ hơn, sửa một hệ thống không phải đọc cả game |
| **M2. Chương 1 trọn vẹn** | 2–3 giờ chơi từ lúc đến đảo tới hết Chương 1: Quảng Trường, Đồng Lúa, Bến Sông, Hẻm, Phòng Trọ thật đẹp, đúng chuẩn kích thước; 30 phút đầu theo [mục 26 GDD](GDD-Pho-May.md#26-vòng-chơi-30-phút-đầu-tiên-của-một-người-chơi-mới) | Người chơi mới chơi hết không cần hỏi |
| **M3. Chơi thử** | 5–10 người chơi thật, bảng góp ý, ghi lỗi tự động, đo trên điện thoại thật | Có danh sách "chán ở đâu, lạc ở đâu" và đã sửa vòng 1 |
| **M4. Âm thanh + cảm giác** | Nhạc nền theo khu, tiếng hành động, rung/hạt sáng | Bật tiếng lên thấy "chill" |
| **M5. Online** | Tài khoản, lưu trên mây, gặp nhau, ghé nhà, Chợ chung | Kiểm tra bảo mật xong mới mở |

## 6. Câu hỏi còn mở (cần người chơi/người làm game quyết)
- Kiếm tiền: cosmetic + Season Pass như GDD v0.1, hay bán một lần (premium) cho bản offline?
- Tên quốc tế *Cloudtown Stories* — đã tra nhãn hiệu chưa?
- Mức độ cốt truyện: giữ thoại ngắn kiểu cozy, hay thêm cutscene cho mỗi chương?
- Đối tượng 13–30 tuổi: giao diện, chữ, độ khó có hợp với điện thoại cấu hình thấp ở Việt Nam?
