import type { BarState } from "../../Blocks/Header/HeaderWithBar";

type RouterBarProps = {
  barState: BarState;
};

export function RouterBar({ barState }: RouterBarProps) {
  return (
    <div
      className={`
    absolute bottom-0 left-0 h-[3px] bg-ludoLightPurple/80
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
