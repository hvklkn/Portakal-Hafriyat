import "server-only";

import type { ServiceFormValues } from "@/lib/admin-service-schema";
import { prisma } from "@/lib/prisma";

export type AdminServiceListItem = {
  id: string;
  title: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
  updatedAt: Date;
};

export type AdminServicesListData = {
  services: AdminServiceListItem[];
  hasDatabaseError: boolean;
};

export type AdminServiceEditData = {
  service: (ServiceFormValues & { id: string }) | null;
  hasDatabaseError: boolean;
};

export const emptyServiceFormValues: ServiceFormValues = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  imageUrl: "",
  iconName: "Construction",
  isActive: true,
  displayOrder: 0
};

export async function getAdminServicesList(): Promise<AdminServicesListData> {
  if (!process.env.DATABASE_URL) {
    return {
      services: [],
      hasDatabaseError: true
    };
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        isPublished: true,
        sortOrder: true,
        updatedAt: true
      }
    });

    return {
      services: services.map((service) => ({
        id: service.id,
        title: service.title,
        slug: service.slug,
        isActive: service.isPublished,
        displayOrder: service.sortOrder,
        updatedAt: service.updatedAt
      })),
      hasDatabaseError: false
    };
  } catch {
    return {
      services: [],
      hasDatabaseError: true
    };
  }
}

export async function getAdminServiceForEdit(
  id: string
): Promise<AdminServiceEditData> {
  if (!process.env.DATABASE_URL) {
    return {
      service: null,
      hasDatabaseError: true
    };
  }

  try {
    const service = await prisma.service.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        description: true,
        imageUrl: true,
        icon: true,
        isPublished: true,
        sortOrder: true
      }
    });

    return {
      service: service
        ? {
            id: service.id,
            title: service.title,
            slug: service.slug,
            shortDescription: service.summary,
            description: service.description,
            imageUrl: service.imageUrl ?? "",
            iconName: service.icon ?? "",
            isActive: service.isPublished,
            displayOrder: service.sortOrder
          }
        : null,
      hasDatabaseError: false
    };
  } catch {
    return {
      service: null,
      hasDatabaseError: true
    };
  }
}
