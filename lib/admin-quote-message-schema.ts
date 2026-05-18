import { z } from "zod";

export const quoteStatuses = [
  "NEW",
  "CONTACTED",
  "PRICED",
  "COMPLETED",
  "CANCELLED"
] as const;

export const quoteStatusUpdateSchema = z.object({
  status: z.enum(quoteStatuses)
});

export const messageReadUpdateSchema = z.object({
  isRead: z.boolean()
});

export type QuoteStatusValue = (typeof quoteStatuses)[number];
