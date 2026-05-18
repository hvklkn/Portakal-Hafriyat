import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingLevel?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  headingLevel = "h2",
  className
}: SectionHeaderProps) {
  const Heading = headingLevel;

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-normal text-signal-600">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl font-black tracking-normal text-foreground sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
