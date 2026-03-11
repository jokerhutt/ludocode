import { AlreadySubscribedPage } from '@/features/subscription/comparison/AlreadySubscribedPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/subscription/already-subscribed')({
  component: AlreadySubscribedPage,
})
