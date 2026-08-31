"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { usageByCustomer, usageByPlan, usageTrend } from "../../_data/mock-data";

const trendConfig = {
  apiRequests: { label: "API Requests", color: "var(--chart-1)" },
} satisfies ChartConfig;

const planConfig = {
  apiRequests: { label: "API Requests", color: "var(--chart-2)" },
} satisfies ChartConfig;

const customerConfig = {
  apiRequests: { label: "API Requests", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function UsageTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Requests Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trendConfig} className="aspect-auto h-64 w-full">
          <AreaChart data={usageTrend} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(v) => `${Math.round(v / 1_000_000)}M`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="apiRequests"
              type="monotone"
              fill="var(--color-apiRequests)"
              fillOpacity={0.2}
              stroke="var(--color-apiRequests)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function UsageByPlanChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage by Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={planConfig} className="aspect-auto h-64 w-full">
          <BarChart data={usageByPlan} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="plan" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={56} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="apiRequests" fill="var(--color-apiRequests)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function UsageByCustomerChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers by Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={customerConfig} className="aspect-auto h-80 w-full">
          <BarChart data={usageByCustomer} layout="vertical" margin={{ left: 12, right: 12 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
            <YAxis
              type="category"
              dataKey="customer"
              tickLine={false}
              axisLine={false}
              width={130}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="apiRequests" fill="var(--color-apiRequests)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
