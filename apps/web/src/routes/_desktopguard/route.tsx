import { DesktopOnlyPage } from "@/layouts/fallback/DesktopOnlyPage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_desktopguard")({
  component: DesktopOnlyPage,
});
