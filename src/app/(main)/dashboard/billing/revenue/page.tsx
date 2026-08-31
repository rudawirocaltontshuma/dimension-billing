import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import { BillingPageShell } from "../_components/billing-page-shell";
import { KpiCard } from "../_components/kpi-card";
import { arr, kpis } from "../_data/mock-data";
import { MrrArrChart, RevenueBridgeChart } from "./_components/revenue-charts";

export default function RevenuePage() {
  return (
    <BillingPageShell title="Revenue" description="Recurring revenue analytics and movement">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Current MRR" value={formatCurrency(kpis.mrr, { noDecimals: true })} icon={DollarSign} />
        <KpiCard label="Current ARR" value={formatCurrency(arr, { noDecimals: true })} icon={TrendingUp} />
        <KpiCard
          label="Net New MRR"
          value={formatCurrency(kpis.mrr * 0.1, { noDecimals: true })}
          icon={TrendingDown}
          hint="new + expansion - churn - contraction"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <MrrArrChart />
        <RevenueBridgeChart />
      </div>
    </BillingPageShell>
  );
}
