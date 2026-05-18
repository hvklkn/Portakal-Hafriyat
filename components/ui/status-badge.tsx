import { cn } from "@/lib/utils";

const statusLabels = {
  PLANNED: "Planlandı",
  IN_PROGRESS: "Devam Ediyor",
  COMPLETED: "Tamamlandı"
};

const statusStyles = {
  PLANNED: "border-graphite-200 bg-graphite-50 text-graphite-700",
  IN_PROGRESS: "border-signal-200 bg-signal-50 text-signal-800",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-800"
};

type StatusBadgeProps = {
  status: keyof typeof statusLabels;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
