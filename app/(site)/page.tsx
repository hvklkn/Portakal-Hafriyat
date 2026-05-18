import { ContactCTA } from "@/components/sections/contact-cta";
import { FAQSection } from "@/components/sections/faq-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { FleetSection } from "@/components/sections/fleet-section";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { HeroSection } from "@/components/sections/hero-section";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { ServicesPreview } from "@/components/sections/services-preview";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { getHomeContent } from "@/lib/home-content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, content] = await Promise.all([
    getSiteSettings(),
    getHomeContent()
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <TrustBar />
      <ServicesPreview services={content.services} />
      <WhyChooseUs />
      <FleetSection />
      <FeaturedProjects projects={content.featuredProjects} />
      <QuoteCTA settings={settings} />
      <GalleryPreview images={content.galleryImages} />
      <FAQSection />
      <ContactCTA settings={settings} />
    </>
  );
}
