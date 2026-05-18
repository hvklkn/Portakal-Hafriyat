"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { publicNavItems } from "@/lib/constants";
import type { SiteSettings } from "@/lib/site-settings";
import { cn } from "@/lib/utils";

type NavbarProps = {
  settings: SiteSettings;
};

export function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const phoneHref = `tel:${settings.phone.replaceAll(" ", "")}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/92 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-ring flex items-center gap-3 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded-md bg-accent text-sm font-black text-primary">
            PH
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-black uppercase tracking-normal">
              {settings.companyName}
            </span>
            <span className="mt-1 text-xs font-medium text-muted-foreground">
              Hafriyat ve altyapi
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {publicNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === item.href && "bg-muted text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a href={phoneHref}>
              <Phone />
              {settings.phone}
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/teklif-al">
              Teklif Al
              <ChevronRight />
            </Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={isOpen ? "Menuyu kapat" : "Menuyu ac"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container grid gap-2 py-4">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring rounded-md px-3 py-3 text-sm font-semibold text-muted-foreground",
                  pathname === item.href && "bg-muted text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/teklif-al" onClick={() => setIsOpen(false)}>
                Teklif Al
                <ChevronRight />
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
