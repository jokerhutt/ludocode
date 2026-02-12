import { LessonCurriculumPage } from '@/features/Curriculum/Lesson/LessonCurriculumPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/curriculum/$courseId/lesson/$lessonId',
)({
  component: LessonCurriculumPage,
})