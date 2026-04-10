import { AccountSettingsPage } from "@/features/user/settings/AccountSettingsPage.tsx";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { qo } from "@/queries/definitions/queries";
import { ludoNavigation } from "@/constants/ludoNavigation";

export const Route = createFileRoute("/app/_hub/profile/$userId/settings")({
  staticData: { headerTitle: "Settings" },

  beforeLoad: async ({ context, params }) => {
    const { queryClient } = context;

    const currentUser = await queryClient.ensureQueryData(
      qo.currentUser()
    );

    if (params.userId !== currentUser.id) {
      throw redirect(ludoNavigation.hub.profile.toProfile(currentUser.id));
    }
  },

  component: AccountSettingsPage,
});