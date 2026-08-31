import { AlertTriangle, CreditCard, DollarSign, FileWarning, TrendingUp, UserPlus, Users, Wallet } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import { BillingPageShell } from "./_components/billing-page-shell";
import {
  ArrTrendChart,
  MrrTrendChart,
  PaymentStatusChart,
  RevenueByPlanChart,
  RevenueByRegionChart,
  SubscriptionGrowthChart,
} from "./_components/dashboard-charts";
import { KpiCard } from "./_components/kpi-card";
import { arpu, arr, churnRate, kpis } from "./_data/mock-data";

export default function BillingDashboardPage() {
  return (
    <BillingPageShell
      title="DIMENSION BILLING"
      description="SaaS Subscription & Billing Management Platform — executive overview"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="MRR"
          value={formatCurrency(kpis.mrr, { noDecimals: true })}
          icon={DollarSign}
          trend={{ value: "+8.2%", positive: true }}
          hint="vs. last month"
        />
        <KpiCard
          label="ARR"
          value={formatCurrency(arr, { noDecimals: true })}
          icon={TrendingUp}
          trend={{ value: "+11.4%", positive: true }}
          hint="vs. last quarter"
        />
        <KpiCard
          label="Active Subscriptions"
          value={kpis.activeSubscriptions.toString()}
          icon={Users}
          trend={{ value: "+4.1%", positive: true }}
          hint="vs. last month"
        />
        <KpiCard
          label="New Subscriptions"
          value={kpis.newSubscriptionsThisMonth.toString()}
          icon={UserPlus}
          hint="this month"
        />
        <KpiCard
          label="Churn Rate"
          value={`${churnRate}%`}
          icon={AlertTriangle}
          trend={{ value: "-0.3pp", positive: true }}
          hint="vs. last month"
        />
        <KpiCard label="ARPU" value={formatCurrency(arpu)} icon={Wallet} hint="per active subscription" />
        <KpiCard
          label="Outstanding Invoices"
          value={kpis.outstandingInvoices.toString()}
          icon={FileWarning}
          hint={formatCurrency(kpis.outstandingAmount, { noDecimals: true })}
        />
        <KpiCard label="Failed Payments" value={kpis.failedPayments.toString()} icon={CreditCard} hint="last 90 days" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <MrrTrendChart />
        <ArrTrendChart />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SubscriptionGrowthChart />
        <PaymentStatusChart />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RevenueByPlanChart />
        <RevenueByRegionChart />
      </div>
    </BillingPageShell>
  );
}
