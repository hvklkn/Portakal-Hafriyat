import { Construction, Layers3, Shovel, Truck } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const icons = {
  Construction,
  Layers3,
  Shovel,
  Truck
};

type ServiceCardProps = {
  service: {
    title: string;
    slug: string;
    icon: string;
    summary: string;
  };
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = icons[service.icon as keyof typeof icons] ?? Construction;

  return (
    <Card className="group h-full overflow-hidden hover:border-signal-300 hover:shadow-soft">
      <CardHeader>
        <div className="mb-4 grid size-11 place-items-center rounded-md bg-graphite-950 text-primary transition-transform duration-200 group-hover:-translate-y-1">
          <Icon className="size-5" />
        </div>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={`/hizmetler/${service.slug}`}
          className="text-sm font-bold text-signal-700 underline-offset-4 hover:underline"
        >
          Detayları incele
        </Link>
      </CardContent>
    </Card>
  );
}
