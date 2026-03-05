import { CompletionLayout } from "@/layouts/completion/CompletionLayout.tsx";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute(
  "/_app/completion/$courseId/$moduleId/$lessonId"
)({
  component: CompletionLayout,
  validateSearch: z.object({
    step: z.enum(["lesson", "streak", "course"]).default("lesson"),
    coins: z.number().optional(),
    accuracy: z.number().optional(),
    oldStreak: z.number().optional(),
    newStreak: z.number().optional(),
    completionStatus: z.string().optional(),
  }),
});
