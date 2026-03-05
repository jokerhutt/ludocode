import { SubjectsLayout } from '@/layouts/subjects/SubjectsLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/subjects/')({
  component: SubjectsLayout,
})