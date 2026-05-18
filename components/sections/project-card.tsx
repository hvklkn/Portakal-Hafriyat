import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { PublicProject } from "@/lib/public-content";

export function ProjectCard({ project }: { project: PublicProject }) {
  return (
    <Card className="group h-full overflow-hidden hover:border-signal-300 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <CardHeader>
        <CardDescription className="inline-flex items-center gap-2">
          <MapPin className="size-4 text-signal-600" />
          {[project.district, project.location].filter(Boolean).join(" / ")}
          {project.year ? ` / ${project.year}` : ""}
        </CardDescription>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{project.summary}</p>
        <Link
          href={`/projeler/${project.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-signal-700 underline-offset-4 hover:underline"
        >
          Detayları İncele
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
