import type { Metadata } from "next";

import type { SiteSettings } from "@/lib/site-settings";

const defaultSiteUrl = "http://localhost:3000";

export function getSiteUrl(path = "/") {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl
  ).replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

export function getMetadataBase() {
  return new URL(getSiteUrl("/"));
}

export function getSeoTitle(settings: SiteSettings) {
  return settings.seoTitle?.trim() || settings.companyName;
}

export function getSeoDescription(settings: SiteSettings) {
  return settings.seoDescription?.trim() || settings.description;
}

export function createRootMetadata(settings: SiteSettings): Metadata {
  const title = getSeoTitle(settings);
  const description = getSeoDescription(settings);
  const siteUrl = getSiteUrl("/");
  const imageUrl = getAbsoluteUrl(
    settings.heroImageUrl || "/images/hero-excavation.png"
  );

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: title,
      template: `%s | ${settings.companyName}`
    },
    description,
    applicationName: settings.companyName,
    alternates: {
      canonical: siteUrl
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: siteUrl,
      siteName: settings.companyName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: settings.companyName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg"
    }
  };
}

export function createPageMetadata({
  settings,
  title,
  description,
  path,
  image,
  absoluteTitle = false
}: {
  settings: SiteSettings;
  title: string;
  description: string;
  path: string;
  image?: string | null;
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = getSiteUrl(path);
  const imageUrl = getAbsoluteUrl(
    image || settings.heroImageUrl || "/images/hero-excavation.png"
  );

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: canonical,
      siteName: settings.companyName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function createLocalBusinessJsonLd(settings: SiteSettings) {
  const siteUrl = getSiteUrl("/");
  const sameAs = [settings.instagramUrl, settings.facebookUrl].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/ConstructionBusiness",
    name: settings.companyName,
    description: getSeoDescription(settings),
    url: siteUrl,
    telephone: settings.phone,
    image: getAbsoluteUrl(
      settings.heroImageUrl || "/images/hero-excavation.png"
    ),
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressCountry: "TR"
    },
    hasMap: settings.googleMapsUrl || undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: settings.phone,
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: ["tr"]
      },
      settings.whatsapp
        ? {
            "@type": "ContactPoint",
            telephone: settings.whatsapp,
            contactType: "WhatsApp",
            areaServed: "TR",
            availableLanguage: ["tr"]
          }
        : null
    ].filter(Boolean),
    serviceType: [
      "Hafriyat",
      "Temel Kazısı",
      "Moloz Taşıma",
      "Dolgu İşleri",
      "Arazi Düzenleme",
      "İş Makinesi Kiralama"
    ]
  };
}

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function getAbsoluteUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return getSiteUrl(value);
}
