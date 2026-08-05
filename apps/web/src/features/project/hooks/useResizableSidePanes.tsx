import { useState, type CSSProperties } from "react";
import { useIsMobile } from "@ludocode/hooks";

const DESKTOP_BREAKPOINT = 1024;
const LEFT_PANE = { min: 240, maxFraction: 0.34 };
const RIGHT_PANE = { min: 320, maxFraction: 0.42 };

export type SidePane = {
  style: CSSProperties | undefined;
  handleProps: {
    pane: "left" | "right";
    width: number | null;
    onResize: (width: number) => void;
    min: number;
    maxFraction: number;
  };
};

export function useResizableSidePanes(): {
  isDesktop: boolean;
  left: SidePane;
  right: SidePane;
} {
  const isDesktop = !useIsMobile({ mobileBreakpoint: DESKTOP_BREAKPOINT });
  const [leftWidth, setLeftWidth] = useState<number | null>(null);
  const [rightWidth, setRightWidth] = useState<number | null>(null);

  const paneStyle = (width: number | null) =>
    width !== null && isDesktop ? { width, flex: "0 0 auto" } : undefined;

  return {
    isDesktop,
    left: {
      style: paneStyle(leftWidth),
      handleProps: {
        pane: "left",
        width: leftWidth,
        onResize: setLeftWidth,
        ...LEFT_PANE,
      },
    },
    right: {
      style: paneStyle(rightWidth),
      handleProps: {
        pane: "right",
        width: rightWidth,
        onResize: setRightWidth,
        ...RIGHT_PANE,
      },
    },
  };
}
