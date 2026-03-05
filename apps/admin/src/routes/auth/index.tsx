import { AdminAuthPage } from '@/features/auth/AdminAuthPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: AdminAuthPage,
})
