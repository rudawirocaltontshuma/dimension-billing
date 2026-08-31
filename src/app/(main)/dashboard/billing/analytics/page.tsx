import { BillingPageShell } from "../_components/billing-page-shell";
import { ComposedRevenueChart, PlanHealthRadarChart, RevenueTreemapChart } from "./_components/analytics-charts";
import { ChurnTrendChart } from "./_components/churn-chart";

export default function AnalyticsPage() {
  return (
    <BillingPageShell title="Analytics" description="Advanced, multi-dimensional billing analytics">
      <ComposedRevenueChart />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PlanHealthRadarChart />
        <RevenueTreemapChart />
      </div>
      <ChurnTrendChart />
    </BillingPageShell>
  );
}
