import { Clock3, MapPinned, ShieldCheck, Timer } from "lucide-react";

import { Container } from "@/components/layout/container";

const trustItems = [
  { title: "Yerinde keşif", icon: MapPinned },
  { title: "Hızlı teklif", icon: Timer },
  { title: "Zamanında teslim", icon: Clock3 },
  { title: "Güvenilir ekip", icon: ShieldCheck }
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-background">
      <Container className="grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/45 px-4 py-3"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-graphite-950 text-primary">
                <Icon className="size-4" />
              </span>
              <span className="text-sm font-bold text-foreground">
                {item.title}
              </span>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
