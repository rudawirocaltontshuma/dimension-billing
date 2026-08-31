"use client";

import { Download, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function InvoiceActions({ invoiceId }: { invoiceId: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          toast.info("This is a demo — downloading is not available.", { description: `${invoiceId}.pdf` })
        }
      >
        <Download />
        Download
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.success("Demo only — no email was actually sent.", { description: `Invoice ${invoiceId}` })
        }
      >
        <Send />
        Send to customer
      </Button>
    </div>
  );
}
