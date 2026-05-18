import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type ResourcePlaceholderProps = {
  title: string;
  description: string;
  actionLabel: string;
};

export function ResourcePlaceholder({
  title,
  description,
  actionLabel
}: ResourcePlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted-foreground">
          Prisma modeli ve route yapısı hazır. CRUD ekranları sonraki adımda bu
          alana bağlanacak.
        </p>
        <Button type="button" disabled>
          <Plus />
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
