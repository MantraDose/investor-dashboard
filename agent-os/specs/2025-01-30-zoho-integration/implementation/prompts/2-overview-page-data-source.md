We're continuing our implementation of Zoho Inventory Integration for Dashboard Overview by implementing task group number 2:

## Implement this task and its sub-tasks:

#### Task Group 2: Overview Page Data Source

**Dependencies:** Task Group 1

- [ ] 2.0 Complete Overview page integration with API
  - [ ] 2.1 Write 2–8 focused tests for Overview data loading
    - Limit to 2–8 tests maximum (e.g. page renders with API data, falls back to mock when API fails or is unavailable)
    - Test only critical behaviors: successful load, fallback to mock
    - Skip exhaustive UI or accessibility coverage
  - [ ] 2.2 Update Overview page to fetch from API with fallback
    - In `app/page.tsx`, fetch metrics and product performance from the new API when available (server or client fetch per Next.js pattern)
    - On API unavailability or failure, use `dashboardMetrics` and `productPerformance` from `lib/mock-data` so the page still renders
    - Keep `DividendHighlight` and marketing cards (Omnisend, Facebook Ads) on existing mock data; no changes to their data source in this spec
  - [ ] 2.3 Preserve existing layout and components
    - Do not change `DashboardLayout`, `DividendHighlight`, `MetricCard`, `ProductTable`, or marketing card props or interfaces
    - Ensure fetched data matches existing types so components render without modification
  - [ ] 2.4 Add loading and error handling for the Overview data
    - Show a simple loading state while fetching (if client-side); on error, fall back to mock without exposing Zoho-specific messages to the user
  - [ ] 2.5 Ensure Overview integration tests pass
    - Run ONLY the 2–8 tests written in 2.1
    - Verify load and fallback behavior
    - Do NOT run the entire test suite at this stage

**Acceptance Criteria:**

- The 2–8 tests written in 2.1 pass
- Overview page uses API for metrics and product table when API is available
- Fallback to mock when API is unavailable or errors; page always renders
- No component or type changes; dividend and marketing data remain from mock
- No Zoho-specific errors or credentials visible to the user

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
  - Take screenshots of the views and UI elements you've tested and store those in `agent-os/specs/2025-01-30-zoho-integration/verification/screenshots/`.  Do not store screenshots anywhere else in the codebase other than this location.
  - Analyze the screenshot(s) you've taken to check them against your current requirements.
