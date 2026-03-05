import { AccountSettingsPage } from "@/features/user/settings/AccountSettingsPage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/profile/$userId/settings")({
  staticData: { headerTitle: "Settings" },
  component: AccountSettingsPage,
});
