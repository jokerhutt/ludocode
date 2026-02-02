import { AccountSettingsPage } from "@/features/Hub/ProfileHub/Pages/AccountSettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/profile/$userId/settings")({
  staticData: { headerTitle: "Settings" },
  component: AccountSettingsPage,
});
