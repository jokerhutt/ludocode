export type UserStreak = {
  current: number;
  best: number;
  lastMet?: string;
};

export type DailyGoalMet = {
  date: number[];
  met: boolean;
};
