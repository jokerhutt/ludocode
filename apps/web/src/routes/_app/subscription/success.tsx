import { SubscriptionSuccessPage } from '@/features/Subscription/Success/SubscriptionSuccessPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/subscription/success')({
  component: SubscriptionSuccessPage,
})
