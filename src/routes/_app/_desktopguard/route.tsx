import { DesktopOnlyPage } from "@/layouts/Fallback/DesktopOnlyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_desktopguard")({
  component: DesktopOnlyPage,
});
