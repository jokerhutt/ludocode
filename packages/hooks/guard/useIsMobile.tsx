import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile({
  mobileBreakpoint = MOBILE_BREAKPOINT,
}: {
  mobileBreakpoint?: number;
}) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);

    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mql.matches);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
