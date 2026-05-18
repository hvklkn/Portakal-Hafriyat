import { cn } from "@/lib/utils";

export function AdminTable({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">{children}</table>
      </div>
    </div>
  );
}

export function AdminTableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-muted text-left text-xs font-black uppercase tracking-normal text-muted-foreground">
      {children}
    </thead>
  );
}

export function AdminTableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-border last:border-b-0">{children}</tr>;
}

export function AdminTableHeader({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-black">{children}</th>;
}

export function AdminTableCell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={cn("px-4 py-4 align-middle", className)}>{children}</td>;
}
