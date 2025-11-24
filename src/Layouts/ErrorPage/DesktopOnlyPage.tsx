import { DESKTOP_ONLY } from "@/config/ui";
import { ErrorPage } from "@/features/Error/ErrorPage";
import { MobileFallbackPage } from "@/features/Error/MobileFallbackPage";
import { useIsMobile } from "@/Hooks/UI/useIsMobile";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

export function DesktopOnlyPage() {
  const isMobile = useIsMobile();

  const [hasOverridenCheck, setHasOverridenCheck] = useState(false);
  const isMobileAndShouldDisable =
    isMobile && DESKTOP_ONLY && !hasOverridenCheck;

  const overrideMobileGuard = () => setHasOverridenCheck(true);

  if (isMobileAndShouldDisable) {
    return <MobileFallbackPage override={overrideMobileGuard} />;
  } else return <Outlet />;
}
