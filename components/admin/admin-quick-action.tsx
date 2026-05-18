import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export function AdminQuickAction({
  title,
  description,
  href,
  icon: Icon
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-lg border border-border bg-background p-4 shadow-line transition-colors hover:border-signal-300 hover:shadow-soft"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-graphite-950 text-primary">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      </span>
      <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-signal-700" />
    </Link>
  );
}
