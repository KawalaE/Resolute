import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(1),
});
