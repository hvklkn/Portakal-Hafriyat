import { cn } from "@/lib/utils";

type StatusPillProps = {
  children: React.ReactNode;
  className?: string;
};

export function StatusPill({ children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-signal-200 bg-signal-50 px-3 py-1 text-xs font-semibold text-signal-800",
        className
      )}
    >
      {children}
    </span>
  );
}
