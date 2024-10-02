import { z } from "zod";

export const markdownSchema = z.string().max(65535).min(1).optional();
export const commentSchema = z.object({
  description: z.string().min(1).max(500).optional(),
});

export const IssueSchema = z.object({
  title: z.string().min(1).max(256),
  description: markdownSchema,
  status: z
    .union([z.literal("OPEN"), z.literal("IN_PROGRESS"), z.literal("CLOSED")])
    .optional(),
  priority: z
    .union([z.literal("LOW"), z.literal("MEDIUM"), z.literal("HIGH")])
    .optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(256).optional(),
  description: markdownSchema,
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
