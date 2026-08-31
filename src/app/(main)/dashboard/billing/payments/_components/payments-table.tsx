"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { format } from "date-fns";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { StatusBadge } from "../../_components/status-badge";
import { TableToolbar } from "../../_components/table-toolbar";
import { customerById, type PaymentStatus, payments } from "../../_data/mock-data";

const statuses: PaymentStatus[] = ["Successful", "Pending", "Failed", "Refunded"];

export function PaymentsTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return [...payments]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((p) => {
        const customer = customerById(p.customerId);
        const haystack = `${p.id} ${p.invoiceId} ${customer?.name} ${customer?.company}`.toLowerCase();
        const matchesSearch = haystack.includes(search.toLowerCase());
        const matchesStatus = status === "all" || p.status === status;
        return matchesSearch && matchesStatus;
      });
  }, [search, status]);

  return (
    <div className="flex flex-col gap-3">
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by payment ID, invoice, or customer…"
        statusValue={status}
        onStatusChange={setStatus}
        statusOptions={statuses}
      />
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p) => {
              const customer = customerById(p.customerId);
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/billing/customers/${customer?.id}`} className="hover:underline">
                      {customer?.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {p.invoiceId ? (
                      <Link href={`/dashboard/billing/invoices/${p.invoiceId}`} className="hover:underline">
                        {p.invoiceId}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{formatCurrency(p.amount)}</TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell>{format(new Date(p.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} />
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No payments match your filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
      <p className="text-muted-foreground text-xs">
        Showing {rows.length} of {payments.length} payments
      </p>
    </div>
  );
}
