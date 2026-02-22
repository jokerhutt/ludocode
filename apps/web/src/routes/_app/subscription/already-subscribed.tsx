import { AlreadySubscribedPage } from '@/features/Subscription/Misc/AlreadySubscribedPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/subscription/already-subscribed')({
  component: AlreadySubscribedPage,
})
