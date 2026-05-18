import "server-only";

import { prisma } from "@/lib/prisma";

export type AdminMessageItem = {
  id: string;
  fullName: string;
  phone: string | null;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export type AdminMessagesData = {
  messages: AdminMessageItem[];
  hasDatabaseError: boolean;
};

export async function getAdminMessagesData(): Promise<AdminMessagesData> {
  if (!process.env.DATABASE_URL) {
    return { messages: [], hasDatabaseError: true };
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: [{ createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        subject: true,
        message: true,
        isRead: true,
        createdAt: true
      }
    });

    return {
      messages: messages.map((message) => ({
        id: message.id,
        fullName: message.name,
        phone: message.phone,
        email: message.email,
        subject: message.subject,
        message: message.message,
        isRead: message.isRead,
        createdAt: message.createdAt
      })),
      hasDatabaseError: false
    };
  } catch {
    return { messages: [], hasDatabaseError: true };
  }
}
