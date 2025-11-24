import { MobileFallbackPage } from "@/features/Error/MobileFallbackPage";
import { useIsMobile } from "@/Hooks/UI/useIsMobile";
import { Outlet } from "@tanstack/react-router";

export function DesktopOnlyPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileFallbackPage />;
  } else return <Outlet />;
}
