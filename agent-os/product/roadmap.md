# Product Roadmap

1. [ ] **Authentication & investor identity** — Investors can sign in and are identified by a stable account; session is used to scope all dashboard data to their ownership and profile. `S`
2. [ ] **API and data layer for dashboard metrics** — Backend (or integration layer) exposes revenue, product performance, dividends, and YTD/historical aggregates; frontend fetches from API instead of mock data. `M`
3. [ ] **Overview page on real data** — Dividend highlight, metric cards (YTD revenue, units, AOV, dividends) with trends/sparklines, and product performance table are loaded from API and render correctly for the logged-in investor. `S`
4. [ ] **YTD Performance page on real data** — YTD summary cards, monthly revenue and orders charts, and dividend history list with status (paid/pending/scheduled) are driven by API data. `S`
5. [ ] **Historical Data page on real data** — Investment summary, revenue & dividend growth charts, AOV trend, and year-over-year comparison table use real historical data and show investor-scoped dividends. `S`
6. [ ] **Marketing & Ads page on real data** — Omnisend (or equivalent) and Facebook Ads metrics, funnel charts, and revenue-by-source are loaded from API or external integrations and displayed on the Marketing page. `M`
7. [ ] **Settings: profile and cap table** — Account info, investment summary, and cap table are loaded from API; profile view is read-only or editable where product allows. `S`
8. [ ] **Notification preferences** — Investors can turn dividend notifications, monthly reports, and product-launch emails on/off; preferences are persisted and respected by notification jobs. `M`

> Notes
> - Order items by technical dependencies and product architecture
> - Each item should represent an end-to-end (frontend + backend) functional and testable feature
