import { SubscriptionPlan } from "./SubscriptionPlan";

export type UserSubscription = {
  userId: string;
  planId: string;
  planCode: SubscriptionPlan;
  monthlyCreditAllowance: number;
  maxProjects: number;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
};
