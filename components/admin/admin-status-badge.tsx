import type {
  AdminProjectStatus,
  AdminQuoteStatus
} from "@/lib/admin-dashboard";
import { cn } from "@/lib/utils";

const quoteStatusLabels: Record<AdminQuoteStatus, string> = {
  NEW: "Yeni",
  CONTACTED: "Görüşüldü",
  PRICED: "Fiyat Verildi",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal"
};

const projectStatusLabels: Record<AdminProjectStatus, string> = {
  PLANNED: "Planlandı",
  IN_PROGRESS: "Devam Ediyor",
  COMPLETED: "Tamamlandı"
};

const statusStyles = {
  neutral: "border-graphite-200 bg-graphite-50 text-graphite-700",
  active: "border-signal-200 bg-signal-50 text-signal-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  danger: "border-red-200 bg-red-50 text-red-700"
};

export function AdminQuoteStatusBadge({
  status,
  className
}: {
  status: AdminQuoteStatus;
  className?: string;
}) {
  const tone =
    status === "NEW"
      ? "active"
      : status === "COMPLETED"
        ? "success"
        : status === "CANCELLED"
          ? "danger"
          : "neutral";

  return <Badge label={quoteStatusLabels[status]} className={cn(statusStyles[tone], className)} />;
}

export function AdminProjectStatusBadge({
  status,
  className
}: {
  status: AdminProjectStatus;
  className?: string;
}) {
  const tone =
    status === "COMPLETED"
      ? "success"
      : status === "IN_PROGRESS"
        ? "active"
        : "neutral";

  return (
    <Badge label={projectStatusLabels[status]} className={cn(statusStyles[tone], className)} />
  );
}

export function AdminReadStatusBadge({
  isRead,
  className
}: {
  isRead: boolean;
  className?: string;
}) {
  return (
    <Badge
      label={isRead ? "Okundu" : "Okunmadı"}
      className={cn(isRead ? statusStyles.neutral : statusStyles.active, className)}
    />
  );
}

export function AdminServiceStatusBadge({
  isActive,
  className
}: {
  isActive: boolean;
  className?: string;
}) {
  return (
    <Badge
      label={isActive ? "Aktif" : "Pasif"}
      className={cn(isActive ? statusStyles.success : statusStyles.neutral, className)}
    />
  );
}

function Badge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold",
        className
      )}
    >
      {label}
    </span>
  );
}
