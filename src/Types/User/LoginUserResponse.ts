import type { LudoStats } from "./LudoStats";
import type { LudoUser } from "./LudoUser"

export type LoginUserResponse = {
    user: LudoUser;
    userStats: LudoStats;
}