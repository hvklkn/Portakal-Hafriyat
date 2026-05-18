import "server-only";

import type {
  ProjectFormValues,
  ProjectStatusValue
} from "@/lib/admin-project-schema";
import { prisma } from "@/lib/prisma";

export type AdminProjectListItem = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  status: ProjectStatusValue;
  isFeatured: boolean;
  date: string | null;
  updatedAt: Date;
};

export type AdminProjectsData = {
  projects: AdminProjectListItem[];
  hasDatabaseError: boolean;
};

export type AdminProjectEditData = {
  project: (ProjectFormValues & { id: string }) | null;
  hasDatabaseError: boolean;
};

export const emptyProjectFormValues: ProjectFormValues = {
  title: "",
  slug: "",
  location: "",
  description: "",
  date: "",
  coverImageUrl: "",
  status: "PLANNED",
  isFeatured: false
};

export async function getAdminProjectsList(): Promise<AdminProjectsData> {
  if (!process.env.DATABASE_URL) {
    return { projects: [], hasDatabaseError: true };
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        location: true,
        status: true,
        isFeatured: true,
        year: true,
        updatedAt: true
      }
    });

    return {
      projects: projects.map((project) => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        location: project.location,
        status: project.status,
        isFeatured: project.isFeatured,
        date: project.year,
        updatedAt: project.updatedAt
      })),
      hasDatabaseError: false
    };
  } catch {
    return { projects: [], hasDatabaseError: true };
  }
}

export async function getAdminProjectForEdit(
  id: string
): Promise<AdminProjectEditData> {
  if (!process.env.DATABASE_URL) {
    return { project: null, hasDatabaseError: true };
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        location: true,
        description: true,
        summary: true,
        year: true,
        imageUrl: true,
        status: true,
        isFeatured: true
      }
    });

    return {
      project: project
        ? {
            id: project.id,
            title: project.title,
            slug: project.slug,
            location: project.location ?? "",
            description: project.description ?? project.summary,
            date: project.year ?? "",
            coverImageUrl: project.imageUrl ?? "",
            status: project.status,
            isFeatured: project.isFeatured
          }
        : null,
      hasDatabaseError: false
    };
  } catch {
    return { project: null, hasDatabaseError: true };
  }
}
