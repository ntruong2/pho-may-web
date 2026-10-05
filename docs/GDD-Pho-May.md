# PHỐ MÂY — Game Design Document (mini) v0.1

> Social sim online 2D chibi · Mobile-first, chơi được trên web và Windows (Steam) · Không khí Việt Nam hiện đại pha fantasy nhẹ
>
> Tài liệu chi tiết: [Bảng cân bằng kinh tế](Kinh-te-Can-bang.md) · [Minigame Đua Thuyền Thúng](Minigame-Dua-Thuyen-Thung.md)

---

## 0. Tóm tắt một trang

| Mục | Nội dung |
|---|---|
| **Tên game** | **Phố Mây** (tên quốc tế: *Cloudtown Stories*) |
| **Thể loại** | Social life-sim online (MMO casual), không chiến đấu |
| **Nền tảng** | iOS (App Store) · Android (Google Play) · Web · Windows (Steam) — một bộ code, chung một server (xem [mục 25.2](#252-nền-tảng-và-công-nghệ-client)) |
| **Góc nhìn** | 2D top-down nghiêng 3/4, nhân vật chibi tỉ lệ 2,5 đầu |
| **Art** | HD pixel art (nhân vật 48×64 px, tile 32×32 px), màu pastel sáng |
| **Đối tượng** | 13–30 tuổi, Việt Nam trước, Đông Nam Á sau |
| **Phiên chơi** | 5–30 phút/phiên, 2–4 phiên/ngày |
| **Kiếm tiền** | Cosmetic, Season Pass, thẻ tháng, quà tặng. **Không bán sức mạnh, không bán tốc độ.** |
| **Trụ cột** | Giao lưu (Social) · Sưu tầm (Collect) · Sáng tạo (Express) · Thư giãn (Chill) |

---

## 1. Tên game và slogan

**Tên:** **Phố Mây**

- Ngắn, dễ nhớ, dễ gõ không dấu (`phomay`), gợi hình ảnh “một con phố trên mây”: vừa đời thường Việt Nam (phố, hẻm, chợ) vừa mơ mộng (mây, bầu trời).
- Tên quốc tế: *Cloudtown Stories*.
- ⚠️ Cần tra cứu nhãn hiệu (Cục SHTT, App Store/Google Play) trước khi chốt.

**Slogan chính:** *“Ghé Phố Mây — chill chút rồi về.”*

Slogan phụ cho marketing:
- *“Một con phố, triệu người quen.”*
- *“Trồng rau, câu cá, kết bạn — trên mây.”*
- *“Nơi mỗi ngày đều có người chờ bạn ghé chơi.”*

---

## 2. Ý tưởng cốt lõi và điểm khác biệt

### Core fantasy
Bạn là cư dân mới chuyển lên **Phố Mây**, một quần đảo lơ lửng trên bầu trời được dựng từ những ước mơ nhỏ của người dưới mặt đất. Ở đây bạn trồng rau trên ruộng mây, câu cá ở dòng sông chảy giữa trời, mở quán cà phê muối trong hẻm, may áo dài bằng tơ mây và — quan trọng nhất — **làm cho con phố đông vui trở lại cùng hàng nghìn người chơi khác**.

### 6 điểm khác biệt

| # | Điểm khác biệt | Ý nghĩa gameplay |
|---|---|---|
| 1 | **Nghề liên kết nhau** | Đầu bếp cần cá của ngư dân, rau của nông dân; thợ may cần tơ của người nuôi tằm → kinh tế người chơi thật, lý do để kết bạn và giao dịch. |
| 2 | **Linh Mây** – bạn đồng hành “lớn lên theo cách bạn sống” | Pet mây nhỏ thay đổi màu, hình dạng, tính cách theo món bạn cho ăn, nơi bạn hay đến và thời tiết → mỗi con gần như độc nhất, rất đáng khoe. |
| 3 | **Dự Án Phố** (xây dựng cộng đồng toàn server) | Cả server cùng góp nguyên liệu để dựng cầu, mở khu mới, tổ chức lễ hội. Tên người đóng góp nhiều được khắc lên bia/biển hiệu trong game. |
| 4 | **Chữ ký thợ** | Đồ do người chơi chế tạo mang tên người làm (“May bởi *LanAnh.99*”) → thợ giỏi có danh tiếng, có khách quen. |
| 5 | **Công cụ social sâu** | Emote đôi (đập tay, cõng, khiêng kiệu), chụp ảnh “Góc Sống Ảo”, Nhật Ký Mây (bảng tin nội bộ), sổ lưu bút nhà, Tổ Dân Phố (guild). |
| 6 | **Văn hóa Việt hiện đại + fantasy nhẹ** | Cà phê muối, xe bánh mì, ban công hoa giấy, chợ đêm, thuyền thúng… kết hợp cá phát sáng, cây ra trái sao, cá voi mây. |

**Những gì game KHÔNG có:** PvP, chỉ số chiến đấu, hệ thống thể lực bán bằng tiền, nút “tăng tốc bằng kim cương”.

---

## 3. Cốt truyện mở đầu

### Bối cảnh
Ngày xưa, **Bà Bồng** — một con cá voi mây khổng lồ, hiền lành — bơi quanh bầu trời Việt Nam, gom những ước mơ nhỏ của con người (“mong mai trời nắng để phơi đồ”, “mong quán mình đông khách”) rồi kết chúng thành những hòn đảo mây. Trên đảo mọc lên phố xá, chợ, ruộng đồng, và những **Linh Mây** bé xíu ra đời từ tiếng cười của cư dân.

Một năm nọ, **Cơn Bão Xám** kéo đến. Nó không phá nhà cửa — nó mang theo *sự cô đơn*. Cư dân dần ít ra đường, ít chào nhau; Linh Mây mất tiếng cười nên tan đi; các hòn đảo trôi xa nhau. Phố Mây trở nên vắng vẻ.

### Mở màn (cutscene 60–90 giây, có thể bỏ qua)
1. Một buổi tối ở dưới mặt đất, nhân vật của bạn đang mệt mỏi sau một ngày dài. Một **chiếc máy bay giấy** bay qua cửa sổ, trên đó ghi: *“Phố Mây đang cần một cư dân mới. Căn nhà số 0 đang chờ bạn.”*
2. Sáng hôm sau, **Xe Buýt Gió số 7** — chiếc xe buýt màu cam có cánh quạt trên nóc — dừng trước nhà bạn.
3. Xe chở bạn xuyên qua tầng mây, đến **Quảng Trường Đồng Hồ Mây**. Bà Bồng bơi chầm chậm trên đầu, cất giọng: *“Con đến rồi. Ở đây chẳng cần con làm anh hùng. Chỉ cần con sống vui, và rủ người khác vui cùng.”*
4. Một cô bé tên **Bé Bơ** chạy đến, mắt đỏ hoe: Linh Mây của bé đã bị gió cuốn mất.

### Mạch truyện dài hạn (5 chương đầu)
| Chương | Tên | Nội dung | Mở khóa |
|---|---|---|---|
| 1 | Cư Dân Mới | Giúp Bé Bơ, làm quen hàng xóm, nhận Linh Mây đầu tiên | Nông trại, câu cá, bếp |
| 2 | Hẻm Nhỏ Thức Dậy | Giúp Cô Sáu mở lại quán cà phê, tổ chức “Đêm Nhạc Hẻm” đầu tiên | Chợ Đêm, nghề Pha Chế |
| 3 | Cây Cầu Gió | Dự Án Phố đầu tiên: cả server góp gỗ và dây để nối đảo | Vịnh San Hô Mây |
| 4 | Rừng Đom Đóm | Tìm những Linh Mây lạc trong rừng, gặp các Linh Mây hoang | Tiến hóa Linh Mây |
| 5 | Mắt Bão | Tìm hiểu Bão Xám; nó được “xua” bằng một lễ hội lớn của cả cộng đồng | Đỉnh Đèo Sương |

> Bão Xám là **ẩn dụ cho sự cô đơn**, không phải kẻ thù để đánh. Mọi “chiến thắng” trong game đều đến từ kết nối cộng đồng.

---

## 4. Gameplay loop chính

```
                ┌──────────────────── META LOOP (tuần/mùa) ─────────────────────┐
                │  Lên cấp nghề · Mở rộng nhà · Bộ sưu tập · Season Pass ·       │
                │  Dự Án Phố · Tổ Dân Phố · Sự kiện mùa                          │
                └────────────────────────────▲──────────────────────────────────┘
                                             │
   ┌────────────── SESSION LOOP (5–20 phút) ─┴──────────────────────────┐
   │ Đăng nhập → Thu hoạch nông trại → Nhận Việc Vặt ngày →             │
   │ Câu cá / Nấu ăn / May đồ → Bán NPC hoặc đăng Chợ →                  │
   │ Chơi minigame với bạn → Trang trí nhà / khoe outfit →               │
   │ Gieo hạt mới (lý do quay lại) → Thoát                               │
   └───────────────────────────────▲─────────────────────────────────────┘
                                   │
         ┌── MICRO LOOP (10 giây – 2 phút) ──┐
         │ Hành động (tưới/câu/nấu) →        │
         │ Phản hồi đẹp (âm thanh, hạt sáng) │
         │ → Vật phẩm + XP → Hành động kế    │
         └───────────────────────────────────┘
```

**Vòng kinh tế cốt lõi:**
`Sản xuất (trồng, câu, nuôi)` → `Chế biến (nấu, may, mộc)` → `Tiêu dùng / Bán / Tặng` → `Xu Lúa` → `Nâng cấp nhà, thời trang, hạt giống tốt hơn` → `Sản xuất nhiều hơn`

**Vòng xã hội cốt lõi:**
`Gặp người lạ ở khu vực chung` → `Emote / chat / chơi minigame chung` → `Kết bạn` → `Tưới cây hộ, tặng quà, ghé nhà` → `Party / Tổ Dân Phố / Couple` → `Lý do đăng nhập vì người khác`

---

## 5. Hệ thống nhân vật và tạo hình chibi

### Thông số kỹ thuật
- Tỉ lệ **2,5 đầu**, sprite 48×64 px, hoạt ảnh 4 hướng (trái/phải lật gương → chỉ cần vẽ 3 hướng).
- Hệ **paperdoll nhiều lớp**, mỗi lớp là 1 sprite sheet dùng chung khung xương hoạt ảnh.
- Màu sắc dùng **palette swap** (shader) → một mẫu áo có thể nhuộm nhiều màu mà không phải vẽ lại.

### Tạo nhân vật
| Hạng mục | Lựa chọn ở MVP |
|---|---|
| Dáng người | Dáng A / Dáng B (không khóa giới tính — mọi trang phục mặc được cho mọi dáng) |
| Màu da | 10 tông |
| Khuôn mặt | 4 dạng |
| Mắt | 20 kiểu × 12 màu |
| Lông mày | 10 kiểu |
| Miệng | 12 kiểu |
| Má hồng / tàn nhang / nốt ruồi | Bật/tắt |
| Tóc | 16 kiểu miễn phí × 16 màu (tách lớp *tóc trước* và *tóc sau* để đội mũ không bị lỗi) |
| Trang phục khởi đầu | 3 bộ chọn sẵn |

### Thứ tự lớp (từ dưới lên)
`Hiệu ứng nền (aura)` → `Tóc sau` → `Lưng (cánh, balo, diều)` → `Thân` → `Quần/váy` → `Giày` → `Áo` → `Bộ liền` → `Tay cầm` → `Mặt` → `Tóc trước` → `Mũ` → `Kính/mặt nạ` → `Hiệu ứng phủ`

### Hoạt ảnh chuẩn
Đứng, đi, chạy, ngồi, ngủ, vẫy tay, nhảy, cười, khóc, giận, ngại, tưới cây, gieo hạt, ném cần, kéo cá, nấu, may, chụp ảnh, 8 điệu nhảy, 6 emote đôi.

### Không có chỉ số chiến đấu
Nhân vật chỉ có: **Cấp Cư Dân**, **Cấp Nghề**, **Điểm Phong Cách** (dùng cho thi thời trang), **Danh hiệu**, **Huy hiệu**.

---

## 6. Hệ thống level và kinh nghiệm

### 6.1 Cấp Cư Dân (1 → 50, MVP cap 30)
**Công thức XP cần để lên cấp L → L+1:** `XP(L) = round(50 × L^1.6) + 50`

| Cấp | XP cần để lên cấp kế | Mục tiêu thời gian (chơi ~40 phút/ngày) |
|---|---|---|
| 1 | 100 | 3 phút |
| 5 | ~707 | Ngày 1 |
| 10 | ~2.040 | Ngày 3–4 |
| 20 | ~6.085 | Tuần 3 |
| 30 | ~11.600 | Tuần 6–8 |
| 50 | ~26.200 | 5–6 tháng |

**Nguồn XP chính**
| Hoạt động | XP |
|---|---|
| Thu hoạch 1 cây thường | 2–5 |
| Câu 1 cá Common / Rare / Epic / Legendary | 5 / 15 / 50 / 300 |
| Nấu 1 món | 8–40 |
| Việc Vặt ngày (mỗi việc) | 60 |
| Chơi 1 trận minigame (thắng/thua) | 80 / 50 |
| Nhiệm vụ cốt truyện | 200–800 |
| Giúp bạn tưới cây (tối đa 20 lần/ngày) | 5 |
| Được người khác “Thích” nhà (tối đa 30/ngày) | 3 |

**Ánh Nắng Nghỉ Ngơi (rested bonus):** mỗi giờ offline tích lũy 250 XP thưởng (tối đa 3.000); khi chơi, XP nhận được nhân đôi cho đến hết quỹ. → Người chơi ít thời gian không bị bỏ xa.

### 6.2 Mở khóa theo Cấp Cư Dân
| Cấp | Mở khóa |
|---|---|
| 1 | Nông trại 12 ô, câu cá sông, bếp cơ bản, chat khu vực |
| 3 | Minigame, Việc Vặt ngày |
| 5 | Chợ Đêm (mua bán), kênh chat Thế Giới |
| 8 | Nuôi gà, Vịnh San Hô Mây |
| 10 | Giao dịch trực tiếp 1-1, chọn Nghề Chính, Tổ Dân Phố |
| 12 | Nâng cấp nhà lên Nhà Phố Ống |
| 15 | Kết Duyên (Couple), Rừng Đom Đóm |
| 20 | Tiến hóa Linh Mây, Đỉnh Đèo Sương |
| 25 | Mở Sạp riêng tại Chợ Đêm |
| 30 | Nhà Vườn, danh hiệu “Người Phố Mây Chính Gốc” |

### 6.3 Cấp Nghề (1 → 20)
Mỗi nghề có cấp riêng, chia 5 bậc: **Tập Sự (1–4) → Thợ (5–9) → Lành Nghề (10–14) → Bậc Thầy (15–19) → Huyền Thoại (20)**. Mỗi bậc mở công thức, dụng cụ, nhiệm vụ nghề và một bộ trang phục nghề (cosmetic).

---

## 7. Các nghề

**Nguyên tắc:** Ai cũng làm được mọi nghề. Người chơi chọn **1 Nghề Chính** (từ cấp 10) để nhận +20% XP nghề, nhiệm vụ nghề riêng và danh hiệu. Đổi Nghề Chính miễn phí mỗi 7 ngày.

| Nghề | Hoạt động chính | Nguyên liệu vào | Sản phẩm ra | Mở khóa ví dụ |
|---|---|---|---|---|
| 🌾 **Nhà Nông** | Trồng cây, nuôi thú | Hạt giống, thức ăn thú | Rau, trái, lúa, trứng, sữa, tơ, mật | Bậc 3: Bù nhìn tự tưới 8 ô |
| 🎣 **Ngư Dân** | Câu cá, đặt lờ/lưới | Mồi | Cá, tôm, mực, “rác kỷ niệm” | Bậc 3: Lờ tre (bắt cá thụ động 4 giờ) |
| 🍜 **Đầu Bếp** | Nấu món ăn | Rau, cá, gạo, trứng, gia vị | Món ăn (buff nhẹ, quà tặng, đơn hàng NPC) | Bậc 4: Món “Đặc sản vùng” |
| 🧵 **Thợ May** | May, nhuộm quần áo | Vải bông, tơ tằm, thuốc nhuộm hoa | Trang phục có chữ ký thợ | Bậc 3: Nhuộm 2 vùng màu |
| 🪚 **Thợ Mộc** | Đóng nội thất | Gỗ, tre, đinh, sơn | Nội thất có chữ ký thợ | Bậc 3: Nội thất tương tác (đu, đàn) |
| ☕ **Pha Chế** | Pha đồ uống | Cà phê, trà, sữa, trái cây | Đồ uống (buff social: +XP khi chơi party) | Bậc 2: Cà phê muối |
| 🏪 **Chủ Sạp** | Buôn bán | Hàng hóa | Lợi nhuận | Phí chợ 3% thay vì 5%, thêm ô hàng, thuê NPC bán hộ khi offline |
| 🎸 **Nghệ Sĩ Phố** | Biểu diễn nhạc, nhảy | Nhạc cụ, bản nhạc | “Tràng pháo tay” (token), buff vui cho khán giả | Bậc 3: Diễn tại Đêm Nhạc Hẻm |

> MVP làm 3 nghề: **Nhà Nông, Ngư Dân, Đầu Bếp**. Bản 1.0 thêm Thợ May, Thợ Mộc, Chủ Sạp. Pha Chế và Nghệ Sĩ Phố ở cập nhật sau.

### Ví dụ chuỗi liên kết nghề
```
Nông dân: Lúa ──(xay)──► Gạo ─────────┐
Nông dân: Cà chua ─────────────────────┤
Ngư dân:  Cá lóc ──────────────────────┼──► Đầu bếp: “Canh chua cá lóc” (Rare)
Nông dân: Rau muống ───────────────────┘      │
                                               ├─► Bán cho người chơi làm quà tặng Couple
                                               ├─► Nộp đơn hàng NPC (Cô Sáu) lấy Xu + XP
                                               └─► Ăn: buff “Ấm Bụng” – phao câu rung rõ hơn 30 phút
```

**Buff từ món ăn chỉ mang tính tiện lợi** (dễ câu hơn một chút, tăng XP nhẹ), không có món nào mua được bằng tiền thật.

---

## 8. Trồng cây, nuôi thú và nông trại

### 8.1 Nông trại
- Mỗi người có **nông trại riêng** (instance) gắn với nhà, bắt đầu **12 ô**, mở rộng tới **60 ô** bằng Xu Lúa + điều kiện cấp.
- Cây **không bao giờ chết**. Nếu để quá 24 giờ không thu hoạch, cây chuyển trạng thái “Hơi Héo” (−20% sản lượng). → Không trừng phạt người bận.
- **Tưới:** +10% sản lượng. Mưa tự tưới. Bạn bè tưới hộ được (+5 XP cho người giúp, chủ vườn nhận thông báo “*Minh đã tưới vườn bạn 💧*”).
- **Bón phân:** tăng tỉ lệ ra cây “Chất lượng 3 sao” (bán giá ×1,5).
- **Cây Khổng Lồ:** 9 ô cùng loại xếp 3×3 có 5% cơ hội hợp thành 1 cây khổng lồ (sản lượng ×12, chụp ảnh rất đẹp).

### 8.2 Bảng cây trồng (giá đã cân bằng — xem [Kinh tế §4](Kinh-te-Can-bang.md#4-cây-trồng))
| Cây | Cấp | Giá hạt | Thời gian | Sản lượng | Giá bán NPC/đơn vị | Mùa | Ghi chú |
|---|---|---|---|---|---|---|---|
| Rau muống | 1 | 4 Xu | 3 phút | 1 | 7 | Cả năm | Cây hướng dẫn |
| Cà chua | 2 | 11 Xu | 10 phút | 2 | 8 | Xuân, Hạ | |
| Lúa | 3 | 15 Xu | 30 phút | 3 | 7 | Hạ, Thu | Xay ra gạo |
| Hoa giấy | 4 | 17 Xu | 1 giờ | 2 | 12 | Cả năm | Thuốc nhuộm hồng/tím |
| Bắp | 5 | 24 Xu | 45 phút | 2 | 16 | Hạ | |
| Dâu tây | 6 | 30 Xu | 2 giờ | 2 | 20 | Đông, Xuân | |
| Thanh long | 8 | 36 Xu | 3 giờ | 2 | 24 | Hạ | Chỉ ra hoa ban đêm |
| Cà phê | 10 | 40 Xu | 6 giờ | 3 | 20 | Thu, Đông | Nguyên liệu Pha Chế |
| Dâu tằm | 12 | 25 Xu | 4 giờ | 4 | 10 | Xuân | Thức ăn tằm |
| Sen | 14 | 60 Xu | 8 giờ | 2 | 44 | Hạ | Chỉ trồng ô nước |
| ✨ **Bông Gòn Mây** | 16 | 70 Xu | 6 giờ | 2 | 52 | Đông | Vải mây cho Thợ May |
| ✨ **Cây Trái Sao** | 20 | 150 Xu | 24 giờ | 1 | 190 | Cả năm | 3% ra thêm “Trái Sao Băng” (Epic, ~1.000) |

Cây ngắn ngày cho lãi/giờ cao khi đang online; cây dài ngày cho lãi/lần cao khi gieo trước lúc thoát game.

### 8.3 Nuôi thú
| Con vật | Cấp | Giá mua | Chuồng | Sản phẩm / chu kỳ | Giá bán |
|---|---|---|---|---|---|
| Gà ta | 8 | 300 Xu | Chuồng gà (500 Xu) | 1 trứng / 1 giờ | 8 |
| Vịt | 10 | 450 Xu | Ao nhỏ (700 Xu) | 1 trứng vịt / 1,5 giờ | 12 |
| Tằm | 12 | 600 Xu (hộp) | Nong tằm (600 Xu) | Tơ tằm / 4 giờ (ăn dâu tằm) | 40 |
| Bò sữa | 14 | 1.500 Xu | Chuồng bò (2.000 Xu) | 1 sữa / 3 giờ | 30 |
| Ong | 16 | 2.000 Xu | — | Mật / 6 giờ, +10% sản lượng hoa gần đó | 55 |
| ✨ **Gà Lông Mây** | 22 | 3.000 Xu | Chuồng gà | Trứng Mây / 4 giờ (nguyên liệu Epic) | 90 |
| ✨ **Cừu Bông Gòn** | 25 | 5.000 Xu | Đồi cỏ (3.000 Xu) | Len bông mây / 6 giờ | 120 |

- Mỗi con có **Độ Thân Thiết (0–10 ♥)**: cho ăn, vuốt ve, thả rông. ♥ cao → sản phẩm chất lượng cao hơn và đôi khi tặng đồ bất ngờ.
- Thú không chết, không bệnh. Nếu bỏ đói chỉ tạm ngừng cho sản phẩm.

### 8.4 Linh Mây (bạn đồng hành)
- Nhận ở Chương 1. Đi theo bạn, có hoạt ảnh riêng, có thể **giúp việc nhẹ**: tưới 4 ô/lần, nhặt đồ rơi, báo khi phao câu rung.
- **Tiến hóa theo hành vi** (cấp 20+): cho ăn món cay → Linh Mây Lửa đỏ cam; hay câu cá dưới mưa → Linh Mây Mưa xanh ngọc; hay chơi party → Linh Mây Cầu Vồng… 12 nhánh ở bản 1.0.
- Skin Linh Mây là một dòng cosmetic riêng.

---

## 9. Hệ thống câu cá

### 9.1 Cơ chế (10–25 giây/con)
1. **Ném cần:** giữ để nạp thanh lực, thả để ném; ném xa hơn → vùng nước sâu → cá lớn hơn.
2. **Chờ phao:** 3–15 giây. Có “rung giả” để tạo hồi hộp. Chạm đúng lúc phao chìm hẳn.
3. **Kéo cá:** một thanh căng dây với vùng xanh di chuyển; giữ biểu tượng cá trong vùng xanh bằng cách chạm/giữ. Mỗi độ hiếm cá có kiểu bơi khác (Common bơi đều, Epic giật mạnh, Legendary đổi hướng liên tục).
4. **Kết quả** được **server quyết định** khi phao chìm (chống hack); mini-game kéo chỉ quyết định bắt được hay sổng.

### 9.2 Các yếu tố ảnh hưởng
| Yếu tố | Tác động |
|---|---|
| Địa điểm | Mỗi khu có bảng cá riêng (sông, biển, hồ núi, suối rừng) |
| Giờ trong ngày | Sáng / Chiều / Hoàng hôn / Đêm |
| Thời tiết | Mưa: +cá trê, cá lóc; Giông: xuất hiện cá Epic đặc biệt; Cầu vồng: cửa sổ Legendary |
| Mùa | Thu: mùa nước nổi (cá linh); Hạ: cá biển |
| Mồi | Giun (thường), Tôm (+Rare biển), Mồi Sao (+2% Epic) |
| Cần câu | Chỉ làm **thanh xanh rộng hơn** (dễ kéo hơn), không tăng tỉ lệ Legendary |
| Câu cùng bạn | Mỗi bạn bè đứng câu trong bán kính 5 ô: +3% tỉ lệ Rare trở lên (tối đa +9%) |
| Món ăn buff | “Ấm Bụng”: phao rung rõ hơn |

**Tỉ lệ nền:** Common 70% · Rare 22% · Epic 7% · Legendary 1% (Legendary chỉ xuất hiện khi đủ điều kiện riêng, nếu không thì 1% chuyển thành Epic).

### 9.3 Bảng cá mẫu
| Cá | Độ hiếm | Địa điểm | Thời gian | Thời tiết | Kích thước | Giá NPC |
|---|---|---|---|---|---|---|
| Cá rô đồng | Common | Bến Sông Trăng | Mọi lúc | Mọi | 8–15 cm | 4 Xu |
| Cá lóc | Common | Bến Sông Trăng | Sáng, Chiều | Mọi (mưa ↑) | 25–60 cm | 6 Xu |
| Cá trê | Common | Bến Sông Trăng | Đêm | Mưa | 20–45 cm | 7 Xu |
| Cá nục | Common | Vịnh San Hô Mây | Sáng | Nắng | 12–20 cm | 6 Xu |
| Cá chép đỏ | Rare | Bến Sông Trăng | Sáng | Mọi | 30–70 cm | 15 Xu |
| Cá tai tượng | Rare | Bến Sông Trăng | Chiều | Nắng | 20–50 cm | 14 Xu |
| Cá linh | Rare | Bến Sông Trăng | Mọi lúc | Mùa Thu | 6–12 cm | 12 Xu |
| Mực ống phát sáng | Rare | Vịnh San Hô Mây | Đêm | Trời quang | 20–40 cm | 22 Xu |
| Cá suối đốm sao | Rare | Rừng Đom Đóm (suối) | Hoàng hôn | Sương mù | 10–25 cm | 25 Xu |
| Cá ngừ đại dương | Epic | Vịnh San Hô Mây | Sáng sớm | Nắng | 80–200 cm | 60 Xu |
| Cá Ngựa Kẹo Bông | Epic | Vịnh San Hô Mây | Chiều | Nắng gắt | 5–10 cm | 70 Xu |
| Cá Sấm Sét | Epic | Bến Sông Trăng | Mọi lúc | Giông | 40–90 cm | 80 Xu |
| Cá Tuyết Mây | Epic | Hồ Đỉnh Đèo | Đêm | Tuyết Mây | 30–60 cm | 95 Xu |
| 🌟 **Cá Chép Mây Vàng** | Legendary | Bến Sông Trăng | 5:00–7:00 sáng | Cầu vồng sau mưa | 1,2 m | Không bán NPC* |
| 🌟 **Cá Đèn Lồng Trăng** | Legendary | Hồ Đỉnh Đèo | Đêm rằm | Trời quang | 70 cm | Không bán NPC* |
| 🌟 **Cá Voi Mây Con** | Legendary | Vịnh San Hô Mây | Mọi lúc | Bão | 3 m | Không bán NPC* |

\* Legendary có thể: trưng bày trong bể cá tại nhà (vật phẩm trang trí động), bán trên Chợ (giá tham khảo 2.000–6.000 Xu), hoặc đổi với Chú Bảy lấy cần câu cosmetic đặc biệt.

**Cá Voi Mây Con** là **Legendary hợp tác**: chỉ kéo được khi có ≥3 người trong party cùng kéo một dây → cả party đều nhận bản sao.

### 9.4 “Rác kỷ niệm”
Thỉnh thoảng câu được dép tổ ong, lon nước, chìa khóa cũ, thư trong chai… Đem cho **Ông Tám Ve Chai** để đổi đồ nội thất độc lạ (ví dụ 10 dép tổ ong → “Chậu cây dép tổ ong”). *Thư trong chai* chứa lời nhắn do **người chơi khác** thả xuống sông (có kiểm duyệt từ khóa) — một điểm chạm social nhỏ.

### 9.5 Sưu tầm
- **Bách Khoa Cá:** ghi loài, kích thước lớn nhất, thời điểm câu. Hoàn thành 25/50/75/100% nhận cần câu, danh hiệu, khung avatar.
- **Bảng Vàng tuần:** cá lớn nhất mỗi loài trên server.
- Thông báo toàn server khi có người câu được Legendary.

---

## 10. Hệ thống thời trang

### 10.1 Ô trang phục
Tóc · Mũ · Kính/Mặt nạ · Áo · Quần/Váy · Bộ liền · Giày · Tay cầm · Lưng · Hiệu ứng aura · Dấu chân · Bong bóng chat · Khung tên · Khung avatar · Emote.

### 10.2 Nguồn trang phục
| Nguồn | Tiền | Đặc điểm |
|---|---|---|
| Shop NPC “Lụa Mây Atelier” | Xu Lúa | Đồ cơ bản, xoay vòng hằng tuần |
| Thợ May (người chơi) | Xu + nguyên liệu | Có chữ ký thợ, chất lượng 1–3 sao, nhuộm màu tùy ý, bán trên Chợ |
| Shop Ngọc | Ngọc Mây | Đồ thiết kế đẹp, có hoạt ảnh |
| Season Pass | Miễn phí / Premium | Bộ theo chủ đề mùa |
| Sự kiện | Tem Sự Kiện | Đồ giới hạn thời gian, quay lại trong “Tủ Hoài Niệm” sau 1 năm |
| Thành tựu / Bộ sưu tập | — | Không mua được, thể hiện thành tích |

### 10.3 Nhuộm & Tủ Đồ
- Nhuộm 1–2 vùng màu bằng **thuốc nhuộm làm từ hoa** (hoa giấy → hồng, sen → trắng hồng, lá chàm → xanh chàm).
- **Tủ Đồ:** lưu 5 bộ phối sẵn (miễn phí), đổi 1 chạm.
- **Hiệu ứng bộ:** mặc đủ bộ sẽ kích hoạt hiệu ứng hình ảnh (ví dụ: đủ “Bộ Áo Dài Hạc Giấy” → 2 con hạc giấy bay quanh). Chỉ là hình ảnh, không có chỉ số.

### 10.4 Vật phẩm thời trang mẫu
| Vật phẩm | Ô | Độ hiếm | Nguồn | Giá |
|---|---|---|---|---|
| Áo thun “Tui ❤ Phố Mây” | Áo | Common | Shop NPC | 150 Xu |
| Quần short jean | Quần | Common | Shop NPC | 120 Xu |
| Dép tổ ong | Giày | Common | Shop NPC | 50 Xu |
| Kính râm “Chill Phết” | Kính | Common | Shop NPC | 200 Xu |
| Nón lá thêu mây | Mũ | Rare | Thợ May | ~800 Xu (giá chợ) |
| Balo Gấu Bánh Bao | Lưng | Rare | Shop Ngọc | 60 Ngọc |
| Bong bóng chat “Ổ Bánh Mì” | Bong bóng | Rare | Shop Ngọc | 40 Ngọc |
| Hoodie Mèo Mướp | Áo | Rare | Shop Ngọc | 80 Ngọc |
| Áo dài lụa sen | Bộ liền | Epic | Thợ May Bậc Thầy | ~4.500 Xu (giá chợ) |
| Giày sneaker phản quang | Giày | Epic | Shop Ngọc | 250 Ngọc — phát sáng vào ban đêm |
| Cánh Diều Giấy | Lưng | Epic | Sự kiện Hè | 1.200 Tem Hè |
| Dấu chân hoa sữa | Dấu chân | Epic | Season Pass Premium | — |
| Bộ “Shipper Tốc Độ” | Bộ liền | Epic | Thành tựu giao 500 đơn | Không mua được |
| 🌟 Tóc Bím Cầu Vồng | Tóc | Legendary | Hộp Mây (có bảo hiểm) | — Đổi màu theo thời tiết |
| 🌟 Aura “Mưa Sao Băng Nhỏ” | Aura | Legendary | Season Pass cấp 50 Premium | — |
| 🌟 Áo Choàng Bà Bồng | Lưng | Legendary | Hoàn thành Chương 5 + Bách Khoa Cá 100% | Không mua được |

### 10.5 Sàn Diễn Chủ Nhật
Thi thời trang theo chủ đề tuần (“Đi biển”, “Học trò”, “Cổ tích Việt”…). Người chơi vào sàn diễn, người khác bình chọn 1–5 sao; hệ thống lọc phiếu bất thường. Top 10 nhận danh hiệu tuần + Tem Thời Trang.

---

## 11. Nhà riêng và trang trí nội thất

### 11.1 Cấp nhà
| Loại nhà | Cấp yêu cầu | Chi phí | Kích thước |
|---|---|---|---|
| Căn Phòng Trọ Số 0 | 1 | Miễn phí | 8×8 ô, 1 phòng |
| Nhà Phố Ống | 12 | 8.000 Xu | 8×16, 2 tầng + ban công |
| Nhà Vườn | 30 | 40.000 Xu | 16×16 + sân vườn |
| Biệt Thự Mây | 45 | 150.000 Xu | 20×20, 3 tầng + sân thượng |

> Nâng cấp nhà **chỉ bằng Xu Lúa** — không bán bằng Ngọc. Ngọc chỉ mua *theme* (giấy dán tường, sàn, hình dáng mái…).

### 11.2 Đặt đồ
- Lưới ô vuông: sàn, tường, đồ treo tường, đèn trần, thảm, đồ chồng lên nhau (lọ hoa trên bàn), xoay 4 hướng.
- Đồ **tương tác:** ghế (ngồi), giường (ngủ → thêm Ánh Nắng Nghỉ Ngơi), bếp (nấu tại nhà), máy may, đàn (chơi nhạc), bể cá (trưng Legendary), TV (xem lại highlight minigame), đu (ngồi đôi).

### 11.3 Điểm Ấm Cúng & ghé thăm
- **Điểm Ấm Cúng** tính theo số lượng, độ đa dạng, bộ nội thất hoàn chỉnh.
- **Bộ nội thất** hoàn chỉnh mở hiệu ứng: ví dụ “Bộ Cà Phê Hẻm Sài Gòn” → phát nhạc lo-fi, khách ghé thăm nhận buff “Thư Giãn” (+5% XP 15 phút, 1 lần/khách/ngày).
- **Sổ Lưu Bút:** khách viết lời nhắn, để lại sticker.
- **Nhà Đẹp Tuần:** bảng xếp hạng theo lượt Thích + đánh giá chéo.
- Chủ Sạp có thể biến tầng 1 thành **quán/tiệm** để người khác vào mua hàng.

### 11.4 Nội thất mẫu
| Nội thất | Độ hiếm | Nguồn | Giá |
|---|---|---|---|
| Ghế nhựa đỏ | Common | Shop NPC | 30 Xu |
| Đèn lồng giấy | Common | Shop NPC | 60 Xu |
| Bàn gỗ xếp | Common | Shop NPC / Thợ Mộc | 120 Xu |
| Chậu hoa giấy ban công | Common | Shop NPC | 150 Xu |
| Quạt trần cánh gỗ (có hoạt ảnh) | Rare | Thợ Mộc | ~600 Xu |
| Xe đạp Phượng Hoàng cổ (trang trí) | Rare | Ông Tám Ve Chai | 30 đồ tái chế |
| Bộ phin cà phê & ghế đẩu | Rare | Shop Ngọc | 90 Ngọc |
| Giường Mây Bồng Bềnh | Epic | Shop Ngọc | 280 Ngọc |
| Bể cá Legendary | Epic | Chú Bảy | 5.000 Xu + 1 cá Epic |
| 🌟 Cửa Sổ Nhìn Ra Bà Bồng (hoạt ảnh cá voi bay qua) | Legendary | Dự Án Phố | Top đóng góp |

---

## 12. Bạn bè, chat, party, couple, guild

### 12.1 Bạn bè
- Tối đa 200 bạn. Gợi ý kết bạn sau khi chơi minigame cùng, câu cá gần nhau, ghé nhà.
- **Độ Thân (1–10):** tăng khi tặng quà, chơi cùng, tưới cây hộ, ghé nhà. Mốc 3/6/10 mở emote đôi, danh hiệu “Bạn Thân”, khung ảnh chung.
- **Tri Kỷ:** nhóm bạn thân không lãng mạn tối đa 3 người, có trang phục nhóm, emote nhóm.

### 12.2 Chat
| Kênh | Điều kiện | Ghi chú |
|---|---|---|
| Khu vực | Cấp 1 | Bong bóng chat trên đầu nhân vật |
| Thế Giới | Cấp 5 | Cần vật phẩm “Loa Phường” (nhận miễn phí 3/ngày), hồi 60 giây |
| Party | Trong party | |
| Tổ Dân Phố | Thành viên | Có bảng thông báo ghim |
| Riêng tư | Bạn bè (người dưới 16 tuổi: chỉ bạn bè) | |
| Couple | Đang Kết Duyên | Kênh riêng + emoji tim |

- **Emote nhanh**, **sticker** (bộ sticker Linh Mây), **emote đôi** (đập tay, ôm, cõng, nắm tay đi dạo, khiêng kiệu 4 người).
- **An toàn:** bộ lọc từ ngữ tiếng Việt có xử lý teencode/không dấu, báo cáo 1 chạm, chặn, tắt tiếng, chế độ an toàn cho người dưới 16 tuổi, đội moderator + công cụ GM.

### 12.3 Party (2–5 người)
- Chia sẻ tiến độ nhiệm vụ “thu thập”, bonus câu cá chung, xếp hàng minigame chung, chế độ **đi theo trưởng nhóm**.
- **Chuyến Đi Party:** thẻ nhiệm vụ 15 phút cho nhóm (ví dụ “Câu đủ 20 cá ở Vịnh trước hoàng hôn”) → rương party.

### 12.4 Kết Duyên (Couple)
- Điều kiện: cả hai cấp 15+, Độ Thân ≥ 6.
- **Lễ Kết Duyên tại Cầu Ô Thước Mây** (hình ảnh dân gian): bạn bè được mời đến dự, tung hoa, chụp ảnh. Gói lễ cơ bản miễn phí; gói trang trí lễ lớn là cosmetic.
- **Cấp Couple (1–20):** tăng qua nhiệm vụ đôi hằng ngày (tưới vườn nhau, nấu một món chung, câu cá cạnh nhau).
- Phần thưởng: emote đôi, nhẫn cosmetic, danh hiệu, **ở chung nhà** (tùy chọn), khung ảnh couple.
- **Chia tay nhẹ nhàng:** 1 bên xác nhận, không mất đồ, chờ 7 ngày mới kết duyên mới. Không có kịch tính trừng phạt.

### 12.5 Tổ Dân Phố (Guild)
- 30 thành viên (nâng lên 50). Chức vụ: Tổ Trưởng, Tổ Phó, Thành Viên.
- **Nhà Văn Hóa Tổ:** căn nhà chung để cùng trang trí.
- **Vườn Chung:** thành viên cùng trồng, sản phẩm vào kho tổ.
- **Mục tiêu tuần:** ví dụ “Cả tổ câu 500 cá” → Điểm Tổ → đổi cờ, đồng phục, nội thất tổ.
- **Giải Đua Thuyền Thúng Liên Tổ** mỗi tháng.

---

## 13. Marketplace

### 13.1 Ba hình thức mua bán
1. **Chợ Đêm (sàn toàn server):** đăng bán giá cố định, thời hạn 48 giờ, tìm kiếm/lọc theo loại, độ hiếm, chữ ký thợ. Người thường đăng tối đa 10 món, Chủ Sạp 30 món.
2. **Sạp riêng (Chủ Sạp, cấp 25):** sạp vật lý ở Chợ Đêm mà người khác đi đến mua; thuê NPC “Mèo Bán Hộ” bán khi offline; tùy chỉnh bảng hiệu sạp.
3. **Giao dịch trực tiếp 1-1:** cấp 10+, Độ Thân ≥ 2, xác nhận 2 bước + khóa 3 giây trước khi đồng ý.

### 13.2 Luật kinh tế
- Chỉ giao dịch bằng **Xu Lúa**.
- **Phí 5%** (Chủ Sạp 3%) — là money sink chính.
- **Khung giá:** giá đăng phải nằm trong 30%–300% giá trung vị 7 ngày (chống rửa tiền/chuyển tiền bot).
- **Khóa vật phẩm:** đồ mua bằng Ngọc là *ràng buộc tài khoản* (không bán). Muốn tặng thì mua bản “Hộp Quà” gửi trực tiếp cho bạn bè.
- Đồ sự kiện có thể bán sau 7 ngày kể từ khi nhận.
- **Không có quy đổi Ngọc ↔ Xu** ở bất kỳ đâu.
- Lịch sử giá dạng biểu đồ nhỏ để người chơi tự định giá.
- Phát hiện bất thường: tài khoản mới chuyển lượng lớn Xu, giao dịch lặp giữa cùng thiết bị/IP → hàng đợi kiểm tra.

### 13.3 NPC thu mua
Bán cho NPC luôn được nhưng giá thấp hơn chợ ~20–40%, và có **giới hạn thu mua ngày** mỗi loại (ví dụ 100 cá Common/ngày — bảng đầy đủ ở [Kinh tế §11](Kinh-te-Can-bang.md#11-npc-thu-mua-giới-hạn--giá-động)) → hạn chế bot farm và lạm phát.

---

## 14. NPC và nhiệm vụ

### 14.1 NPC chính
| NPC | Vai trò | Vị trí | Tính cách / câu thoại mẫu |
|---|---|---|---|
| **Bà Bồng** | Cá voi mây, “linh hồn” Phố Mây, cốt truyện chính | Bay trên Quảng Trường | Chậm rãi, ấm áp. *“Hôm nay con đã chào ai chưa?”* |
| **Bé Bơ** | Cô bé 8 tuổi, dẫn dắt tân thủ | Quảng Trường | Hay khóc nhưng mau cười. *“Anh/chị ơi, Linh Mây của em bị gió thổi bay mất rồi!”* |
| **Chị Mận** | Nông dân Gen Z, bán hạt giống, dạy nghề Nông | Đồng Lúa Gió | Livestream suốt ngày. *“Cả nhà ơi, rau muống mới lên nè, thả tim cho chị nha!”* |
| **Chú Bảy Cần Câu** | Ngư dân lão làng, dạy câu cá | Bến Sông Trăng | Hay “chém gió” về cá huyền thoại. *“Hồi đó chú câu con chép vàng dài bằng cái xuồng…”* |
| **Cô Sáu Cà Phê** | Chủ quán cà phê muối, dạy Đầu Bếp & Pha Chế | Hẻm Đèn Dầu | Nhanh nhảu, thương người. *“Ngồi đi con, ly đầu cô bao!”* |
| **Anh Lụa** | Nhà thiết kế trẻ, shop thời trang, dạy Thợ May | Lụa Mây Atelier | Cầu toàn, hơi “drama”. *“Phối vậy là tội cái áo lắm á.”* |
| **Chú Ba Mộc** | Thợ mộc, nội thất, dạy Thợ Mộc | Xưởng Tre (Khu Nhà) | Ít nói, làm nhiều. |
| **Mèo Mướp Ngọc** | Mèo thương nhân biết nói, quản lý Chợ Đêm | Chợ Đêm | Lém lỉnh. *“Hàng độc tuần này, meo, hết là hết nha.”* |
| **Ông Tám Ve Chai** | Thu mua đồ cũ, đổi đồ độc lạ | Góc Chợ Đêm | Nhà sưu tầm lập dị. *“Dép tổ ong này có câu chuyện đó con.”* |
| **Cô Mưa** | MC dự báo thời tiết | Đài Khí Tượng (Quảng Trường) | Tươi tắn. Báo thời tiết 3 “ngày game” tới. |
| **Tí Tốc Độ** | Shipper gió, nhiệm vụ giao hàng | Khắp nơi | Luôn vội. *“5 phút nữa phải tới Vịnh, lẹ lẹ!”* |
| **Thầy Đồ Sương** | Ông đồ viết thư pháp, sự kiện Tết, Đỉnh Đèo | Đỉnh Đèo Sương | Trầm tĩnh, nói câu đối. |

Mỗi NPC có **Độ Thân NPC (0–10 ♥)** qua tặng quà yêu thích → mở chuyện riêng, công thức bí mật, nội thất đặc biệt. NPC có **lịch sinh hoạt** theo giờ (Cô Sáu mở quán 6:00–22:00; Chú Bảy đêm mưa không ra bến…).

### 14.2 Loại nhiệm vụ
| Loại | Tần suất | Ví dụ |
|---|---|---|
| Cốt truyện | Theo chương | “Linh Mây Lạc Đường” |
| Nghề | Theo cấp nghề | “Nấu 10 món bằng cá” |
| Việc Vặt ngày | 5 việc/ngày, đổi 1 lần miễn phí | “Tặng 1 món ăn cho bạn bè” |
| Bảng Đơn Hàng | Làm mới 4 giờ/lần | “Cô Sáu cần 5 cà phê hạt + 2 sữa” |
| Tuần | 7 việc/tuần | “Thắng 3 trận Kéo Co” |
| Quan hệ NPC | Theo ♥ | “Kỷ vật của Chú Bảy” |
| Ẩn | Bí mật | Nói chuyện với Mèo Mướp Ngọc lúc 0:00 đêm rằm 7 lần |
| Cộng đồng | Dự Án Phố | “Cả server góp 100.000 bó tre dựng Cầu Gió” |

### 14.3 Nhiệm vụ mẫu

**① Cốt truyện — “Linh Mây Lạc Đường” (Chương 1)**
1. Nói chuyện với Bé Bơ ở Quảng Trường.
2. Vẫy tay chào 1 cư dân (người chơi thật hoặc NPC) → *dạy emote & bước social đầu tiên*.
3. Gặp Chị Mận, trồng 6 rau muống và thu hoạch.
4. Gặp Chú Bảy, câu 3 con cá.
5. Nấu “Canh chua cá lóc” tại quán Cô Sáu.
6. Mang canh cho Bé Bơ → Bé Bơ tìm được dấu vết Linh Mây, tặng bạn **Trứng Linh Mây**.

*Thưởng:* 300 Xu, 400 XP, Trứng Linh Mây, Ghế nhựa đỏ, Đèn lồng giấy.

**② Việc Vặt — “Tưới Hộ Hàng Xóm”**
Tưới cây ở nông trại của 3 người chơi khác. *Thưởng:* 60 XP, 40 Xu, +1 Độ Thân với mỗi người.

**③ Quan hệ NPC — “Chiếc Cần Câu Của Ba” (Chú Bảy ♥5)**
Chú Bảy kể về chiếc cần câu tre của ba chú bị rơi xuống sông năm xưa. Người chơi phải câu ở Bến Sông Trăng lúc đêm mưa để vớt được “Hộp gỗ cũ” (tỉ lệ 5%/lần câu khi đủ điều kiện, đảm bảo sau 20 lần), mang cho Thợ Mộc sửa. *Thưởng:* Cần Câu Tre Kỷ Niệm (cosmetic Rare, thanh xanh +5%), công thức “Cá kho tộ”, ♥ Chú Bảy +1.

**④ Cộng đồng — Dự Án Phố “Cây Cầu Gió”**
Toàn server góp 100.000 bó tre + 50.000 cuộn dây trong 7 ngày. Mỗi mốc 25/50/75/100% mở phần thưởng cho **mọi người đã đóng góp ít nhất 1 lần**. Hoàn thành → cầu xuất hiện vĩnh viễn, mở Vịnh San Hô Mây, tên top 100 người đóng góp khắc trên lan can cầu.

---

## 15. Minigame multiplayer (2–5 phút)

| Minigame | Người chơi | Thời lượng | Mô tả | Kiểu |
|---|---|---|---|---|
| 🛶 **Đua Thuyền Thúng** | 2–5 | 3 phút | Chèo thuyền thúng xoay vòng trên sông, nhặt bùa (gió đẩy, sóng nhỏ), né lục bình. Điều khiển bằng 2 nút chèo trái/phải. | Đối kháng |
| 🪢 **Kéo Co Mây** | 4–10 (2 đội) | 2 phút | Chạm theo nhịp trống; đúng nhịp kéo mạnh hơn. Cả đội phải đồng đều. | Đồng đội |
| 🥖 **Bếp Hẻm Hỗn Loạn** | 2–4 | 4 phút | Cùng làm bánh mì, phở, chè theo đơn khách: cắt, nướng, múc, giao. Tính điểm chung. | Hợp tác |
| 🎨 **Họa Sĩ Nhí** | 3–8 | 5 phút | Một người vẽ, người khác đoán chữ (từ vựng Việt Nam: “bánh xèo”, “xe ôm”…). | Party |
| 🏮 **Trốn Tìm Lồng Đèn** | 4–8 | 4 phút | Chỉ chơi ban đêm game. Người trốn biến thành đồ vật trong hẻm; người tìm cầm lồng đèn soi. | Bất đối xứng |
| 🪨 **Ô Ăn Quan Siêu Tốc** | 2 | 3 phút | Trò dân gian, mỗi lượt giới hạn 8 giây. | 1v1 |
| 🎋 **Nhảy Sạp Nhịp Điệu** | 2–5 | 2 phút | Nhảy theo nhịp tre khép mở, combo càng dài càng nhiều điểm. | Rhythm |
| ✨ **Bắt Đom Đóm** | 2–5 | 2 phút | Rừng Đom Đóm ban đêm: ai bắt nhiều đom đóm (đom đóm vàng ×5 điểm) nhất. | Đối kháng nhẹ |

Thiết kế chi tiết Đua Thuyền Thúng: [Minigame-Dua-Thuyen-Thung.md](Minigame-Dua-Thuyen-Thung.md).

**Phần thưởng:** XP + **Vé Vui** (token đổi cosmetic minigame tại Sân Chơi Cầu Vồng). Thua vẫn nhận 60% thưởng → không ai cảm thấy mất thời gian.

**Ghép trận:** xếp hàng tại Sân Chơi Cầu Vồng hoặc từ menu party; sau 30 giây thiếu người sẽ lấp bằng **bot “Linh Mây Tinh Nghịch”** (được gắn nhãn rõ ràng là bot) để giữ trải nghiệm khi server còn ít người.

**Giờ Hội Sân Chơi:** 12:00–13:00 và 20:00–22:00 thưởng Vé Vui ×2.

---

## 16. Bản đồ — 10 khu vực

```
                         ☁  ĐỈNH ĐÈO SƯƠNG  ☁
                                   │ (cáp treo)
   RỪNG ĐOM ĐÓM ──────────── ĐỒNG LÚA GIÓ
         │                         │
  KHU NHÀ MÁI NGÓI ──── QUẢNG TRƯỜNG ĐỒNG HỒ MÂY ──── SÂN CHƠI CẦU VỒNG
         │                         │                          │
    HẺM ĐÈN DẦU ──────── CHỢ ĐÊM PHỐ LỒNG ĐÈN          BẾN SÔNG TRĂNG
                                                              │ (Cầu Gió)
                                                       VỊNH SAN HÔ MÂY
                                                              │ (thuyền)
                                               ĐẢO BÃO XÁM (end-game, sự kiện)
```

> **Cập nhật bố cục 3D** (xem [Thiết kế bản đồ 3D](ban-do-3d.html), quyết định Q1–Q20): Quảng Trường chỉ có 4 cổng; Bến Sông Trăng đi qua Sân Chơi Cầu Vồng; Hẻm Đèn Dầu nối thêm với Chợ Đêm; Chợ Đêm là một khu nhỏ ngay từ MVP; khu nào cũng vào được từ cấp 1, chỉ khu gắn chương truyện khoá cổng. Đổi tên: Hẻm Cà Phê Muối → Hẻm Đèn Dầu, Rừng Tre Thì Thầm → Rừng Đom Đóm, Chú Tư Mộc → Chú Ba Mộc.


| # | Khu vực | Hoạt động | NPC | Điểm đặc trưng theo thời gian |
|---|---|---|---|---|
| 1 | **Quảng Trường Đồng Hồ Mây** (hub) | Gặp gỡ, bảng tin, Dự Án Phố, Đài Khí Tượng, bến Xe Buýt Gió (dịch chuyển nhanh) | Bà Bồng, Bé Bơ, Cô Mưa | Đồng hồ điểm giờ → nhạc chuông; đêm có đài phun nước phát sáng |
| 2 | **Chợ Đêm Phố Lồng Đèn** | Mua bán, sạp người chơi, shop xoay vòng | Mèo Mướp Ngọc, Ông Tám | Ban ngày chỉ vài sạp; **18:00–2:00 game mở đầy đủ**, lồng đèn sáng rực |
| 3 | **Đồng Lúa Gió** | Cổng vào nông trại riêng, ruộng bậc thang chung, cối xay gió | Chị Mận | Gió mùa: có thể thả diều |
| 4 | **Bến Sông Trăng** | Câu cá sông, thuyền thúng | Chú Bảy | Đêm trăng mặt sông phản chiếu, cá đêm |
| 5 | **Vịnh San Hô Mây** | Câu cá biển, lặn ngắm san hô, bãi tắm | Ngư dân phụ | Hoàng hôn đẹp nhất game — điểm chụp ảnh |
| 6 | **Hẻm Đèn Dầu** | Nấu ăn, pha chế, Đêm Nhạc Hẻm, ngồi cà phê (emote ngồi đôi) | Cô Sáu | Sáng sớm đông khách NPC; tối thứ 6 có nhạc |
| 7 | **Khu Nhà Mái Ngói** | Cổng vào nhà riêng, Xưởng Tre, Lụa Mây Atelier, hàng xóm | Chú Ba Mộc, Anh Lụa | Ban công hoa giấy, dây phơi đồ |
| 8 | **Sân Chơi Cầu Vồng** | Minigame, bảng xếp hạng, Sàn Diễn Chủ Nhật | MC Linh Mây | Cầu vồng sau mưa → thưởng thêm |
| 9 | **Rừng Đom Đóm** | Hái nấm, măng, tre (Thợ Mộc), suối câu cá, Linh Mây hoang | Linh Mây hoang | Đêm: đom đóm, cá suối; sương mù: Linh Mây hiếm |
| 10 | **Đỉnh Đèo Sương** | Hồ núi (Legendary), ngắm sao, sự kiện Tết, cáp treo | Thầy Đồ Sương | Đông: “Tuyết Mây” duy nhất ở đây |

**Kênh (channel):** mỗi khu chia kênh ~60 người; ưu tiên xếp bạn bè/tổ vào cùng kênh; có thể chuyển kênh để đi theo bạn.

---

## 17. Chu kỳ ngày/đêm và thời tiết

### 17.1 Thời gian
- **1 ngày game = 2 giờ thực** (Sáng 40′ · Chiều 35′ · Hoàng hôn 10′ · Đêm 35′) → người chỉ chơi buổi tối ngoài đời vẫn thấy đủ các thời điểm.
- **Tuần trăng:** 8 ngày game (16 giờ thực); đêm rằm có sự kiện nhỏ.
- **Mùa trong game:** đổi mỗi 2 tuần thực (vòng năm 8 tuần) → cây theo mùa luân phiên. Sự kiện lễ hội thì theo **lịch thật**.

### 17.2 Ảnh hưởng của ngày/đêm
| Thời điểm | Ảnh hưởng |
|---|---|
| Sáng | Chợ nông sản NPC trả giá cao hơn 10%; cá sáng |
| Chiều | Cửa hàng đầy đủ; minigame ngoài trời |
| Hoàng hôn | Ánh sáng đẹp → ảnh chụp có filter vàng; một số cá đặc biệt |
| Đêm | Chợ Đêm mở; Trốn Tìm Lồng Đèn; đom đóm; cá đêm; thanh long nở hoa; giày phản quang phát sáng |

### 17.3 Thời tiết (Cô Mưa dự báo trước 3 ngày game)
| Thời tiết | Tỉ lệ | Nông trại | Câu cá | Khác |
|---|---|---|---|---|
| ☀️ Nắng | 35% | Bình thường | Cá nắng | — |
| 🔥 Nắng gắt | 10% | Cây nhiệt đới +10% sản lượng | Cá Ngựa Kẹo Bông | Bán nước giải khát NPC ×1,5 |
| ☁️ Nhiều mây | 20% | — | Cá bình thường | — |
| 🌦 Mưa phùn | 10% | Tự tưới | Cá lóc ↑ | Đèn đường bật sớm |
| 🌧 Mưa rào | 10% | Tự tưới | Cá trê ↑, cá chép ↑ | NPC trú mưa ở hiên, có hội thoại riêng |
| ⛈ Giông | 4% | Tự tưới | Cá Sấm Sét | Minigame ngoài trời chuyển vào trong nhà |
| 🌫 Sương mù | 6% | — | Cá suối đốm sao | Linh Mây hiếm ở Rừng Đom Đóm |
| 🌈 Cầu vồng | Sau mưa, 15 phút | +5% chất lượng | **Cửa sổ Cá Chép Mây Vàng** | Vé Vui ×1,5 |
| 🌪 Bão | Sự kiện | Cây được che, không ảnh hưởng | Cá Voi Mây Con (party) | Sự kiện “Chống Bão” cộng đồng |
| ❄ Tuyết Mây | Mùa Đông, chỉ Đỉnh Đèo | — | Cá Tuyết Mây | Nặn người tuyết mây |

---

## 18. Sự kiện hằng ngày, hằng tuần và theo mùa

### 18.1 Hằng ngày
- **Lịch đăng nhập 28 ô không reset** (bỏ ngày không mất tiến độ).
- **Việc Vặt Phố Mây** (5 việc).
- **Giờ Vàng Câu Cá** 20:00–21:00: tỉ lệ Rare +5%.
- **Xe Buýt Lạ:** thương nhân ghé ngẫu nhiên 2 lần/ngày, bán đồ hiếm bằng Xu trong 20 phút.
- **Chủ đề thời trang ngày:** mặc đúng chủ đề → +20 XP khi chào người khác.

### 18.2 Hằng tuần
| Ngày | Sự kiện |
|---|---|
| Thứ 2 | Dự Án Phố tuần mới |
| Thứ 4 | Hội Chợ Nông Sản — 1 loại nông sản được thu mua giá ×1,5 |
| Thứ 6 tối | **Đêm Nhạc Hẻm** — người chơi Nghệ Sĩ Phố biểu diễn, khán giả được buff |
| Thứ 7 | **Giải Câu Cá Cuối Tuần** — tính theo tổng kích thước |
| Chủ nhật | **Sàn Diễn Chủ Nhật** + reset mục tiêu Tổ Dân Phố |

### 18.3 Theo mùa (lịch thật)
| Sự kiện | Thời gian | Nội dung | Phần thưởng tiêu biểu |
|---|---|---|---|
| **Tết Mây** | Tết Nguyên Đán, 3 tuần | Gói bánh chưng hợp tác (4 người), xin chữ Thầy Đồ (in tên nhân vật bằng thư pháp), lì xì bạn bè (Xu nhỏ + lời chúc), chợ hoa | Áo dài Tết, cây mai/đào nội thất, pháo hoa emote |
| **Cầu Ô Thước** | Thất Tịch (7/7 âm lịch) + Valentine | Nhiệm vụ đôi, bắc cầu bằng chim ô thước | Cánh chim ô thước (couple), nhẫn |
| **Hè Rực Rỡ** | Tháng 6–7 | Thả diều, tắm biển Vịnh, đua thuyền thúng giải lớn | Cánh Diều Giấy, đồ bơi |
| **Mùa Nước Nổi** | Tháng 9–10 | Cá linh, bông điên điển, câu cá cộng đồng | Nón lá xuồng ba lá |
| **Trung Thu Mây** | Rằm tháng 8 âm lịch | Làm lồng đèn (craft), rước đèn tập thể quanh Quảng Trường, phá cỗ | Lồng đèn cá chép cầm tay, mặt nạ giấy |
| **Đêm Hội Hóa Trang** | Cuối tháng 10 | Trốn Tìm Lồng Đèn phiên bản ma mị dễ thương, xin kẹo nhà hàng xóm | Mặt nạ, dấu chân bí ngô |
| **Giáng Sinh Tuyết Mây** | Tháng 12 | Tuyết rơi toàn phố, trang trí cây thông cộng đồng, trao quà bí mật (Secret Santa) | Áo len, quả cầu tuyết nội thất |
| **Sinh Nhật Phố Mây** | Ngày ra mắt | Bà Bồng kể lại năm qua bằng dữ liệu server | Bánh kem nội thất, danh hiệu năm |

---

## 19. Hai loại tiền tệ

| | 🌾 **Xu Lúa** (tiền thường) | 💎 **Ngọc Mây** (tiền cao cấp) |
|---|---|---|
| **Kiếm được từ** | Bán nông sản, cá, món ăn; nhiệm vụ; minigame; giao dịch người chơi | Nạp tiền; Season Pass (cả nhánh miễn phí có ~150 Ngọc/mùa); thành tựu lớn; sự kiện |
| **Dùng cho** | Hạt giống, thú nuôi, mở rộng đất, nâng cấp nhà, nội thất & quần áo cơ bản, phí chợ, nhuộm | Cosmetic, theme nhà, emote, bong bóng chat, đổi tên, Hộp Quà tặng bạn, Season Pass Premium |
| **Giao dịch** | Có | Không (chỉ tặng qua Hộp Quà) |

### Nguyên tắc chống pay-to-win
1. **Không quy đổi Ngọc → Xu** dưới bất kỳ hình thức nào.
2. **Không bán tốc độ:** không có nút “tăng tốc cây bằng Ngọc”, không bán thể lực (game không có thể lực).
3. **Không bán tỉ lệ:** cần câu/mồi trả phí chỉ khác ngoại hình.
4. **Nâng cấp nhà, mở rộng đất chỉ bằng Xu.**
5. Tiện ích trả phí chỉ ở mức không ảnh hưởng kinh tế: thêm ô preset Tủ Đồ (sau 5 ô miễn phí), thêm album ảnh, đổi tên.
6. Mọi thứ ảnh hưởng xếp hạng (Nhà Đẹp, Sàn Diễn) đều có hạng mục **“Chỉ đồ miễn phí/craft”** riêng.

### Kinh tế Xu (tóm tắt — chi tiết ở [Bảng cân bằng kinh tế](Kinh-te-Can-bang.md))
| Cấp | Thu nhập/ngày (casual ~45 phút) | Thu nhập/ngày (active ~2 giờ) | Chi tiêu điển hình |
|---|---|---|---|
| 1 | ~540 Xu | ~1.100 Xu | Hạt giống, áo 150 Xu, mở đất lần 1 (500) |
| 10 | ~2.000 Xu | ~3.400 Xu | Chuồng gà 500, gà 300, mở đất (3.000), Nhà Phố Ống 8.000 |
| 20 | ~4.200 Xu | ~7.100 Xu | Mở đất (10.000–16.000), đồ craft |
| 30+ | ~5.700 Xu | ~9.300 Xu | Nhà Vườn 40.000, Biệt Thự 150.000, sink cuối game |

**Money sink:** phí chợ 5%, mở rộng đất/nhà, nhuộm, hạt giống, khe bếp, cần câu, Dự Án Phố (Quỹ Phố), Nội Thất Di Sản, Nhà Văn Hóa Tổ, đấu giá tuần. Mô phỏng cho thấy **bắt buộc có sink cuối game** từ bản 1.0, nếu không Xu sẽ lạm phát sau ~3 tháng.

### Bảng giá Ngọc (tham khảo thị trường Việt Nam)
| Gói | Giá | Ghi chú |
|---|---|---|
| 60 Ngọc | 20.000đ | |
| 330 Ngọc (300 + 30) | 99.000đ | |
| 700 Ngọc (600 + 100) | 199.000đ | |
| 1.800 Ngọc (1.500 + 300) | 499.000đ | |
| **Nguyệt Phiếu Mây** (thẻ tháng) | 49.000đ | 10 Ngọc/ngày × 30 ngày + 1 khung avatar |
| **Sổ Tay Mùa Premium** | 99.000đ | 50 cấp phần thưởng cosmetic, hoàn lại ~300 Ngọc nếu chơi hết |

---

## 20. Độ hiếm vật phẩm

| Độ hiếm | Màu khung | Hiệu ứng hình ảnh | Tỉ lệ rơi nền | Đặc điểm |
|---|---|---|---|---|
| **Common** | Trắng/xám | Không | 70% | Dễ có, giá rẻ, nền tảng của mọi công thức |
| **Rare** | Xanh dương | Viền sáng nhẹ | 22% | Nguyên liệu công thức cao, cosmetic đẹp hơn |
| **Epic** | Tím | Lấp lánh + hoạt ảnh nhỏ | 7% | Có hoạt ảnh/hiệu ứng, thường gắn điều kiện (thời tiết, giờ) |
| **Legendary** | Vàng kim | Hào quang + âm thanh riêng + thông báo server | ≤1% theo điều kiện | Có câu chuyện riêng, số lượng khan hiếm, thường không mua trực tiếp được |

**Chất lượng craft (1–3 sao)** là trục riêng: một “Áo dài lụa sen” Epic 3 sao có hoa văn tinh hơn và giá chợ cao hơn bản 1 sao.

**Hộp Mây (gacha cosmetic) — nếu dùng:**
- Công khai tỉ lệ: Rare 75% · Epic 22% · Legendary 3%.
- **Bảo hiểm:** chắc chắn Legendary ở lượt thứ 60; trùng đồ → đổi “Mảnh Mây” để mua thẳng món mong muốn trong cửa hàng hộp.
- Giới hạn mua mỗi ngày cho tài khoản dưới 18 tuổi.

---

## 21. Giữ chân người chơi lâu dài

| Giai đoạn | Mục tiêu | Công cụ |
|---|---|---|
| **Phút 0–30** | Thấy vui, có bạn, có lý do quay lại | Onboarding có bước social ở phút thứ 3; cây đang trồng dở; Linh Mây vừa nở; lời hẹn “Cá Chép Mây Vàng sáng mai” |
| **Ngày 1–7** | Tạo thói quen | Lịch đăng nhập không reset; Việc Vặt ngày; Chương 1–2; lên cấp nhanh; minigame với bot/người thật |
| **Tuần 2–4** | Gắn bó với người | Tổ Dân Phố; Tri Kỷ; bạn bè tưới vườn hộ; nhà được ghé thăm; Season Pass |
| **Tháng 2+** | Mục tiêu dài và bản sắc | Nghề Bậc Thầy, chữ ký thợ, Bách Khoa Cá, tiến hóa Linh Mây, Biệt Thự Mây, Couple, Dự Án Phố |
| **Năm 1+** | Truyền thống cộng đồng | Sự kiện mùa quay lại, khu vực mới, UGC (thiết kế trang phục), kỷ niệm sinh nhật game |

**Nguyên tắc thiết kế chống kiệt sức:**
- Không phạt người vắng mặt (cây không chết, thú không chết, lịch không reset).
- Đồ sự kiện quay lại trong **Tủ Hoài Niệm** sau 1 năm → giảm FOMO độc hại.
- Mục tiêu tuần có “bắt kịp” (catch-up): tuần trước bỏ lỡ thì tuần này nhận ×1,5.
- **Lý do đăng nhập vì người khác** mạnh hơn lý do vì phần thưởng: quà bạn gửi, lời nhắn sổ lưu bút, tổ cần mình góp nguyên liệu.

**KPI mục tiêu:** D1 40% · D7 18% · D30 8% · Thời gian chơi trung bình 45 phút/ngày · 60% người chơi D7 có ≥3 bạn bè.

---

## 22. Kiếm tiền chủ yếu bằng cosmetic

| Nguồn doanh thu | Tỉ trọng dự kiến | Ghi chú |
|---|---|---|
| **Shop cosmetic trực tiếp** | 35% | Xoay vòng tuần, bộ theo chủ đề, giá rõ ràng |
| **Sổ Tay Mùa (Season Pass)** | 25% | Mùa 6–8 tuần, nhánh miễn phí hào phóng |
| **Nguyệt Phiếu Mây** | 15% | Doanh thu ổn định |
| **Quà tặng (Hộp Quà cho bạn/couple)** | 10% | Monetization gắn với social — rất hợp với game giao lưu |
| **Hộp Mây (gacha có bảo hiểm)** | 10% | Có thể bỏ nếu thị trường/pháp lý không phù hợp |
| **Gói Tổ Dân Phố** (cờ, đồng phục, nhà văn hóa) | 5% | Thành viên góp chung |

**Ý tưởng cosmetic bán chạy cho game social:**
- Bộ đồ đôi/nhóm (mua 1 tặng 1 cho bạn).
- Emote đôi & emote nhóm.
- Bong bóng chat, khung tên, dấu chân — hiển thị liên tục khi giao lưu.
- Skin Linh Mây.
- Theme nhà trọn gói (“Nhà Đà Lạt sương mờ”, “Căn hộ Sài Gòn chill”).
- Gói trang trí Lễ Kết Duyên.

**Nguyên tắc:** không quảng cáo xen ngang; nếu có quảng cáo thưởng trên mobile thì tối đa 3 lần/ngày, chỉ thưởng Vé Vui nhỏ. Tuân thủ quy định pháp luật Việt Nam về trò chơi điện tử trên mạng (giấy phép, phê duyệt nội dung, giới hạn thời gian chơi cho người dưới 18 tuổi) — **cần tư vấn pháp lý trước khi phát hành**, đặc biệt với cơ chế Hộp Mây.

---

## 23. MVP cho team indie nhỏ

### 23.1 Đội ngũ (6 người)
| Vai trò | Số lượng |
|---|---|
| Game Designer kiêm Producer | 1 |
| Client developer (engine, UI, hoạt ảnh) | 1 |
| Server/backend developer | 1 |
| Artist nhân vật & cosmetic (pixel) | 1 |
| Artist môi trường & UI | 1 |
| Âm thanh + community/QA (bán thời gian/outsource) | 1 |

### 23.2 Phạm vi MVP (9 tháng)
| CÓ trong MVP | ĐỂ SAU |
|---|---|
| 5 khu vực: Quảng Trường, Đồng Lúa Gió, Bến Sông Trăng, Hẻm Đèn Dầu, Sân Chơi Cầu Vồng (+ Chợ dạng menu) | Vịnh, Rừng Đom Đóm, Đỉnh Đèo, Khu Nhà dạng bản đồ |
| 3 nghề: Nông, Ngư, Bếp | Thợ May, Thợ Mộc, Chủ Sạp, Pha Chế, Nghệ Sĩ |
| 12 cây, 2 thú (gà, vịt) | Thú fantasy, ong, tằm |
| 30 loài cá (1 Legendary) | Legendary co-op |
| ~120 cosmetic, ~80 nội thất | Nhuộm, chữ ký thợ |
| Nhà 1 cấp (Phòng Trọ) + ghé thăm + Thích | Nâng cấp nhà, Điểm Ấm Cúng |
| Bạn bè, chat khu vực/thế giới/riêng/party, emote | Couple, Tổ Dân Phố, Tri Kỷ |
| Chợ Đêm giá cố định (sàn toàn server) | Sạp vật lý, trade 1-1 |
| 3 minigame: Đua Thuyền Thúng, Kéo Co, Họa Sĩ Nhí | Các minigame khác |
| Ngày/đêm + 5 thời tiết | Bão, Tuyết Mây, tuần trăng |
| Chương 1–2 cốt truyện, Việc Vặt, Bảng Đơn Hàng | Chương 3+ |
| Shop cosmetic + Season Pass v1 | Hộp Mây, Nguyệt Phiếu |
| Linh Mây cơ bản (1 dạng, 4 màu) | Tiến hóa |
| Công cụ GM, báo cáo, lọc chat | Admin dashboard nâng cao |

**Mục tiêu kỹ thuật MVP:** 2.000 CCU, độ trễ < 100 ms trong Việt Nam, bản build Android + iOS + Web từ cùng một bộ code (bản Windows/Steam đóng gói từ bản web ở 1.0).

**Ngân sách ước tính (tham khảo):** 1,2–2 tỷ VNĐ cho 9 tháng (lương 6 người + máy chủ + công cụ + marketing thử nghiệm). Con số thay đổi mạnh theo mức lương và việc outsource.

### 23.3 Mẹo cắt giảm cho indie
- Dùng backend mã nguồn mở có sẵn friends/chat/guild/matchmaking (xem mục 25) → tiết kiệm 3–4 tháng.
- Paperdoll + palette swap → 1 mẫu áo = nhiều màu.
- Bot lấp minigame khi ít người.
- Nội dung sự kiện cấu hình từ server (remote config) → không cần ra bản cập nhật app.

---

## 24. Roadmap

| Giai đoạn | Thời gian | Mục tiêu | Tiêu chí hoàn thành |
|---|---|---|---|
| **0. Pre-production** | Tháng 0–2 | GDD, art bible, prototype di chuyển + chat 50 người | 50 người chạy quanh 1 map mượt, chat được |
| **1. Vertical slice** | Tháng 2–4 | Nông trại + câu cá + 1 minigame + 1 NPC hoàn chỉnh chất lượng thật | Test nội bộ: “30 phút đầu” vui |
| **2. Alpha kín** | Tháng 4–7 | Toàn bộ nội dung MVP | 200–500 người (Discord/Facebook group), đo D1/D7 |
| **3. Beta kín** | Tháng 7–9 | Cân bằng kinh tế, thử shop & Season Pass, tối ưu thiết bị yếu | 2.000–5.000 người, không lỗi mất đồ |
| **4. Soft launch VN** | Tháng 9–12 | Phát hành thử (Android + Web trước), live ops mùa 1 | D1 ≥ 35%, D7 ≥ 15%, ARPDAU mục tiêu |
| **5. Ra mắt 1.0** | Tháng 12–15 | + Thợ May, Thợ Mộc, Chủ Sạp; Couple; Tổ Dân Phố; Vịnh, Rừng Đom Đóm, Khu Nhà; nâng cấp nhà; sự kiện Tết | Ra mắt iOS + Android + Web + Windows (Steam) |
| **6. Live ops năm 1** | Tháng 15–27 | Mùa 6–8 tuần; Đỉnh Đèo, tiến hóa Linh Mây, Pha Chế, Nghệ Sĩ Phố, Hộp Mây | Doanh thu ổn định, cộng đồng tự tổ chức sự kiện |
| **7. Năm 2** | Tháng 27+ | UGC (người chơi thiết kế trang phục, chia doanh thu), mở rộng Đông Nam Á (Thái, Indo, Phi) | |

---

## 25. Kiến trúc client/server cơ bản

### 25.1 Sơ đồ
```
┌──────────────────────────────┐
│  CLIENT (Phaser 3 + TypeScript)  Web / Android / iOS / Windows
│  - Render 2D, paperdoll      │
│  - Dự đoán di chuyển + nội suy│
│  - Asset bundle tải từ CDN   │
└──────────────┬───────────────┘
   HTTPS (REST/RPC)  │  WebSocket (binary, protobuf)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  GAME BACKEND (khuyến nghị: Nakama – mã nguồn mở)            │
│  ├─ Auth (thiết bị, Google, Apple, Facebook)                │
│  ├─ Bạn bè, Nhóm (Tổ Dân Phố), Chat kênh, Thông báo         │
│  ├─ Storage (hồ sơ, nhà, nông trại), Leaderboard            │
│  ├─ Matchmaker (minigame)                                   │
│  ├─ Authoritative Match:                                    │
│  │    • Zone Match: 1 kênh khu vực (~60 người, 10 tick/s)   │
│  │    • Minigame Match: 2–10 người (20 tick/s)              │
│  └─ Server runtime (TypeScript/Go):                          │
│       • Economy service (ví, ledger, chợ, escrow)            │
│       • Farm/Fishing/Crafting logic (RNG phía server)        │
│       • Quest & Event service (remote config)               │
└──────────┬──────────────────────┬──────────────────────────┘
           ▼                      ▼
   ┌───────────────┐      ┌──────────────┐     ┌──────────────────┐
   │ PostgreSQL    │      │ Redis        │     │ CDN (asset,      │
   │ (dữ liệu bền) │      │ (cache, rate │     │ cosmetic mới)    │
   └───────────────┘      │ limit, queue)│     └──────────────────┘
                          └──────────────┘
   ┌──────────────────────────────────────────────────────────┐
   │ Admin/GM Panel · Analytics (event pipeline) · Sentry      │
   │ Kiểm duyệt chat · Thanh toán (IAP Google/Apple + cổng VN) │
   └──────────────────────────────────────────────────────────┘
```

**Phương án B** (nếu team mạnh JavaScript): Colyseus (room realtime Node.js) + NestJS (REST) + PostgreSQL + Redis. Linh hoạt hơn nhưng phải tự làm bạn bè/chat/guild.

### 25.2 Nền tảng và công nghệ client
Nền tảng đã chốt: **App Store (iOS), Google Play (Android), Web và Windows (Steam)**. Không làm console.

**Chọn công nghệ web làm gốc:** **Phaser 3 + TypeScript**. Đóng gói app iOS/Android bằng **Capacitor**, bản Windows/Steam bằng **Electron** + **steamworks.js** (thành tựu, bạn bè Steam, overlay).
- Một bộ code cho cả bốn nền tảng. Bản web là bản chính: gửi link là chơi, hợp với game giao lưu (rủ bạn không cần cài app).
- Phaser đủ cho 2D pixel art: tilemap (vẽ bằng Tiled), camera, input chạm và phím, âm thanh, hoạt ảnh sprite.
- Toàn bộ là file chữ (code, dữ liệu JSON, bản đồ Tiled), chạy và kiểm tra tự động được trong trình duyệt headless: hợp với cách làm bằng AI, không phụ thuộc editor đồ hoạ.
- Giữ được logic và dữ liệu từ các bản chơi thử web (`data/khu/*.json`, luật nhiệm vụ, kinh tế, va chạm); đồ hoạ làm lại theo art bible.
- Đánh đổi: trên điện thoại yếu chậm hơn engine native. Giữ nhẹ bằng atlas sprite, giới hạn số người hiển thị (interest management, mục 25.3) và tắt hiệu ứng theo cấu hình máy.
- Phương án dự phòng nếu hiệu năng mobile không đạt ở vertical slice: **Godot 4 (GDScript)**, cũng xuất được iOS/Android/Web/Windows nhưng phải viết lại client.

**Yêu cầu chung cho mọi nền tảng:**
- **Một tài khoản** (Google, Apple, Facebook, email) dùng ở mọi nền tảng; tiến độ lưu trên server.
- **Chơi chung:** người dùng iOS, Android, web và Steam gặp nhau trong cùng khu, cùng chợ, cùng chat.
- **Điều khiển:** chạm (cần điều khiển ảo) và chuột/phím; giao diện co giãn từ màn điện thoại dọc tới màn máy tính.
- **Thanh toán theo luật từng cửa hàng:** trong app iOS/Android dùng IAP của Apple/Google (phí 15–30%); trên web dùng cổng Việt Nam (MoMo, ZaloPay, VNPay); bản Steam dùng giao dịch trong game của Steam (Steam Wallet, phí 30%). Không dẫn người dùng app hoặc Steam ra web để mua (vi phạm chính sách store). Giá và vật phẩm giống nhau trên mọi nền tảng.
- **Cập nhật:** bản web cập nhật ngay, bản Steam cập nhật trong vài phút; bản app cần duyệt nên nội dung đổi thường xuyên đi qua remote config và asset trên CDN (mục 25.6).

### 25.3 Đồng bộ mạng
- **Server authoritative** cho mọi thứ có giá trị: vị trí (kiểm tra tốc độ), kho đồ, tiền, kết quả câu cá, thời gian cây lớn (timestamp server).
- Client gửi **ý định** (intent), không gửi kết quả:
  ```json
  { "op": "move_to", "x": 412, "y": 288, "seq": 1051 }
  { "op": "fish_cast", "spot": "song_trang_03", "power": 0.82 }
  { "op": "fish_reel_result", "session": "f_9a1c", "inputs_hash": "…", "success": true }
  ```
- Server trả về **kết quả**:
  ```json
  { "op": "fish_bite", "session": "f_9a1c", "pattern": "epic_jerky", "window_ms": 900 }
  { "op": "fish_caught", "item": "ca_chep_do", "size_cm": 54, "rarity": "rare" }
  ```
- **Interest management:** chia map thành lưới 16×16 ô, chỉ gửi cập nhật người chơi trong lưới lân cận; giảm băng thông trên mobile.
- Tick khu vực 10/s (game thư giãn, không cần nhanh); client nội suy 100 ms.

### 25.4 Kinh tế & chống gian lận
- Mọi thay đổi tiền/vật phẩm qua **một Economy service duy nhất**, ghi **sổ cái (ledger) bút toán kép** + khóa idempotency → không nhân bản đồ khi mất mạng/gửi lại.
- Chợ dùng **escrow**: vật phẩm bị khóa khi đăng bán, tiền bị khóa khi mua, hoàn tất trong 1 giao dịch DB.
- Rate limit theo hành động (câu cá tối thiểu 6 giây/lần), phát hiện bot theo mẫu hành vi.
- Receipt IAP xác minh phía server với Google/Apple.

### 25.5 Mô hình dữ liệu tối giản
```
players(id, display_name, level, xp, xu, ngoc, created_at, flags)
items_def(item_id, type, slot, rarity, tradable, bind_on_acquire, price_ref)
inventory(id, player_id, item_id, qty, quality, crafted_by, bound, acquired_at)
wallet_ledger(id, player_id, currency, delta, reason, ref_id, idem_key, ts)
farm_plots(player_id, plot_idx, crop_id, planted_at, watered, fertilized)
houses(player_id, tier, layout_json, cozy_score, likes)
market_listings(id, seller_id, inventory_id, price, expires_at, status)
friendships(a_id, b_id, closeness, since)
guilds(id, name, level, points) · guild_members(guild_id, player_id, role)
quests_progress(player_id, quest_id, step, data_json, updated_at)
```

### 25.6 Hạ tầng
- Docker, 1 vùng **Singapore** (độ trễ từ Việt Nam ~30–50 ms).
- MVP: 1–2 máy chủ ứng dụng + PostgreSQL managed + Redis → khoảng **200–500 USD/tháng** cho 2.000 CCU.
- Mở rộng: tách Zone Match ra nhiều node, chia DB đọc/ghi, cân nhắc giải pháp cluster khi vượt ~10.000 CCU.
- Nội dung (sự kiện, giá, shop xoay vòng) cấu hình bằng **remote config** + asset bundle trên CDN → cập nhật không cần duyệt lại app store.

---

## 26. Vòng chơi 30 phút đầu tiên của một người chơi mới

> Nhân vật mẫu: **“Mây Nhỏ”**, người chơi mới, chơi trên điện thoại vào 20:00 tối.

| Phút | Diễn biến | Hệ thống được dạy | Ví & cấp sau bước |
|---|---|---|---|
| **00:00–01:30** | Cutscene máy bay giấy & Xe Buýt Gió (bỏ qua được). Tạo nhân vật: chọn 1 trong 3 preset, chỉnh tóc & màu mắt. | Tạo hình | 100 Xu · Cấp 1 |
| **01:30–03:00** | Đến Quảng Trường, Bà Bồng chào. Bé Bơ khóc tìm Linh Mây → nhận nhiệm vụ “Linh Mây Lạc Đường”. Học di chuyển (joystick/chạm). | Di chuyển, NPC | |
| **03:00–04:00** | Bước 2: **vẫy tay chào 1 cư dân.** Một người chơi thật gần đó vẫy lại → bong bóng tim hiện lên, cả hai nhận +20 Xu. | Emote, social | 120 Xu |
| **04:00–07:00** | Xe Buýt Gió đưa đến Đồng Lúa Gió. Chị Mận tặng 6 hạt rau muống + bình tưới. Gieo, tưới. Chị Mận: *“3 phút nữa là có rau nha!”* | Trồng trọt | Cấp 2 (lên cấp lần đầu, pháo hoa nhỏ) |
| **07:00–12:00** | Đến Bến Sông Trăng (đang là đêm game, mặt sông có trăng). Chú Bảy tặng Cần Câu Tre. Câu 3 con: cá rô, cá lóc (được đảm bảo), con thứ 3 là **cá chép đỏ (Rare, đảm bảo ở lần đầu)** → khung xanh lấp lánh, Chú Bảy: *“Tay mới mà hên dữ!”* Bách Khoa Cá mở. | Câu cá, độ hiếm, bộ sưu tập | 3 cá · Cấp 3 |
| **12:00–14:00** | Quay lại nông trại, thu hoạch 6 rau muống. Một người chơi khác (bạn cùng lúc tạo nhân vật) được gợi ý “tưới hộ nhau” → nhận nút Thêm Bạn. | Thu hoạch, tương tác vườn | |
| **14:00–18:00** | Hẻm Đèn Dầu: Cô Sáu tặng 1 cà chua, dạy nấu **Canh chua cá lóc** (cá lóc + cà chua + rau muống). Minigame nấu 10 giây (khuấy đúng lúc). Cô Sáu mời 1 ly cà phê muối miễn phí → buff “Tỉnh Táo” (+10% XP 15 phút). | Nấu ăn, buff | |
| **18:00–20:00** | Mang canh cho Bé Bơ → nhận **Trứng Linh Mây** (nở sau 10 phút thực), 300 Xu, 400 XP, Ghế nhựa đỏ, Đèn lồng giấy. | Hoàn thành chuỗi nhiệm vụ | 420 Xu · Cấp 4 |
| **20:00–23:00** | Chợ Đêm (đang giờ mở, lồng đèn sáng). Mèo Mướp Ngọc dạy bán: bán 5 rau muống (35 Xu) + cá rô (4 Xu). Mua **Áo thun “Tui ❤ Phố Mây”** (150 Xu). Mở Tủ Đồ, mặc ngay. Thấy người khác bán cá chép đỏ ~20 Xu trên chợ (NPC chỉ mua 15) → hiểu giá trị Rare. | Mua bán, thời trang, Chợ | 309 Xu |
| **23:00–27:00** | Sân Chơi Cầu Vồng: xếp hàng **Đua Thuyền Thúng** với 2 người thật + 2 bot Linh Mây. Về nhì. Nhận 80 XP + 10 Vé Vui. Sau trận, hiện gợi ý kết bạn với 2 người vừa đua. Kết bạn 1 người. | Minigame, kết bạn | Cấp 4 (70% tới cấp 5) |
| **27:00–30:00** | Về Căn Phòng Trọ Số 0. Đặt Ghế nhựa đỏ + Đèn lồng giấy. **Trứng Linh Mây nở** → đặt tên. Chị Mận nhắn: gieo 6 hạt **cà chua** (10 phút). Cô Mưa báo: *“Sáng mai game (khoảng 21:30 giờ thực) có mưa rồi cầu vồng.”* Chú Bảy thì thầm: *“Nghe nói cầu vồng lên là Cá Chép Mây Vàng ra đó…”* | Nhà, Linh Mây, hẹn quay lại | 309 Xu · Cấp 4 · 1 bạn · 1 Linh Mây |

**Kết quả sau 30 phút:** cấp 4, ~309 Xu, 1 áo mới, 2 nội thất, 1 Linh Mây, 1 người bạn, đã thử 4 hệ thống chính (nông, câu, bếp, minigame) và có **3 lý do để quay lại**: cà chua chín sau 10 phút, cửa sổ cầu vồng tối nay, người bạn mới vừa gửi lời mời “mai đua tiếp”.

**Nguyên tắc onboarding được áp dụng:**
- Bước social thật ở **phút thứ 3**.
- Lên cấp đều đặn (4 lần trong 30 phút).
- Vật phẩm Rare đảm bảo ở lần câu đầu → cảm giác may mắn.
- Mỗi hệ thống chỉ dạy 1 thao tác cốt lõi, phần sâu hơn mở dần.
- Kết thúc phiên bằng **lời hẹn**, không phải bằng màn hình phần thưởng.

---

## Phụ lục A — Rủi ro & cách giảm thiểu

| Rủi ro | Cách giảm thiểu |
|---|---|
| Server vắng khi mới ra mắt | Ít kênh, gộp kênh tự động, bot minigame, sự kiện theo giờ vàng |
| Lạm phát Xu | Phí chợ, giới hạn thu mua NPC, sink đa dạng, theo dõi tổng cung Xu hằng ngày |
| Bot / buôn bán tiền ảo bằng tiền thật | Khung giá, ràng buộc đồ Ngọc, phát hiện hành vi, giới hạn trade tài khoản mới |
| Chat độc hại, quấy rối | Lọc tiếng Việt + teencode, chế độ an toàn dưới 16 tuổi, báo cáo nhanh, moderator |
| Thiếu nội dung sau 1 tháng | Nội dung cấu hình từ server, Dự Án Phố do cộng đồng, mùa 6–8 tuần, UGC về sau |
| Bị so sánh/nhầm với game cũ | Tên, thế giới, NPC, bản đồ, hệ thống hoàn toàn riêng; bản sắc “Việt hiện đại + mây”; không dùng tên/bản đồ/tài sản của game khác |
| Pháp lý (giấy phép, gacha, trẻ vị thành niên) | Tư vấn pháp lý sớm; có phương án bỏ Hộp Mây |

## Phụ lục B — Thuật ngữ

| Thuật ngữ | Ý nghĩa |
|---|---|
| Xu Lúa | Tiền thường, kiếm trong game |
| Ngọc Mây | Tiền cao cấp, nạp bằng tiền thật |
| Vé Vui | Token minigame |
| Linh Mây | Pet đồng hành |
| Tổ Dân Phố | Guild |
| Kết Duyên | Hệ thống couple |
| Tri Kỷ | Nhóm bạn thân (không lãng mạn) |
| Dự Án Phố | Mục tiêu xây dựng chung toàn server |
| Sổ Tay Mùa | Season Pass |
| Nguyệt Phiếu Mây | Thẻ tháng |
| Ánh Nắng Nghỉ Ngơi | XP thưởng tích lũy khi offline |
