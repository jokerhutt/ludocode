import { type SubscriptionPlan } from "./SubscriptionPlan";

export type UserSubscription = {
  userId: string;
  planCode: SubscriptionPlan;
  monthlyCreditAllowance: number;
  maxProjects: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
};
