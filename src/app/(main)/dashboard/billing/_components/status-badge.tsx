import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  // Subscription
  Trial: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Past Due": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Paused: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/20",
  Cancelled: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  Expired: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  // Invoice
  Draft: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/20",
  Open: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Paid: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Overdue: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  Void: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  // Payment
  Successful: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Failed: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  Refunded: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20",
  // Customer
  "At Risk": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Churned: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  // Plan / Discount / Credit / Tax / Dunning extras
  Deprecated: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  Beta: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Applied: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Scheduled: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "In Progress": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Recovered: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Escalated: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  Compliant: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Review Needed": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Filed: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn("font-medium", colorMap[status] ?? "", className)}>
      {status}
    </Badge>
  );
}
