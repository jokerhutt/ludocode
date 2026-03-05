import { ProfilePage } from "@/features/user/profile/ProfilePage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/profile/$userId/")({
  staticData: { headerTitle: "Profile" },
  component: ProfilePage,
});
