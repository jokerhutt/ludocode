import { CommunityPage } from "@/features/community/CommunityPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_hub/community/")({
  component: CommunityPage,
});
