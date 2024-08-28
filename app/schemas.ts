import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().max(65535).min(1),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(256).optional(),
  description: z.string().min(1).max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
