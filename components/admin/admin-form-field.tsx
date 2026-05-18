import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AdminFormField({
  label,
  error,
  hint,
  children,
  className
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label>{label}</Label>
      {children}
      {hint && !error ? (
        <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
