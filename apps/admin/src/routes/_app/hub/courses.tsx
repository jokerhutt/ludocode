import { CoursesHubPage } from '@/features/courses-hub/CoursesHubPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/hub/courses')({
  component: CoursesHubPage,
})
