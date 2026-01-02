import { createFileRoute, redirect } from "@tanstack/react-router";
import { adminNavigation } from "@/constants/adminNavigation";

export const Route = createFileRoute("/_app/")({
  beforeLoad: async () => {
    throw redirect(adminNavigation.builder.toBuilderHub());
  },
});
