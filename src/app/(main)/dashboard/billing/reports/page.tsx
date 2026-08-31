"use client";

import { useState } from "react";

import { BarChart3, CreditCard, FileText, Receipt, TrendingDown, Users, Zap } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";

import { BillingPageShell } from "../_components/billing-page-shell";
import { StatusBadge } from "../_components/status-badge";
import {
  arr,
  churnRate,
  customers,
  invoices,
  invoiceTotals,
  kpis,
  payments,
  subscriptions,
  usageRecords,
} from "../_data/mock-data";

const reports = [
  { id: "revenue", label: "Revenue Report", icon: TrendingDown },
  { id: "subscriptions", label: "Subscription Report", icon: Zap },
  { id: "customers", label: "Customer Report", icon: Users },
  { id: "invoices", label: "Invoice Report", icon: FileText },
  { id: "payments", label: "Payment Report", icon: CreditCard },
  { id: "churn", label: "Churn Report", icon: BarChart3 },
  { id: "usage", label: "Usage Report", icon: Receipt },
] as const;

type ReportId = (typeof reports)[number]["id"];

export default function ReportsPage() {
  const [active, setActive] = useState<ReportId>("revenue");

  return (
    <BillingPageShell title="Reports" description="Standard reports across every billing module">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reports.map((r) => (
          <button type="button" key={r.id} onClick={() => setActive(r.id)} className="text-left">
            <Card
              className={cn(
                "h-full cursor-pointer transition-colors hover:border-primary/50",
                active === r.id && "border-primary",
              )}
            >
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <r.icon className="size-5 text-primary" />
                <div>
                  <CardTitle className="text-base">{r.label}</CardTitle>
                  <CardDescription>View {r.label.toLowerCase()}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{reports.find((r) => r.id === active)?.label}</CardTitle>
        </CardHeader>
        <CardContent>
          {active === "revenue" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric label="MRR" value={formatCurrency(kpis.mrr, { noDecimals: true })} />
              <Metric label="ARR" value={formatCurrency(arr, { noDecimals: true })} />
              <Metric label="Outstanding" value={formatCurrency(kpis.outstandingAmount, { noDecimals: true })} />
              <Metric label="Active Subs" value={kpis.activeSubscriptions.toString()} />
            </div>
          ) : null}

          {active === "subscriptions" ? (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Trial", "Active", "Past Due", "Paused", "Cancelled", "Expired"].map((status) => (
                    <TableRow key={status}>
                      <TableCell>
                        <StatusBadge status={status} />
                      </TableCell>
                      <TableCell>{subscriptions.filter((s) => s.status === status).length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}

          {active === "customers" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric label="Total Customers" value={customers.length.toString()} />
              <Metric label="Active" value={customers.filter((c) => c.status === "Active").length.toString()} />
              <Metric label="At Risk" value={customers.filter((c) => c.status === "At Risk").length.toString()} />
              <Metric label="Churned" value={customers.filter((c) => c.status === "Churned").length.toString()} />
            </div>
          ) : null}

          {active === "invoices" ? (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Total Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Draft", "Open", "Paid", "Overdue", "Void"].map((status) => {
                    const filtered = invoices.filter((i) => i.status === status);
                    const total = filtered.reduce((sum, i) => sum + invoiceTotals(i).total, 0);
                    return (
                      <TableRow key={status}>
                        <TableCell>
                          <StatusBadge status={status} />
                        </TableCell>
                        <TableCell>{filtered.length}</TableCell>
                        <TableCell>{formatCurrency(total, { noDecimals: true })}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : null}

          {active === "payments" ? (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Total Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Successful", "Pending", "Failed", "Refunded"].map((status) => {
                    const filtered = payments.filter((p) => p.status === status);
                    const total = filtered.reduce((sum, p) => sum + p.amount, 0);
                    return (
                      <TableRow key={status}>
                        <TableCell>
                          <StatusBadge status={status} />
                        </TableCell>
                        <TableCell>{filtered.length}</TableCell>
                        <TableCell>{formatCurrency(total, { noDecimals: true })}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : null}

          {active === "churn" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric label="Churn Rate" value={`${churnRate}%`} />
              <Metric label="Churned Subscriptions" value={kpis.churnedSubscriptions.toString()} />
              <Metric label="Past Due" value={kpis.pastDue.toString()} />
              <Metric label="Failed Payments" value={kpis.failedPayments.toString()} />
            </div>
          ) : null}

          {active === "usage" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric label="Usage Records" value={usageRecords.length.toString()} />
              <Metric
                label="Total API Requests"
                value={usageRecords
                  .filter((u) => u.metric === "API Requests")
                  .reduce((sum, u) => sum + u.value, 0)
                  .toLocaleString()}
              />
              <Metric
                label="Total Storage"
                value={`${usageRecords
                  .filter((u) => u.metric === "Storage (GB)")
                  .reduce((sum, u) => sum + u.value, 0)
                  .toLocaleString()} GB`}
              />
              <Metric
                label="Total Transactions"
                value={usageRecords
                  .filter((u) => u.metric === "Transactions")
                  .reduce((sum, u) => sum + u.value, 0)
                  .toLocaleString()}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </BillingPageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-1 text-xl tracking-tight">{value}</p>
    </div>
  );
}
