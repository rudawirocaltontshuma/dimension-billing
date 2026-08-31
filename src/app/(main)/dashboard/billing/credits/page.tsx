import { format } from "date-fns";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { BillingPageShell } from "../_components/billing-page-shell";
import { StatusBadge } from "../_components/status-badge";
import { credits, customerById } from "../_data/mock-data";

export default function CreditsPage() {
  const sorted = [...credits].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <BillingPageShell title="Credits" description={`${credits.length} account credits issued`}>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Credit Amount</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((c) => {
              const customer = customerById(c.customerId);
              return (
                <TableRow key={c.id}>
                  <TableCell>
                    {customer?.name}
                    <div className="text-muted-foreground text-xs">{customer?.company}</div>
                  </TableCell>
                  <TableCell>{formatCurrency(c.amount)}</TableCell>
                  <TableCell>{c.reason}</TableCell>
                  <TableCell>{format(new Date(c.created), "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(new Date(c.expiry), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <StatusBadge status={c.status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </BillingPageShell>
  );
}
