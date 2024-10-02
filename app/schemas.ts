import sanitizeHtml from "sanitize-html";
import { z } from "zod";

export const markdownSchema = z
  .string()
  .max(65535)
  .min(1)
  .transform((markdown) => {
    const sanitizeMarkdown = sanitizeHtml(markdown, {
      allowedTags: sanitizeHtml.defaults.allowedTags,
      allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
      disallowedTagsMode: "discard",
    });
    return sanitizeMarkdown;
  });

export const commentSchema = z.object({
  description: z.string().min(1).max(500),
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
