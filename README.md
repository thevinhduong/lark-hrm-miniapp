# Hiring Management Hub - Lark Workplace Block

A Lark Workplace Block mini-app for HR recruitment management, built with React, TypeScript, and the Kinetic Polaris design system (Shopify Polaris style).

## Project Info

| Item | Value |
|------|-------|
| **Lark App ID** | `cli_a92ec64c69b8ded1` |
| **Block Type ID** | `blk_69a47a51c8800ede6d63de15` |
| **Block Type** | Non-standard Workplace Block |

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite 6
- **Styling**: Tailwind CSS 3 + PostCSS
- **Design System**: Kinetic Polaris (Shopify Polaris style)
- **Icons**: Material Symbols Outlined

## Project Structure

```
hrm-lark-miniapp/
├── block/                    # Lark Block runtime files
│   ├── app.json              # Block app configuration
│   ├── index.json            # Block component config
│   ├── index.tsx             # Block entry component
│   ── index.ttss            # Block styles
├── src/
│   ├── components/           # React UI components
│   │   ├── TopAppBar.tsx     # Top navigation bar
│   │   ├── SearchFilterSection.tsx  # Search + tabs + filters
│   │   ├── JobOrderCard.tsx  # Recruitment job order card
│   │   ├── StatusBadge.tsx   # Status indicator badge
│   │   ├── BottomNav.tsx     # Bottom navigation bar
│   │   ├── EmptyState.tsx    # Empty list state
│   │   └── LoadingSpinner.tsx # Loading indicator
│   ├── pages/
│   │   └── RecruitmentListPage.tsx  # Main page
│   ├── services/
│   │   ├── api.ts            # API service layer
│   │   └── mockData.ts       # Mock data
│   ├── types/
│   │   ├── recruitment.ts    # Domain types
│   │   └── lark.ts           # Lark Block SDK types
│   ├── App.tsx               # App root
│   ├── index.tsx             # Web entry point
│   ── index.css             # Global styles + design tokens
├── assets/                   # Design assets from Stitch
├── tailwind.config.ts        # Tailwind config (Kinetic Polaris)
├── vite.config.ts            # Vite build config
├── tsconfig.json             # TypeScript config
├── package.json
└── README.md
```

## Getting Started

### Development (Web)

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`

### Build

```bash
npm run build
```

### Production Preview

```bash
npm run preview
```

## Lark Block Development

### Prerequisites

1. Install [Lark Developer Tools](https://open.larksuite.com/document/uYjL24iN/ucDOzYjL3gzM24yN4MjN) (v2.1+)
2. Login with a user who has developer permissions for the app

### Creating the Block Project

1. Open Lark Developer Tools
2. Navigate to **Extensions** → **Blocks**
3. Click **+** to create a new block project
4. Fill in:
   - **AppID**: `cli_a92ec64c69b8ded1`
   - **BlockTypeID**: `blk_69a47a51c8800ede6d63de15`
5. Select the React/TypeScript template

### Publishing

1. In Lark Developer Tools, click **Upload** in the upper right
2. Go to Lark Open Platform → Developer Console
3. Select the uploaded block version
4. Fill in block configuration
5. Submit for admin review

## Design System: Kinetic Polaris

Based on Shopify Polaris with customizations for HR management:

- **Primary**: Ink Charcoal `#303030`
- **Secondary**: Interactive Indigo `#0055c7`
- **Tertiary**: Aura Amethyst `#9f269f`
- **Typography**: Inter (450 body, 650 headings)
- **Spacing**: 4px base unit grid
- **Cards**: White `#ffffff` on light gray `#f1f1f1`
- **Borders**: Hairline `0.66px` to `1px` solid `#e3e3e3`

## Screens

1. **Danh sách yêu cầu tuyển dụng** (Recruitment Request List)
   - Top app bar with title and menu
   - Search bar with filter icon
   - Tab navigation: Đang xử lý | Đã duyệt | CC cho tôi | Đã từ chối
   - Department and sort dropdowns
   - Job order cards with status badges
   - Bottom navigation: Yêu cầu | Tuyển dụng | Báo cáo

## License

MIT
