import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type ContactInfoCardProps = {
  title: string;
  value: string;
  href?: string;
  icon: LucideIcon;
};

export function ContactInfoCard({
  title,
  value,
  href,
  icon: Icon
}: ContactInfoCardProps) {
  const content = (
    <Card className="h-full transition-colors hover:border-signal-300 hover:shadow-soft">
      <CardContent className="flex items-center gap-4 p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-graphite-950 text-primary">
          <Icon className="size-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-muted-foreground">
            {title}
          </span>
          <span className="mt-1 block break-words font-bold">{value}</span>
        </span>
      </CardContent>
    </Card>
  );

  return href ? <a href={href}>{content}</a> : content;
}
