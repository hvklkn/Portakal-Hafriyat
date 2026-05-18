import "server-only";

import { prisma } from "@/lib/prisma";

export type AdminQuoteStatus =
  | "NEW"
  | "CONTACTED"
  | "PRICED"
  | "COMPLETED"
  | "CANCELLED";

export type AdminProjectStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED";

export type AdminDashboardData = {
  hasDatabaseError: boolean;
  stats: {
    totalQuotes: number;
    newQuotes: number;
    publishedServices: number;
    completedProjects: number;
    unreadMessages: number;
    galleryImages: number;
  };
  recentQuotes: Array<{
    id: string;
    customer: string;
    phone: string;
    service: string;
    location: string;
    status: AdminQuoteStatus;
    createdAt: Date;
  }>;
  recentMessages: Array<{
    id: string;
    name: string;
    phone: string | null;
    message: string;
    isRead: boolean;
    createdAt: Date;
  }>;
};

const emptyDashboardData: AdminDashboardData = {
  hasDatabaseError: false,
  stats: {
    totalQuotes: 0,
    newQuotes: 0,
    publishedServices: 0,
    completedProjects: 0,
    unreadMessages: 0,
    galleryImages: 0
  },
  recentQuotes: [],
  recentMessages: []
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  if (!process.env.DATABASE_URL) {
    return {
      ...emptyDashboardData,
      hasDatabaseError: true
    };
  }

  try {
    const [
      totalQuotes,
      newQuotes,
      publishedServices,
      completedProjects,
      unreadMessages,
      galleryImages,
      recentQuotes,
      recentMessages
    ] = await Promise.all([
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({ where: { status: "NEW" } }),
      prisma.service.count({ where: { isPublished: true } }),
      prisma.project.count({ where: { status: "COMPLETED" } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.galleryImage.count(),
      prisma.quoteRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          phone: true,
          serviceType: true,
          location: true,
          status: true,
          createdAt: true
        }
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          phone: true,
          message: true,
          isRead: true,
          createdAt: true
        }
      })
    ]);

    return {
      hasDatabaseError: false,
      stats: {
        totalQuotes,
        newQuotes,
        publishedServices,
        completedProjects,
        unreadMessages,
        galleryImages
      },
      recentQuotes: recentQuotes.map((quote) => ({
        id: quote.id,
        customer: quote.name,
        phone: quote.phone,
        service: quote.serviceType,
        location: quote.location,
        status: quote.status,
        createdAt: quote.createdAt
      })),
      recentMessages
    };
  } catch {
    return {
      ...emptyDashboardData,
      hasDatabaseError: true
    };
  }
}
