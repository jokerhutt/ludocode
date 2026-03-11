import { LegalLayout } from '@/layouts/legal/LegalLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_resources/legal')({
  component: LegalLayout,
})