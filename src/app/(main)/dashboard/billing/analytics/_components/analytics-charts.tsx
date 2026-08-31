"use client";

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Treemap,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { mrrTrend, plans, revenueByPlan, subscriptionGrowth, subscriptions } from "../../_data/mock-data";

const composedConfig = {
  mrr: { label: "MRR", color: "var(--chart-1)" },
  new: { label: "New Subs", color: "var(--chart-2)" },
} satisfies ChartConfig;

const radarConfig = {
  score: { label: "Score", color: "var(--chart-1)" },
} satisfies ChartConfig;

const treemapConfig = {
  size: { label: "Subscribers" },
} satisfies ChartConfig;

const treemapColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function ComposedRevenueChart() {
  const data = mrrTrend.map((m, i) => ({ month: m.month, mrr: m.mrr, new: subscriptionGrowth[i]?.new ?? 0 }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>MRR vs. New Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={composedConfig} className="aspect-auto h-72 w-full">
          <ComposedChart data={data} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              yAxisId="left"
              dataKey="mrr"
              type="monotone"
              fill="var(--color-mrr)"
              fillOpacity={0.15}
              stroke="var(--color-mrr)"
              strokeWidth={2}
            />
            <Bar yAxisId="right" dataKey="new" fill="var(--color-new)" radius={4} barSize={16} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function PlanHealthRadarChart() {
  const data = plans
    .filter((p) => p.status !== "Deprecated")
    .map((p) => {
      const subs = subscriptions.filter((s) => s.planId === p.id);
      const active = subs.filter((s) => s.status === "Active").length;
      const score = subs.length ? Math.round((active / subs.length) * 100) : 0;
      return { plan: p.name, score };
    });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Health (Active Rate)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={radarConfig} className="mx-auto aspect-square h-72">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="plan" tick={{ fontSize: 11 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar dataKey="score" fill="var(--color-score)" fillOpacity={0.4} stroke="var(--color-score)" />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface TreemapCellProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  index?: number;
}

function TreemapCell({ x = 0, y = 0, width = 0, height = 0, name, index = 0 }: TreemapCellProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        fill={treemapColors[index % treemapColors.length]}
        fillOpacity={0.8}
        stroke="var(--background)"
        strokeWidth={2}
      />
      {width > 60 && height > 24 ? (
        <text x={x + 8} y={y + 20} fontSize={12} fill="var(--card)" fontWeight={500}>
          {name}
        </text>
      ) : null}
    </g>
  );
}

export function RevenueTreemapChart() {
  const data = revenueByPlan.map((r) => ({ name: r.plan, size: Math.max(r.subscribers, 1) }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscribers by Plan (Treemap)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={treemapConfig} className="aspect-auto h-72 w-full">
          <Treemap data={data} dataKey="size" nameKey="name" content={<TreemapCell />} />
        </ChartContainer>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          {data.map((d, i) => (
            <span key={d.name} className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-full"
                style={{ background: treemapColors[i % treemapColors.length] }}
              />
              {d.name} ({d.size})
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
