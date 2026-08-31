import Link from "next/link";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { BillingNav } from "../../_components/billing-nav";
import { StatusBadge } from "../../_components/status-badge";
import { customerById, cycleMonths, planById, plans, subscriptions } from "../../_data/mock-data";

export function generateStaticParams() {
  return plans.map((p) => ({ id: p.id }));
}

export default async function PlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = planById(id);
  if (!plan) notFound();

  const subs = subscriptions.filter((s) => s.planId === plan.id);
  const activeSubs = subs.filter((s) => s.status === "Active");
  const mrr = activeSubs.reduce((sum, s) => sum + s.amount / cycleMonths(s.billingCycle), 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <Button asChild variant="ghost" size="sm" className="mb-1 -ml-2 text-muted-foreground">
          <Link href="/dashboard/billing/plans">
            <ArrowLeft />
            Back to plans
          </Link>
        </Button>
        <h1 className="flex items-center gap-2 text-2xl tracking-tight sm:text-3xl">
          {plan.name}
          <StatusBadge status={plan.status} />
        </h1>
        <p className="text-muted-foreground text-sm">{plan.description}</p>
      </div>
      <BillingNav />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Monthly Price</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl tracking-tight">{formatCurrency(plan.monthlyPrice)}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Annual Price</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl tracking-tight">{formatCurrency(plan.annualPrice)}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Subscribers</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl tracking-tight">{activeSubs.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl tracking-tight">{formatCurrency(mrr, { noDecimals: true })}</CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seats</span>
              <span>{plan.limits.seats}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">API Requests</span>
              <span>{plan.limits.apiRequests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Storage</span>
              <span>{plan.limits.storage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Billing Cycles</span>
              <span>{plan.billingCycles.join(", ")}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Renewal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subs.map((s) => {
                  const customer = customerById(s.customerId);
                  return (
                    <TableRow key={s.id}>
                      <TableCell>
                        <Link
                          href={`/dashboard/billing/customers/${customer?.id}`}
                          className="font-medium hover:underline"
                        >
                          {customer?.name}
                        </Link>
                      </TableCell>
                      <TableCell>{s.billingCycle}</TableCell>
                      <TableCell>{formatCurrency(s.amount)}</TableCell>
                      <TableCell>{format(new Date(s.renewalDate), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <StatusBadge status={s.status} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {subs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                      No subscribers on this plan.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
