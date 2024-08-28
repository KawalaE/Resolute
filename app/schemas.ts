import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().max(65535).min(1),
  status: z
    .union([z.literal("OPEN"), z.literal("IN_PROGRESS"), z.literal("CLOSED")])
    .optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().max(65535).min(1),
  status: z
    .union([z.literal("OPEN"), z.literal("IN_PROGRESS"), z.literal("CLOSED")])
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
