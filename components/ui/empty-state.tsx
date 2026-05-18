import { Construction } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  className
}: {
  title: string;
  description: string;
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
        <Construction className="size-5" />
      </div>
      <h2 className="mt-5 text-xl font-black tracking-normal">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
