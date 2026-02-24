import { createFileRoute } from "@tanstack/react-router";
import { LessonPage } from "./-components/LessonPage";

export const Route = createFileRoute(
  "/_app/lesson/$courseId/$moduleId/$lessonId/"
)({
  validateSearch: (s) => ({
    exercise: Number(s.exercise) || 1,
  }),
  component: LessonPage,
});
