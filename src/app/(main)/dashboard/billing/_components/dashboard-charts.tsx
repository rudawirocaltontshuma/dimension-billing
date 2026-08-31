"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  mrrTrend,
  paymentStatusBreakdown,
  revenueByPlan,
  revenueByRegion,
  subscriptionGrowth,
} from "../_data/mock-data";

const mrrConfig = {
  mrr: { label: "MRR", color: "var(--chart-1)" },
} satisfies ChartConfig;

const arrConfig = {
  arr: { label: "ARR", color: "var(--chart-2)" },
} satisfies ChartConfig;

const growthConfig = {
  active: { label: "Active", color: "var(--chart-1)" },
  new: { label: "New", color: "var(--chart-2)" },
  churned: { label: "Churned", color: "var(--chart-4)" },
} satisfies ChartConfig;

const planConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

const regionConfig = {
  revenue: { label: "Revenue", color: "var(--chart-3)" },
} satisfies ChartConfig;

const statusColors: Record<string, string> = {
  Successful: "var(--chart-1)",
  Pending: "var(--chart-3)",
  Failed: "var(--chart-4)",
  Refunded: "var(--chart-5)",
};

const paymentConfig = {
  count: { label: "Payments" },
} satisfies ChartConfig;

export function MrrTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MRR Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={mrrConfig} className="aspect-auto h-64 w-full">
          <AreaChart data={mrrTrend} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={48} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="mrr"
              type="monotone"
              fill="var(--color-mrr)"
              fillOpacity={0.2}
              stroke="var(--color-mrr)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ArrTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ARR Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={arrConfig} className="aspect-auto h-64 w-full">
          <LineChart data={mrrTrend} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={56} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="arr" type="monotone" stroke="var(--color-arr)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function SubscriptionGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={growthConfig} className="aspect-auto h-64 w-full">
          <BarChart data={subscriptionGrowth} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="new" fill="var(--color-new)" radius={4} stackId="a" />
            <Bar dataKey="churned" fill="var(--color-churned)" radius={4} stackId="b" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function RevenueByPlanChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={planConfig} className="aspect-auto h-64 w-full">
          <BarChart data={revenueByPlan} layout="vertical" margin={{ left: 12, right: 12 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
            <YAxis type="category" dataKey="plan" tickLine={false} axisLine={false} width={90} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function RevenueByRegionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={regionConfig} className="aspect-auto h-64 w-full">
          <BarChart data={revenueByRegion} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="region" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} interval={0} />
            <YAxis tickLine={false} axisLine={false} width={48} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function PaymentStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={paymentConfig} className="mx-auto aspect-square h-64">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={paymentStatusBreakdown}
              dataKey="count"
              nameKey="status"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={2}
            >
              {paymentStatusBreakdown.map((entry) => (
                <Cell key={entry.status} fill={statusColors[entry.status]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
