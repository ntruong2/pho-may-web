# PHỐ MÂY — Thiết kế minigame: 🛶 ĐUA THUYỀN THÚNG v0.1

> Tài liệu đi kèm [GDD](GDD-Pho-May.md) · [Kinh tế](Kinh-te-Can-bang.md)
> Đây là minigame chủ lực của MVP, xuất hiện ngay trong 30 phút đầu.

---

## 1. Tóm tắt

| | |
|---|---|
| **Một câu** | 2–5 người chèo thuyền thúng tròn xoay vòng vòng, đua xuôi dòng sông, nhặt bùa và cười vào mặt nhau khi ai đó xoay mòng mòng giữa đám lục bình. |
| **Số người** | 2–5 (thiếu người thì bot lấp) |
| **Thời lượng** | ~3 phút cả trận (đua ~2 phút) |
| **Điều khiển** | 2 nút: **Chèo Trái / Chèo Phải** |
| **Cảm xúc chính** | Hài hước khi thúng xoay mất kiểm soát → thỏa mãn khi tìm được nhịp chèo đều |
| **Mở khóa** | Cấp 3 (tân thủ chơi thử ở phút 23 trong phiên đầu) |
| **Vị trí** | Sân Chơi Cầu Vồng, hoặc xếp hàng từ bất kỳ đâu |

### Vì sao chọn thuyền thúng?
- **Hình ảnh Việt Nam rất riêng**, nhìn một lần là nhớ.
- Thúng tròn nên **tự xoay khi chèo lệch**. Cơ chế vật lý này vừa dễ hiểu vừa tự tạo ra tình huống buồn cười, không cần thêm luật.
- Chỉ 2 nút, hợp điện thoại, ai cũng chơi được ngay nhưng vẫn có kỹ năng để giỏi lên.

---

## 2. Trụ cột thiết kế

1. **Học trong 10 giây, giỏi sau 20 trận.** Chèo xen kẽ thì đi thẳng, chèo một bên thì xoay. Chỉ vậy thôi.
2. **Thua cũng vui.** Thúng xoay, bị tạt nước, va lục bình là những khoảnh khắc hài hước chứ không gây ức chế. Thua vẫn nhận 60% thưởng.
3. **Trận nào cũng sát nút.** Bùa được chia theo thứ hạng và có dòng nước “kéo” người cuối, để khoảng cách đầu–cuối thường dưới 15 giây.
4. **Cửa ngõ để kết bạn.** Sau trận có nút “Đua lại” và “Kết bạn” chỉ cách 1 chạm.

---

## 3. Luồng trận đấu

```
Xếp hàng (≤ 30s, bot lấp nếu thiếu)
   → Phòng chờ 15s: xem đối thủ, emote, chọn skin thúng
   → Đếm ngược 3-2-1-“CHÈO!”  (chạm đúng lúc “CHÈO!” = Xuất Phát Vàng: tăng tốc 1,5s)
   → Đua ~2:00  (người về nhất → các người còn lại có 20s để về đích)
   → Bục trao giải 15s: emote, [Đua lại] [Kết bạn] [Chia sẻ clip]
Tổng: ~2:50 – 3:30
```

- **Giới hạn cứng:** 3:00 tính từ lúc xuất phát. Hết giờ thì xếp hạng theo quãng đường.
- **Đua lại:** nếu ≥ 2 người bấm “Đua lại” trong 10 giây, cả phòng giữ nguyên và bot lấp chỗ trống. Hai trận liên tiếp cùng nhóm người chính là lúc dễ kết bạn nhất.

---

## 4. Điều khiển

| Nền tảng | Chèo Trái | Chèo Phải | Dùng bùa |
|---|---|---|---|
| Điện thoại (ngang) | Nút lớn góc dưới trái | Nút lớn góc dưới phải | Nút tròn phía trên nút phải |
| Máy tính (web, Steam) | A / ← | D / → | Space |
| Tay cầm | LT | RT | A |

**Chế độ Một Tay (trợ năng):** một nút “Chèo”, thúng tự hướng theo dòng sông, tốc độ tối đa 90%. Có thể dùng ở trận thường, không dùng ở Đua Xếp Hạng.

### Bố cục màn hình điện thoại
```
┌──────────────────────────────────────────────────────────────┐
│ 🏁 2/5     ⏱ 1:12        ▓▓▓▓▓▓▓░░░ (thanh tiến độ 5 chấm) │
│                                                              │
│                    [ góc nhìn nghiêng,                        │
│                      camera đi theo thúng ]                   │
│                                                              │
│                                               ( 🍃 bùa )     │
│  ┌────────┐                                  ┌────────┐     │
│  │  ⟲ TRÁI │                                  │ PHẢI ⟳ │     │
│  └────────┘                                  └────────┘     │
└──────────────────────────────────────────────────────────────┘
```
Nút chèo **rung nhẹ + nhấp nháy theo nhịp** khi người chơi chèo xen kẽ đều, để dạy nhịp mà không cần chữ hướng dẫn.

---

## 5. Vật lý thuyền thúng

Đơn vị: **ô** (1 ô = 32 px), giây. Server mô phỏng ở **20 Hz** (bước 50 ms).

### 5.1 Chèo
- **Chèo Trái:** đẩy thúng tiến theo hướng mũi + xoay **sang phải**. Chèo Phải thì ngược lại.
- **Nhịp Đều:** nếu lần chèo này khác bên lần trước và cách nhau 0,25–0,6 giây, lực đẩy ×1,25 và mô-men xoay giảm 70%. Chèo xen kẽ đều thì đi nhanh và thẳng.
- **Chèo Đôi:** bấm cả hai nút trong vòng 80 ms thì đi thẳng, lực ×1,0 (không có thưởng nhịp). Cách này dễ cho người mới nhưng chậm hơn người chèo xen kẽ giỏi.
- **Chèo một bên liên tục:** thúng quay tròn, khiến người chơi vừa buồn cười vừa phải học lại. Sau 2 vòng xoay liên tiếp thì Linh Mây trên thúng hiện biểu cảm chóng mặt.

### 5.2 Mã giả (dùng chung cho server và phần dự đoán ở client)
```python
def step(b, dt, inputs, river):
    for stroke in inputs:                       # "L" | "R" | "BOTH"
        if b.cooldown[stroke] > 0: continue
        rhythm = (stroke != b.last_side and 0.25 <= b.t_since_stroke <= 0.6)
        impulse = IMPULSE * (RHYTHM_BONUS if rhythm else 1.0)
        b.vel += heading_vec(b.heading) * impulse
        if stroke != "BOTH":
            torque = TORQUE * (1 - RHYTHM_TORQUE_CUT if rhythm else 1)
            b.ang_vel += torque if stroke == "L" else -torque
        b.cooldown[stroke] = STROKE_CD
        b.last_side, b.t_since_stroke = stroke, 0

    b.vel += river.current_at(b.pos) * CURRENT_ACCEL * dt   # dòng chảy + xoáy nước
    b.vel *= exp(-DRAG * b.surface_mult * dt)              # lục bình: surface_mult = 2.5
    b.vel = clamp_len(b.vel, MAX_SPEED * b.boost_mult)
    b.ang_vel *= exp(-ANG_DRAG * dt)
    b.heading += b.ang_vel * dt
    b.pos += b.vel * dt
    resolve_collisions(b)                                  # bờ, cọc, thúng khác (nảy 0.6)
    b.t_since_stroke += dt; tick_cooldowns(b, dt)
```

### 5.3 Tham số điều chỉnh (remote config)

| Tham số | Giá trị | Ý nghĩa |
|---|---|---|
| `IMPULSE` | 1,1 ô/s | Tốc độ cộng thêm mỗi lần chèo |
| `RHYTHM_BONUS` | 1,25 | Thưởng chèo xen kẽ đều |
| `RHYTHM_TORQUE_CUT` | 0,7 | Giảm xoay khi chèo đều |
| `TORQUE` | 150°/s | Xoay mỗi lần chèo lệch |
| `STROKE_CD` | 0,22 s | Hồi mỗi bên (chống spam) |
| `DRAG` | 0,8 /s | Lực cản nước |
| `ANG_DRAG` | 2,5 /s | Tắt dần độ xoay |
| `MAX_SPEED` | 5,0 ô/s | Tốc độ tối đa |
| `CURRENT_ACCEL` | 0,6 | Mức ảnh hưởng của dòng chảy |
| `RADIUS` | 0,45 ô | Bán kính va chạm (mọi skin như nhau) |
| `BOUNCE` | 0,6 | Độ nảy khi hai thúng cụng nhau |
| `CATCHUP_MAX` | +12% tốc độ tối đa | Dòng nước “đẩy” người cuối (mục 7) |

**Mục tiêu cảm giác:** người mới đạt ~3,2 ô/s trung bình, người giỏi ~4,4 ô/s. Đường đua dài ~520 ô nên người giỏi về đích trong ~2:00, người mới ~2:40. Vì chênh lệch lớn như vậy, trận thường **ghép theo MMR ẩn** (mục 9) để người cùng trình độ đua với nhau. Nếu vẫn gặp nhau, cơ chế bắt kịp (mục 7) rút khoảng cách còn khoảng 25 giây. Ai chưa về đích được xếp hạng theo quãng đường và vẫn nhận thưởng.

---

## 6. Đường đua

### 6.1 MVP: “Xuôi Dòng Sông Trăng”
```
 XUẤT PHÁT  (Bến Sông Trăng)
    ║║║║║
    ║   ╲___  ① Đoạn khởi động: nước êm, 4 hộp bùa
    ║       ╲___
    ║   🌿🌿    ╲   ② Bãi lục bình (vùng chậm ×2,5 cản) — đi mép phải an toàn
    ║  🌿🌿🌿    │
    ╚═══╗  🪵  ╔═╝   ③ Cọc tre so le — luồn lách
        ║ 🌀  ║     ④ Xoáy nước: kéo vào tâm + xoay; ra được thì văng nhanh
   ┌────╜    ╙─────┐
   │ ĐƯỜNG TẮT     │ ⑤ Rạch nhỏ dưới gầm cầu tre: ngắn hơn 12%, hẹp, dễ kẹt
   │ (rạch hẹp) ◄──┤    ↔ Đường chính: rộng, có 3 hộp bùa
   └────╖    ╓─────┘
        ║ 🛶→ ║     ⑥ Xuồng chở dừa của NPC chạy ngang theo chu kỳ 6s
        ║     ║
    ════╩═════╩════  ⑦ Nước rút về đích: dòng chảy mạnh, hộp bùa cuối
      ĐÍCH (Chợ Đêm)  — pháo lồng đèn, NPC reo hò
```
- **Điểm hồi sinh (checkpoint)** cách nhau ~40 ô. Nếu kẹt quá 4 giây thì bấm “Gọi Linh Mây” để được kéo ra, mất ~2 giây.
- **Hộp bùa** có 9 hàng, hồi lại sau 8 giây.

### 6.2 Biến thể theo thời tiết & giờ (không cần làm thêm map)
| Điều kiện | Thay đổi |
|---|---|
| Mưa | Dòng chảy +30%, lục bình trôi chậm dọc sông |
| Giông | Sóng ngang mỗi 10 giây đẩy thúng sang một bên, sấm chớp làm sáng màn hình |
| Đêm | Sông tối, chỉ có đèn lồng hai bờ và đèn trên thúng. Thêm bùa “Đom Đóm” soi đường |
| Cầu vồng | Vé Vui ×1,5 (theo GDD), cầu vồng hiện trên đường đua |

### 6.3 Đường đua bản 1.0
- **Kênh Chợ Nổi** (chỉ chơi ban đêm): len giữa các ghe hàng, đèn lồng, đường tắt xuyên qua ghe.
- **Vịnh San Hô Mây:** sóng biển theo chu kỳ, rạn san hô tạo đường vòng, có bãi cát phải vòng qua.

---

## 7. Bùa & cơ chế bắt kịp

| Bùa | Hiệu ứng | Thời gian |
|---|---|---|
| 🍃 **Gió Xuôi** | Tốc độ tối đa +60% | 2 giây |
| 🪷 **Lá Sen Che** | Chặn 1 bùa tấn công | 6 giây |
| 🦆 **Vịt Cao Su** | Thả phía sau; ai chạm vào thì thúng xoay 1 vòng | Tồn tại 15 giây |
| 💦 **Tạt Nước** | Hình nón phía trước dài 3 ô: ai trúng bị −40% tốc độ + hiệu ứng mặt ướt | 1,2 giây |
| 🐟 **Đàn Cá Chép** | Đàn cá quẫy ngay trước **người đang dẫn đầu**, làm chậm | 1,5 giây |
| ✨ **Đom Đóm** (chỉ ban đêm) | Soi sáng + chỉ đường tắt | 5 giây |

**Tỉ lệ nhận bùa theo thứ hạng (bảng cho trận 5 người)**

| Hạng | Gió Xuôi | Lá Sen | Vịt Cao Su | Tạt Nước | Đàn Cá Chép |
|---|---|---|---|---|---|
| 1 | 10% | 40% | 40% | 10% | 0% |
| 2 | 25% | 25% | 25% | 25% | 0% |
| 3 | 35% | 15% | 20% | 30% | 0% |
| 4 | 45% | 10% | 10% | 25% | 10% |
| 5 | 50% | 5% | 5% | 20% | 20% |

**Dòng nước bắt kịp:** người chơi cách người dẫn đầu hơn 30 ô được cộng tốc độ tối đa tuyến tính, tới **+12%** khi cách 80 ô trở lên. Hiệu ứng thể hiện bằng hình ảnh: vệt nước đẩy phía sau thúng.

**Giới hạn “khó chịu”:** mỗi người chỉ bị tấn công tối đa 1 lần trong 4 giây (sau mỗi lần trúng được miễn nhiễm 4 giây, có nhấp nháy). Không có bùa nào làm mất quá 2 giây.

---

## 8. Phần thưởng

| Hạng | XP | Xu | Vé Vui |
|---|---|---|---|
| 1 | 80 | 30 | 12 |
| 2 | 70 | 20 | 10 |
| 3 | 60 | 20 | 8 |
| 4–5 | 50 | 20 | 7 |
| Không về đích (hết giờ) | 50 | 20 | 6 |

**Hệ số nhân:**
- Trận đầu tiên trong ngày: ×2 Vé Vui.
- Chơi cùng party: +10%.
- Cầu vồng: Vé Vui ×1,5.
- Giờ Hội Sân Chơi (12:00–13:00, 20:00–22:00): Vé Vui ×2.

**Giới hạn:** 10 trận đầu mỗi ngày nhận đủ Xu, các trận sau nhận 50% XP và Vé Vui, không nhận Xu (khớp tài liệu kinh tế).

**Đổi Vé Vui (cửa hàng Sân Chơi):**

| Món | Vé Vui |
|---|---|
| Sticker “Thúng Quay” | 40 |
| Mái chèo Tre Sọc | 120 |
| Skin Thúng Dưa Hấu | 300 |
| Vệt nước Cánh Hoa | 450 |
| Danh hiệu “Tay Chèo Vàng” (cần thêm 50 lần về nhất) | 600 |

---

## 9. Xếp hạng (bản 1.0, từ cấp 10)

- Chế độ **Đua Xếp Hạng** tách riêng khỏi trận thường. Không có bot, không dùng Chế độ Một Tay.
- **MMR ẩn** (Elo đơn giản cho 5 người) dùng để ghép trận; chế độ thường cũng dùng MMR ẩn để người mới không gặp cao thủ.
- **Hạng hiển thị theo mùa:** Thúng Đồng → Thúng Bạc → Thúng Vàng → Thúng Ngọc → **Thúng Mây**. Cuối mùa nhận thúng cosmetic theo hạng cao nhất đạt được.
- **Giải Liên Tổ (hằng tháng):** thể thức tiếp sức. Mỗi Tổ Dân Phố cử 4 người, mỗi người chèo 1 đoạn. Cổ vũ viên của tổ đứng ở bờ sông, ai cũng xem được.

---

## 10. Social hooks

| Thời điểm | Tính năng |
|---|---|
| Phòng chờ | Emote với đối thủ, xem thẻ tên (cấp, danh hiệu, Tổ) |
| Trong trận | 4 emote nhanh (😂 😱 👋 😤) hiện trên đầu thúng |
| Bục trao giải | **Đua lại**, **Kết bạn** (1 chạm), **Chia sẻ clip** (tự cắt 8 giây đáng xem nhất, ví dụ lúc bị Vịt Cao Su làm xoay) |
| Sân Chơi Cầu Vồng | Màn hình lớn chiếu trực tiếp các trận của bạn bè đang đua, người đứng xem được thả tim |
| Party | Xếp hàng cả nhóm; nếu cả nhóm về top 3 thì có emote “Cả Nhà Thắng” |

**Chỉ số mục tiêu:** ≥ 8% trận có ít nhất một lời mời kết bạn sau trận.

---

## 11. Bot “Linh Mây Tinh Nghịch”

- Chỉ vào trận khi xếp hàng quá 30 giây. **Luôn gắn nhãn bot** (biểu tượng Linh Mây cạnh tên).
- Bot đi theo đường có sẵn trên đường đua, kèm nhiễu ngẫu nhiên. Có 3 mức:

| Mức | Tốc độ trung bình | Tỉ lệ chèo lỗi | Dùng bùa |
|---|---|---|---|
| Dễ | 3,0 ô/s | 20% | Ngẫu nhiên, trễ |
| Vừa | 3,7 ô/s | 10% | Hợp lý |
| Khó | 4,2 ô/s | 5% | Tối ưu (chỉ dùng ở chế độ tập luyện) |

- **Trận đầu đời (onboarding):** 2 bot Dễ + 1 bot Vừa. Người mới thường về hạng 2–3, cảm thấy mình làm được nhưng vẫn muốn thắng. Không sắp đặt để người mới chắc chắn thắng.
- Bot không bao giờ dùng Đàn Cá Chép.

---

## 12. Kỹ thuật mạng

| Hạng mục | Thiết kế |
|---|---|
| Mô hình | Server quyết định mọi thứ (authoritative), dùng Minigame Match ở 20 Hz (GDD mục 25) |
| Client gửi | `{op:"stroke", side:"L", seq:231, ctick:1804}` · `{op:"use_item", seq:232}` |
| Server gửi | Snapshot 20 Hz: vị trí (2×int16), hướng (uint8), vận tốc (2×int8), cờ trạng thái. Khoảng 10 byte/thúng, tức ~1 KB/s cho 5 thúng |
| Thúng của mình | Client **tự đoán trước** chuyển động bằng cùng hàm `step()`. Lệch < 0,5 ô thì kéo mượt về vị trí server trong 150 ms, lệch ≥ 0,5 ô thì nhảy thẳng về |
| Thúng người khác | Nội suy với độ trễ đệm 100 ms |
| Bùa & va chạm | Chỉ server xử lý. Client chỉ phát hiệu ứng khi server xác nhận (có thể phát âm thanh trước cho cảm giác nhanh) |
| Độ trễ | Mục tiêu < 80 ms trong Việt Nam. Trên 250 ms thì hiện biểu tượng mạng yếu |
| Mất kết nối | Bot tạm điều khiển thúng. Kết nối lại trong 15 giây thì chơi tiếp. Nếu không, trận vẫn tính và người chơi nhận 50% thưởng (không phạt người rớt mạng) |
| Treo máy (AFK) | Không bấm gì trong 10 giây thì bot điều khiển và người đó không nhận thưởng. AFK 3 lần/ngày thì bị chờ 5 phút mới xếp hàng được |
| Chống gian lận | Server kiểm tra thời gian hồi chèo và tốc độ tối đa, bỏ qua lệnh gửi vượt giới hạn |

---

## 13. Âm thanh & cảm giác

- **Nhạc:** sáo trúc + đàn bầu phối nhịp electro nhẹ, tempo ~120 BPM. **Nhịp chèo đều trùng nhịp nhạc**, nên người chơi vô thức chèo theo nhạc.
- **Tiếng:** “bõm” khi chèo, tiếng trống nhỏ khi đạt Nhịp Đều, “quạc” khi đụng vịt cao su, “ào” khi tạt nước.
- **MC Linh Mây** bình luận ngắn: *“Ối ối, thúng số 3 quay như chong chóng!”*, *“Về đích sát nút!”*
- **Hình ảnh:** vệt nước sau thúng dài theo tốc độ, bọt nước khi va chạm, đổi góc camera ngắn khi về đích.

---

## 14. Cosmetic (kiếm tiền, không ảnh hưởng gameplay)

| Loại | Ví dụ | Nguồn |
|---|---|---|
| Skin thúng | Thúng Dưa Hấu, Thúng Bánh Bao, Thúng Lồng Đèn (phát sáng ban đêm) | Vé Vui / Ngọc (Rare 80–120, Epic 250) |
| Mái chèo | Chèo Tre Sọc, Chèo Cá Chép | Vé Vui / Sổ Tay Mùa |
| Vệt nước | Cánh Hoa, Sao Lấp Lánh, Cầu Vồng | Ngọc / Xếp hạng |
| Emote bục trao giải | “Nâng Cúp Nón Lá”, “Nhảy Sạp Ăn Mừng” | Ngọc 60 |
| Còi | Còi xe buýt, tiếng gà gáy | Vé Vui |

**Mọi skin có cùng hitbox, bán kính và thông số vật lý.** Thúng Lồng Đèn phát sáng nhưng không soi đường như bùa Đom Đóm.

---

## 15. Đo lường thành công

| Chỉ số | Mục tiêu | Nếu lệch |
|---|---|---|
| Tỉ lệ đua hết trận (không thoát giữa chừng) | ≥ 95% | Giảm thời lượng, soát tình huống bị kẹt |
| Thời lượng trận trung bình | 3:00 ± 0:30 | Chỉnh độ dài đường đua |
| Khoảng cách người nhất – người cuối | < 15 giây ở ≥ 60% trận | Chỉnh mức bắt kịp, tỉ lệ bùa |
| Tỉ lệ bấm “Đua lại” | ≥ 30% | Kiểm tra độ vui, thưởng trận liên tiếp |
| Tỉ lệ thắng của top 1% người chơi (chế độ thường) | ≤ 45% | Tăng MMR matching |
| Số lần xoay tròn/người/trận | 1–3 | Chỉnh `TORQUE` / `RHYTHM_TORQUE_CUT` |
| Kết bạn sau trận | ≥ 8% trận | Làm nút Kết bạn nổi bật hơn |
| Tỉ lệ dùng Chế độ Một Tay | Theo dõi | Nếu > 30%, điều khiển 2 nút có thể đang quá khó |

---

## 16. Phạm vi & kế hoạch làm

**MVP:** 1 đường đua (Sông Trăng) · 4 bùa (Gió Xuôi, Lá Sen, Vịt Cao Su, Tạt Nước) · bot 2 mức · biến thể mưa/đêm · phần thưởng · Đua lại / Kết bạn · 3 skin thúng.

**Bản 1.0:** thêm Đàn Cá Chép, Đom Đóm, Kênh Chợ Nổi, Vịnh, Đua Xếp Hạng, Giải Liên Tổ, chia sẻ clip, màn hình xem trực tiếp.

| Công việc | Ước tính |
|---|---|
| Greybox (khối xám): vật lý + 2 nút + 1 đường đua thô + bot đơn giản | 2 tuần (1 client dev) |
| Server authoritative + dự đoán/hiệu chỉnh ở client | 2 tuần (server dev) |
| Art: tileset sông, 3 skin thúng (thúng tròn nên xoay bằng shader, chỉ cần vẽ hoạt ảnh chèo 8 khung), hộp bùa, hiệu ứng | 3 tuần |
| Âm thanh + nhạc | 1 tuần (outsource) |
| Cân bằng + playtest | 2 tuần |
| **Tổng** | **~6–7 tuần lịch** (làm song song) |

### Câu hỏi cần trả lời trong playtest greybox (5 buổi, mỗi buổi 5 người)
1. Người mới có tự hiểu “chèo xen kẽ = đi thẳng” trong 30 giây đầu mà không cần chữ không?
2. Thúng xoay tròn có buồn cười hay gây bực? Theo dõi nét mặt, câu nói.
3. Chèo Đôi có quá mạnh so với chèo xen kẽ không? Người giỏi phải nhanh hơn rõ rệt.
4. Trên điện thoại 6 inch, hai nút có che mất đường đua không?
5. Sau trận, bao nhiêu người muốn đua lại ngay?
