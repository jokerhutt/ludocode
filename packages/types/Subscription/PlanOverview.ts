import { SubscriptionPlan } from "./SubscriptionPlan"

export type PlanFeaturesOverview = {
  title: string
  enabled: boolean
}

export type PlanLimitsOverview = {
  title: string
  limit: number
}

export type PlanOverview = {
  tier: SubscriptionPlan
  price: number
  period: string
  description: string
  recommended: boolean
  features: PlanFeaturesOverview[]
  limits: PlanLimitsOverview[]
}