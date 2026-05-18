import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MobileActionBar } from "@/components/sections/mobile-action-bar";
import { getSiteSettings } from "@/lib/site-settings";

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <MobileActionBar settings={settings} />
    </div>
  );
}
