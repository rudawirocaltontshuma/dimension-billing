import Link from "next/link";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { BillingNav } from "../../_components/billing-nav";
import { StatusBadge } from "../../_components/status-badge";
import {
  customerById,
  invoiceById,
  invoices,
  invoiceTotals,
  paymentsForInvoice,
  planById,
  subscriptionById,
} from "../../_data/mock-data";
import { InvoiceActions } from "./_components/invoice-actions";

export function generateStaticParams() {
  return invoices.map((i) => ({ id: i.id }));
}

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = invoiceById(id);
  if (!invoice) notFound();

  const customer = customerById(invoice.customerId);
  const subscription = subscriptionById(invoice.subscriptionId);
  const plan = subscription ? planById(subscription.planId) : undefined;
  const totals = invoiceTotals(invoice);
  const relatedPayments = paymentsForInvoice(invoice.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Button asChild variant="ghost" size="sm" className="mb-1 -ml-2 text-muted-foreground">
            <Link href="/dashboard/billing/invoices">
              <ArrowLeft />
              Back to invoices
            </Link>
          </Button>
          <h1 className="flex items-center gap-2 text-2xl tracking-tight sm:text-3xl">
            {invoice.id}
            <StatusBadge status={invoice.status} />
          </h1>
          <p className="text-muted-foreground text-sm">Plan: {plan?.name ?? "—"}</p>
        </div>
        <InvoiceActions invoiceId={invoice.id} />
      </div>
      <BillingNav />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Line Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.lineItems.map((li) => (
                    <TableRow key={li.description}>
                      <TableCell>{li.description}</TableCell>
                      <TableCell className="text-right">{li.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(li.unitPrice)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(li.quantity * li.unitPrice)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 ml-auto flex w-full flex-col gap-1 text-sm sm:w-64">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              {invoice.discountPct > 0 ? (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount ({invoice.discountPct}%)</span>
                  <span>-{formatCurrency(totals.discount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax ({invoice.taxPct}%)</span>
                <span>{formatCurrency(totals.tax)}</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between font-medium text-base">
                <span>Total</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Bill To</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="font-medium">{customer?.name}</p>
              <p className="text-muted-foreground">{customer?.company}</p>
              <p className="text-muted-foreground">{customer?.email}</p>
              <p className="text-muted-foreground">{customer?.region}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date</span>
                <span>{format(new Date(invoice.issueDate), "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date</span>
                <span>{format(new Date(invoice.dueDate), "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subscription</span>
                <Link href={`/dashboard/billing/subscriptions/${subscription?.id}`} className="hover:underline">
                  {subscription?.id}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency</span>
                <span>{invoice.currency}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
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
                    <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                      No payments recorded for this invoice yet.
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
