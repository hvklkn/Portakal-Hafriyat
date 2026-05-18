"use client";

import Link from "next/link";
import { Eye, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

type AdminHeaderProps = {
  title: string;
  description: string;
  adminEmail?: string;
  onMenuClick: () => void;
};

export function AdminHeader({
  title,
  description,
  adminEmail,
  onMenuClick
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex min-h-20 items-center justify-between gap-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Admin menüyü aç"
            onClick={onMenuClick}
          >
            <Menu />
          </Button>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-black tracking-normal">
              {title}
            </h1>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-bold uppercase tracking-normal text-muted-foreground">
              Admin
            </p>
            <p className="max-w-48 truncate text-sm font-bold">
              {adminEmail ?? "Yönetici"}
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank" rel="noreferrer">
              <Eye />
              <span className="hidden sm:inline">Siteye git</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
