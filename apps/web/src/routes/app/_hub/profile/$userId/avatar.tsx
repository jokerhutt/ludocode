import { AvatarPage } from "@/features/user/profile/AvatarPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_hub/profile/$userId/avatar")({
  component: AvatarPage,
});
