import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Dimension Billing",
  version: packageJson.version,
  copyright: `© ${currentYear}, Dimension Billing.`,
  meta: {
    title: "Dimension Billing - SaaS Subscription & Billing Management Platform",
    description:
      "Dimension Billing is a frontend demonstration of a SaaS subscription and billing management platform, built with Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, and Recharts.",
  },
};
