# Hiring Management Hub - Lark Workplace Block

Lark Workplace Block mini-app cho quản lý tuyển dụng, xây dựng với React/TypeScript (web preview) và native Lark Block format (ttml/ttss/js/json).

## Thông tin Lark App

| Item | Value |
|------|-------|
| **Lark App ID** | `cli_a92ec64c69b8ded1` |
| **Lark App Secret** | `nc38AkRSSAwrxLXM6KEEDfiIDUNhC4eu` |
| **Block Type ID** | `blk_69a47a51c8800ede6d63de15` |
| **Block Type** | Non-standard Workplace Block |

## Tech Stack

| Layer | Tech |
|-------|------|
| Web Preview | React 18 + TypeScript + Vite 6 + Tailwind CSS |
| Lark Block Runtime | Native (ttml/ttss/js/json) - mini-program format |
| Design System | Kinetic Polaris (Shopify Polaris style) |
| Icons | Material Symbols Outlined |

## Project Structure

```
hrm-lark-miniapp/
├── lark-block/                 ← Lark Block native project (DEPLOY)
│   ├── project.config.json     ← IDE project config
│   ├── app.json                ← Global app config
│   ├── app.js                  ← App entry
│   ├── app.ttss                ← Global styles
│   ├── sitemap.json
│   ├── pages/
│   │   └── index/              ← Main page (ttml/ttss/js/json)
│   └── components/             ← 6 native components
│       ├── top-app-bar/
│       ├── search-filter/
│       ├── job-order-card/
│       ├── status-badge/
│       ├── bottom-nav/
│       └── empty-state/
├── src/                        ← React web preview source
│   ├── components/             ← 7 React components
│   ├── pages/                  ← React pages
│   ├── services/               ← API + mock data
│   ── types/                  ← TypeScript types
├── block/                      ← Legacy Block entry files
── assets/                     ← Design assets (Stitch)
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Quick Start

### Web Preview (Development)

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

### Lark Block Development

1. Cài đặt [Lark Developer Tools](https://open.larksuite.com/document/uYjL24iN/ucDOzYjL3gzM24yN4MjN) (v2.1+)
2. Mở Lark Developer Tools → Login (Lark environment)
3. Chọn **Extensions** → **Blocks** → **+** (tạo project mới)
4. Nhập thông tin:
   - **AppID**: `cli_a92ec64c69b8ded1`
   - **BlockTypeID**: `blk_69a47a51c8800ede6d63de15`
5. Import folder `lark-block/` làm project source

## Deploy lên Lark Block

### Bước 1: Upload qua Lark Developer Tools

1. Mở project trong Lark Developer Tools
2. Click **Upload** (góc trên phải)
3. Xác nhận thông tin block → Upload
4. Sau khi upload thành công, tools sẽ redirect tới Developer Console

### Bước 2: Cấu hình trên Developer Console

1. Truy cập [Lark Developer Console](https://open.larksuite.com/app)
2. Chọn app `cli_a92ec64c69b8ded1`
3. Vào **Features** → **Block** → chọn block
4. Cấu hình:
   - **Block fit type**: Non-standard block
   - **Block settings**: Enable nếu cần (tùy chọn)
   - Điền thông tin block (tên, mô tả, icon)

### Bước 3: Publish

1. Vào **Version Management & Release**
2. Chọn version vừa upload
3. Điền version info → Submit
4. Admin tenant review → Approve → Block active

### Bước 4: Sử dụng trên Workplace

**Non-standard block** (container size tùy chỉnh):
- Admin: Admin Console → Workplace → Custom Workplaces → Custom Workplace editor → Add block
- Block hiển thị ở bất kỳ khu vực nào của Custom Workplace (trừ My Favorites)

## Design System: Kinetic Polaris

Dựa trên Shopify Polaris, tùy biến cho HR management:

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#303030` | Buttons, headings |
| Secondary | `#0055c7` | Links, active states |
| Tertiary | `#9f269f` | AI features |
| Background | `#fbf9f8` | Page bg |
| Surface | `#ffffff` | Cards |
| Border | `#e3e3e3` | Card borders |
| Success | `#e6feda` / `#014b40` | Approved |
| Warning | `#fff3e0` / `#8a3a00` | Pending |
| Critical | `#ffecef` / `#8e0b21` | Rejected |

**Typography**: Inter font (body: 450, heading: 650)
**Spacing**: 4px base unit grid (rpx in native)
**Radius**: 8px buttons/inputs, 12px cards, full pill badges

## Screens

### Danh sách yêu cầu tuyển dụng (Recruitment Request List)

- **TopAppBar**: Title "Tuyển dụng" + menu/overflow
- **SearchBar**: Tìm kiếm vị trí, người yêu cầu + tune icon
- **Tabs**: Đang xử lý | Đã duyệt | CC cho tôi (3) | Đã từ chối
- **Filters**: Dropdown Phòng ban + Sort order
- **JobOrderCard**: Title, status badge, department, level, count, requester (avatar + name), date
- **BottomNav**: Yêu cầu | Tuyển dụng | Báo cáo

## API Integration

Trong production, thay thế `mockData.ts` bằng Lark Block SDK calls:

```js
// Lark Block SDK request
const data = await window.lark.jssdk.request({
  url: '/api/recruitment/job-orders',
  method: 'GET',
  data: { status: 'approved', page: 1 },
})
```

## License

MIT
