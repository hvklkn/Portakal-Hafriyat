import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function AdminStatCard({
  title,
  value,
  description,
  icon: Icon
}: {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="h-full hover:border-signal-300 hover:shadow-soft">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-black tracking-normal">{value}</p>
          <p className="mt-2 text-xs font-medium leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-graphite-950 text-primary">
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  );
}
