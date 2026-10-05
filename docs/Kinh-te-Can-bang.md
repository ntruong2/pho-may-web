# PHỐ MÂY — Bảng cân bằng kinh tế v0.1

> Tài liệu đi kèm [GDD](GDD-Pho-May.md). Mọi con số dưới đây được tính bằng `tools/economy_sim.py`.
> Muốn chỉnh: sửa tham số ở đầu script → chạy `python3 tools/economy_sim.py` → cập nhật bảng.
> Đây là **số thiết kế ban đầu**, phải kiểm chứng lại bằng dữ liệu Alpha/Beta.

---

## 1. Mục tiêu kinh tế

| # | Mục tiêu | Chỉ số đo được |
|---|---|---|
| 1 | Người chơi ít thời gian vẫn tiến bộ đều | Người chơi casual đạt các mốc ở mục 2 đúng hạn ±20% |
| 2 | Không có “một cách kiếm tiền tốt nhất” | Mỗi hoạt động (trồng, câu, nấu, nhiệm vụ) chiếm 15–45% thu nhập ngày |
| 3 | Tiền không mất giá | Tỉ lệ **tiêu/kiếm toàn server ≥ 85%** sau ngày 30 · Chỉ số giá rổ hàng thay đổi < 10%/tháng |
| 4 | Tiền thật không mua được lợi thế | Không có đường quy đổi Ngọc → Xu, không bán tốc độ/tỉ lệ |
| 5 | Chợ người chơi có ý nghĩa | ≥ 30% người chơi cấp 10+ giao dịch trên Chợ ít nhất 1 lần/tuần |

## 2. Người chơi mẫu và mốc tiến trình

| Mẫu | Nhịp chơi | Ghi chú |
|---|---|---|
| **Casual** | 3 phiên/ngày lúc 08:00, 12:30, 20:00 · ~15 phút/phiên · 15 phút câu cá · 2 minigame | Đa số người chơi |
| **Active** | 5 phiên/ngày · ~2 giờ · 45 phút câu cá · 6 minigame | ~20% người chơi |

**Mốc mục tiêu và kết quả mô phỏng**

| Mốc | Mục tiêu (casual) | Mô phỏng casual | Mô phỏng active |
|---|---|---|---|
| Cấp 10 | Ngày 3–4 | Ngày 3 ✅ | Ngày 2 |
| Nhà Phố Ống (8.000 Xu, cấp 12) | Ngày 8–12 | Ngày 12 ✅ | Ngày 7 |
| Cấp 20 | Tuần 3 | Ngày 16 ✅ | Ngày 8 |
| Cấp 30 + đủ 60 ô đất | Tuần 6–8 | Ngày 44 ✅ | Ngày 21 |
| Nhà Vườn (40.000 Xu, cấp 30) | Ngày 45–60 | Ngày 44 ✅ | Ngày 38 |
| Biệt Thự Mây (150.000 Xu, cấp 45) | Tháng 4–6 | Ngày 140 ✅ | Ngày 103 |

> Active nhanh gấp ~2 lần casual: đủ để cố gắng được đền đáp, nhưng chưa tới mức người chơi ít giờ bị bỏ quá xa.

---

## 3. Thu nhập mục tiêu theo cấp (mỏ neo của toàn bộ bảng giá)

Mọi giá trong game được suy ra từ bảng này: *“một ngày chơi bình thường ở cấp L nên kiếm được bao nhiêu Xu?”*

**Casual (≈45 phút/ngày)**

| Cấp | Nông trại | Câu cá | Việc vặt | Minigame | Đơn hàng (phần thưởng) | Tổng | XP/ngày |
|---|---|---|---|---|---|---|---|
| 1 | 108 (Rau muống) | 188 | 165 | 40 | 43 | **544** | 2.524 |
| 5 | 432 (Bắp) | 188 | 225 | 40 | 72 | **957** | 2.620 |
| 10 | 1.200 (Cà phê) | 308 | 300 | 40 | 108 | **1.956** | 2.740 |
| 15 | 2.016 (Sen) | 435 | 375 | 40 | 144 | **3.010** | 2.860 |
| 20 | 2.940 (Cây Trái Sao) | 637 | 450 | 40 | 180 | **4.247** | 2.980 |
| 25 | 3.840 (Nho Mây Tím) | 637 | 525 | 40 | 216 | **5.258** | 3.100 |
| 30 | 5.280 (Chè Đồi Sương) | 637 | 600 | 40 | 252 | **6.809** | 3.220 |
| 40 | 6.000 (Sầu Riêng Mây) | 637 | 750 | 40 | 324 | **7.751** | 3.460 |
| 50 | 6.480 (Lúa Vàng Mây) | 637 | 900 | 40 | 396 | **8.453** | 3.700 |

**Active (≈2 giờ/ngày)**

| Cấp | Nông trại | Câu cá | Việc vặt | Minigame | Đơn hàng (phần thưởng) | Tổng | XP/ngày |
|---|---|---|---|---|---|---|---|
| 1 | 180 (Rau muống) | 564 | 165 | 120 | 86 | **1.116** | 5.460 |
| 5 | 720 (Bắp) | 564 | 225 | 120 | 144 | **1.773** | 5.700 |
| 10 | 1.800 (Thanh long) | 925 | 300 | 120 | 216 | **3.361** | 6.000 |
| 15 | 2.160 (Thanh long) | 1.304 | 375 | 120 | 288 | **4.247** | 6.150 |
| 20 | 4.284 (Bông Gòn Mây) | 1.910 | 450 | 120 | 360 | **7.124** | 6.300 |
| 25 | 4.896 (Bông Gòn Mây) | 1.910 | 525 | 120 | 432 | **7.883** | 6.450 |
| 30 | 7.920 (Chè Đồi Sương) | 1.910 | 600 | 120 | 504 | **11.054** | 6.600 |
| 40 | 7.920 (Chè Đồi Sương) | 1.910 | 750 | 120 | 648 | **11.348** | 6.900 |
| 50 | 7.920 (Chè Đồi Sương) | 1.910 | 900 | 120 | 792 | **11.642** | 7.200 |

**Nhận xét:**
- Casual sống chủ yếu nhờ **nông trại** (cây lớn khi offline). Active kiếm thêm nhiều từ **câu cá**. Hai kiểu chơi đều có chỗ đứng.
- Minigame cố ý cho ít Xu (20/trận). Phần thưởng chính của minigame là XP và Vé Vui, để minigame không thành chỗ “cày tiền”.
- Sau cấp 30, thu nhập casual vẫn tăng chậm nhờ các cây cấp 24–44 (6.809 → 8.453 Xu/ngày ở cấp 50), nên sink cuối game phải đủ lớn (mục 10: 55% thu nhập). Giai đoạn cuối game vẫn xoay quanh sưu tầm và giao lưu, không phải kiếm thêm tiền.

---

## 4. Cây trồng

**Hai quy tắc thiết kế:**
1. **Cây ngắn ngày** cho lãi/giờ cao khi ngồi chơi, nhưng lãi mỗi lần thu hoạch thấp. Hợp khi đang online.
2. **Cây dài ngày** cho lãi/lần cao, lãi/giờ thấp. Hợp khi gieo trước lúc thoát game.

→ Không có loại cây “tốt nhất” cho mọi người; mỗi phiên người chơi đều phải chọn gieo gì.

| Cây | Cấp | Giá hạt | Thời gian | Sản lượng | Giá NPC/đv | Lãi/lần | Lãi/ô/giờ (online) | Thu/ngày (casual) | **Lãi/ô/ngày (casual)** |
|---|---|---|---|---|---|---|---|---|---|
| Rau muống | 1 | 4 | 3 phút | 1 | 7 | 3 | **60** | 3 | 9 |
| Cà chua | 2 | 11 | 10 phút | 2 | 8 | 5 | 30 | 3 | 15 |
| Lúa | 3 | 15 | 30 phút | 3 | 7 | 6 | 12 | 3 | 18 |
| Hoa giấy | 4 | 17 | 1 giờ | 2 | 12 | 7 | 7 | 3 | 21 |
| Bắp | 5 | 24 | 45 phút | 2 | 16 | 8 | 11 | 3 | 24 |
| Dâu tây | 6 | 30 | 2 giờ | 2 | 20 | 10 | 5 | 3 | 30 |
| Thanh long | 8 | 36 | 3 giờ | 2 | 24 | 12 | 4 | 3 | 36 |
| Cà phê | 10 | 40 | 6 giờ | 3 | 20 | 20 | 3 | 2 | 40 |
| Dâu tằm | 12 | 25 | 4 giờ | 4 | 10 | 15 | 4 | 3 | 45 |
| Sen | 14 | 60 | 8 giờ | 2 | 44 | 28 | 4 | 2 | 56 |
| Bông Gòn Mây | 16 | 70 | 6 giờ | 2 | 52 | 34 | 6 | 2 | 68 |
| Cây Trái Sao | 20 | 150 | 24 giờ | 1 (+3% Trái Sao Băng ≈ 1.000) | 190 | 70 (kỳ vọng) | 3 | 1 | 70 |
| Nho Mây Tím | 24 | 80 | 8 giờ | 3 | 40 | 40 | 5 | 2 | 80 |
| Chè Đồi Sương | 28 | 60 | 6 giờ | 4 | 26 | 44 | 7 | 2 | 88 |
| Hoa Đăng Trăng | 32 | 100 | 12 giờ | 2 | 74 | 48 | 4 | 2 | 96 |
| Sầu Riêng Mây | 38 | 200 | 24 giờ | 1 | 300 | 100 | 4 | 1 | 100 |
| Lúa Vàng Mây | 44 | 60 | 4 giờ | 4 | 24 | 36 | 9 | 3 | 108 |

**Điều chỉnh bổ sung:**
- Tưới (+10% sản lượng) và phân bón (chất lượng 3 sao, giá ×1,5) chưa tính trong bảng. Đây là phần thưởng cho người chăm, cộng thêm khoảng 10–20%.
- Cây theo mùa: trái mùa vẫn trồng được nhưng thời gian ×1,5.
- ✅ **Đã lấp lỗ hổng nội dung:** thêm 5 cây cấp 24–44 (lãi/ô/ngày 80–108). Sink cuối game được nâng từ 45% lên 55% thu nhập để bù (mục 10).

---

## 5. Đất và nhà (sink lớn nhất giai đoạn đầu–giữa)

| Mở rộng | Cấp | Tổng số ô | Giá | Cộng dồn |
|---|---|---|---|---|
| Khởi đầu | 1 | 12 | 0 | 0 |
| Lần 1 | 4 | 18 | 500 | 500 |
| Lần 2 | 7 | 24 | 1.500 | 2.000 |
| Lần 3 | 10 | 30 | 3.000 | 5.000 |
| Lần 4 | 14 | 36 | 6.000 | 11.000 |
| Lần 5 | 18 | 42 | 10.000 | 21.000 |
| Lần 6 | 22 | 48 | 16.000 | 37.000 |
| Lần 7 | 26 | 54 | 24.000 | 61.000 |
| Lần 8 | 30 | 60 | 35.000 | **96.000** |

| Nhà | Cấp | Giá |
|---|---|---|
| Nhà Phố Ống | 12 | 8.000 |
| Nhà Vườn | 30 | 40.000 |
| Biệt Thự Mây | 45 | 150.000 |

**Quy tắc:** mỗi lần mở đất tốn khoảng **2–4 ngày thu nhập casual** ở cấp đó. Lần mở đầu tiên (500 Xu) nằm trong tầm ngày đầu để tạo cảm giác tiến bộ ngay.

---

## 6. Câu cá

### 6.1 Nhịp câu
Khoảng 40 giây/con, tính cả ném cần, chờ phao, kéo, 20% cá sổng và thời gian đổi chỗ, tức **~90 con/giờ**. Mỗi “điểm cá” (vệt bọt nước) cạn sau 8–12 lần câu và dời sang chỗ khác, buộc người chơi đi lại và gặp nhau.

### 6.2 Giá trị theo khu

| Khu | Cấp | Common (tỉ lệ · giá TB) | Rare | Epic | **Xu/con TB** | **Xu/giờ** |
|---|---|---|---|---|---|---|
| Bến Sông Trăng | 1 | 70% · 5 | 29% · 14 | 1% (chỉ khi giông) · 80 | 8,4 | ~750 |
| Vịnh San Hô Mây | 8 | 70% · 6,5 | 22% · 18 | 8% · 65 | 13,7 | ~1.230 |
| Suối Rừng Đom Đóm | 15 | 68% · 9 | 24% · 25 | 8% · 90 | 19,3 | ~1.740 |
| Hồ Đỉnh Đèo | 20 | 65% · 12 | 25% · 34 | 10% · 120 | 28,3 | ~2.550 |

### 6.3 Bảng giá cá (NPC)
| Cá | Độ hiếm | Giá | | Cá | Độ hiếm | Giá |
|---|---|---|---|---|---|---|
| Cá rô đồng | Common | 4 | | Mực ống phát sáng | Rare | 22 |
| Cá lóc | Common | 6 | | Cá suối đốm sao | Rare | 25 |
| Cá trê | Common | 7 | | Cá ngừ đại dương | Epic | 60 |
| Cá nục | Common | 6 | | Cá Ngựa Kẹo Bông | Epic | 70 |
| Cá linh | Rare | 12 | | Cá Sấm Sét | Epic | 80 |
| Cá tai tượng | Rare | 14 | | Cá Tuyết Mây | Epic | 95 |
| Cá chép đỏ | Rare | 15 | | Legendary | — | Không bán NPC · chợ ~2.000–6.000 |

**Mồi:** giun miễn phí, không giới hạn. Tôm 3 Xu/cái (+Rare ở biển). Mồi Sao 25 Xu/cái (+2% Epic). Riêng Mồi Sao có lãi kỳ vọng hơi âm (≈ −5%): đây là sink nhỏ cho người thích “đánh cược”.

**Cần câu** (chỉ làm vùng xanh rộng hơn, không tăng tỉ lệ): Tre (miễn phí) → Trúc 800 → Carbon 4.000 → Mây Bạc 15.000 → Mây Vàng 40.000 + 1 Legendary.

**Bản mẫu 3D (Q257):** Cá rô đồng 4 Xu và Cá nục 6 Xu theo đúng bảng trên. Cá Đèn Lồng Trăng (Legendary) chưa có Chợ nên Chú Bảy mua 300 Xu như Cá Rồng Mây (Q142); cá chỉ lên đêm rằm (khoảng 3 đêm mỗi tháng) ở Đỉnh Đèo nên không đổi Xu/giờ ở mục 6.2. Lực ném chỉ đổi cỡ cá (cm), không đổi loài hay giá. Không đổi tham số `tools/economy_sim.py`.

---

## 7. Vật nuôi

Sản phẩm tồn trong chuồng tối đa 2–3 cái, nên casual thu 3 lần/ngày.

| Con | Cấp | Giá con | Chuồng (1 lần) | Chu kỳ | Giá SP | Thức ăn/SP | SP/ngày casual | Lãi/ngày | Hoàn vốn con đầu | Con thêm |
|---|---|---|---|---|---|---|---|---|---|---|
| Gà ta | 8 | 300 | 500 | 1 giờ | 8 | 2 | 9 | 54 | 15 ngày | 6 ngày |
| Vịt | 10 | 450 | 700 | 1,5 giờ | 12 | 3 | 9 | 81 | 14 ngày | 6 ngày |
| Tằm (hộp) | 12 | 600 | 600 | 4 giờ | 40 | 10 (dâu tằm) | 4 | 120 | 10 ngày | 5 ngày |
| Bò sữa | 14 | 1.500 | 2.000 | 3 giờ | 30 | 6 | 5 | 120 | 29 ngày | 13 ngày |
| Ong | 16 | 2.000 | — | 6 giờ | 55 | 0 | 3 | 165 | 12 ngày | 12 ngày |
| Gà Lông Mây | 22 | 3.000 | — | 4 giờ | 90 | 15 | 4 | 300 | 10 ngày | 10 ngày |
| Cừu Bông Gòn | 25 | 5.000 | 3.000 | 6 giờ | 120 | 20 | 3 | 300 | 27 ngày | 17 ngày |

**Giới hạn:** chuồng gà 4 con (nâng lên 8), chuồng bò 2 con (nâng lên 4). Nhờ vậy vật nuôi chỉ góp khoảng 10–20% thu nhập, không lấn át trồng trọt.

> Bò sữa hoàn vốn chậm (29 ngày) nhưng **sữa là nguyên liệu** cho nhiều món giá trị cao, nên giá trị thật nằm ở nghề Bếp và Pha Chế.

---

## 8. Chế biến (Đầu Bếp, Pha Chế)

**Quy tắc giá trị gia tăng:** giá món ≈ **1,4 × giá NPC của nguyên liệu**. Món 3 sao (Bếp Bậc Thầy) được ×1,5 nữa.

Để nấu ăn không thành “máy in tiền”, mỗi món cần **thời gian nấu thực** trong một **khe bếp**:

| Khe bếp | Mở khi | Giá |
|---|---|---|
| 2 khe | Mặc định | — |
| Khe 3 | Bếp bậc 5 | 2.000 |
| Khe 4 | Bếp bậc 10 | 6.000 |
| Khe 5 | Bếp bậc 15 | 15.000 |
| Khe 6 | Bếp bậc 20 | 30.000 |

| Món | Bậc | Nguyên liệu (giá NPC) | Tổng NL | Giá món | Lãi | Thời gian nấu | Lãi/khe/giờ | Buff khi ăn |
|---|---|---|---|---|---|---|---|---|
| Canh chua cá lóc | 1 | Cá lóc 6 + Cà chua 8 + Rau muống 7 | 21 | 30 | 9 | 5 phút | 108 | Ấm Bụng: phao rung rõ 30′ |
| Trứng chiên cà chua | 1 | 2 Trứng gà 16 + Cà chua 8 | 24 | 34 | 10 | 5 phút | 120 | — |
| Cá kho tộ | 2 | Cá trê 7 + Nước mắm 5 + Đường 3 | 15 | 22 | 7 | 5 phút | 84 | — |
| Chè bắp | 3 | 2 Bắp 32 + Đường 3 | 35 | 50 | 15 | 10 phút | 90 | Ngọt Ngào: +5% Vé Vui 30′ |
| Sinh tố dâu | 5 | 2 Dâu 40 + Sữa 30 | 70 | 100 | 30 | 15 phút | 120 | — |
| Lẩu cá (món nhóm, 4 phần) | 6 | 2 Cá lóc 12 + 2 Cà chua 16 + 3 Rau muống 21 + Nước dùng 10 | 59 | 85 | 26 | 20 phút | 78 | Cả party: +10% XP 30′ |
| Cà phê muối (Pha Chế) | 2 | 3 Cà phê 60 + Sữa 30 + Muối 2 | 92 | 130 | 38 | 20 phút | 114 | Tỉnh Táo: +10% XP 15′ |
| Chè hạt sen | 8 | 2 Sen 88 + Đường 3 | 91 | 130 | 39 | 30 phút | 78 | — |
| Cá ngừ nướng mật ong | 10 | Cá ngừ 60 + Mật ong 55 | 115 | 165 | 50 | 30 phút | 100 | — |
| Bánh bông lan trứng mây | 14 | Trứng Mây 90 + Sữa 30 + Bột 10 | 130 | 190 | 60 | 60 phút | 60 | Bồng Bềnh: đi nhanh +10% 30′ |

**Kết quả:** giá trị gia tăng khoảng 80–120 Xu/khe/giờ. Casual 6 khe × 3 lượt/ngày thêm khoảng **600–1.000 Xu/ngày ở cuối game** (~10–15% thu nhập). Mô phỏng chưa tính phần này vì nó được bù bằng giới hạn thu mua NPC (mục 11).

**Quy tắc buff:** buff chỉ mang tính tiện lợi. Mỗi lúc chỉ có 1 buff đồ ăn và 1 buff đồ uống, và buff không bao giờ bán bằng Ngọc.

---

## 9. Nguồn Xu (faucet)

| Nguồn | Lượng | Giới hạn |
|---|---|---|
| Bán nông sản, cá, món ăn cho NPC | Theo bảng giá | Giới hạn thu mua/ngày (mục 11) |
| Việc Vặt ngày | (30 + 3 × cấp) Xu/việc × 5 | 5 việc/ngày |
| Bảng Đơn Hàng NPC | Giá NPC của hàng × 1,3 | 3 đơn/4 giờ |
| Minigame | 20 Xu/trận (+10 cho hạng nhất) | Đủ thưởng 10 trận/ngày, sau đó 50% |
| Nhiệm vụ cốt truyện | 100–1.500 Xu/nhiệm vụ | Một lần |
| Thành tựu, Bách Khoa | 200–5.000 Xu | Một lần |
| Lì xì Tết, sự kiện | Theo sự kiện | Theo sự kiện |

> **Không phải faucet:** bán hàng cho người chơi khác chỉ chuyển Xu từ người này sang người kia, không tạo Xu mới, và còn mất 5% phí.

## 10. Nơi tiêu Xu (sink)

| Giai đoạn | Sink | Quy mô |
|---|---|---|
| Đầu (cấp 1–15) | Hạt giống, thức ăn thú | Đã trừ trong lãi |
| | Mở rộng đất lần 1–4 | 11.000 |
| | Nhà Phố Ống | 8.000 |
| | Chuồng, vật nuôi, khe bếp 3–4 | ~15.000 |
| | Quần áo, nội thất NPC, nhuộm | ~25% thu nhập |
| | Tiền phạt nghề ngoài luồng (từ cấp 12, bị huỷ) | 1–2 × tiền lời mỗi lần bị bắt; nhỏ, không tính vào mô phỏng |
| | Xe Buýt Gió đi ngay (5 Xu/lần, miễn phí đến cấp 5) | Rất nhỏ: là tiện lợi, không tính là sink |
| Giữa (cấp 15–30) | Mở đất lần 5–8 | 85.000 |
| | Nhà Vườn | 40.000 |
| | Cần câu, khe bếp 5–6, vật nuôi fantasy | ~100.000 |
| | Phí Chợ 5% | Theo giao dịch |
| **Cuối game (cấp 30+)** | Biệt Thự Mây | 150.000 |
| | **Nội Thất Di Sản** (bộ nội thất cao cấp bán bằng Xu, ra mới mỗi mùa, 20.000–80.000/món) | Sink định kỳ chính |
| | **Nhà Văn Hóa Tổ** (cả tổ góp Xu nâng cấp: 50.000 → 500.000) | Sink xã hội |
| | **Quỹ Phố** (góp Xu cho Dự Án Phố, mốc thưởng chung, tên lên bảng vinh danh) | Không giới hạn |
| | **Đấu giá tuần Xe Buýt Lạ** (1 món độc bán đấu giá bằng Xu, tiền bị huỷ) | 50.000–300.000/món |
| | Cần câu Mây Vàng, nâng cấp Linh Mây (cosmetic bằng Xu) | 40.000+ |

### Phát hiện từ mô phỏng: cần sink cuối game
| Kịch bản | Tỉ lệ tiêu/kiếm ngày 90 | Ngày 180 | Xu tồn ngày 180 (casual) |
|---|---|---|---|
| Không có sink cuối game | 57% | 54% | 455.000 |
| Có sink cuối game (≈45% thu nhập từ cấp 30), trước khi thêm cây cấp 24–44 | 84% | 91% | 87.000 |
| Sink 45% sau khi thêm cây cấp 24–44 | 81% | 86% | 177.000 |
| **Sink 55% (hiện hành)** | **87%** | **95%** | **68.000** |

→ Sink cuối game cần **≈55% thu nhập từ cấp 30** (trước đây 45%, trước khi có cây cấp 24–44). Nếu không có sink cuối game, **sau khoảng 3 tháng người chơi lâu năm sẽ tích Xu rất nhanh**, đẩy giá trên Chợ lên và làm người mới khó mua đồ. Vì vậy 4 sink cuối game in đậm ở trên phải có từ bản 1.0.

**Mô phỏng casual (sink cuối game 55%, chạy `python3 tools/economy_sim.py`):**

| Ngày | Cấp | Xu đang giữ | Số ô | Tổng Xu kiếm | Tổng Xu tiêu | Tỉ lệ tiêu/kiếm |
|---|---|---|---|---|---|---|
| 1 | 6 | 8 | 18 | 544 | 636 | 117% |
| 3 | 10 | 506 | 24 | 3.208 | 2.802 | 87% |
| 7 | 14 | 3.700 | 30 | 11.467 | 7.867 | 69% |
| 14 | 19 | 7.466 | 36 | 35.154 | 27.789 | 79% |
| 30 | 25 | 37.514 | 48 | 109.885 | 72.471 | 66% |
| 60 | 34 | 24.010 | 60 | 307.394 | 283.483 | 92% |
| 90 | 40 | 69.304 | 60 | 533.860 | 464.657 | 87% |
| 120 | 45 | 117.228 | 60 | 773.483 | 656.355 | 85% |
| 180 | 50 | 68.333 | 60 | 1.279.005 | 1.210.773 | 95% |

Tỉ lệ tiêu/kiếm thấp ở ngày 7–30 (66–79%) là **bình thường**: người chơi đang dành dụm cho nhà và đất.

---

## 11. NPC thu mua: giới hạn & giá động

**Giới hạn thu mua/ngày/người** (reset lúc 04:00):

| Nhóm hàng | Giới hạn | Vượt giới hạn |
|---|---|---|
| Nông sản Common | 150 mỗi loại | Giá còn 30% |
| Nông sản Rare/fantasy | 40 mỗi loại | Giá còn 30% |
| Cá Common | 100 tổng | Giá còn 30% |
| Cá Rare | 40 tổng | Giá còn 30% |
| Cá Epic | 15 tổng | Giá còn 50% |
| Món ăn/đồ uống | 40 tổng | Giá còn 30% |
| Nguyên liệu Epic (Trứng Mây, Trái Sao Băng…) | 10 | Không mua |

→ Chặn bot cày một thứ, và đẩy người chơi mang hàng dư lên **Chợ** hoặc làm **Đơn Hàng**, **Dự Án Phố**.

**Giá động toàn server:** mỗi loại nông sản có
`hệ số giá = clamp(1 − 0,15 × (lượng bán hôm qua / lượng kỳ vọng − 1), 0,85, 1,15)`.
Chị Mận công bố “Giá nông sản hôm nay” trên bảng tin, biến việc giá lên xuống thành một nội dung nhỏ để người chơi theo dõi.

---

## 12. Luật Chợ (con số cụ thể)

| Tham số | Giá trị |
|---|---|
| Phí đăng tin | 1% giá đăng (tối thiểu 1 Xu), không hoàn lại. Chống spam tin rao |
| Phí khi bán được | 4% (Chủ Sạp: 2%) |
| Khung giá | 30%–300% giá trung vị 7 ngày (hàng mới chưa có dữ liệu: theo giá tham chiếu × 0,5–5) |
| Thời hạn tin | 48 giờ, gia hạn miễn phí 1 lần |
| Số tin | Thường 10 · Chủ Sạp 30 · +5 cho mỗi bậc Chủ Sạp |
| Tài khoản mới (< 3 ngày, < cấp 10) | Chỉ mua, chưa được bán |
| Giao dịch 1-1 | Tối đa 50.000 Xu/ngày/người, chênh lệch giá trị > 10 lần thì cảnh báo |
| Ký quỹ (escrow) | Vật phẩm bị khóa khi đăng. Tiền bị khóa khi mua. Hoàn tất trong 1 giao dịch DB |

---

## 13. Ngọc Mây (tiền cao cấp)

### 13.1 Giá trị 1 Ngọc
| Gói | Giá | Ngọc | đ/Ngọc |
|---|---|---|---|
| Nhỏ | 20.000đ | 60 | 333 |
| Vừa | 99.000đ | 330 | 300 |
| Lớn | 199.000đ | 700 | 284 |
| Siêu | 499.000đ | 1.800 | 277 |
| Nguyệt Phiếu Mây | 49.000đ | 300 (10/ngày) + khung | 163 |

→ Mốc định giá nội bộ: **1 Ngọc ≈ 300đ**.

### 13.2 Thang giá cosmetic
| Loại | Ngọc | ≈ VNĐ |
|---|---|---|
| Sticker pack, bong bóng chat, dấu chân Common | 30–40 | 9–12k |
| Món Rare (áo, mũ, balo, emote đơn) | 60–120 | 18–36k |
| Món Epic có hoạt ảnh | 200–350 | 60–105k |
| Bộ Epic trọn (4–6 món + hiệu ứng bộ) | 450–650 (giảm ~25% so với mua lẻ) | 135–195k |
| Theme nhà trọn gói | 300–500 | 90–150k |
| Emote đôi / bộ đồ đôi (tặng kèm 1 bản cho bạn) | 150–300 | 45–90k |
| Legendary | Không bán thẳng: chỉ qua Sổ Tay Mùa (cấp cao) hoặc Hộp Mây | — |

### 13.3 Ngọc cho người chơi miễn phí
| Nguồn | Ngọc |
|---|---|
| Sổ Tay Mùa nhánh miễn phí | ~150/mùa (7 tuần) ≈ 21/tuần |
| Thành tựu, sự kiện, Bách Khoa | ~15/tuần |
| **Tổng** | **≈ 36/tuần ≈ 155/tháng (~46.000đ giá trị)** |

→ Người không nạp mua được **1 món Rare mỗi tháng**, hoặc để dành ~2 mùa để mua **Sổ Tay Mùa Premium (300 Ngọc)**. Sổ Tay Premium hoàn lại ~300 Ngọc nếu chơi hết, nên sau lần đầu có thể tự nuôi các mùa sau. Đây là “cửa” để người chơi miễn phí trải nghiệm đồ premium.

### 13.4 Hộp Mây (nếu áp dụng)
| Tham số | Giá trị |
|---|---|
| Giá | 30 Ngọc/lượt · 270 Ngọc/10 lượt |
| Tỉ lệ | Rare 75% · Epic 22% · Legendary 3% |
| Bảo hiểm | Lượt thứ 60 chắc chắn Legendary |
| **Kỳ vọng** | **≈ 28 lượt → ~840 Ngọc ≈ 250.000đ** mỗi Legendary |
| Tối đa | 60 lượt = 6 gói 10 lượt = 1.620 Ngọc ≈ 490.000đ |
| Trùng đồ | Đổi Mảnh Mây: Rare 1 · Epic 5 · Legendary 40. Đủ 120 Mảnh đổi thẳng 1 Legendary của hộp |
| Người < 18 tuổi | Tối đa 10 lượt/ngày, hiện tổng chi tiêu tháng |

---

## 14. Kiểm tra thực tế doanh thu

Giả định: MAU = 2,5 × DAU · 3% MAU trả tiền · ARPPU 120.000đ/tháng · phí store 15% (chương trình nhà phát triển nhỏ của Apple/Google, cần kiểm tra điều kiện) · chưa tính thuế.

| DAU | Người trả tiền/tháng | Doanh thu gộp/tháng | Thực nhận (−15%) |
|---|---|---|---|
| 5.000 | 375 | 45 triệu | 38 triệu |
| 10.000 | 750 | 90 triệu | 77 triệu |
| 20.000 | 1.500 | 180 triệu | 153 triệu |
| 50.000 | 3.750 | 450 triệu | 383 triệu |

Chi phí vận hành (team 6 người ~150 triệu + server/công cụ ~15 triệu) → **hòa vốn vận hành khoảng 20.000 DAU**.

**Hàm ý:**
- Game sống được hay không phụ thuộc vào **giữ chân người chơi và lan truyền qua bạn bè**, chứ không phải vào việc tăng giá cosmetic.
- Sau khi ra mắt, cân nhắc giữ team 4–5 người, mở thêm thị trường Đông Nam Á sớm, và đưa bản Windows lên Steam.
- Theo dõi: tỉ lệ trả tiền, ARPPU, và tỉ lệ doanh thu đến từ **quà tặng**. Nếu quà tặng mạnh thì cơ chế social đang hoạt động.

---

## 15. Bảng theo dõi & đòn bẩy điều chỉnh

| Tín hiệu | Ngưỡng báo động | Đòn bẩy (không cần ra bản cập nhật) |
|---|---|---|
| Tổng cung Xu / DAU | Tăng > 15%/tuần sau ngày 30 | Thêm Nội Thất Di Sản, mở Đấu giá, tăng mục tiêu Quỹ Phố |
| **Chỉ số giá Phố Mây** (rổ 20 mặt hàng) | Tăng > 10%/tháng | Tăng phí Chợ tạm thời (≤ 7%), sự kiện “Hội chợ giảm giá” NPC |
| Chỉ số giá | Giảm > 10%/tháng | Tăng giới hạn thu mua NPC, thêm Đơn Hàng giá cao |
| Tỉ trọng thu nhập 1 hoạt động | > 50% | Chỉnh giá NPC ±10% cho nhóm hàng đó |
| Tin rao hết hạn không bán | > 60% | Kiểm tra khung giá, giảm phí đăng |
| Xu trung vị casual ngày 14 | < 3.000 hoặc > 15.000 | Chỉnh thưởng Việc Vặt |
| Gini Xu toàn server | > 0,75 | Soát bot, thêm sink cuối game |
| Tài khoản nghi bot (bán chạm giới hạn thu mua ≥ 5 ngày liên tục + mẫu thao tác đều) | Tăng đột biến | Hàng đợi kiểm tra, CAPTCHA nhẹ |

Mọi giá NPC, giới hạn, phí và tỉ lệ đều là **remote config**: chỉnh trên server, có hiệu lực ngay, và được ghi log để còn phân tích sau.

---

## 16. Tham số cần kiểm chứng ở Alpha/Beta

1. **~90 cá/giờ**: đo thời gian thật mỗi lần câu.
2. **Nhịp 3 phiên/ngày** của casual: đo giờ đăng nhập thực tế (có thể là 2 phiên dài).
3. **25% thu nhập** chi cho quần áo/nội thất NPC: phụ thuộc lượng hàng NPC hấp dẫn.
4. Người chơi có thực sự chọn cây ngắn khi online và cây dài trước khi thoát không.
5. Tốc độ lên cấp: nếu D7 thấp vì “lên cấp chậm”, tăng XP Việc Vặt trước, không động vào đường cong XP.
6. Tỉ lệ người chơi miễn phí đạt Sổ Tay Premium bằng Ngọc tích lũy.

---

## 17. Giới hạn cho tính năng mới (theo tài liệu bản đồ 3D, Q26–Q31)

Kiểm tự động bằng `python3 tools/econ_audit.py` (mục "Giới hạn tính năng mới"); thông số nằm ở mục 8 của `tools/economy_sim.py`.

| Tính năng | Giới hạn | Kiểm tra |
|---|---|---|
| Hái trộm vườn bạn | Tối đa **5 lần/người/ngày** trên mọi vườn; mỗi vườn mất tối đa 10%/vụ; không hái cây có giá > 100 Xu/đơn vị (Trái Sao, Sầu Riêng…), Cây Khổng Lồ, cây 3 sao | ≤ 10% thu nhập casual ở mọi cấp (hiện 4–8%) |
| Xin quà | Người nhận tối đa **5 món/ngày**; không xin món giá > 100 Xu/đơn vị; người tặng đủ 3 ngày tuổi và cấp 5; không xin Xu | ≤ 10% thu nhập casual (hiện 4–8%) |
| Tiền bo nghề dịch vụ | Tối đa **500 Xu/lần**, nhận tối đa **1.500 Xu/ngày**; là Xu chuyển giữa người chơi | ≤ thu nhập casual cấp 10 (hiện 77%) |
| Nghề ngoài luồng | Thu nhập kỳ vọng mỗi giờ (đã trừ tiền phạt) bằng **0,90–1,10 lần** làm hợp pháp cùng cấp; rủi ro cao hơn | Bán rong 0,98 · Buôn lậu 1,00 · Câu trộm 1,02 · Chặt tre 1,05 |
| Bán hàng rong lấn chiếm | Tính **chung giới hạn thu mua ngày** với bán thường (mục 11) | Không tạo đường lách giới hạn |
| Nghề mới (26 nghề) | Xu/giờ ngang các nghề cùng cấp, chênh không quá **15%**; nghề mới thay chỗ thời gian chơi, không cộng thêm thu nhập | Mỗi nghề thêm vào mô phỏng trước khi mở |
| Xe Buýt Gió đi ngay | 5 Xu/lần, miễn phí đến cấp 5 | Tiện lợi, không tính là sink |
