import { CoursesHubPage } from '@/features/CoursesHub/Pages/CoursesHubPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_hub/courses')({
  component: CoursesHubPage,
})
