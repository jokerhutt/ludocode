import { z } from "zod";

export type SubjectsDraftSnapshot = {
    id: number;
    slug: string;
    name: string;
}

export const subjectsDraftSchema = z.object({
  subjects: z
    .array(
      z.object({
        id: z.number(),
        slug: z
          .string()
          .min(1, "Slug is required")
          .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and dashes"),
        name: z.string(),
      }),
    )
    .superRefine((subjects, ctx) => {
      const seen = new Map<string, number>();

      subjects.forEach((subject, index) => {
        const normalized = subject.slug.trim().toLowerCase();

        if (seen.has(normalized)) {
          ctx.addIssue({
            code: "custom",
            message: "Slug must be unique",
            path: [index, "slug"],
          });
        } else {
          seen.set(normalized, index);
        }
      });
    }),
});

export type SubjectsDraftSchema = z.infer<typeof subjectsDraftSchema>