import type { UserCoins } from "./UserCoins";
import type { LudoUser } from "./LudoUser";
import type { UserStreak } from "../Progress/UserStreak";

export type LoginUserResponse = {
  user: LudoUser;
  userCoins: UserCoins;
  userStreak: UserStreak;
};
