import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { BarState } from "../../components/Molecules/Header/CommonHeader";


export function useRouterBar() {
  const { status } = useRouterState();
  const [barState, setBarState] = useState<BarState>("idle");

  useEffect(() => {
    if (status === "pending") {
      setBarState("loading");
    } else if (status === "idle") {
      setBarState("loadingDone");
      setTimeout(() => setBarState("idle"), 200);
    }
  }, [status]);

  return {barState}

}
