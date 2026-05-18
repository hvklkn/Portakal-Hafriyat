import { Container } from "@/components/layout/container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  className
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-graphite-950 py-14 text-white sm:py-18 lg:py-20",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(245,158,11,0.20),transparent_34%),linear-gradient(135deg,rgba(11,13,16,0.98),rgba(23,26,31,0.92)_56%,rgba(11,13,16,1))]" />
      <Container className="relative z-10">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-7" /> : null}
        {eyebrow ? (
          <p className="mb-3 text-sm font-bold uppercase tracking-normal text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}
