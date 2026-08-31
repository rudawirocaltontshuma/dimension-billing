"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { format } from "date-fns";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { StatusBadge } from "../../_components/status-badge";
import { TableToolbar } from "../../_components/table-toolbar";
import { customerById, planById, type SubscriptionStatus, subscriptions } from "../../_data/mock-data";

const statuses: SubscriptionStatus[] = ["Trial", "Active", "Past Due", "Paused", "Cancelled", "Expired"];

export function SubscriptionsTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return subscriptions.filter((s) => {
      const customer = customerById(s.customerId);
      const plan = planById(s.planId);
      const haystack = `${customer?.name} ${customer?.company} ${plan?.name} ${s.id}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = status === "all" || s.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="flex flex-col gap-3">
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by customer, company, or plan…"
        statusValue={status}
        onStatusChange={setStatus}
        statusOptions={statuses}
      />
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Billing Cycle</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Renewal Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((sub) => {
              const customer = customerById(sub.customerId);
              const plan = planById(sub.planId);
              return (
                <TableRow key={sub.id}>
                  <TableCell>
                    <Link href={`/dashboard/billing/subscriptions/${sub.id}`} className="font-medium hover:underline">
                      {customer?.name}
                    </Link>
                    <div className="text-muted-foreground text-xs">{customer?.company}</div>
                  </TableCell>
                  <TableCell>{plan?.name}</TableCell>
                  <TableCell>{sub.billingCycle}</TableCell>
                  <TableCell>{formatCurrency(sub.amount)}</TableCell>
                  <TableCell>{format(new Date(sub.startDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(new Date(sub.renewalDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <StatusBadge status={sub.status} />
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No subscriptions match your filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
      <p className="text-muted-foreground text-xs">
        Showing {rows.length} of {subscriptions.length} subscriptions
      </p>
    </div>
  );
}
