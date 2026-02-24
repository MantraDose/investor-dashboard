We're continuing our implementation of Zoho Inventory Integration for Dashboard Overview by implementing task group number 1:

## Implement this task and its sub-tasks:

#### Task Group 1: Zoho Client, Data Mapping, and API Routes

**Dependencies:** None

- [ ] 1.0 Complete Zoho integration and API layer
  - [ ] 1.1 Write 2–8 focused tests for API and mapping behavior
    - Limit to 2–8 tests maximum (e.g. API route returns correct shape, mapping produces valid MetricCardData/ProductPerformance, fallback or error response when Zoho fails)
    - Test only critical paths: successful response shape, error/fallback behavior
    - Skip exhaustive coverage of every Zoho endpoint or field
  - [ ] 1.2 Document and use Zoho configuration
    - Document required env vars (e.g. ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, or API token per Zoho Inventory docs) in README or env.example
    - No default/placeholder secrets in code; read from process.env only on the server
  - [ ] 1.3 Implement Zoho Inventory client (server-side only)
    - Authenticate using server-to-server approach (OAuth2 client credentials or API token as appropriate for Zoho Inventory)
    - Fetch company-wide sales, orders, and product/item data needed for metrics and product performance
    - Structure so additional Zoho products can be added later without changing the app API surface
  - [ ] 1.4 Implement data mapping to dashboard types
    - Map Zoho data to `MetricCardData[]` for YTD Revenue, Units Sold, Avg Order Value (labels, value, trend, sparkline, subtitle per `lib/mock-data.ts` / `lib/types.ts`)
    - Map Zoho products/items and sales to `ProductPerformance[]` (id, name, sku, revenueShare, unitsSold, revenue, avgOrderValue, returnRate); compute revenue share and return rate from aggregates if Zoho does not provide them
    - YTD Dividends metric and dividend highlight may use mock or a single company-wide value for v1
  - [ ] 1.5 Add Next.js API routes for Overview data
    - Create route(s) under `app/api/` (or App Router equivalent) that return JSON conforming to `MetricCardData[]` and `ProductPerformance[]` (and optionally dividend for highlight)
    - Routes call the Zoho client and mapping layer; on Zoho error or missing config, return a safe fallback or error response (no Zoho details or credentials exposed to client)
    - Log errors and Zoho-related details server-side only
  - [ ] 1.6 Ensure integration and API tests pass
    - Run ONLY the 2–8 tests written in 1.1
    - Verify response shapes and error/fallback behavior
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**

- The 2–8 tests written in 1.1 pass
- Env vars are documented and read only on the server
- Zoho client authenticates and fetches company-wide data; structure allows future Zoho products
- Mapping produces valid `MetricCardData` and `ProductPerformance` compatible with `lib/types.ts`
- API routes return correct JSON shapes; errors are handled and not exposed to the client
- No Zoho credentials or sensitive error details sent to the client

## Understand the context

Read @agent-os/specs/2025-01-30-zoho-integration/spec.md to understand the context for this spec and where the current task fits into it.

Also read these further context and reference:

- @agent-os/specs/2025-01-30-zoho-integration/planning/requirements.md
- @agent-os/specs/2025-01-30-zoho-integration/planning/visuals

## Perform the implementation

Implement all tasks assigned to you and ONLY those task(s) that have been assigned to you.

## Implementation process:

1. Analyze the provided spec.md, requirements.md, and visuals (if any)
2. Analyze patterns in the codebase according to its built-in workflow
3. Implement the assigned task group according to requirements and standards
4. Update `agent-os/specs/2025-01-30-zoho-integration/tasks.md` to update the tasks you've implemented to mark that as done by updating their checkbox to checked state: `- [x]`

## Guide your implementation using:

- **The existing patterns** that you've found and analyzed in the codebase.
- **Specific notes provided in requirements.md, spec.md AND/OR tasks.md**
- **Visuals provided (if any)** which would be located in `agent-os/specs/2025-01-30-zoho-integration/planning/visuals/`
- **User Standards & Preferences** which are defined below.

## Self-verify and test your work by:

- Running ONLY the tests you've written (if any) and ensuring those tests pass.
- IF your task involves user-facing UI, and IF you have access to browser testing tools, open a browser and use the feature you've implemented as if you are a user to ensure a user can use the feature in the intended way.
  - Take screenshots of the views and UI elements you've tested and store those in `agent-os/specs/2025-01-30-zoho-integration/verification/screenshots/`. Do not store screenshots anywhere else in the codebase other than this location.
  - Analyze the screenshot(s) you've taken to check them against your current requirements.
