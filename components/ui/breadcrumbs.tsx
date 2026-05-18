import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap gap-2", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-white" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronRight className="size-4 text-primary" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
