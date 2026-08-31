import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { BillingPageShell } from "../_components/billing-page-shell";
import { StatusBadge } from "../_components/status-badge";
import { taxRegions } from "../_data/mock-data";

export default function TaxPage() {
  const totalTaxable = taxRegions.reduce((sum, r) => sum + r.taxableRevenue, 0);
  const totalCollected = taxRegions.reduce((sum, r) => sum + r.taxCollected, 0);

  return (
    <BillingPageShell
      title="Tax Overview"
      description="Fictional tax summary by region — for demonstration purposes only"
    >
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Tax Rate</TableHead>
              <TableHead>Taxable Revenue</TableHead>
              <TableHead>Tax Collected</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxRegions.map((r) => (
              <TableRow key={r.region}>
                <TableCell className="font-medium">{r.region}</TableCell>
                <TableCell>{r.rate}%</TableCell>
                <TableCell>{formatCurrency(r.taxableRevenue, { noDecimals: true })}</TableCell>
                <TableCell>{formatCurrency(r.taxCollected, { noDecimals: true })}</TableCell>
                <TableCell>
                  <StatusBadge status={r.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>{formatCurrency(totalTaxable, { noDecimals: true })}</TableCell>
              <TableCell>{formatCurrency(totalCollected, { noDecimals: true })}</TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </BillingPageShell>
  );
}
