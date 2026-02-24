# Spec Requirements: Products & Sales Performance Page

## Initial Description

We need to design and build a page showing our products and their sales performance. We also need to add a 'Products' link in the sidebar nav.

- Let's start with the front-end first, and integrate our Zoho data later.
- Let's keep the frontend skills in-mind when building our design.
- Let's replicate other pages in the dashboard when considering the page's layout. Headers in the same place... Color schema, etc.

## Requirements Discussion

### First Round Questions

**Q1:** I'm assuming the Products page will show a product list with sales metrics (e.g. name, SKU, revenue share, units sold, revenue, AOV, return rate) and that we'll add a single "Products" nav item to the sidebar under the existing "Overview" group. Is that correct, or do you want a different grouping (e.g. its own "Products" section) or different metrics?

**Answer:** Your assumption is correct.

**Q2:** The Dashboard overview already has a ProductTable with ProductPerformance data. Should the new Products page reuse that same table component and data shape (so the page is "the full product performance view" and the overview keeps a smaller version), or do you want a separate table/layout only on the Products page?

**Answer:** We can start with the same table and add more details if needed later.

**Q3:** I'm assuming we use the same DashboardLayout with title "Products" (or "Products & Sales"), same header (sidebar trigger + breadcrumb: Dashboard → Products), and same main content area (max-width, padding, h1 then content). Confirm if that's the pattern, or if you want a different title/breadcrumb.

**Answer:** Confirmed.

**Q4:** Should the page be table-only, or do you want summary cards at the top (e.g. total revenue, total units, number of products) to match the YTD/Dashboard card pattern?

**Answer:** Add summary cards at the top.

**Q5:** For the frontend-first version, should we include sortable columns and/or basic search/filter (e.g. by product name), or keep it a static table and add sorting/filter when we hook up Zoho?

**Answer:** Let's build the sorting/filtering and search now.

**Q6:** I'm assuming we'll feed the table from mock data (e.g. existing productPerformance in lib/mock-data.ts) for now and swap to Zoho-backed API in a later spec. Is that the plan?

**Answer:** Yes, use the mock data table.

**Q7:** Should we explicitly leave out for now: product detail pages, editing products, date-range filters, and export (CSV/Excel)?

**Answer:** Sounds good to me.

### Existing Code to Reference

Identified from the requirements discussion (reuse same table, replicate other pages, DashboardLayout):

**Similar Features Identified:**
- Feature: Dashboard overview with product performance — Path: `app/page.tsx`, `components/dashboard/product-table.tsx`
- Components to potentially reuse: `ProductTable`, `DashboardLayout`, `MetricCard` (or similar Card pattern for summary stats), table UI from shadcn
- Backend logic to reference: `getOverviewData` (or equivalent data getter for products), `lib/mock-data.ts` (`productPerformance`), `lib/types.ts` (`ProductPerformance` type)
- Sidebar nav: `components/dashboard/app-sidebar.tsx` — add new nav item under Overview group

## Visual Assets

### Files Provided:

No visual assets provided.

### Visual Insights:

N/A — no visuals to analyze.

## Requirements Summary

### Functional Requirements

- **Products page:** A dedicated route (e.g. `/products`) showing products and their sales performance.
- **Sidebar:** Add a "Products" link in the sidebar nav under the existing Overview group.
- **Layout:** Use `DashboardLayout` with title "Products" (or "Products & Sales"), same header (sidebar trigger + breadcrumb: Dashboard → Products), same main content area and styling as other dashboard pages.
- **Summary cards:** Summary cards at the top (e.g. total revenue, total units, number of products) consistent with YTD/Dashboard card pattern.
- **Table:** Reuse the same product table component and `ProductPerformance` data shape; can extend with more details later.
- **Sorting/filtering and search:** Build sortable columns, filtering, and search (e.g. by product name) in this frontend-first phase.
- **Data source:** Use mock data (`productPerformance` from `lib/mock-data.ts`) for now; Zoho integration later.

### Reusability Opportunities

- Reuse `ProductTable` (or extend it) for the products list.
- Reuse `DashboardLayout` and breadcrumb/header pattern.
- Reuse Card components and styling for summary cards (e.g. from YTD or Dashboard).
- Reuse `ProductPerformance` type and mock data from `lib/mock-data.ts`.
- Add nav item in `app-sidebar.tsx` following existing `navItems` pattern (icon, title, href).

### Scope Boundaries

**In Scope:**
- Products page with summary cards + product table
- "Products" sidebar link under Overview
- Sortable columns, filtering, and search on the table
- Mock data only (no Zoho in this spec)

**Out of Scope:**
- Product detail pages
- Editing products
- Date-range filters
- Export (CSV/Excel)
- Zoho/data API integration

### Technical Considerations

- Next.js App Router; new page under `app/products/page.tsx` (or equivalent).
- Match existing stack: React 19, Tailwind, shadcn (Table, Card, etc.), Lucide icons.
- Follow frontend component standards: single responsibility, composability, clear props.
- Adhere to existing layout and color scheme (DashboardLayout, header, breadcrumbs).
- Table interactivity: implement sorting (column headers), filter controls, and search input; keep state local to the page or table component as appropriate.
