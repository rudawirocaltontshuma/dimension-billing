import Link from "next/link";

import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { BillingPageShell } from "../_components/billing-page-shell";
import { StatusBadge } from "../_components/status-badge";
import { cycleMonths, plans, subscriptions } from "../_data/mock-data";

export default function PlansPage() {
  return (
    <BillingPageShell title="Plans" description="Pricing plans and subscriber breakdown">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const subs = subscriptions.filter((s) => s.planId === plan.id && s.status === "Active");
          const revenue = subs.reduce((sum, s) => sum + s.amount / cycleMonths(s.billingCycle), 0);
          return (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  <StatusBadge status={plan.status} />
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <div>
                  <span className="text-2xl tracking-tight">
                    {formatCurrency(plan.monthlyPrice, { noDecimals: true })}
                  </span>
                  <span className="text-muted-foreground text-sm"> /mo</span>
                </div>
                <div className="flex flex-wrap gap-3 text-muted-foreground text-xs">
                  <span>
                    <span className="font-medium text-foreground">{subs.length}</span> subscribers
                  </span>
                  <span>
                    <span className="font-medium text-foreground">{formatCurrency(revenue, { noDecimals: true })}</span>{" "}
                    MRR
                  </span>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                {plan.billingCycles.map((c) => (
                  <Badge key={c} variant="secondary" className="mr-1 w-fit">
                    {c}
                  </Badge>
                ))}
              </CardContent>
              <CardFooter>
                <Link
                  href={`/dashboard/billing/plans/${plan.id}`}
                  className="font-medium text-primary text-sm hover:underline"
                >
                  View plan details →
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </BillingPageShell>
  );
}
