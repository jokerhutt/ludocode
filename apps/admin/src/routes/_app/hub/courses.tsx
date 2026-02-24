import { CoursesHubPage } from '@/features/Hub/CoursesHub/Pages/CoursesHubPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/hub/courses')({
  component: CoursesHubPage,
})
