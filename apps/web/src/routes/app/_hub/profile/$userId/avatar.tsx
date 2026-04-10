import { ludoNavigation } from "@/constants/ludoNavigation";
import { AvatarPage } from "@/features/user/profile/AvatarPage";
import { qo } from "@/queries/definitions/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_hub/profile/$userId/avatar")({
  beforeLoad: async ({ context, params }) => {
    const { queryClient } = context;

    const currentUser = await queryClient.ensureQueryData(qo.currentUser());

    if (params.userId !== currentUser.id) {
      throw redirect(ludoNavigation.hub.profile.toProfile(currentUser.id));
    }
  },
  component: AvatarPage,
});
