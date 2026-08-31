import { type UsageRecord, usageRecords } from "../../_data/mock-data";

const now = new Date();
export const monthKeyForToday = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;

function totalFor(metric: UsageRecord["metric"]) {
  return usageRecords
    .filter((u) => u.metric === metric && u.month === monthKeyForToday)
    .reduce((sum, u) => sum + u.value, 0);
}

export const usageMetricTotals: Record<UsageRecord["metric"], string> = {
  "API Requests": totalFor("API Requests").toLocaleString(),
  "Storage (GB)": `${totalFor("Storage (GB)").toLocaleString()} GB`,
  "Active Users": totalFor("Active Users").toLocaleString(),
  "Bandwidth (GB)": `${totalFor("Bandwidth (GB)").toLocaleString()} GB`,
  Transactions: totalFor("Transactions").toLocaleString(),
};
