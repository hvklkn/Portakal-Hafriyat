import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";

import { getPhoneHref, getWhatsAppHref } from "@/lib/contact-links";
import type { SiteSettings } from "@/lib/site-settings";

export function MobileActionBar({ settings }: { settings: SiteSettings }) {
  const actions = [
    {
      title: "Ara",
      href: getPhoneHref(settings.phone),
      icon: Phone,
      external: false
    },
    {
      title: "WhatsApp",
      href: getWhatsAppHref(settings.whatsapp),
      icon: MessageCircle,
      external: true
    },
    {
      title: "Teklif Al",
      href: "/teklif-al",
      icon: Send,
      external: false
    }
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-border bg-background/96 p-2 shadow-soft backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          const className =
            "flex h-12 items-center justify-center gap-2 rounded-md text-xs font-black transition-colors";

          return action.external ? (
            <a
              key={action.title}
              href={action.href}
              target="_blank"
              rel="noreferrer"
              className={`${className} bg-graphite-950 text-white`}
            >
              <Icon className="size-4 text-primary" />
              {action.title}
            </a>
          ) : (
            <Link
              key={action.title}
              href={action.href}
              className={
                action.title === "Teklif Al"
                  ? `${className} bg-primary text-graphite-950`
                  : `${className} bg-muted text-foreground`
              }
            >
              <Icon className="size-4" />
              {action.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
