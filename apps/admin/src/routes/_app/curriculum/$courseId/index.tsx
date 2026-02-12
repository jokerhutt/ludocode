import { CurriculumPage } from '@/features/Curriculum/CurriculumPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/curriculum/$courseId/')({
  component: CurriculumPage,
})

