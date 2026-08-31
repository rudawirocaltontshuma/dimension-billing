import { Activity, Database, HardDrive, Users, Zap } from "lucide-react";

import { BillingPageShell } from "../_components/billing-page-shell";
import { KpiCard } from "../_components/kpi-card";
import { UsageByCustomerChart, UsageByPlanChart, UsageTrendChart } from "./_components/usage-charts";
import { monthKeyForToday, usageMetricTotals } from "./_data/aggregates";

export default function UsagePage() {
  return (
    <BillingPageShell title="Usage" description={`Platform usage across all customers for ${monthKeyForToday}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="API Requests" value={usageMetricTotals["API Requests"]} icon={Zap} hint="this month" />
        <KpiCard label="Storage" value={usageMetricTotals["Storage (GB)"]} icon={HardDrive} hint="this month" />
        <KpiCard label="Active Users" value={usageMetricTotals["Active Users"]} icon={Users} hint="this month" />
        <KpiCard label="Bandwidth" value={usageMetricTotals["Bandwidth (GB)"]} icon={Activity} hint="this month" />
        <KpiCard label="Transactions" value={usageMetricTotals.Transactions} icon={Database} hint="this month" />
      </div>

      <UsageTrendChart />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <UsageByPlanChart />
        <UsageByCustomerChart />
      </div>
    </BillingPageShell>
  );
}
