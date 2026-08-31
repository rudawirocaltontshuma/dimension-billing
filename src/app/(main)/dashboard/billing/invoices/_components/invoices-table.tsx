"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { format } from "date-fns";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

import { StatusBadge } from "../../_components/status-badge";
import { TableToolbar } from "../../_components/table-toolbar";
import { customerById, type InvoiceStatus, invoices, invoiceTotals } from "../../_data/mock-data";

const statuses: InvoiceStatus[] = ["Draft", "Open", "Paid", "Overdue", "Void"];

export function InvoicesTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return [...invoices]
      .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
      .filter((inv) => {
        const customer = customerById(inv.customerId);
        const haystack = `${inv.id} ${customer?.name} ${customer?.company}`.toLowerCase();
        const matchesSearch = haystack.includes(search.toLowerCase());
        const matchesStatus = status === "all" || inv.status === status;
        return matchesSearch && matchesStatus;
      });
  }, [search, status]);

  return (
    <div className="flex flex-col gap-3">
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by invoice #, customer, or company…"
        statusValue={status}
        onStatusChange={setStatus}
        statusOptions={statuses}
      />
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((inv) => {
              const customer = customerById(inv.customerId);
              return (
                <TableRow key={inv.id}>
                  <TableCell>
                    <Link href={`/dashboard/billing/invoices/${inv.id}`} className="font-medium hover:underline">
                      {inv.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {customer?.name}
                    <div className="text-muted-foreground text-xs">{customer?.company}</div>
                  </TableCell>
                  <TableCell>{format(new Date(inv.issueDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(new Date(inv.dueDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>{formatCurrency(invoiceTotals(inv).total)}</TableCell>
                  <TableCell>
                    <StatusBadge status={inv.status} />
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No invoices match your filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
      <p className="text-muted-foreground text-xs">
        Showing {rows.length} of {invoices.length} invoices
      </p>
    </div>
  );
}
