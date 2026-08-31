import { BillingPageShell } from "../_components/billing-page-shell";
import { customers } from "../_data/mock-data";
import { CustomersTable } from "./_components/customers-table";

export default function CustomersPage() {
  return (
    <BillingPageShell title="Customers" description={`${customers.length} customers on Nexora Billing`}>
      <CustomersTable />
    </BillingPageShell>
  );
}
