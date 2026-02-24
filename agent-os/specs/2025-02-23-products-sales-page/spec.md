# Specification: Products & Sales Performance Page

## Goal

Deliver a dedicated Products page that shows product list and sales performance (revenue share, units, revenue, AOV, return rate) with summary cards, sortable/filterable table, and search—using mock data and matching existing dashboard layout. Add a "Products" link in the sidebar under Overview.

## User Stories

- As an investor, I want to view a dedicated Products page with summary metrics and a full product table so that I can understand product mix and sales performance at a glance.
- As an investor, I want to sort, filter, and search the product table so that I can find and compare products quickly.

## Specific Requirements

**Route and layout**
- Add route `/products` with a page that uses `DashboardLayout` with title "Products" and breadcrumbs `Dashboard` → `Products`.
- Use the same header (sidebar trigger, breadcrumb), main content area (max-w-7xl, p-6), and h1 styling as other dashboard pages (e.g. YTD, Dashboard).

**Sidebar navigation**
- Add a "Products" nav item under the existing "Overview" group in `app-sidebar.tsx`.
- Use the same pattern as other nav items: `title`, `href: "/products"`, and an appropriate Lucide icon (e.g. Package or ShoppingBag); render with `SidebarMenuButton` + `Link`, `isActive` from pathname.

**Summary cards**
- Place summary cards at the top of the page content, in a responsive grid (e.g. gap-4 sm:grid-cols-3 or similar to YTD).
- At least: total revenue (all products), total units sold, and number of products. Use `Card`, `CardHeader`, `CardTitle`, `CardDescription`, and `CardContent` consistent with YTD summary cards; derive values from the same product dataset used for the table.

**Product table and data**
- Reuse or extend the existing `ProductTable` component so the Products page shows the same columns: Product (name + SKU), Revenue Share (with bar), Units Sold, Revenue, AOV, Return Rate.
- Feed the table from `ProductPerformance[]`; for this spec use mock data only (e.g. `productPerformance` from `lib/mock-data.ts` or products returned by `getOverviewData()`).
- Keep the existing `ProductPerformance` type and formatting (currency, numeric) so the overview and Products page stay consistent.

**Sorting**
- Make table columns sortable (e.g. clickable column headers). Support at least: Product name, Revenue Share, Units Sold, Revenue, AOV, Return Rate.
- Indicate sort direction (e.g. ascending/descending) and which column is sorted; keep sort state local to the page or table (client-side only for mock data).

**Filtering**
- Provide filter controls that narrow the table by at least one dimension (e.g. by product name or a simple category if the data supports it). If the current mock data has no categories, a minimal filter (e.g. by return-rate band or revenue band) or a "filter by search" approach is acceptable.
- Filters and sort should work together; show only rows matching the current filter, then apply sort.

**Search**
- Add a search input (e.g. by product name or SKU) that filters table rows in real time; use existing `Input` from `@/components/ui/input` and place it above or beside the table in a clear, accessible way.
- Search is client-side only; combine with sorting and any other filters so the table reflects search + filter + sort.

**Accessibility and responsiveness**
- Use semantic table markup; ensure sort/filter/search controls have clear labels and work with keyboard and screen readers per project accessibility standards.
- Layout and cards should behave well on small screens (stack or responsive grid as on YTD/Dashboard).

**Frontend standards**
- Follow project frontend component standards: single responsibility, composability, clear props. Prefer extending or composing existing components (ProductTable, Card, Table) over duplicating logic.
- Use existing design tokens and color scheme (e.g. primary, muted-foreground, Card styling); no new one-off styles.

## Visual Design

No mockups provided. Follow existing dashboard patterns: same header and breadcrumb placement, same card and table styling as Dashboard and YTD pages.

## Existing Code to Leverage

**`components/dashboard/dashboard-layout.tsx`**
- Use for the Products page: wrap content with `DashboardLayout` and pass `title="Products"` and `breadcrumbs={[{ label: "Products" }]}` so header and main layout match other pages.

**`components/dashboard/product-table.tsx`**
- Reuse or extend for the product list; it already renders Product (name + SKU), Revenue Share (RevenueBar), Units Sold, Revenue, AOV, Return Rate. Add sortable headers and accept filtered/sorted `ProductPerformance[]`; optionally support a "compact" or "full" variant if the overview should stay simpler.

**`components/dashboard/app-sidebar.tsx`**
- Add a new entry to the `navItems` array with title "Products", href "/products", and an icon; keep it in the Overview group so the sidebar renders the link with the same pattern as Dashboard, YTD, etc.

**`lib/mock-data.ts` and `lib/types.ts`**
- Use `productPerformance` (or products from `getOverviewData()`) as the data source; use `ProductPerformance` type for props and derived summary stats. No new types required unless extending for filters.

**YTD page summary cards (`app/ytd/page.tsx`)**
- Reuse the Card structure (Card, CardHeader, CardTitle, CardDescription, CardContent) and grid layout for the top summary cards; compute totals from the product list (sum of revenue, sum of unitsSold, products.length).

## Out of Scope

- Product detail pages or drill-down into a single product.
- Editing, creating, or deleting products.
- Date-range or time-period filters for the product data.
- Export to CSV or Excel.
- Zoho or any live API integration; data is mock only for this spec.
- Server-side sorting, filtering, or search (all client-side for this spec).
- New backend routes or database changes.
- Changes to the overview page table behavior beyond any shared component updates (e.g. ProductTable remaining usable on Dashboard).
