import { BillingPageShell } from "../_components/billing-page-shell";
import { invoices } from "../_data/mock-data";
import { InvoicesTable } from "./_components/invoices-table";

export default function InvoicesPage() {
  return (
    <BillingPageShell title="Invoices" description={`${invoices.length} invoices generated to date`}>
      <InvoicesTable />
    </BillingPageShell>
  );
}
