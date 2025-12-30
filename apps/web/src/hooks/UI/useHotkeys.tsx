import { useEffect } from "react";

export type HotkeyName = "EXECUTE_ACTION" | "TOGGLE_WINDOW" | "OPEN_HINT";

export const HOTKEY_MAP = {
  EXECUTE_ACTION: "Enter",
  TOGGLE_WINDOW: "k",
  OPEN_HINT: "h",
} as const;

export function useHotkeys(actions: {
  EXECUTE_ACTION?: () => void;
  TOGGLE_WINDOW?: () => void;
  OPEN_HINT?: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.metaKey) return;

      switch (e.key) {
        case "Enter":
          actions.EXECUTE_ACTION?.();
          break;
        case "k":
          actions.TOGGLE_WINDOW?.();
          break;
        case "h":
          actions.OPEN_HINT?.();
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [actions]);
}
