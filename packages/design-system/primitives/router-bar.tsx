import type { BarState } from "@ludocode/design-system/zones/ludo-header";

type RouterBarProps = {
  barState: BarState;
};

export function RouterBar({ barState }: RouterBarProps) {
  return (
    <div
      className={`
    absolute bottom-0 left-0 h-[3px] bg-ludo-accent-muted/80
    ${
      barState === "idle"
        ? "w-0 opacity-0 transition-none"
        : "transition-all duration-200"
    }
    ${barState === "loading" ? "w-[20%] opacity-100" : ""}
    ${barState === "loadingDone" ? "w-full opacity-100" : ""}
  `}
    />
  );
}
