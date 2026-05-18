import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

export function AdminEmptyState({
  title,
  description,
  icon: Icon = Inbox,
  className
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-border bg-muted/45 p-8 text-center",
        className
      )}
    >
      <div className="mx-auto grid size-12 place-items-center rounded-md bg-graphite-950 text-primary">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 text-lg font-black tracking-normal">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
