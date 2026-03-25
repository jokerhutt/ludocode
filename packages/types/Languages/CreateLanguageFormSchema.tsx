import { z } from "zod";

export const languageFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and dashes"),
    runtime: z.enum(["PISTON", "BROWSER"]),
    editorId: z.string().min(1, "Editor language is required"),
    pistonId: z.string(),
    runtimeVersion: z.string(),
    base: z.string().min(1, "Base is required"),
    iconName: z.string().min(1, "Icon is required"),
    initialScript: z.string().min(1, "Initial script is required"),
    extension: z.string().min(1, "Extension is required"),
  })
  .superRefine((value, ctx) => {
    if (value.runtime !== "PISTON") return;

    if (!value.pistonId || value.pistonId.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["pistonId"],
        message: "Runtime is required",
      });
    }

    if (!value.runtimeVersion || value.runtimeVersion.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["runtimeVersion"],
        message: "Runtime version is required",
      });
    }
  });

export type LanguageFormInput = z.infer<typeof languageFormSchema>;
