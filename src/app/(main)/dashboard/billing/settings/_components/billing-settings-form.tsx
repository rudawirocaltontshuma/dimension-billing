"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function BillingSettingsForm() {
  const [invoicePrefix, setInvoicePrefix] = useState("INV-");
  const [currency, setCurrency] = useState("USD");
  const [autoTax, setAutoTax] = useState(true);
  const [autoCharge, setAutoCharge] = useState(true);
  const [dunningRetries, setDunningRetries] = useState("3");
  const [emailReceipts, setEmailReceipts] = useState(true);
  const [emailFailedPayments, setEmailFailedPayments] = useState(true);
  const [emailRenewalReminders, setEmailRenewalReminders] = useState(false);
  const [smartRetry, setSmartRetry] = useState(true);

  function save() {
    toast.success("Settings saved", { description: "This is a demo — no changes are persisted." });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Invoice formatting and default currency</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="invoice-prefix">Invoice number prefix</Label>
            <Input id="invoice-prefix" value={invoicePrefix} onChange={(e) => setInvoicePrefix(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="currency">Default currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD — US Dollar</SelectItem>
                <SelectItem value="EUR">EUR — Euro</SelectItem>
                <SelectItem value="GBP">GBP — British Pound</SelectItem>
                <SelectItem value="AUD">AUD — Australian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax &amp; Charging</CardTitle>
          <CardDescription>Automation for tax calculation and card charges</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SettingRow
            label="Automatic tax calculation"
            description="Apply regional tax rates automatically on new invoices"
            checked={autoTax}
            onChange={setAutoTax}
          />
          <SettingRow
            label="Auto-charge saved payment method"
            description="Charge the customer's default card on the renewal date"
            checked={autoCharge}
            onChange={setAutoCharge}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dunning Rules</CardTitle>
          <CardDescription>How failed payments are retried and escalated</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="retries">Retry attempts before suspension</Label>
            <Select value={dunningRetries} onValueChange={setDunningRetries}>
              <SelectTrigger id="retries" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 attempt</SelectItem>
                <SelectItem value="2">2 attempts</SelectItem>
                <SelectItem value="3">3 attempts</SelectItem>
                <SelectItem value="5">5 attempts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <SettingRow
              label="Smart retry scheduling"
              description="Use ML-optimized retry timing (demo)"
              checked={smartRetry}
              onChange={setSmartRetry}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Customer and internal email preferences</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SettingRow
            label="Email receipts to customers"
            description="Send a receipt automatically after a successful payment"
            checked={emailReceipts}
            onChange={setEmailReceipts}
          />
          <SettingRow
            label="Failed payment alerts"
            description="Notify the billing team when a payment fails"
            checked={emailFailedPayments}
            onChange={setEmailFailedPayments}
          />
          <SettingRow
            label="Renewal reminders"
            description="Remind customers 7 days before their subscription renews"
            checked={emailRenewalReminders}
            onChange={setEmailRenewalReminders}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save}>Save changes</Button>
      </div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  checked,
  onChange,
  className,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 rounded-lg border p-3 ${className ?? ""}`}>
      <div className="space-y-0.5">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
