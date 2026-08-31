import { BillingPageShell } from "../_components/billing-page-shell";
import { payments } from "../_data/mock-data";
import { PaymentsTable } from "./_components/payments-table";

export default function PaymentsPage() {
  return (
    <BillingPageShell title="Payments" description={`${payments.length} payment records`}>
      <PaymentsTable />
    </BillingPageShell>
  );
}
