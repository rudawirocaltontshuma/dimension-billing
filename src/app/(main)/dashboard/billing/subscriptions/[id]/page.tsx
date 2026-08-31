import Link from "next/link";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { ArrowLeft, Calendar, CreditCard, Repeat, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { BillingNav } from "../../_components/billing-nav";
import { StatusBadge } from "../../_components/status-badge";
import {
  customerById,
  invoicesForSubscription,
  invoiceTotals,
  paymentsForCustomer,
  planById,
  subscriptionById,
  subscriptions,
} from "../../_data/mock-data";

export function generateStaticParams() {
  return subscriptions.map((s) => ({ id: s.id }));
}

export default async function SubscriptionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const subscription = subscriptionById(id);
  if (!subscription) notFound();

  const customer = customerById(subscription.customerId);
  const plan = planById(subscription.planId);
  const relatedInvoices = invoicesForSubscription(subscription.id);
  const relatedPayments = paymentsForCustomer(subscription.customerId).filter((p) =>
    relatedInvoices.some((inv) => inv.id === p.invoiceId),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Button asChild variant="ghost" size="sm" className="mb-1 -ml-2 text-muted-foreground">
            <Link href="/dashboard/billing/subscriptions">
              <ArrowLeft />
              Back to subscriptions
            </Link>
          </Button>
          <h1 className="flex items-center gap-2 text-2xl tracking-tight sm:text-3xl">
            {subscription.id}
            <StatusBadge status={subscription.status} />
          </h1>
          <p className="text-muted-foreground text-sm">
            {customer?.name} · {customer?.company}
          </p>
        </div>
      </div>
      <BillingNav />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Plan</CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Link href={`/dashboard/billing/plans/${plan?.id}`} className="text-lg hover:underline">
              {plan?.name}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Amount</CardTitle>
            <Repeat className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg">{formatCurrency(subscription.amount)}</div>
            <div className="text-muted-foreground text-xs">{subscription.billingCycle}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Renewal Date</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg">{format(new Date(subscription.renewalDate), "MMM d, yyyy")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Seats</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg">{subscription.seats}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 border-l pl-4">
              <li className="relative">
                <span className="absolute top-1 -left-[21px] size-2.5 rounded-full bg-primary" />
                <p className="font-medium text-sm">Subscription started</p>
                <p className="text-muted-foreground text-xs">
                  {format(new Date(subscription.startDate), "MMM d, yyyy")}
                </p>
              </li>
              {subscription.trialEndsAt ? (
                <li className="relative">
                  <span className="absolute top-1 -left-[21px] size-2.5 rounded-full bg-blue-500" />
                  <p className="font-medium text-sm">Trial ends</p>
                  <p className="text-muted-foreground text-xs">
                    {format(new Date(subscription.trialEndsAt), "MMM d, yyyy")}
                  </p>
                </li>
              ) : null}
              {subscription.cancelledAt ? (
                <li className="relative">
                  <span className="absolute top-1 -left-[21px] size-2.5 rounded-full bg-red-500" />
                  <p className="font-medium text-sm">Subscription cancelled</p>
                  <p className="text-muted-foreground text-xs">
                    {format(new Date(subscription.cancelledAt), "MMM d, yyyy")}
                  </p>
                </li>
              ) : (
                <li className="relative">
                  <span className="absolute top-1 -left-[21px] size-2.5 rounded-full bg-emerald-500" />
                  <p className="font-medium text-sm">Next renewal</p>
                  <p className="text-muted-foreground text-xs">
                    {format(new Date(subscription.renewalDate), "MMM d, yyyy")}
                  </p>
                </li>
              )}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <Link href={`/dashboard/billing/customers/${customer?.id}`} className="font-medium hover:underline">
                {customer?.name}
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company</span>
              <span>{customer?.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="truncate">{customer?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Region</span>
              <span>{customer?.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer since</span>
              <span>{customer ? format(new Date(customer.since), "MMM d, yyyy") : "—"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Related Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relatedInvoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <Link href={`/dashboard/billing/invoices/${inv.id}`} className="font-medium hover:underline">
                        {inv.id}
                      </Link>
                    </TableCell>
                    <TableCell>{format(new Date(inv.issueDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>{format(new Date(inv.dueDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>{formatCurrency(invoiceTotals(inv).total)}</TableCell>
                    <TableCell>
                      <StatusBadge status={inv.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {relatedInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                      No invoices yet.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relatedPayments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.id}</TableCell>
                    <TableCell>{p.invoiceId}</TableCell>
                    <TableCell>{formatCurrency(p.amount)}</TableCell>
                    <TableCell>{p.method}</TableCell>
                    <TableCell>{format(new Date(p.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <StatusBadge status={p.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {relatedPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-20 text-center text-muted-foreground">
                      No payments yet.
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
