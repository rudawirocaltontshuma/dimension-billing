import { BillingPageShell } from "../_components/billing-page-shell";
import { BillingSettingsForm } from "./_components/billing-settings-form";

export default function BillingSettingsPage() {
  return (
    <BillingPageShell
      title="Billing Settings"
      description="Configure invoicing, tax, dunning, and notification defaults"
    >
      <BillingSettingsForm />
    </BillingPageShell>
  );
}
