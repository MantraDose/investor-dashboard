# Specification: Zoho Inventory Integration for Dashboard Overview

## Goal

Integrate with Zoho Inventory so the dashboard Overview page is populated with real company-wide data (revenue, units, AOV, product performance), via a server-side API layer that returns data in existing types; investor scoping is deferred until authentication exists.

## User Stories

- As a company stakeholder, I want the Overview page to show live revenue, units, AOV, and product performance from Zoho Inventory so that the dashboard reflects actual business data.
- As a developer, I want the integration to use existing `lib/types.ts` shapes and current Overview components so that we swap data source with minimal UI change.

## Specific Requirements

**Zoho Inventory as primary data source**
- Use Zoho Inventory only for this spec; design so additional Zoho products can be added later.
- Fetch company-wide (single-tenant) data; no per-investor filtering in this phase.
- Server-side only; no Zoho credentials or tokens exposed to the client.

**API layer**
- Add Next.js API routes (or equivalent serverless endpoints) that the Overview page can call for metrics and product performance.
- No existing API layer in the repo; introduce a clear pattern (e.g. `app/api/` or route handlers) consistent with Next.js App Router.
- Each endpoint returns JSON that conforms to existing types in `lib/types.ts` (e.g. `MetricCardData[]`, `ProductPerformance[]`).

**Authentication and configuration**
- Authenticate to Zoho using server-to-server approach (e.g. OAuth2 client credentials or API token as appropriate for Zoho Inventory).
- Store credentials in environment variables; document required env vars (e.g. `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, or token) without default/placeholder values in code.
- No auth UI in this spec; integration is backend-only.

**Data mapping**
- Map Zoho Inventory data (sales, orders, items/products) to `MetricCardData` for YTD Revenue, Units Sold, and Avg Order Value; derive trends/sparklines from available time-series or aggregates where Zoho provides them.
- Map Zoho Inventory products/items and sales data to `ProductPerformance` (id, name, sku, revenueShare, unitsSold, revenue, avgOrderValue, returnRate); compute revenue share and return rate from aggregates if not provided by Zoho.
- YTD Dividends and dividend highlight may continue to use mock or a single company-wide value for v1; dividend calculation/ownership is out of scope until auth exists.

**Overview page consumption**
- Update the Overview page (`app/page.tsx`) to fetch from the new API when available; keep fallback to `lib/mock-data` when API is unavailable or fails (e.g. env not set, Zoho error).
- Do not change component props or `lib/types.ts` for the Overview metrics and product table; keep `DividendHighlight`, `MetricCard`, and `ProductTable` usage as-is with the same types.
- Marketing cards (Omnisend, Facebook Ads) remain on mock data for this spec.

**Error and loading behavior**
- Handle Zoho API errors and timeouts gracefully; surface a simple error state or fallback to mock so the Overview page still renders.
- Avoid exposing Zoho-specific error messages or credentials to the client; log details server-side only.

**Extensibility**
- Structure the Zoho client or service so that additional Zoho products (e.g. Zoho Books) can be added later without reworking the API surface for the frontend.
- Keep API response shapes stable so future investor-scoping only changes where data is filtered, not the contract.

## Visual Design

No visual assets provided. Follow existing Overview layout and components (`DashboardLayout`, `DividendHighlight`, metric cards grid, `ProductTable`, marketing cards) and application styling (Tailwind, existing UI components).

## Existing Code to Leverage

**`lib/types.ts`**
- Use `MetricCardData`, `ProductPerformance`, and `DividendData` as the canonical response shapes for API responses; do not duplicate or alter these types for the integration.
- Format values (e.g. currency, percentages) in API or in the same way current mock data does so that existing components render correctly.

**`app/page.tsx` (Overview)**
- Keep the same structure: `DashboardLayout`, `DividendHighlight`, metric cards grid, `ProductTable`, marketing cards.
- Replace direct imports from `lib/mock-data` for metrics and product performance with data fetched from the new API, with fallback to mock; leave dividend and marketing data sources unchanged for this spec.

**`lib/mock-data.ts`**
- Reuse as fallback when the API is unavailable or errors; preserve exports `dashboardMetrics`, `productPerformance`, and `currentDividend` so the fallback path has the same types and structure.
- Use as reference for the exact shape of `MetricCardData` (labels, value format, trend, sparkline, subtitle) and `ProductPerformance` (fields and units) when mapping from Zoho.

**`components/dashboard/metric-card.tsx`, `product-table.tsx`, `dividend-highlight.tsx`**
- Consume data from the Overview page as today; no prop or interface changes required; ensure API-returned data matches these components’ expectations (e.g. `value` as string or number, `trend.direction`, `sparkline` array).

**`components/dashboard/dashboard-layout.tsx`**
- No changes; Overview continues to render inside `DashboardLayout` with title "Overview".

## Out of Scope

- Investor-scoped or per-user data filtering; company-wide data only for v1.
- Authentication and investor identity (login, session); deferred to roadmap.
- Marketing/Omnisend/Facebook Ads or any non–Zoho Inventory data source in this spec.
- Zoho Books, Zoho CRM, Zoho Analytics, or other Zoho products; only Zoho Inventory in scope.
- Write-back or mutations to Zoho (create/update orders, items, etc.).
- New UI for configuration or Zoho setup; credentials via env only.
- Changes to YTD/Historical/Marketing/Settings pages or their data sources.
- Database or persistent cache layer; in-memory or request-scoped caching is acceptable if needed for performance.
