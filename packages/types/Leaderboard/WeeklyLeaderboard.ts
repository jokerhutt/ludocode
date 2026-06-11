import type { LeaderboardUser } from "./LeaderboardUser";

export type WeeklyLeaderboard = {
  startDate: number;
  endDate: number;
  userQualifies: boolean;
  leaderboardUsers: LeaderboardUser[];
};
