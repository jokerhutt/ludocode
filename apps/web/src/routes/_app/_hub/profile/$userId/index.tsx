import { ProfilePage } from "@/features/Hub/ProfileHub/Pages/ProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/profile/$userId/")({
  staticData: { headerTitle: "Profile" },
  component: ProfilePage,
});
