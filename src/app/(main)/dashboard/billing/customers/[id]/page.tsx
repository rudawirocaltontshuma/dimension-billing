import Link from "next/link";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, getInitials } from "@/lib/utils";

import { BillingNav } from "../../_components/billing-nav";
import { StatusBadge } from "../../_components/status-badge";
import {
  credits,
  customerById,
  customers,
  cycleMonths,
  invoicesForCustomer,
  invoiceTotals,
  paymentsForCustomer,
  planById,
  subscriptionsForCustomer,
  usageForCustomer,
} from "../../_data/mock-data";

export function generateStaticParams() {
  return customers.map((c) => ({ id: c.id }));
}

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = customerById(id);
  if (!customer) notFound();

  const plan = planById(customer.planId);
  const subs = subscriptionsForCustomer(customer.id);
  const invoices = invoicesForCustomer(customer.id);
  const paymentsList = paymentsForCustomer(customer.id);
  const usage = usageForCustomer(customer.id);
  const customerCredits = credits.filter((c) => c.customerId === customer.id);
  const activeSub = subs.find((s) => s.status === "Active");
  const mrr = activeSub ? activeSub.amount / cycleMonths(activeSub.billingCycle) : 0;
  const lifetimeValue = paymentsList.filter((p) => p.status === "Successful").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <Button asChild variant="ghost" size="sm" className="mb-1 -ml-2 text-muted-foreground">
          <Link href="/dashboard/billing/customers">
            <ArrowLeft />
            Back to customers
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="flex items-center gap-2 text-2xl tracking-tight sm:text-3xl">
              {customer.name}
              <StatusBadge status={customer.status} />
            </h1>
            <p className="text-muted-foreground text-sm">
              {customer.company} · {customer.email}
            </p>
          </div>
        </div>
      </div>
      <BillingNav />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="text-xl tracking-tight">{plan?.name ?? "—"}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">MRR</CardTitle>
          </CardHeader>
          <CardContent className="text-xl tracking-tight">{formatCurrency(mrr)}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent className="text-xl tracking-tight">
            {formatCurrency(lifetimeValue, { noDecimals: true })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Customer Since</CardTitle>
          </CardHeader>
          <CardContent className="text-xl tracking-tight">{format(new Date(customer.since), "MMM yyyy")}</CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="flex flex-col gap-4">
        <TabsList variant="line" className="w-full overflow-x-auto sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Region</span>
                <span>{customer.region}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Email</span>
                <span>{customer.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Total Subscriptions</span>
                <span>{subs.length}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Total Invoices</span>
                <span>{invoices.length}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Cycle</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Renewal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subs.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <Link href={`/dashboard/billing/subscriptions/${s.id}`} className="font-medium hover:underline">
                        {s.id}
                      </Link>
                    </TableCell>
                    <TableCell>{planById(s.planId)?.name}</TableCell>
                    <TableCell>{s.billingCycle}</TableCell>
                    <TableCell>{formatCurrency(s.amount)}</TableCell>
                    <TableCell>{format(new Date(s.renewalDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="invoices">
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
                {invoices.map((inv) => (
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
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="payments">
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
                {paymentsList.map((p) => (
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
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Limit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usage.slice(-10).map((u) => (
                  <TableRow key={`${u.metric}-${u.month}`}>
                    <TableCell>{u.metric}</TableCell>
                    <TableCell>{u.month}</TableCell>
                    <TableCell>{u.value.toLocaleString()}</TableCell>
                    <TableCell>{u.limit.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="credits">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Credit</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerCredits.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.id}</TableCell>
                    <TableCell>{formatCurrency(c.amount)}</TableCell>
                    <TableCell>{c.reason}</TableCell>
                    <TableCell>{format(new Date(c.created), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {customerCredits.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                      No credits issued.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 border-l pl-4">
                {[...invoices]
                  .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
                  .slice(0, 6)
                  .map((inv) => (
                    <li key={inv.id} className="relative">
                      <span className="absolute top-1 -left-[21px] size-2.5 rounded-full bg-primary" />
                      <p className="font-medium text-sm">
                        Invoice {inv.id} {inv.status.toLowerCase()}
                      </p>
                      <p className="text-muted-foreground text-xs">{format(new Date(inv.issueDate), "MMM d, yyyy")}</p>
                    </li>
                  ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
