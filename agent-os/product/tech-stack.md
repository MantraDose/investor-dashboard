# Tech Stack

Technical stack for the Mantra Dashboard (MantraDose Investor Portal). Align implementation and new features with these choices.

### Framework & Runtime

- **Application framework:** Next.js (App Router)
- **Language:** TypeScript
- **Package manager:** pnpm

### Frontend

- **UI framework:** React 19
- **CSS:** Tailwind CSS 4 (with PostCSS, tailwindcss-animate, tw-animate-css)
- **UI components:** Radix UI primitives, shadcn/ui-style components (e.g. Button, Card, Table, Sidebar, Chart)
- **Charts:** Recharts with project chart container/tooltip wrappers
- **Icons:** Lucide React
- **Theming:** next-themes (light/dark)

### Forms & Validation

- **Forms:** react-hook-form
- **Validation:** Zod
- **Integration:** @hookform/resolvers (Zod resolver)

### Data (current)

- **Data source:** In-app mock data (`lib/mock-data.ts`) and shared types (`lib/types.ts`). No backend or database in repo yet; replace with API + persistence when implementing roadmap.

### Testing & Quality

- **Linting:** ESLint
- **Type checking:** TypeScript

### Deployment & Infrastructure

- **Analytics:** @vercel/analytics (suggests Vercel as default hosting)
- **Hosting / CI:** To be confirmed (e.g. Vercel, or other per team choice)

### Backend / Auth (roadmap)

- **Authentication:** To be added when implementing “Authentication & investor identity” roadmap item.
- **Database / API:** To be added when implementing “API and data layer for dashboard metrics”; align with team standards (e.g. PostgreSQL + ORM, or existing backend).

### Third-Party Integrations (roadmap)

- **Marketing data:** Omnisend, Facebook Ads (or equivalents) when “Marketing & Ads page on real data” is implemented; integrate via backend or serverless.
