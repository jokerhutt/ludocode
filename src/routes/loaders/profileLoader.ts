import { qo } from "@/hooks/Queries/Definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { ludoNavigation } from "../navigator/ludoNavigation";
import { redirect } from "@tanstack/react-router";

export async function profileRootLoader(queryClient: QueryClient) {
  const me = await queryClient.ensureQueryData(qo.currentUser());
  return redirect(ludoNavigation.hub.profile.toProfile(me.id));
}
