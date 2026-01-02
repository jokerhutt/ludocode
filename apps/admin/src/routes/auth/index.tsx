import { AdminAuthPage } from '@/features/Auth/AdminAuthPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: AdminAuthPage,
})
