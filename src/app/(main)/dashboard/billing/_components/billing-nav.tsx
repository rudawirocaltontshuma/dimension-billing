"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const modules: { label: string; href: string }[] = [
  { label: "Dashboard", href: "/dashboard/billing" },
  { label: "Subscriptions", href: "/dashboard/billing/subscriptions" },
  { label: "Plans", href: "/dashboard/billing/plans" },
  { label: "Customers", href: "/dashboard/billing/customers" },
  { label: "Invoices", href: "/dashboard/billing/invoices" },
  { label: "Payments", href: "/dashboard/billing/payments" },
  { label: "Usage", href: "/dashboard/billing/usage" },
  { label: "Credits", href: "/dashboard/billing/credits" },
  { label: "Discounts", href: "/dashboard/billing/discounts" },
  { label: "Revenue", href: "/dashboard/billing/revenue" },
  { label: "Dunning", href: "/dashboard/billing/dunning" },
  { label: "Tax", href: "/dashboard/billing/tax" },
  { label: "Reports", href: "/dashboard/billing/reports" },
  { label: "Analytics", href: "/dashboard/billing/analytics" },
  { label: "Settings", href: "/dashboard/billing/settings" },
];

export function BillingNav() {
  const pathname = usePathname();

  return (
    <div className="-mx-1 overflow-x-auto pb-1">
      <nav className="flex w-max min-w-full items-center gap-1 border-border border-b px-1">
        {modules.map((m) => {
          const active = m.href === "/dashboard/billing" ? pathname === m.href : pathname.startsWith(m.href);
          return (
            <Link
              key={m.href}
              href={m.href}
              className={cn(
                "whitespace-nowrap rounded-t-md border-b-2 px-3 py-2 text-sm transition-colors",
                active
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              {m.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
