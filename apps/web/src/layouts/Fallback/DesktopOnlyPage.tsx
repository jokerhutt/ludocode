import { MobileFallbackPage } from "@/features/Error/Pages/MobileFallbackPage.tsx";
import { useIsMobile } from "@ludocode/hooks";
import { Outlet } from "@tanstack/react-router";

export function DesktopOnlyPage() {
  const isMobile = useIsMobile({});

  if (isMobile) {
    return <MobileFallbackPage />;
  } else return <Outlet />;
}
