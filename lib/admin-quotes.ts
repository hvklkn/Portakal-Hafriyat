import "server-only";

import type { QuoteStatusValue } from "@/lib/admin-quote-message-schema";
import { prisma } from "@/lib/prisma";

export type AdminQuoteItem = {
  id: string;
  fullName: string;
  phone: string;
  serviceType: string;
  city: string;
  district: string;
  description: string;
  imageUrl: string | null;
  status: QuoteStatusValue;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminQuotesData = {
  quotes: AdminQuoteItem[];
  serviceTypes: string[];
  hasDatabaseError: boolean;
};

export async function getAdminQuotesData(): Promise<AdminQuotesData> {
  if (!process.env.DATABASE_URL) {
    return { quotes: [], serviceTypes: [], hasDatabaseError: true };
  }

  try {
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: [{ createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        phone: true,
        location: true,
        serviceType: true,
        message: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return {
      quotes: quotes.map((quote) => {
        const { city, district } = splitLocation(quote.location);
        const { description, imageUrl } = splitQuoteMessage(quote.message);

        return {
          id: quote.id,
          fullName: quote.name,
          phone: quote.phone,
          serviceType: quote.serviceType,
          city,
          district,
          description,
          imageUrl,
          status: quote.status,
          createdAt: quote.createdAt,
          updatedAt: quote.updatedAt
        };
      }),
      serviceTypes: Array.from(new Set(quotes.map((quote) => quote.serviceType))),
      hasDatabaseError: false
    };
  } catch {
    return { quotes: [], serviceTypes: [], hasDatabaseError: true };
  }
}

function splitLocation(location: string) {
  const [city, district] = location.split("/").map((value) => value.trim());

  return {
    city: city || location,
    district: district || ""
  };
}

function splitQuoteMessage(message: string) {
  const imageLabel = "Görsel URL:";
  const [description, imagePart] = message.split(imageLabel);

  return {
    description: description.trim(),
    imageUrl: imagePart?.trim() || null
  };
}
