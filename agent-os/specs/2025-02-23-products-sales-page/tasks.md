# Task Breakdown: Products & Sales Performance Page

## Overview

Total Tasks: 4 groups (navigation & shell, page content, table interactivity, polish). Frontend-only; mock data; no database or API changes.

## Task List

### Navigation & Page Shell

#### Task Group 1: Route, layout, and sidebar
**Dependencies:** None

- [x] 1.0 Complete navigation and page shell
  - [x] 1.1 Add "Products" to sidebar nav
    - In `components/dashboard/app-sidebar.tsx`, add entry to `navItems`: title "Products", href "/products", icon (e.g. Package or ShoppingBag from Lucide)
    - Keep in Overview group; use same SidebarMenuButton + Link pattern and isActive from pathname
  - [x] 1.2 Create Products page route
    - Add `app/products/page.tsx` (or `app/products/page.ts` for RSC if preferred)
    - Wrap content with `DashboardLayout` with title "Products" and breadcrumbs `[{ label: "Products" }]`
    - Use same main structure as other dashboard pages (header, breadcrumb, h1, content area)
  - [x] 1.3 Verify navigation and layout
    - Navigate to /products and confirm sidebar link is visible and active on the Products page
    - Confirm breadcrumb shows Dashboard → Products and header/layout match YTD or Dashboard

**Acceptance Criteria:**
- "Products" link appears in sidebar under Overview and routes to /products
- Products page uses DashboardLayout with correct title and breadcrumbs
- Page shell matches existing dashboard pages (header, max-w-7xl, p-6, h1)

---

### Page Content

#### Task Group 2: Summary cards and product data
**Dependencies:** Task Group 1

- [x] 2.0 Complete summary cards and data wiring
  - [x] 2.1 Load product data on the Products page
    - Use `productPerformance` from `lib/mock-data.ts` or products from `getOverviewData()`; type as `ProductPerformance[]`
    - If page is client component, fetch or import mock data; if server component, call getter and pass to client section or use in same page
  - [x] 2.2 Add summary cards at top of page content
    - Responsive grid (e.g. gap-4 sm:grid-cols-3) matching YTD pattern
    - Three cards: Total Revenue (sum of product revenue), Total Units Sold (sum of unitsSold), Number of Products (products.length)
    - Use Card, CardHeader, CardTitle, CardDescription, CardContent; format currency/numbers consistently with existing pages
  - [x] 2.3 Render product table below summary cards
    - Reuse existing `ProductTable` from `components/dashboard/product-table.tsx`; pass the same product array (before any client-side sort/filter/search)
    - Ensure columns match spec: Product (name + SKU), Revenue Share (bar), Units Sold, Revenue, AOV, Return Rate
  - [x] 2.4 Verify summary and table
    - Confirm totals in cards match the data in the table; confirm table renders all mock products with correct formatting

**Acceptance Criteria:**
- Summary cards show total revenue, total units sold, and product count derived from product data
- ProductTable displays all products with correct columns and formatting
- Layout and card styling match YTD/Dashboard

---

### Table Interactivity

#### Task Group 3: Sort, filter, and search
**Dependencies:** Task Group 2

- [x] 3.0 Complete sort, filter, and search
  - [x] 3.1 Add search input
    - Place above or beside the table; use `Input` from `@/components/ui/input`
    - Filter rows by product name and/or SKU in real time (client-side); debounce optional
    - Accessible label (e.g. "Search products" or aria-label)
  - [x] 3.2 Add sortable column headers
    - Extend ProductTable (or add a wrapper) so column headers for Product name, Revenue Share, Units Sold, Revenue, AOV, Return Rate are clickable
    - Track sort column and direction (asc/desc); sort the displayed rows client-side
    - Indicate current sort column and direction (e.g. chevron or "Sorted by X")
  - [x] 3.3 Add at least one filter control
    - Option A: Search acts as the primary filter (search + sort only)
    - Option B: Add a simple filter (e.g. by return-rate band or revenue band) if data supports it; combine with search and sort
    - Ensure filter + search + sort work together: apply filter/search first, then sort the result set
  - [x] 3.4 Wire data flow
    - Single source of product list; apply search then filter (if any) then sort; pass resulting array to ProductTable
    - Keep state local (page or dedicated client component); no URL state required for this spec
  - [x] 3.5 Verify interactivity
    - Test search narrows rows; sort changes order; filter (if implemented) narrows rows; combinations work correctly

**Acceptance Criteria:**
- Search filters table by product name and/or SKU in real time
- All specified columns are sortable with visible sort state
- At least one filter dimension or search-only filtering; filter/sort/search work together
- ProductTable (or extended version) still works on Dashboard overview without regression

---

### Polish

#### Task Group 4: Accessibility and responsiveness
**Dependencies:** Task Group 3

- [x] 4.0 Complete polish
  - [x] 4.1 Accessibility
    - Semantic table markup (thead, tbody, th scope); ensure sort/filter/search controls have clear labels and are keyboard/screen-reader friendly per project accessibility standards
  - [x] 4.2 Responsiveness
    - Summary cards and table layout behave on small screens (stack or responsive grid as on YTD/Dashboard); search/filter controls usable on mobile
  - [x] 4.3 Frontend standards
    - Single responsibility, composability, clear props; reuse/extend ProductTable and Card; use existing design tokens and color scheme; no one-off styles
  - [x] 4.4 Final check
    - Quick pass: no regressions on Dashboard overview; Products page matches layout and styling of other dashboard pages

**Acceptance Criteria:**
- Sort/filter/search controls are labeled and keyboard/screen-reader usable
- Page is responsive; cards and table readable on small viewports
- Code follows project frontend component standards; Dashboard overview unchanged

---

### Testing (optional)

#### Task Group 5: Focused tests for this feature
**Dependencies:** Task Groups 1–4

- [ ] 5.0 Add minimal focused tests if applicable
  - [ ] 5.1 Identify test setup
    - If project has component or page tests (e.g. React Testing Library), add 2–8 focused tests for this feature only
    - Suggested: render Products page and check for title/breadcrumb; render with mock data and check summary card values or table row count; optional: search/sort behavior
  - [ ] 5.2 Write up to 2–8 tests
    - Limit to critical behaviors: page renders, summary reflects data, table shows rows, search or sort changes displayed rows
    - Skip exhaustive coverage of every control and edge case
  - [ ] 5.3 Run only feature-related tests
    - Run only the new tests for Products page; do not require full suite pass for this spec

**Acceptance Criteria:**
- If tests are added: 2–8 focused tests cover critical Products page behavior; they pass
- No requirement to run the entire application test suite for this spec

## Execution Order

Recommended sequence:
1. Task Group 1 — Navigation & page shell
2. Task Group 2 — Summary cards and product data
3. Task Group 3 — Sort, filter, and search
4. Task Group 4 — Polish
5. Task Group 5 — Optional focused tests

## Out of Scope (do not implement)

- Product detail pages; editing/creating/deleting products
- Date-range or time-period filters; export (CSV/Excel)
- Zoho or any API integration; server-side sort/filter/search
- New backend routes or database changes
- Changing Dashboard overview behavior beyond any shared ProductTable updates
