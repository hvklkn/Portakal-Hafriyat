import "server-only";

import { galleryCategories } from "@/lib/admin-gallery-schema";
import { prisma } from "@/lib/prisma";

export type AdminGalleryImage = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  projectId: string | null;
  projectTitle: string | null;
  createdAt: Date;
};

export type AdminGalleryProjectOption = {
  id: string;
  title: string;
};

export type AdminGalleryData = {
  images: AdminGalleryImage[];
  projects: AdminGalleryProjectOption[];
  hasDatabaseError: boolean;
};

export async function getAdminGalleryData(): Promise<AdminGalleryData> {
  if (!process.env.DATABASE_URL) {
    return { images: [], projects: [], hasDatabaseError: true };
  }

  try {
    const [images, projects] = await Promise.all([
      prisma.galleryImage.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        select: {
          id: true,
          title: true,
          imageUrl: true,
          alt: true,
          projectId: true,
          createdAt: true,
          project: {
            select: {
              title: true,
              category: true
            }
          }
        }
      }),
      prisma.project.findMany({
        orderBy: [{ title: "asc" }],
        select: {
          id: true,
          title: true
        }
      })
    ]);

    return {
      images: images.map((image) => ({
        id: image.id,
        title: image.title,
        imageUrl: image.imageUrl,
        category:
          image.alt ??
          image.project?.category ??
          galleryCategories[galleryCategories.length - 1],
        projectId: image.projectId,
        projectTitle: image.project?.title ?? null,
        createdAt: image.createdAt
      })),
      projects,
      hasDatabaseError: false
    };
  } catch {
    return { images: [], projects: [], hasDatabaseError: true };
  }
}
