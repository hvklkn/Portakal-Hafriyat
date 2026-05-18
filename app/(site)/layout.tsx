import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MobileActionBar } from "@/components/sections/mobile-action-bar";
import { createLocalBusinessJsonLd, stringifyJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const localBusinessJsonLd = createLocalBusinessJsonLd(settings);

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(localBusinessJsonLd)
        }}
      />
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <MobileActionBar settings={settings} />
    </div>
  );
}
