import { SubscriptionConfirmPage } from '@/features/Subscription/Success/SubscriptionConfirmPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/subscription/confirm')({
  component: SubscriptionConfirmPage,
})
