# Spec Requirements: Zoho Integration

## Initial Description

Let's integrate with Zoho to start populating our dashboard with real data.

## Requirements Discussion

### First Round Questions

**Q1:** Which Zoho product(s) will we integrate with? (e.g. Zoho Books, Zoho Inventory, Zoho Analytics, Zoho CRM — or multiple.) I'm assuming Zoho Books and/or Inventory for revenue, orders, and products. Is that correct, or something else?

**Answer:** Let's start with Zoho Inventory, but we may be integrating with multiple products over time.

**Q2:** Which dashboard data should we populate first? I'm thinking we start with data that backs the Overview page (revenue, units, AOV, product performance table), then add YTD/historical/dividends in a later phase. Should we do that, or a different scope?

**Answer:** Yes, let's start with the Overview page for now.

**Q3:** Where should the integration run? I'm assuming new Next.js API routes (or serverless) that call Zoho APIs and return data in the shape of our existing `lib/types.ts`. Is that correct, or do you prefer a separate backend service that the frontend calls?

**Answer:** I'm going to defer to your best judgement.

**Q4:** How should the app authenticate to Zoho (OAuth vs server-to-server / API key), and where should credentials live (env vars, secret manager)? I'm assuming server-side only with credentials in env. Confirm or correct?

**Answer:** Correct.

**Q5:** The roadmap assumes data is "investor-scoped." For Zoho v1, should we use company-wide (single-tenant) data and add investor filtering when auth is implemented, or do you already have per-investor data in Zoho?

**Answer:** That's a good idea. Let's use company-wide data for v1 and filter when auth is implemented.

**Q6:** What is explicitly out of scope for this spec? (e.g. no Marketing/Omnisend/Facebook in this phase; no Zoho CRM; no write-back to Zoho; anything else?)

**Answer:** Not that I can think of.

### Existing Code to Reference

No similar existing features identified for reference.

**Similar Features Identified:**

- None provided.

### Follow-up Questions

None yet.

## Visual Assets

### Files Provided:

No visual assets provided.

### Visual Insights:

- No visual assets provided.

## Requirements Summary

### Functional Requirements

- Integrate with **Zoho Inventory** first; multiple Zoho products may be added over time.
- Populate dashboard with real data for the **Overview page** (revenue, units, AOV, product performance table).
- Use **company-wide (single-tenant)** data for v1; investor filtering when authentication is implemented.
- Server-side only; credentials in env; no write-back or other exclusions called out.

### Reusability Opportunities

- No similar existing features identified; spec can reference existing `lib/types.ts` and Overview page consumers of `lib/mock-data.ts` for data shapes and UI.

### Scope Boundaries

**In Scope:**

- Zoho Inventory integration to back Overview page metrics and product performance.
- Next.js API layer (or equivalent) that calls Zoho APIs and returns data in existing types.
- Company-wide data; investor scoping deferred to auth work.

**Out of Scope:**

- No explicit exclusions stated; Marketing/Omnisend/Facebook and other Zoho products are future scope.

### Technical Considerations

- Integration location: Next.js API routes (or serverless) preferred; implementation left to best judgment.
- Auth: server-side only; credentials in env.
- Data scope: company-wide for v1; filter by investor when auth exists.
- Align response shapes with `lib/types.ts` so existing Overview UI can consume real data with minimal change.
