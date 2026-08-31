"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { churnTrend } from "../../_data/mock-data";

const config = {
  churnRate: { label: "Churn Rate", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function ChurnTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Churn Rate Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-64 w-full">
          <LineChart data={churnTrend} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={40} tickFormatter={(v) => `${v}%`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="churnRate" type="monotone" stroke="var(--color-churnRate)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
