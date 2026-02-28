import { LessonCurriculumPage } from '@/features/Lesson/LessonCurriculumPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/curriculum/$courseId/lesson/$lessonId',
)({
  component: LessonCurriculumPage,
})