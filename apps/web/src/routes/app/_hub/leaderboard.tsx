import { LeaderboardPage } from "@/features/leaderboard/hub/LeaderboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_hub/leaderboard")({
  component: LeaderboardPage,
});