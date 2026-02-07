import { z } from "zod";

export const languageFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and dashes"),
  editorId: z.string().min(1, "Editor language is required"),
  pistonId: z.string().min(1, "Runtime is required"),
  base: z.string().min(1, "Base is required"),
  iconName: z.string().min(1, "Icon is required"),
  initialScript: z.string().min(1, "Initial script is required"),
  extension: z.string().min(1, "Extension is required"),
});

export type LanguageFormInput = z.infer<typeof languageFormSchema>;
