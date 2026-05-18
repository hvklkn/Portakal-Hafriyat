import "server-only";

import { prisma } from "@/lib/prisma";
import { gallerySamples, projectSamples, services } from "@/lib/site-data";

export type PublicService = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  icon: string;
  imageUrl: string;
};

export type PublicProject = {
  title: string;
  slug: string;
  location: string | null;
  district: string | null;
  category: string | null;
  year: string | null;
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
  summary: string;
  description: string | null;
  imageUrl: string;
  isFeatured: boolean;
};

export type PublicGalleryImage = {
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
};

const fallbackServices: PublicService[] = services.map((service) => ({
  title: service.title,
  slug: service.slug,
  summary: service.summary,
  description: service.description,
  icon: service.icon,
  imageUrl: service.imageUrl
}));

const fallbackProjects: PublicProject[] = projectSamples.map((project) => ({
  title: project.title,
  slug: project.slug,
  location: project.location,
  district: project.district,
  category: project.category,
  year: project.year,
  status: project.status as PublicProject["status"],
  summary: project.summary,
  description: project.description,
  imageUrl: project.imageUrl,
  isFeatured: project.isFeatured
}));

const fallbackGalleryImages: PublicGalleryImage[] = gallerySamples.map(
  (image) => ({
    title: image.title,
    category: image.category,
    imageUrl: image.imageUrl,
    alt: image.alt
  })
);

export async function getPublicServices() {
  if (!process.env.DATABASE_URL) {
    return fallbackServices;
  }

  try {
    const dbServices = await prisma.service.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        title: true,
        slug: true,
        summary: true,
        description: true,
        icon: true,
        imageUrl: true
      }
    });

    return dbServices.length > 0
      ? dbServices.map((service) => ({
          ...service,
          icon: service.icon ?? "Construction",
          imageUrl: service.imageUrl ?? "/images/hero-excavation.png"
        }))
      : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

export async function getPublicServiceBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    return fallbackServices.find((service) => service.slug === slug) ?? null;
  }

  try {
    const service = await prisma.service.findFirst({
      where: {
        slug,
        isPublished: true
      },
      select: {
        title: true,
        slug: true,
        summary: true,
        description: true,
        icon: true,
        imageUrl: true
      }
    });

    return service
      ? {
          ...service,
          icon: service.icon ?? "Construction",
          imageUrl: service.imageUrl ?? "/images/hero-excavation.png"
        }
      : fallbackServices.find((item) => item.slug === slug) ?? null;
  } catch {
    return fallbackServices.find((service) => service.slug === slug) ?? null;
  }
}

export async function getPublicProjects() {
  if (!process.env.DATABASE_URL) {
    return fallbackProjects;
  }

  try {
    const dbProjects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ createdAt: "desc" }],
      select: {
        title: true,
        slug: true,
        location: true,
        district: true,
        category: true,
        year: true,
        status: true,
        summary: true,
        description: true,
        imageUrl: true,
        isFeatured: true
      }
    });

    return dbProjects.length > 0
      ? dbProjects.map((project) => ({
          ...project,
          imageUrl: project.imageUrl ?? "/images/hero-excavation.png"
        }))
      : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getPublicProjectBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    return {
      project:
        fallbackProjects.find((project) => project.slug === slug) ?? null,
      galleryImages: fallbackGalleryImages.slice(0, 3)
    };
  }

  try {
    const project = await prisma.project.findFirst({
      where: {
        slug,
        isPublished: true
      },
      select: {
        title: true,
        slug: true,
        location: true,
        district: true,
        category: true,
        year: true,
        status: true,
        summary: true,
        description: true,
        imageUrl: true,
        isFeatured: true,
        galleryImages: {
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
          select: {
            title: true,
            alt: true,
            imageUrl: true
          }
        }
      }
    });

    if (!project) {
      return {
        project:
          fallbackProjects.find((fallbackProject) => fallbackProject.slug === slug) ??
          null,
        galleryImages: fallbackGalleryImages.slice(0, 3)
      };
    }

    const { galleryImages, ...projectFields } = project;

    return {
      project: {
        ...projectFields,
        imageUrl: projectFields.imageUrl ?? "/images/hero-excavation.png"
      },
      galleryImages: galleryImages.map((image) => ({
        title: image.title,
        category: project.category ?? "Saha Çalışması",
        imageUrl: image.imageUrl,
        alt: image.alt ?? image.title
      }))
    };
  } catch {
    return {
      project:
        fallbackProjects.find((project) => project.slug === slug) ?? null,
      galleryImages: fallbackGalleryImages.slice(0, 3)
    };
  }
}

export async function getPublicGalleryImages() {
  if (!process.env.DATABASE_URL) {
    return fallbackGalleryImages;
  }

  try {
    const dbImages = await prisma.galleryImage.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        title: true,
        alt: true,
        imageUrl: true,
        project: {
          select: {
            category: true
          }
        }
      }
    });

    return dbImages.length > 0
      ? dbImages.map((image) => ({
          title: image.title,
          category: image.project?.category ?? "İş Makineleri",
          imageUrl: image.imageUrl,
          alt: image.alt ?? image.title
        }))
      : fallbackGalleryImages;
  } catch {
    return fallbackGalleryImages;
  }
}

export async function getSimilarProjects(currentSlug: string) {
  const projects = await getPublicProjects();

  return projects.filter((project) => project.slug !== currentSlug).slice(0, 3);
}
