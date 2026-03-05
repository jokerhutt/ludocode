import { LegalLayout } from '@/layouts/legal/LegalLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resources/legal')({
  component: LegalLayout,
})