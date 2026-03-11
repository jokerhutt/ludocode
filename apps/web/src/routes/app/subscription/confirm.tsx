import { SubscriptionConfirmPage } from '@/features/subscription/checkout/SubscriptionConfirmPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/subscription/confirm')({
  component: SubscriptionConfirmPage,
})
