import type { MetadataRoute } from "next";

import {
  getPublicProjectSitemapEntries,
  getPublicServiceSitemapEntries
} from "@/lib/public-content";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [services, projects] = await Promise.all([
    getPublicServiceSitemapEntries(),
    getPublicProjectSitemapEntries()
  ]);
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getSiteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: getSiteUrl("/hizmetler"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: getSiteUrl("/projeler"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: getSiteUrl("/galeri"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: getSiteUrl("/iletisim"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: getSiteUrl("/teklif-al"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: getSiteUrl(`/hizmetler/${service.slug}`),
    lastModified: service.updatedAt,
    changeFrequency: "monthly",
    priority: 0.78
  }));
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: getSiteUrl(`/projeler/${project.slug}`),
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: 0.72
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
