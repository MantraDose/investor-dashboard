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

No environment variables are required for local development with mock data. When the API and auth are added, variables (e.g. `NEXT_PUBLIC_*`, API keys) will be documented here or in `.env.example`.

## Deployment

The app is suitable for deployment on [Vercel](https://vercel.com/) (or similar). Analytics can be enabled via `@vercel/analytics`.

## Roadmap

- Authentication & investor identity
- API and data layer for dashboard metrics
- Overview, YTD, Historical, and Marketing pages on real data
- Settings: profile, cap table, and notification preferences

See `agent-os/product/roadmap.md` for the full roadmap.

## License

Private — MantraDose.
