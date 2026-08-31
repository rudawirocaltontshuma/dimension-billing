"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

import { mrrTrend, revenueBridge } from "../../_data/mock-data";

const mrrArrConfig = {
  mrr: { label: "MRR", color: "var(--chart-1)" },
  arr: { label: "ARR", color: "var(--chart-2)" },
} satisfies ChartConfig;

const bridgeConfig = {
  value: { label: "Amount" },
} satisfies ChartConfig;

function bridgeCellColor(entry: { stage: string; value: number }) {
  if (entry.stage === "Starting MRR" || entry.stage === "Ending MRR") return "var(--chart-2)";
  if (entry.value >= 0) return "var(--chart-1)";
  return "var(--chart-4)";
}

export function MrrArrChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MRR &amp; ARR</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={mrrArrConfig} className="aspect-auto h-72 w-full">
          <LineChart data={mrrTrend} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line yAxisId="left" dataKey="mrr" type="monotone" stroke="var(--color-mrr)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function RevenueBridgeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Bridge</CardTitle>
        <p className="text-muted-foreground text-sm">
          How MRR moved from {formatCurrency(revenueBridge[0].value, { noDecimals: true })} to{" "}
          {formatCurrency(revenueBridge[revenueBridge.length - 1].value, { noDecimals: true })}
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={bridgeConfig} className="aspect-auto h-72 w-full">
          <BarChart data={revenueBridge} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="stage" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} interval={0} />
            <YAxis tickLine={false} axisLine={false} width={56} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={4}>
              {revenueBridge.map((entry) => (
                <Cell key={entry.stage} fill={bridgeCellColor(entry)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
