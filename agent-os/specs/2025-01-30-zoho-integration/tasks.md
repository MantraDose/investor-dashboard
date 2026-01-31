# Task Breakdown: Zoho Inventory Integration for Dashboard Overview

## Overview

Total Tasks: 3 task groups (Zoho/API, Overview integration, Test review)

## Task List

### Integration & API Layer

#### Task Group 1: Zoho Client, Data Mapping, and API Routes

**Dependencies:** None

- [x] 1.0 Complete Zoho integration and API layer
  - [x] 1.1 Write 2–8 focused tests for API and mapping behavior
    - Limit to 2–8 tests maximum (e.g. API route returns correct shape, mapping produces valid MetricCardData/ProductPerformance, fallback or error response when Zoho fails)
    - Test only critical paths: successful response shape, error/fallback behavior
    - Skip exhaustive coverage of every Zoho endpoint or field
  - [x] 1.2 Document and use Zoho configuration
    - Document required env vars (e.g. ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, or API token per Zoho Inventory docs) in README or env.example
    - No default/placeholder secrets in code; read from process.env only on the server
  - [x] 1.3 Implement Zoho Inventory client (server-side only)
    - Authenticate using server-to-server approach (OAuth2 client credentials or API token as appropriate for Zoho Inventory)
    - Fetch company-wide sales, orders, and product/item data needed for metrics and product performance
    - Structure so additional Zoho products can be added later without changing the app API surface
  - [x] 1.4 Implement data mapping to dashboard types
    - Map Zoho data to `MetricCardData[]` for YTD Revenue, Units Sold, Avg Order Value (labels, value, trend, sparkline, subtitle per `lib/mock-data.ts` / `lib/types.ts`)
    - Map Zoho products/items and sales to `ProductPerformance[]` (id, name, sku, revenueShare, unitsSold, revenue, avgOrderValue, returnRate); compute revenue share and return rate from aggregates if Zoho does not provide them
    - YTD Dividends metric and dividend highlight may use mock or a single company-wide value for v1
  - [x] 1.5 Add Next.js API routes for Overview data
    - Create route(s) under `app/api/` (or App Router equivalent) that return JSON conforming to `MetricCardData[]` and `ProductPerformance[]` (and optionally dividend for highlight)
    - Routes call the Zoho client and mapping layer; on Zoho error or missing config, return a safe fallback or error response (no Zoho details or credentials exposed to client)
    - Log errors and Zoho-related details server-side only
  - [x] 1.6 Ensure integration and API tests pass
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

### Frontend Integration

#### Task Group 2: Overview Page Data Source

**Dependencies:** Task Group 1

- [x] 2.0 Complete Overview page integration with API
  - [x] 2.1 Write 2–8 focused tests for Overview data loading
    - Limit to 2–8 tests maximum (e.g. page renders with API data, falls back to mock when API fails or is unavailable)
    - Test only critical behaviors: successful load, fallback to mock
    - Skip exhaustive UI or accessibility coverage
  - [x] 2.2 Update Overview page to fetch from API with fallback
    - In `app/page.tsx`, fetch metrics and product performance from the new API when available (server or client fetch per Next.js pattern)
    - On API unavailability or failure, use `dashboardMetrics` and `productPerformance` from `lib/mock-data` so the page still renders
    - Keep `DividendHighlight` and marketing cards (Omnisend, Facebook Ads) on existing mock data; no changes to their data source in this spec
  - [x] 2.3 Preserve existing layout and components
    - Do not change `DashboardLayout`, `DividendHighlight`, `MetricCard`, `ProductTable`, or marketing card props or interfaces
    - Ensure fetched data matches existing types so components render without modification
  - [x] 2.4 Add loading and error handling for the Overview data
    - Show a simple loading state while fetching (if client-side); on error, fall back to mock without exposing Zoho-specific messages to the user
  - [x] 2.5 Ensure Overview integration tests pass
    - Run ONLY the 2–8 tests written in 2.1
    - Verify load and fallback behavior
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**

- The 2–8 tests written in 2.1 pass
- Overview page uses API for metrics and product table when API is available
- Fallback to mock when API is unavailable or errors; page always renders
- No component or type changes; dividend and marketing data remain from mock
- No Zoho-specific errors or credentials visible to the user

### Testing

#### Task Group 3: Test Review and Gap Analysis

**Dependencies:** Task Groups 1–2

- [x] 3.0 Review existing tests and fill critical gaps only
  - [x] 3.1 Review tests from Task Groups 1–2
    - Review the 2–8 tests from the integration/API group (1.1)
    - Review the 2–8 tests from the Overview integration group (2.1)
    - Total existing tests: approximately 4–16 tests
  - [x] 3.2 Analyze test coverage gaps for this feature only
    - Identify critical user workflows that lack coverage (e.g. full path from API to rendered Overview, fallback when env missing)
    - Focus only on gaps related to this spec; do not assess the entire application
    - Prefer integration/end-to-end gaps over extra unit tests
  - [x] 3.3 Add up to 10 additional strategic tests maximum
    - Add at most 10 new tests to cover critical gaps (e.g. API + Overview together, or env-off behavior)
    - Do not add broad coverage for all edge cases or accessibility unless critical for this feature
  - [x] 3.4 Run feature-specific tests only
    - Run only tests related to this spec (from 1.1, 2.1, and 3.3)
    - Expected total: approximately 14–26 tests maximum
    - Do not run the full application test suite
    - Verify critical workflows pass

**Acceptance Criteria:**

- All feature-specific tests pass (approximately 14–26 tests total)
- Critical workflows for Zoho integration and Overview are covered
- No more than 10 additional tests added when filling gaps
- Scope limited to this spec’s feature requirements

## Execution Order

Recommended implementation sequence:

1. **Integration & API Layer** (Task Group 1) — Zoho client, mapping, API routes, env
2. **Overview Page Integration** (Task Group 2) — Wire Overview to API with fallback
3. **Test Review & Gap Analysis** (Task Group 3) — Review and add up to 10 tests for critical gaps
