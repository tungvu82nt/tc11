# The Unseen Journey - Dự án Nhận thức về Sức khỏe Tâm thần

## Tổng quan

Đây là một dự án web về sức khỏe tâm thần, tập trung vào việc nâng cao nhận thức về trầm cảm và cung cấp các giải pháp thực tế. Dự án được xây dựng với mục tiêu giúp người dùng nhận biết các dấu hiệu trầm cảm và tìm kiếm sự hỗ trợ phù hợp.

## Mục tiêu chính

- Nâng cao nhận thức về các dấu hiệu và triệu chứng của trầm cảm
- Cung cấp thông tin về các giải pháp và phương pháp hỗ trợ
- Giúp người dùng hiểu rằng họ không đơn độc trong cuộc chiến này
- Khuyến khích việc chia sẻ và tìm kiếm sự giúp đỡ

## Công nghệ sử dụng

- **Frontend Framework**: React 18.3.1 với TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Framework**: shadcn/ui với Radix UI components
- **Styling**: Tailwind CSS với Tailwind CSS Animate
- **Icons**: Lucide React
- **State Management**: React Hook Form với Zod validation
- **Routing**: React Router DOM 6.30.1

## Cấu trúc dự án

```
src/
├── components/          # Các component UI
│   ├── ui/             # UI components từ shadcn/ui
│   ├── Hero.tsx        # Component hero section
│   ├── ContentSection.tsx  # Component cho các phần nội dung
│   ├── ProblemSolutionSection.tsx  # Component chính hiển thị vấn đề và giải pháp xen kẽ
│   └── ...
├── pages/              # Các trang của ứng dụng
│   ├── Index.tsx       # Trang chính
│   └── NotFound.tsx    # Trang 404
├── hooks/              # Custom hooks
├── lib/                # Utility functions
└── assets/             # Tài nguyên tĩnh
```

## Tính năng chính

### 1. Hero Section
- Giới thiệu tổng quan về dự án
- Thiết kế hấp dẫn với hình ảnh phù hợp

### 2. Nội dung giáo dục
- Giải thích về bản chất của trầm cảm
- Phân tích các yếu tố gây ra trầm cảm
- Thông tin về xu hướng trầm cảm ở giới trẻ

### 3. ProblemSolutionSection
- Hiển thị các vấn đề (biểu hiện) và giải pháp tương ứng một cách xen kẽ
- 5 cặp vấn đề-giải pháp chính:
  - Mất hứng thú và Tê liệt cảm xúc ↔ Tập thể dục đều đặn
  - Mất hy vọng và Thu mình ↔ Liệu pháp Nhận thức Hành vi (CBT)
  - Thay đổi cảm xúc và Giảm tập trung ↔ Thiền và Chánh niệm
  - Tự ti sâu sắc ↔ Kết nối xã hội
  - Rối loạn cơ thể ↔ Chế độ ăn uống lành mạnh

### 4. Thiết kế responsive
- Tối ưu cho cả thiết bị di động và máy tính để bàn
- Sử dụng Tailwind CSS cho thiết kế linh hoạt

### 5. Animation và Interaction
- Sử dụng Tailwind CSS Animate cho các hiệu ứng chuyển động
- Hover effects trên các cards
- Animation cho icons và các elements quan trọng

## Điểm nổi bật về UI/UX

- Sử dụng color scheme phù hợp với chủ đề sức khỏe tâm thần
- Typography rõ ràng, dễ đọc
- Cards với border colors khác nhau để phân biệt giữa vấn đề (đỏ) và giải pháp (xanh)
- Layout grid responsive cho các cặp vấn đề-giải pháp
- Visual elements kết nối giữa các cards

## Thông điệp chính

"Hành trình phục hồi cần thời gian và sự kiên nhẫn. Đừng ngần ngại chia sẻ cùng những người bạn tin tưởng và lắng nghe bạn. Chăm sóc sức khỏe tinh thần cũng quan trọng như chăm sóc sức khỏe thể chất."

## Cài đặt và chạy dự án

1. Clone repository:
```bash
git clone <YOUR_GIT_URL>
cd the-unseen-journey-main
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm run dev
```

4. Mở http://localhost:8080/ trên trình duyệt

## Build và Deploy

- Build cho production: `npm run build`
- Preview build: `npm run preview`
- Deploy: Có thể deploy lên các platform như Vercel, Netlify, hoặc sử dụng Lovable để deploy

## Đóng góp và phát triển tương lai

- Thêm các bài kiểm tra tự đánh giá trầm cảm
- Tích hợp chức năng tìm kiếm chuyên gia tâm lý
- Thêm các tài nguyên và bài viết chuyên sâu
- Xây dựng cộng đồng hỗ trợ trực tuyến
- Phát triển ứng dụng di động đi kèm

## Lưu ý quan trọng

Dự án này không thay thế cho việc chẩn đoán y tế chuyên nghiệp. Nếu bạn hoặc người thân đang gặp khó khăn về sức khỏe tâm thần, hãy tìm kiếm sự giúp đỡ từ chuyên gia.

## Liên hệ và hỗ trợ

Để biết thêm thông tin hoặc hỗ trợ, vui lòng liên hệ qua [thông tin liên hệ của dự án].

---

*Được tạo với mục tiêu nâng cao nhận thức và hỗ trợ cộng đồng về sức khỏe tâm thần.*