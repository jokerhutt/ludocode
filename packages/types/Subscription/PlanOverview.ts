import { type SubscriptionPlan } from "./SubscriptionPlan"

export type Feature =
  | "CORE_COURSES"
  | "CODE_EDITOR"
  | "PUBLISH_PROJECTS"
  | "SKILL_PATHS"
  | "AI_ASSISTANT"
  | "PRIORITY_SUPPORT";

export type PlanLimits = {
  monthlyAiCredits: number;
  maxProjects: number;
};
export type PlanOverview = {
  tier: SubscriptionPlan;
  price: number;
  period: string;
  description: string;
  recommended: boolean;
  features: Feature[];
  limits: PlanLimits;
};