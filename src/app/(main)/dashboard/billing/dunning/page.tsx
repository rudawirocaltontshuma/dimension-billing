import Link from "next/link";

import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { BillingPageShell } from "../_components/billing-page-shell";
import { StatusBadge } from "../_components/status-badge";
import { customerById, dunningCases } from "../_data/mock-data";

export default function DunningPage() {
  const recovered = dunningCases.filter((d) => d.status === "Recovered").length;
  const recoveryRate = dunningCases.length ? Math.round((recovered / dunningCases.length) * 100) : 0;

  return (
    <BillingPageShell
      title="Dunning"
      description={`${dunningCases.length} failed-payment recovery cases · ${recoveryRate}% recovery rate`}
    >
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Failure Reason</TableHead>
              <TableHead>Attempt</TableHead>
              <TableHead>Next Action</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dunningCases.map((d) => {
              const customer = customerById(d.customerId);
              return (
                <TableRow key={d.id}>
                  <TableCell>
                    {customer?.name}
                    <div className="text-muted-foreground text-xs">{customer?.company}</div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/billing/invoices/${d.invoiceId}`} className="hover:underline">
                      {d.invoiceId}
                    </Link>
                  </TableCell>
                  <TableCell>{formatCurrency(d.amount)}</TableCell>
                  <TableCell>{d.reason}</TableCell>
                  <TableCell>
                    <Badge variant="outline">#{d.attempt}</Badge>
                  </TableCell>
                  <TableCell>
                    {d.nextAction}
                    <div className="text-muted-foreground text-xs">
                      {format(new Date(d.nextActionDate), "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={d.status} />
                  </TableCell>
                </TableRow>
              );
            })}
            {dunningCases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No active dunning cases.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </BillingPageShell>
  );
}
