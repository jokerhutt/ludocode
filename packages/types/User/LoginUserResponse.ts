import type { UserCoins } from "./UserCoins";
import type { LudoUser } from "./LudoUser";
import type { UserStreak } from "./UserStreak.ts";
import { UserSubscription } from "../Subscription/UserSubscription";

export type LoginUserResponse = {
  user: LudoUser;
  userCoins: UserCoins;
  userStreak: UserStreak;
  subscription: UserSubscription;
};
