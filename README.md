# Happy Fashion

Handcrafted leather bags e-commerce site.

## Tech Stack
- **Next.js 15** (static export with `output: "export"`)
- **Tailwind CSS 3** (pure CSS, no PostCSS/Tailwind 4 conflicts)
- **Supabase** (backend: products, orders, admin auth)
- **Razorpay** (online payments, test mode)
- **Cloudflare Pages** (hosting, static export)

## Build & Deploy

### Local Development
```bash
npm install
npm run dev
# http://localhost:3000
```

### Local Build Test
```bash
npm run build
# Output goes to /out directory
```

### Deploy to Cloudflare Pages

1. Push to GitHub
2. Go to [Cloudflare Pages](https://dash.cloudflare.com/)
3. Create new project → import from GitHub
4. Framework preset: **Next.js (Static HTML Export)**
5. Build command: `npm run build`
6. Output directory: `out`
7. Set environment variables (from `.env.example`)

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (client-safe) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay publishable key (test mode) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for orders |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | Instagram handle |

## Features
- Product catalog with category filtering + search
- Product detail pages (pre-rendered at build)
- Cart with persistent localStorage
- Checkout with Razorpay online payment + WhatsApp fallback
- Admin panel (client-side auth)
- Responsive design
- Instagram-style gallery
