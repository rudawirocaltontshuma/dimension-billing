# Contributing to Dimension Billing

Thanks for showing interest in improving **Dimension Billing**. This guide will help you set up your environment and understand how to contribute.

---

## Overview

Dimension Billing is a frontend-only demonstration of a SaaS subscription and billing management platform, built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. There is no backend, database, authentication, or payment processing — all data is fictional and generated locally. The goal is to keep the codebase modular, scalable, and easy to extend.

---

## Project Layout

We use a **colocation-based file system**. Each module keeps its own pages, components, and mock data.

```
src
├── app
│   ├── (external)              # Public landing page
│   └── (main)
│       ├── auth                # Authentication screens
│       └── dashboard
│           └── billing         # Dimension Billing app
│               ├── _components # Shared billing UI (nav, KPI cards, badges, etc.)
│               ├── _data       # Mock data source of truth
│               ├── subscriptions
│               ├── plans
│               ├── customers
│               ├── invoices
│               ├── payments
│               ├── usage
│               ├── credits
│               ├── discounts
│               ├── revenue
│               ├── dunning
│               ├── tax
│               ├── reports
│               ├── analytics
│               └── settings
├── components                   # Shared UI (shadcn/ui primitives)
├── hooks                         # Reusable hooks
├── lib                           # Config & utilities
├── navigation                    # Sidebar navigation config
├── stores                        # Client-side state (Zustand)
└── styles                        # Tailwind / theme setup
```

---

## Getting Started

### Fork and Clone the Repository

1. Fork the repository on GitHub.

2. Clone your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/saas_subscription_billing_platform.git
   ```

3. Navigate into the project
   ```bash
   cd saas_subscription_billing_platform
   ```

4. Install dependencies
   ```bash
   npm install
   ```

5. Run the dev server
   ```bash
   npm run dev
   ```
   App will be available at [http://localhost:3000](http://localhost:3000).

---

## Contribution Flow

- Always create a new branch before working on changes:
  ```bash
  git checkout -b feature/my-update
  ```

- Use clear commit messages:
  ```bash
  git commit -m "feat: add invoice line-item editing"
  ```

- Open a Pull Request once ready.
- If your change adds or updates a UI screen, include a screenshot in your PR description.

---

## Where to Contribute

- **Billing modules**: `src/app/(main)/dashboard/billing/`
- **Shared UI**: `src/components/`
- **Mock data**: `src/app/(main)/dashboard/billing/_data/`
- **Hooks**: `src/hooks/`
- **Themes**: `src/styles/presets/`

---

## Guidelines

- No backend, database, authentication, or real payment processing — this project stays frontend-only with fictional, local mock data.
- Prefer **TypeScript types** over `any`.
- Husky pre-commit hooks are enabled — linting and formatting run automatically on commit, and the commit is blocked until errors are fixed.
- Follow **shadcn/ui** style and Tailwind v4 conventions.
- Keep accessibility in mind (ARIA, keyboard navigation).
- Use clear commit messages with conventional prefixes (`feat:`, `fix:`, `chore:`, etc.).
- Avoid unnecessary dependencies — prefer existing utilities where possible.
- Ensure `npm run build`, `npm run lint`, and `npx tsc --noEmit` all pass before opening a PR.

---

## Submitting PRs

- Open a Pull Request once your changes are ready.
- Ensure your branch is up to date with `main` before submitting.
- Reference any related issue in your PR for context.

---

## Questions & Support

- Report bugs or suggestions via [GitHub Issues](https://github.com/rudawirocaltontshuma/saas_subscription_billing_platform/issues).

---

Your contributions keep this project growing. 🚀
