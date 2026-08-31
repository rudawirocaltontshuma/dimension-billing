// Nexora Billing — fictional, internally-consistent mock data.
// Everything here is generated deterministically (no Math.random at module scope leakage across renders)
// so server and client render the same output.

export type SubscriptionStatus = "Trial" | "Active" | "Past Due" | "Paused" | "Cancelled" | "Expired";
export type BillingCycle = "Monthly" | "Quarterly" | "Annual";
export type InvoiceStatus = "Draft" | "Open" | "Paid" | "Overdue" | "Void";
export type PaymentStatus = "Successful" | "Pending" | "Failed" | "Refunded";
export type PaymentMethod = "Visa •••• 4242" | "Mastercard •••• 4444" | "Amex •••• 1005" | "ACH Transfer" | "PayPal";
export type CustomerStatus = "Active" | "At Risk" | "Churned" | "Trial";
export type PlanStatus = "Active" | "Deprecated" | "Beta";
export type CreditStatus = "Active" | "Applied" | "Expired";
export type DiscountStatus = "Active" | "Scheduled" | "Expired";
export type DunningStatus = "In Progress" | "Recovered" | "Escalated" | "Cancelled";
export type TaxStatus = "Compliant" | "Review Needed" | "Filed";

export interface Plan {
  id: string;
  name: string;
  tier: "Starter" | "Growth" | "Professional" | "Enterprise";
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  billingCycles: BillingCycle[];
  status: PlanStatus;
  features: string[];
  limits: { seats: number | "Unlimited"; apiRequests: string; storage: string };
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  avatarSeed: string;
  region: "North America" | "Europe" | "APAC" | "LATAM" | "MEA";
  status: CustomerStatus;
  since: string; // ISO date
  planId: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  billingCycle: BillingCycle;
  amount: number;
  status: SubscriptionStatus;
  startDate: string;
  renewalDate: string;
  seats: number;
  trialEndsAt?: string;
  cancelledAt?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  subscriptionId: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  discountPct: number;
  taxPct: number;
  currency: string;
}

export interface Payment {
  id: string;
  customerId: string;
  invoiceId: string | null;
  amount: number;
  method: PaymentMethod;
  date: string;
  status: PaymentStatus;
}

export interface UsageRecord {
  customerId: string;
  metric: "API Requests" | "Storage (GB)" | "Active Users" | "Bandwidth (GB)" | "Transactions";
  month: string; // YYYY-MM
  value: number;
  limit: number;
}

export interface Credit {
  id: string;
  customerId: string;
  amount: number;
  reason: string;
  created: string;
  expiry: string;
  status: CreditStatus;
}

export interface Discount {
  id: string;
  name: string;
  code: string;
  type: "Percentage" | "Fixed Amount";
  value: number;
  usageCount: number;
  usageLimit: number;
  startDate: string;
  endDate: string;
  status: DiscountStatus;
}

export interface DunningCase {
  id: string;
  customerId: string;
  invoiceId: string;
  amount: number;
  reason: string;
  attempt: number;
  nextAction: string;
  nextActionDate: string;
  status: DunningStatus;
}

export interface TaxRegion {
  region: string;
  country: string;
  rate: number;
  taxableRevenue: number;
  taxCollected: number;
  status: TaxStatus;
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------
export const plans: Plan[] = [
  {
    id: "plan-starter",
    name: "Starter",
    tier: "Starter",
    description: "For solo founders and small teams getting started with billing automation.",
    monthlyPrice: 29,
    annualPrice: 290,
    billingCycles: ["Monthly", "Annual"],
    status: "Active",
    features: ["Up to 3 team seats", "500 invoices / month", "Basic revenue reporting", "Email support"],
    limits: { seats: 3, apiRequests: "10,000 / mo", storage: "5 GB" },
  },
  {
    id: "plan-growth",
    name: "Growth",
    tier: "Growth",
    description: "For growing SaaS teams that need usage-based billing and dunning automation.",
    monthlyPrice: 99,
    annualPrice: 990,
    billingCycles: ["Monthly", "Quarterly", "Annual"],
    status: "Active",
    features: [
      "Up to 15 team seats",
      "5,000 invoices / month",
      "Usage-based billing",
      "Automated dunning",
      "Priority email support",
    ],
    limits: { seats: 15, apiRequests: "150,000 / mo", storage: "50 GB" },
  },
  {
    id: "plan-professional",
    name: "Professional",
    tier: "Professional",
    description: "For scaling companies that need advanced revenue analytics and multi-currency tax.",
    monthlyPrice: 249,
    annualPrice: 2490,
    billingCycles: ["Monthly", "Quarterly", "Annual"],
    status: "Active",
    features: [
      "Up to 50 team seats",
      "Unlimited invoices",
      "Multi-currency & tax automation",
      "Revenue recognition",
      "Dedicated Slack channel",
      "SLA-backed support",
    ],
    limits: { seats: 50, apiRequests: "1,000,000 / mo", storage: "500 GB" },
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    tier: "Enterprise",
    description: "For large organizations with custom contracts, SSO, and dedicated infrastructure.",
    monthlyPrice: 799,
    annualPrice: 7990,
    billingCycles: ["Quarterly", "Annual"],
    status: "Active",
    features: [
      "Unlimited team seats",
      "Unlimited invoices",
      "Custom contract terms",
      "SSO & SCIM provisioning",
      "Dedicated CSM",
      "99.99% uptime SLA",
    ],
    limits: { seats: "Unlimited", apiRequests: "Unlimited", storage: "5 TB" },
  },
  {
    id: "plan-legacy-basic",
    name: "Legacy Basic",
    tier: "Starter",
    description: "Grandfathered legacy plan, no longer sold to new customers.",
    monthlyPrice: 19,
    annualPrice: 190,
    billingCycles: ["Monthly"],
    status: "Deprecated",
    features: ["Up to 2 team seats", "200 invoices / month", "Community support"],
    limits: { seats: 2, apiRequests: "5,000 / mo", storage: "2 GB" },
  },
];

export const planById = (id: string) => plans.find((p) => p.id === id);

// ---------------------------------------------------------------------------
// Deterministic PRNG helper so the module renders identically on server/client
// ---------------------------------------------------------------------------
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const pick = <T>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const firstNames = [
  "Ava",
  "Liam",
  "Noah",
  "Emma",
  "Oliver",
  "Sophia",
  "Elijah",
  "Isabella",
  "Lucas",
  "Mia",
  "Mason",
  "Amelia",
  "Ethan",
  "Harper",
  "James",
  "Evelyn",
  "Benjamin",
  "Abigail",
  "Henry",
  "Emily",
  "Alexander",
  "Ella",
  "Jack",
  "Scarlett",
  "William",
  "Grace",
  "Daniel",
  "Chloe",
  "Michael",
  "Victoria",
  "Owen",
  "Riley",
  "Sebastian",
  "Aria",
  "Matthew",
  "Zoey",
  "Julian",
  "Nora",
  "Wyatt",
  "Layla",
];
const lastNames = [
  "Anderson",
  "Baptiste",
  "Chen",
  "Dubois",
  "Ellison",
  "Farrow",
  "Grant",
  "Haddad",
  "Ibarra",
  "Jansen",
  "Kowalski",
  "Larsen",
  "Mensah",
  "Nakamura",
  "Osei",
  "Petrov",
  "Quintero",
  "Reyes",
  "Silva",
  "Thorne",
  "Ueda",
  "Villanueva",
  "Whitfield",
  "Xu",
  "Yamamoto",
  "Zimmer",
];
const companySuffix = [
  "Labs",
  "Systems",
  "Cloud",
  "Technologies",
  "Works",
  "Digital",
  "Analytics",
  "Networks",
  "Studio",
  "Group",
];
const companyRoot = [
  "Brightline",
  "Northstar",
  "Vertex",
  "Cobalt",
  "Lumina",
  "Ridgeway",
  "Solace",
  "Ember",
  "Halcyon",
  "Orbital",
  "Fernwood",
  "Meridian",
  "Ironclad",
  "Skyward",
  "Willowbrook",
  "Cascade",
  "Granite",
  "Nova",
  "Pinecrest",
  "Redwood",
  "Slate",
  "Tidewater",
  "Vantage",
  "Wellspring",
  "Zenith",
  "Anchorage",
  "Beacon",
  "Crestview",
  "Driftwood",
  "Elm Street",
  "Foxglove",
  "Glacier",
  "Harborview",
  "Ivy League",
  "Junction",
  "Keystone",
  "Lakeshore",
  "Moonlit",
  "Nimbus",
  "Outpost",
];
const regions: Customer["region"][] = ["North America", "Europe", "APAC", "LATAM", "MEA"];

const CUSTOMER_COUNT = 42;

export const customers: Customer[] = Array.from({ length: CUSTOMER_COUNT }, (_, i) => {
  const first = pick(firstNames);
  const last = pick(lastNames);
  const company = `${companyRoot[i % companyRoot.length]} ${pick(companySuffix)}`;
  const planWeights = [
    "plan-starter",
    "plan-starter",
    "plan-growth",
    "plan-growth",
    "plan-growth",
    "plan-professional",
    "plan-professional",
    "plan-enterprise",
    "plan-legacy-basic",
  ];
  const statusWeights: CustomerStatus[] = ["Active", "Active", "Active", "Active", "At Risk", "Trial", "Churned"];
  const startYear = 2022 + Math.floor(i / 15);
  const startMonth = randInt(0, 11);
  const startDay = randInt(1, 28);
  return {
    id: `cust-${String(i + 1).padStart(3, "0")}`,
    name: `${first} ${last}`,
    company,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, "")}.com`,
    avatarSeed: `${first}${last}${i}`,
    region: pick(regions),
    status: pick(statusWeights),
    since: new Date(Date.UTC(startYear, startMonth, startDay)).toISOString(),
    planId: pick(planWeights),
  };
});

export const customerById = (id: string) => customers.find((c) => c.id === id);

// ---------------------------------------------------------------------------
// Subscriptions — one primary subscription per customer, some with a second
// (add-on) subscription for realism.
// ---------------------------------------------------------------------------
const cycles: BillingCycle[] = ["Monthly", "Monthly", "Monthly", "Quarterly", "Annual"];
const subStatusForCustomer = (status: CustomerStatus): SubscriptionStatus => {
  switch (status) {
    case "Trial":
      return "Trial";
    case "Churned":
      return pick<SubscriptionStatus>(["Cancelled", "Expired"]);
    case "At Risk":
      return pick<SubscriptionStatus>(["Past Due", "Paused"]);
    default:
      return "Active";
  }
};

const cycleMonthsMap: Record<BillingCycle, number> = { Monthly: 1, Quarterly: 3, Annual: 12 };

export function cycleMonths(cycle: BillingCycle) {
  return cycleMonthsMap[cycle];
}

function priceForCycle(plan: Plan, cycle: BillingCycle) {
  if (cycle === "Annual") return plan.annualPrice;
  if (cycle === "Quarterly") return Math.round(plan.monthlyPrice * 3 * 0.95);
  return plan.monthlyPrice;
}

export const subscriptions: Subscription[] = customers.map((c, i) => {
  const plan = planById(c.planId) ?? plans[0];
  const cycle = pick(plan.billingCycles.length ? plan.billingCycles : cycles);
  const status = subStatusForCustomer(c.status);
  const start = new Date(c.since);
  const renewal = new Date(start);
  renewal.setUTCMonth(renewal.getUTCMonth() + cycleMonths(cycle));
  while (renewal.getTime() < Date.now() && status === "Active") {
    renewal.setUTCMonth(renewal.getUTCMonth() + cycleMonths(cycle));
  }
  const seats = randInt(1, typeof plan.limits.seats === "number" ? plan.limits.seats : 25);
  const sub: Subscription = {
    id: `sub-${String(i + 1).padStart(3, "0")}`,
    customerId: c.id,
    planId: plan.id,
    billingCycle: cycle,
    amount: priceForCycle(plan, cycle),
    status,
    startDate: start.toISOString(),
    renewalDate: renewal.toISOString(),
    seats,
  };
  if (status === "Trial") {
    const trialEnd = new Date(start);
    trialEnd.setUTCDate(trialEnd.getUTCDate() + 14);
    sub.trialEndsAt = trialEnd.toISOString();
  }
  if (status === "Cancelled" || status === "Expired") {
    const cancelled = new Date(renewal);
    cancelled.setUTCDate(cancelled.getUTCDate() - randInt(1, 20));
    sub.cancelledAt = cancelled.toISOString();
  }
  return sub;
});

export const subscriptionById = (id: string) => subscriptions.find((s) => s.id === id);
export const subscriptionsForCustomer = (customerId: string) =>
  subscriptions.filter((s) => s.customerId === customerId);

// ---------------------------------------------------------------------------
// Invoices — several per subscription, spanning the last ~9 months.
// ---------------------------------------------------------------------------
const invoiceStatusPool: InvoiceStatus[] = ["Paid", "Paid", "Paid", "Paid", "Open", "Overdue", "Draft", "Void"];

export const invoices: Invoice[] = [];
let invoiceCounter = 1000;

for (const sub of subscriptions) {
  const plan = planById(sub.planId) ?? plans[0];
  const months = cycleMonths(sub.billingCycle);
  const cyclesBack = sub.status === "Trial" ? 0 : randInt(2, 9);
  for (let k = cyclesBack; k >= 0; k--) {
    const issue = new Date(sub.startDate);
    issue.setUTCMonth(issue.getUTCMonth() + k * months);
    if (issue.getTime() > Date.now() + 1000 * 60 * 60 * 24 * 3) continue;
    const due = new Date(issue);
    due.setUTCDate(due.getUTCDate() + 14);
    invoiceCounter += 1;
    let status: InvoiceStatus = pick(invoiceStatusPool);
    if (k === 0) {
      if (sub.status === "Past Due") status = "Overdue";
      else if (sub.status === "Cancelled" || sub.status === "Expired") status = pick(["Paid", "Void"]);
      else if (due.getTime() < Date.now()) status = pick(["Paid", "Overdue"]);
      else status = pick(["Open", "Draft"]);
    } else {
      status = due.getTime() < Date.now() ? "Paid" : "Open";
    }
    invoices.push({
      id: `INV-${invoiceCounter}`,
      customerId: sub.customerId,
      subscriptionId: sub.id,
      issueDate: issue.toISOString(),
      dueDate: due.toISOString(),
      status,
      lineItems: [
        { description: `${plan.name} Plan — ${sub.billingCycle} subscription`, quantity: 1, unitPrice: sub.amount },
        ...(rand() > 0.7
          ? [{ description: "Additional seats", quantity: randInt(1, 5), unitPrice: randInt(5, 20) }]
          : []),
      ],
      discountPct: rand() > 0.8 ? pick([10, 15, 20]) : 0,
      taxPct: pick([0, 5, 7.5, 8.25, 19, 20]),
      currency: "USD",
    });
  }
}

export function invoiceTotals(inv: Invoice) {
  const subtotal = inv.lineItems.reduce((sum, li) => sum + li.quantity * li.unitPrice, 0);
  const discount = (subtotal * inv.discountPct) / 100;
  const taxable = subtotal - discount;
  const tax = (taxable * inv.taxPct) / 100;
  const total = taxable + tax;
  return { subtotal, discount, tax, total };
}

export const invoiceById = (id: string) => invoices.find((i) => i.id === id);
export const invoicesForCustomer = (customerId: string) => invoices.filter((i) => i.customerId === customerId);
export const invoicesForSubscription = (subscriptionId: string) =>
  invoices.filter((i) => i.subscriptionId === subscriptionId);

// ---------------------------------------------------------------------------
// Payments — one per Paid/Overdue-recovered invoice, plus some pending/failed.
// ---------------------------------------------------------------------------
const methods: PaymentMethod[] = ["Visa •••• 4242", "Mastercard •••• 4444", "Amex •••• 1005", "ACH Transfer", "PayPal"];
export const payments: Payment[] = [];
let paymentCounter = 5000;

for (const inv of invoices) {
  const { total } = invoiceTotals(inv);
  if (inv.status === "Paid") {
    paymentCounter += 1;
    const date = new Date(inv.dueDate);
    date.setUTCDate(date.getUTCDate() - randInt(0, 10));
    payments.push({
      id: `PAY-${paymentCounter}`,
      customerId: inv.customerId,
      invoiceId: inv.id,
      amount: total,
      method: pick(methods),
      date: date.toISOString(),
      status: rand() > 0.95 ? "Refunded" : "Successful",
    });
  } else if (inv.status === "Overdue") {
    paymentCounter += 1;
    payments.push({
      id: `PAY-${paymentCounter}`,
      customerId: inv.customerId,
      invoiceId: inv.id,
      amount: total,
      method: pick(methods),
      date: inv.dueDate,
      status: "Failed",
    });
  } else if (inv.status === "Open" && rand() > 0.6) {
    paymentCounter += 1;
    payments.push({
      id: `PAY-${paymentCounter}`,
      customerId: inv.customerId,
      invoiceId: inv.id,
      amount: total,
      method: pick(methods),
      date: new Date().toISOString(),
      status: "Pending",
    });
  }
}

export const paymentsForCustomer = (customerId: string) => payments.filter((p) => p.customerId === customerId);
export const paymentsForInvoice = (invoiceId: string) => payments.filter((p) => p.invoiceId === invoiceId);

// ---------------------------------------------------------------------------
// Usage records — last 6 months per active-ish customer, per metric.
// ---------------------------------------------------------------------------
const usageMetrics: UsageRecord["metric"][] = [
  "API Requests",
  "Storage (GB)",
  "Active Users",
  "Bandwidth (GB)",
  "Transactions",
];
const metricLimits: Record<UsageRecord["metric"], number> = {
  "API Requests": 1_000_000,
  "Storage (GB)": 500,
  "Active Users": 50,
  "Bandwidth (GB)": 2000,
  Transactions: 100_000,
};
const metricBase: Record<UsageRecord["metric"], number> = {
  "API Requests": 120_000,
  "Storage (GB)": 40,
  "Active Users": 8,
  "Bandwidth (GB)": 180,
  Transactions: 6000,
};

function monthKey(offset: number) {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - offset);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

const tierScale: Record<Plan["tier"], number> = { Enterprise: 6, Professional: 3, Growth: 1.4, Starter: 1 };

export const usageRecords: UsageRecord[] = [];
for (const c of customers.filter((c) => c.status !== "Churned")) {
  const plan = planById(c.planId) ?? plans[0];
  const scale = tierScale[plan.tier];
  for (let m = 5; m >= 0; m--) {
    for (const metric of usageMetrics) {
      const noise = 0.7 + rand() * 0.6;
      usageRecords.push({
        customerId: c.id,
        metric,
        month: monthKey(m),
        value: Math.round(metricBase[metric] * scale * noise * (1 + (5 - m) * 0.03)),
        limit: Math.round(metricLimits[metric] * scale),
      });
    }
  }
}

export const usageForCustomer = (customerId: string) => usageRecords.filter((u) => u.customerId === customerId);

// ---------------------------------------------------------------------------
// Credits
// ---------------------------------------------------------------------------
const creditReasons = [
  "Service outage compensation",
  "Downgrade proration",
  "Loyalty reward",
  "Referral bonus",
  "Goodwill adjustment",
  "Billing error correction",
];

export const credits: Credit[] = Array.from({ length: 24 }, (_, i) => {
  const customer = pick(customers);
  const created = new Date();
  created.setUTCDate(created.getUTCDate() - randInt(5, 240));
  const expiry = new Date(created);
  expiry.setUTCMonth(expiry.getUTCMonth() + 12);
  let status: CreditStatus;
  if (expiry.getTime() < Date.now()) {
    status = "Expired";
  } else if (rand() > 0.5) {
    status = "Applied";
  } else {
    status = "Active";
  }
  return {
    id: `CR-${1000 + i}`,
    customerId: customer.id,
    amount: randInt(10, 500),
    reason: pick(creditReasons),
    created: created.toISOString(),
    expiry: expiry.toISOString(),
    status,
  };
});

// ---------------------------------------------------------------------------
// Discounts
// ---------------------------------------------------------------------------
export const discounts: Discount[] = [
  {
    id: "disc-001",
    name: "New Year Launch",
    code: "NEXORA2026",
    type: "Percentage",
    value: 20,
    usageCount: 184,
    usageLimit: 500,
    startDate: "2026-01-01T00:00:00Z",
    endDate: "2026-02-15T00:00:00Z",
    status: "Expired",
  },
  {
    id: "disc-002",
    name: "Annual Plan Switch",
    code: "GOANNUAL",
    type: "Percentage",
    value: 15,
    usageCount: 342,
    usageLimit: 1000,
    startDate: "2026-03-01T00:00:00Z",
    endDate: "2026-12-31T00:00:00Z",
    status: "Active",
  },
  {
    id: "disc-003",
    name: "Referral Credit",
    code: "REFER25",
    type: "Fixed Amount",
    value: 25,
    usageCount: 96,
    usageLimit: 250,
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-12-31T00:00:00Z",
    status: "Active",
  },
  {
    id: "disc-004",
    name: "Enterprise Pilot",
    code: "ENTPILOT",
    type: "Percentage",
    value: 30,
    usageCount: 12,
    usageLimit: 20,
    startDate: "2026-06-01T00:00:00Z",
    endDate: "2026-09-30T00:00:00Z",
    status: "Active",
  },
  {
    id: "disc-005",
    name: "Black Friday 2026",
    code: "NEXORABF26",
    type: "Percentage",
    value: 35,
    usageCount: 0,
    usageLimit: 800,
    startDate: "2026-11-24T00:00:00Z",
    endDate: "2026-12-01T00:00:00Z",
    status: "Scheduled",
  },
  {
    id: "disc-006",
    name: "Startup Grant",
    code: "STARTUP50",
    type: "Fixed Amount",
    value: 50,
    usageCount: 61,
    usageLimit: 150,
    startDate: "2026-02-01T00:00:00Z",
    endDate: "2026-12-31T00:00:00Z",
    status: "Active",
  },
];

// ---------------------------------------------------------------------------
// Dunning — built from Failed payments / Overdue invoices.
// ---------------------------------------------------------------------------
const failureReasons = [
  "Insufficient funds",
  "Card expired",
  "Card declined by issuer",
  "Bank account closed",
  "Fraud suspicion flagged",
  "3DS authentication failed",
];
const dunningNextActions = [
  "Retry charge in 3 days",
  "Send payment reminder email",
  "Escalate to account manager",
  "Downgrade plan if unresolved",
  "Suspend service access",
];

export const dunningCases: DunningCase[] = invoices
  .filter((inv) => inv.status === "Overdue")
  .map((inv, i) => {
    const { total } = invoiceTotals(inv);
    const attempt = randInt(1, 4);
    const statusPool: DunningStatus[] = attempt >= 4 ? ["Escalated", "Cancelled"] : ["In Progress", "Recovered"];
    const nextDate = new Date();
    nextDate.setUTCDate(nextDate.getUTCDate() + randInt(1, 7));
    return {
      id: `DUN-${2000 + i}`,
      customerId: inv.customerId,
      invoiceId: inv.id,
      amount: total,
      reason: pick(failureReasons),
      attempt,
      nextAction: pick(dunningNextActions),
      nextActionDate: nextDate.toISOString(),
      status: pick(statusPool),
    };
  });

// ---------------------------------------------------------------------------
// Tax overview
// ---------------------------------------------------------------------------
export const taxRegions: TaxRegion[] = [
  { region: "United States", country: "US", rate: 0, taxableRevenue: 412_500, taxCollected: 0, status: "Compliant" },
  {
    region: "California, US",
    country: "US",
    rate: 8.25,
    taxableRevenue: 96_400,
    taxCollected: 7953,
    status: "Compliant",
  },
  { region: "New York, US", country: "US", rate: 8.0, taxableRevenue: 71_200, taxCollected: 5696, status: "Filed" },
  {
    region: "United Kingdom",
    country: "GB",
    rate: 20,
    taxableRevenue: 58_900,
    taxCollected: 11_780,
    status: "Compliant",
  },
  { region: "Germany", country: "DE", rate: 19, taxableRevenue: 64_300, taxCollected: 12_217, status: "Compliant" },
  { region: "France", country: "FR", rate: 20, taxableRevenue: 41_100, taxCollected: 8220, status: "Review Needed" },
  { region: "Australia", country: "AU", rate: 10, taxableRevenue: 33_450, taxCollected: 3345, status: "Filed" },
  { region: "Singapore", country: "SG", rate: 9, taxableRevenue: 27_800, taxCollected: 2502, status: "Compliant" },
  { region: "Brazil", country: "BR", rate: 17, taxableRevenue: 19_600, taxCollected: 3332, status: "Review Needed" },
  {
    region: "Canada (Ontario)",
    country: "CA",
    rate: 13,
    taxableRevenue: 22_900,
    taxCollected: 2977,
    status: "Compliant",
  },
];

// ---------------------------------------------------------------------------
// Derived KPI / chart-ready aggregates
// ---------------------------------------------------------------------------
const activeSubs = subscriptions.filter((s) => s.status === "Active" || s.status === "Trial");

export const kpis = {
  mrr: subscriptions
    .filter((s) => s.status === "Active")
    .reduce((sum, s) => sum + s.amount / cycleMonths(s.billingCycle), 0),
  activeSubscriptions: subscriptions.filter((s) => s.status === "Active").length,
  trialSubscriptions: subscriptions.filter((s) => s.status === "Trial").length,
  newSubscriptionsThisMonth: subscriptions.filter((s) => {
    const d = new Date(s.startDate);
    const now = new Date();
    return d.getUTCFullYear() === now.getUTCFullYear() && d.getUTCMonth() === now.getUTCMonth();
  }).length,
  churnedSubscriptions: subscriptions.filter((s) => s.status === "Cancelled" || s.status === "Expired").length,
  pastDue: subscriptions.filter((s) => s.status === "Past Due").length,
  outstandingInvoices: invoices.filter((i) => i.status === "Open" || i.status === "Overdue").length,
  outstandingAmount: invoices
    .filter((i) => i.status === "Open" || i.status === "Overdue")
    .reduce((sum, i) => sum + invoiceTotals(i).total, 0),
  failedPayments: payments.filter((p) => p.status === "Failed").length,
};

kpis satisfies Record<string, number>;

export const arr = kpis.mrr * 12;
export const totalCustomers = customers.length;
export const churnRate = Number(((kpis.churnedSubscriptions / Math.max(subscriptions.length, 1)) * 100).toFixed(1));
export const arpu = Number((kpis.mrr / Math.max(kpis.activeSubscriptions, 1)).toFixed(2));

export const mrrTrend = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - (11 - i));
  const label = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const growth = 1 + i * 0.045;
  const mrr = Math.round((kpis.mrr / 1.6) * growth * (0.94 + rand() * 0.08));
  return { month: label, mrr, arr: mrr * 12 };
});

export const subscriptionGrowth = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - (11 - i));
  const label = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const base = Math.round(subscriptions.length * (0.55 + i * 0.04));
  const churned = Math.max(1, Math.round(base * 0.03 * (0.7 + rand() * 0.6)));
  const newSubs = Math.max(2, Math.round(base * 0.08 * (0.7 + rand() * 0.6)));
  return { month: label, active: base, new: newSubs, churned };
});

export const revenueByPlan = plans
  .filter((p) => p.status !== "Deprecated")
  .map((plan) => {
    const subs = subscriptions.filter((s) => s.planId === plan.id && s.status === "Active");
    return {
      plan: plan.name,
      revenue: Math.round(subs.reduce((sum, s) => sum + s.amount / cycleMonths(s.billingCycle), 0)),
      subscribers: subs.length,
    };
  });

export const revenueByRegion = regions.map((region) => {
  const regionCustomers = customers.filter((c) => c.region === region).map((c) => c.id);
  const revenue = subscriptions
    .filter((s) => s.status === "Active" && regionCustomers.includes(s.customerId))
    .reduce((sum, s) => sum + s.amount / cycleMonths(s.billingCycle), 0);
  return { region, revenue: Math.round(revenue) };
});

export const paymentStatusBreakdown = (["Successful", "Pending", "Failed", "Refunded"] as PaymentStatus[]).map(
  (status) => ({
    status,
    count: payments.filter((p) => p.status === status).length,
  }),
);

export const revenueBridge = [
  { stage: "Starting MRR", value: Math.round(kpis.mrr * 0.82) },
  { stage: "New Business", value: Math.round(kpis.mrr * 0.14) },
  { stage: "Expansion", value: Math.round(kpis.mrr * 0.09) },
  { stage: "Contraction", value: -Math.round(kpis.mrr * 0.05) },
  { stage: "Churn", value: -Math.round(kpis.mrr * 0.08) },
  { stage: "Ending MRR", value: Math.round(kpis.mrr) },
];

export const usageTrend = Array.from({ length: 6 }, (_, i) => {
  const key = monthKey(5 - i);
  const label = new Date(`${key}-01T00:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const totalApi = usageRecords
    .filter((u) => u.metric === "API Requests" && u.month === key)
    .reduce((s, u) => s + u.value, 0);
  const totalStorage = usageRecords
    .filter((u) => u.metric === "Storage (GB)" && u.month === key)
    .reduce((s, u) => s + u.value, 0);
  const totalTx = usageRecords
    .filter((u) => u.metric === "Transactions" && u.month === key)
    .reduce((s, u) => s + u.value, 0);
  return { month: label, apiRequests: totalApi, storage: totalStorage, transactions: totalTx };
});

export const usageByPlan = plans
  .filter((p) => p.status !== "Deprecated")
  .map((plan) => {
    const planCustomerIds = customers.filter((c) => c.planId === plan.id).map((c) => c.id);
    const latestMonth = monthKey(0);
    const apiUsage = usageRecords
      .filter((u) => u.metric === "API Requests" && u.month === latestMonth && planCustomerIds.includes(u.customerId))
      .reduce((s, u) => s + u.value, 0);
    return { plan: plan.name, apiRequests: apiUsage };
  });

export const usageByCustomer = customers
  .filter((c) => c.status !== "Churned")
  .map((c) => {
    const latestMonth = monthKey(0);
    const apiUsage = usageRecords
      .filter((u) => u.customerId === c.id && u.metric === "API Requests" && u.month === latestMonth)
      .reduce((s, u) => s + u.value, 0);
    return { customer: c.company, apiRequests: apiUsage };
  })
  .sort((a, b) => b.apiRequests - a.apiRequests)
  .slice(0, 10);

export const churnTrend = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - (11 - i));
  const label = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return { month: label, churnRate: Number((1.2 + rand() * 2.5 - i * 0.03).toFixed(2)) };
});

activeSubs satisfies Subscription[];
