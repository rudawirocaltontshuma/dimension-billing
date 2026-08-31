"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, getInitials } from "@/lib/utils";

import { StatusBadge } from "../../_components/status-badge";
import { TableToolbar } from "../../_components/table-toolbar";
import {
  type CustomerStatus,
  customers,
  cycleMonths,
  invoicesForCustomer,
  planById,
  subscriptionsForCustomer,
} from "../../_data/mock-data";

const statuses: CustomerStatus[] = ["Active", "At Risk", "Trial", "Churned"];

export function CustomersTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return customers.filter((c) => {
      const haystack = `${c.name} ${c.company} ${c.email}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = status === "all" || c.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="flex flex-col gap-3">
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, company, or email…"
        statusValue={status}
        onStatusChange={setStatus}
        statusOptions={statuses}
      />
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>MRR</TableHead>
              <TableHead>Subscriptions</TableHead>
              <TableHead>Invoices</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => {
              const plan = planById(c.planId);
              const subs = subscriptionsForCustomer(c.id);
              const activeSub = subs.find((s) => s.status === "Active");
              const mrr = activeSub ? activeSub.amount / cycleMonths(activeSub.billingCycle) : 0;
              const invoiceCount = invoicesForCustomer(c.id).length;
              return (
                <TableRow key={c.id}>
                  <TableCell>
                    <Link href={`/dashboard/billing/customers/${c.id}`} className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarFallback className="text-xs">{getInitials(c.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium hover:underline">{c.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{c.company}</TableCell>
                  <TableCell>{plan?.name}</TableCell>
                  <TableCell>{formatCurrency(mrr)}</TableCell>
                  <TableCell>{subs.length}</TableCell>
                  <TableCell>{invoiceCount}</TableCell>
                  <TableCell>
                    <StatusBadge status={c.status} />
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No customers match your filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
      <p className="text-muted-foreground text-xs">
        Showing {rows.length} of {customers.length} customers
      </p>
    </div>
  );
}
