import { LessonPage } from "@/features/Lesson/LessonPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/lesson/$courseId/$moduleId/$lessonId/"
)({
  validateSearch: (s) => ({
    exercise: Number(s.exercise) || 1,
  }),
  component: LessonPage,
});
