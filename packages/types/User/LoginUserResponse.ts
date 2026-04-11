import type { UserCoins } from "./UserCoins";
import type { LudoUser } from "./LudoUser";
import type { UserStreak } from "./UserStreak.ts";
import type { UserXp } from "./UserXp";

export type LoginUserResponse = {
  user: LudoUser;
  userCoins: UserCoins;
  userXp: UserXp;
  userStreak: UserStreak;
};
