import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SupportCard() {
  return (
    <Card size="sm" className="overflow-hidden shadow-none group-data-[collapsible=icon]:hidden">
      <CardHeader className="min-w-0 px-4">
        <CardTitle className="truncate text-sm">Frontend demo</CardTitle>
        <CardDescription className="line-clamp-3">
          All billing, subscription, and customer data on this platform is fictional and generated locally for
          demonstration purposes.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
