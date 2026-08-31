# Dimension Billing

**Dimension Billing** is a frontend demonstration of a SaaS subscription and billing management platform — dashboards, subscriptions, plans, customers, invoices, payments, usage, credits, discounts, revenue analytics, dunning, tax overview, reports, and settings, all in one app.

This is a **frontend-only** build. There is no backend, database, authentication, or payment processing — every screen is powered by realistic, internally-consistent, locally generated mock data so the UI can be explored end to end.

## Features

- Built with Next.js 16, TypeScript, Tailwind CSS v4, and shadcn/ui
- Fully responsive — mobile navigation via `Sheet`, horizontally scrollable tables, stacking cards, resizable charts
- Light/dark theme support with selectable color presets
- Executive dashboard with MRR/ARR trends, churn, subscription growth, and revenue breakdowns (Recharts)
- Subscription, plan, customer, and invoice directories with detail pages
- Payment history, usage analytics, credits, discounts, dunning, and tax overview modules
- Report library (revenue, subscriptions, customers, invoices, payments, churn, usage) and an advanced analytics view
- Billing settings screen with local, in-memory preferences

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui, Radix UI, Lucide Icons
- **Charts**: Recharts
- **Forms & State**: React Hook Form, Zod, Zustand
- **Tables**: TanStack Table
- **Tooling**: Biome, Husky

## Screens

- Dashboard
- Subscriptions (directory + detail)
- Plans (directory + detail)
- Customers (directory + detail)
- Invoices (directory + detail)
- Payments
- Usage
- Credits
- Discounts
- Revenue
- Dunning
- Tax Overview
- Reports
- Analytics
- Settings
- Authentication (login / register, two layout variants)

## Getting Started

### Run locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/rudawirocaltontshuma/saas_subscription_billing_platform.git
   ```

2. **Navigate into the project**
   ```bash
   cd saas_subscription_billing_platform
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The app runs at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

### Formatting and linting

```bash
npx @biomejs/biome check --write
```

> See the [Biome documentation](https://biomejs.dev/) for available rules and CLI options.

## Project Structure

This project follows a colocation-based file system: each feature keeps its own pages, components, and mock data inside its route folder.

```
src
├── app
│   ├── (external)          # Public landing page
│   └── (main)
│       ├── auth            # Authentication screens
│       └── dashboard
│           └── billing     # Dimension Billing app (all modules)
├── components               # Shared UI (shadcn/ui primitives)
├── config                   # App configuration
├── hooks                    # Reusable hooks
├── lib                      # Utilities
├── navigation                # Sidebar navigation config
├── stores                   # Client-side state (Zustand)
└── styles                   # Tailwind / theme presets
```

## Disclaimer

All customers, subscriptions, invoices, payments, and financial figures shown in this application are fictional and generated for demonstration purposes only. No real billing, payment processing, or personal data is involved.

## License

MIT — see [LICENSE](LICENSE).
