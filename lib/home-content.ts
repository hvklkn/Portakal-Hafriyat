import "server-only";

import { prisma } from "@/lib/prisma";
import { gallerySamples, projectSamples, services } from "@/lib/site-data";

export type HomeService = {
  title: string;
  slug: string;
  summary: string;
  icon: string;
};

export type HomeProject = {
  title: string;
  slug: string;
  location: string | null;
  district: string | null;
  summary: string;
  imageUrl: string;
};

export type HomeGalleryImage = {
  title: string;
  imageUrl: string;
  alt: string;
};

export type HomeContent = {
  services: HomeService[];
  featuredProjects: HomeProject[];
  galleryImages: HomeGalleryImage[];
};

const fallbackContent: HomeContent = {
  services: services.slice(0, 8).map((service) => ({
    title: service.title,
    slug: service.slug,
    summary: service.summary,
    icon: service.icon
  })),
  featuredProjects: projectSamples.slice(0, 3).map((project) => ({
    title: project.title,
    slug: project.title.toLowerCase().replaceAll(" ", "-"),
    location: project.location,
    district: project.district ?? null,
    summary: project.summary,
    imageUrl: project.imageUrl ?? "/images/hero-excavation.png"
  })),
  galleryImages: gallerySamples.slice(0, 6)
};

export async function getHomeContent(): Promise<HomeContent> {
  if (!process.env.DATABASE_URL) {
    return fallbackContent;
  }

  try {
    const [dbServices, dbProjects, dbGalleryImages] = await Promise.all([
      prisma.service.findMany({
        where: { isPublished: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        take: 8,
        select: {
          title: true,
          slug: true,
          summary: true,
          icon: true
        }
      }),
      prisma.project.findMany({
        where: {
          isPublished: true,
          isFeatured: true
        },
        orderBy: [{ createdAt: "desc" }],
        take: 3,
        select: {
          title: true,
          slug: true,
          location: true,
          district: true,
          summary: true,
          imageUrl: true
        }
      }),
      prisma.galleryImage.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        take: 6,
        select: {
          title: true,
          alt: true,
          imageUrl: true
        }
      })
    ]);

    return {
      services:
        dbServices.length > 0
          ? dbServices.map((service) => ({
              ...service,
              icon: service.icon ?? "Construction"
            }))
          : fallbackContent.services,
      featuredProjects:
        dbProjects.length > 0
          ? dbProjects.map((project) => ({
              ...project,
              imageUrl: project.imageUrl ?? "/images/hero-excavation.png"
            }))
          : fallbackContent.featuredProjects,
      galleryImages:
        dbGalleryImages.length > 0
          ? dbGalleryImages.map((image) => ({
              title: image.title,
              imageUrl: image.imageUrl,
              alt: image.alt ?? image.title
            }))
          : fallbackContent.galleryImages
    };
  } catch {
    return fallbackContent;
  }
}
