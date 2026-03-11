import { PrivacyPage } from '@/features/legal/PrivacyPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_resources/legal/privacy')({
  component: PrivacyPage,
})