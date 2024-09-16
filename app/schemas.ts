import { z } from "zod";

const commentSchema = z.object({
  description: z.string(),
});

export const IssueSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().max(65535).min(1),
  status: z
    .union([z.literal("OPEN"), z.literal("IN_PROGRESS"), z.literal("CLOSED")])
    .optional(),
  priority: z
    .union([z.literal("LOW"), z.literal("MEDIUM"), z.literal("HIGH")])
    .optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(256).optional(),
  description: z.string().max(65535).min(1).optional(),
  status: z
    .union([z.literal("OPEN"), z.literal("IN_PROGRESS"), z.literal("CLOSED")])
    .optional(),
  priority: z
    .union([z.literal("LOW"), z.literal("MEDIUM"), z.literal("HIGH")])
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
  comment: commentSchema.optional(),
});
