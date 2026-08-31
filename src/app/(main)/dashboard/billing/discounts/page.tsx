import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { BillingPageShell } from "../_components/billing-page-shell";
import { StatusBadge } from "../_components/status-badge";
import { discounts } from "../_data/mock-data";

export default function DiscountsPage() {
  return (
    <BillingPageShell title="Discounts" description={`${discounts.length} discount codes and promotions`}>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Discount</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{d.code}</Badge>
                </TableCell>
                <TableCell>{d.type}</TableCell>
                <TableCell>{d.type === "Percentage" ? `${d.value}%` : `$${d.value}`}</TableCell>
                <TableCell className="min-w-32">
                  <div className="flex items-center gap-2">
                    <Progress value={(d.usageCount / d.usageLimit) * 100} className="h-2 w-20" />
                    <span className="text-muted-foreground text-xs">
                      {d.usageCount}/{d.usageLimit}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{format(new Date(d.startDate), "MMM d, yyyy")}</TableCell>
                <TableCell>{format(new Date(d.endDate), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <StatusBadge status={d.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </BillingPageShell>
  );
}
