# Mantra Dashboard (MantraDose Investor Portal)

An investor dashboard that helps shareholders in MantraDose track company performance and their dividends by providing a single place to view revenue, product performance, marketing metrics, and dividend history—all scoped to their ownership.

## Features

- **Overview** — At-a-glance YTD dividend, revenue, units sold, average order value, and total dividends with sparklines and trends.
- **Product performance** — Table of products (e.g. Gummy, Bars, Capsules) with revenue share, units sold, revenue, AOV, and return rate.
- **YTD performance** — YTD revenue, orders, and AOV with prior-year comparison; monthly revenue and order charts; dividend history (paid / pending / scheduled).
- **Marketing & Ads** — Email (Omnisend) and Facebook Ads metrics, funnel and revenue-by-source views (planned with real data).
- **Historical data** — Multi-year revenue and dividend growth, AOV trend, and year-over-year comparison.
- **Settings & profile** — Account and investor profile, investment summary, cap table view, and notification preferences (planned).

## Tech stack

- **Framework:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4, Radix UI, shadcn/ui-style components
- **Charts:** Recharts
- **Forms & validation:** react-hook-form, Zod, @hookform/resolvers
- **Theming:** next-themes (light/dark)
- **Package manager:** pnpm

Data is currently served from in-app mock data (`lib/mock-data.ts`). Backend, API, and authentication are planned (see Roadmap).

## Prerequisites

- Node.js 18+ (or 20+ recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

## Getting started

```bash
# Clone the repository
git clone <repository-url>
cd mantra-dashboard

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Script   | Description              |
|----------|--------------------------|
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

## Project structure

| Directory      | Purpose                                      |
|----------------|----------------------------------------------|
| `app/`         | Next.js App Router pages and layout          |
| `components/`  | React components (dashboard + shared UI)     |
| `lib/`         | Utilities, types, and mock data              |
| `hooks/`       | Custom React hooks                           |
| `public/`      | Static assets                                |

## Environment

No environment variables are required for local development with mock data. Copy `.env.example` to `.env.local` and fill in values if you want the Overview page to use live Zoho Inventory data.

**Zoho Inventory (optional):** When set, the Overview page fetches metrics and product performance from Zoho Inventory. When unset or when Zoho fails, the app falls back to mock data.

| Variable | Description |
|----------|-------------|
| `ZOHO_CLIENT_ID` | OAuth client ID from [Zoho Developer Console](https://accounts.zoho.com/developerconsole) |
| `ZOHO_CLIENT_SECRET` | OAuth client secret |
| `ZOHO_REFRESH_TOKEN` | Refresh token (use `access_type=offline` when authorizing) |
| `ZOHO_ORGANIZATION_ID` | Your Zoho Inventory organization ID (required for API calls) |
| `ZOHO_DC` | Data center: `com`, `eu`, `in`, `com.au`, or `ca` (default: `com`) |

Do not commit `.env.local` or any file containing real credentials.

## Deployment

### GitHub

The project is configured to use the **MantraDose/investor-dashboard** repository:

```bash
# Remote is already set. If you need to set it:
git remote add origin git@github.com:MantraDose/investor-dashboard.git

# After your first commit, push (ensure the repo exists on GitHub and you have access):
git push -u origin main
```

If you use HTTPS instead of SSH: `https://github.com/MantraDose/investor-dashboard.git`

### Vercel (first-time deploy)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** → **Project** and import **MantraDose/investor-dashboard**.
3. Vercel will detect Next.js; keep the default settings (Framework: Next.js, Build Command: `pnpm build`, Output Directory: `.next`).
4. Click **Deploy**. Each push to `main` will trigger a new deployment.
5. Optional: add `@vercel/analytics` for analytics.

## Roadmap

- Authentication & investor identity
- API and data layer for dashboard metrics
- Overview, YTD, Historical, and Marketing pages on real data
- Settings: profile, cap table, and notification preferences

See `agent-os/product/roadmap.md` for the full roadmap.

## License

Private — MantraDose.
