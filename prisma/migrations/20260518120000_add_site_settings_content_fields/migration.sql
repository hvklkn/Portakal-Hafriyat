-- Add editable content fields for the admin settings module.
ALTER TABLE "SiteSetting" ADD COLUMN "slogan" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "googleMapsUrl" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "instagramUrl" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "facebookUrl" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "heroTitle" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "heroSubtitle" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "heroImageUrl" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "seoTitle" TEXT;
ALTER TABLE "SiteSetting" ADD COLUMN "seoDescription" TEXT;
