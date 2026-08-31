import { BillingPageShell } from "../_components/billing-page-shell";
import { subscriptions } from "../_data/mock-data";
import { SubscriptionsTable } from "./_components/subscriptions-table";

export default function SubscriptionsPage() {
  return (
    <BillingPageShell
      title="Subscriptions"
      description={`${subscriptions.length} subscriptions across all customers and plans`}
    >
      <SubscriptionsTable />
    </BillingPageShell>
  );
}
