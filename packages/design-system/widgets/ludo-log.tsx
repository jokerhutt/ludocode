import {
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  LoaderCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { cn } from "../cn-utils";
import { type ReactNode } from "react";

import { createContext, useContext, useState } from "react";

type LudoLogContextType = {
  collapsed: boolean;
  toggle: () => void;
  status: "pending" | "success" | "error";
  collapsible: boolean;
};

const LudoLogContext = createContext<LudoLogContextType | null>(null);

function useLudoLog() {
  const ctx = useContext(LudoLogContext);
  if (!ctx) throw new Error("LudoLog components must be used inside LudoLog");
  return ctx;
}

function Root({
  children,
  status = "success",
  collapsible = true,
  defaultCollapsed = false,
}: {
  children: ReactNode;
  status?: "pending" | "success" | "error";
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggle = () => {
    if (!collapsible) return;
    setCollapsed((prev) => !prev);
  };

  return (
    <LudoLogContext.Provider value={{ collapsed, toggle, status, collapsible }}>
      <div
        className={cn(
          "w-full border-b border-white/5",
          status === "error" ? "bg-red-950/20" : "bg-transparent",
        )}
      >
        {children}
      </div>
    </LudoLogContext.Provider>
  );
}

export type OutputTriggerColorVariant = "default" | "alt";

type TriggerProps = {
  position?: number;
  successColorVariant?: OutputTriggerColorVariant;
};

function Trigger({ position, successColorVariant = "default" }: TriggerProps) {
  const { collapsed, toggle, status, collapsible } = useLudoLog();
  if (!collapsible) return null;
  const successColor =
    successColorVariant === "default"
      ? "text-ludo-success"
      : "text-ludo-accent-muted";
  const statusColor =
    status === "error"
      ? "text-red-400"
      : status === "pending"
        ? "text-amber-300"
        : successColor;
  return (
    <button
      type="button"
      onClick={() => toggle?.()}
      className={cn(
        "w-full flex items-center gap-2 px-4 py-2 text-left transition-colors",
        "hover:bg-white/5 hover:cursor-pointer select-none",
      )}
    >
      {collapsed ? (
        <ChevronRightIcon className="w-3.5 h-3.5 text-ludo-white-dim shrink-0" />
      ) : (
        <ChevronDownIcon className="w-3.5 h-3.5 text-ludo-white-dim shrink-0" />
      )}
      {status === "error" ? (
        <XCircleIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
      ) : status === "pending" ? (
        <LoaderCircleIcon className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-spin" />
      ) : (
        <CheckCircle2Icon
          className={cn("w-3.5 h-3.5 shrink-0", successColor)}
        />
      )}
      <span className={cn("text-xs font-medium", statusColor)}>
        Run #{position}
      </span>
      <span className="ml-auto grid w-24 text-right text-[10px] text-ludo-white-bright/25">
        <span
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-150",
            status === "pending" ? "opacity-100" : "opacity-0",
          )}
        >
          running
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-150",
            status === "success" ? "opacity-100" : "opacity-0",
          )}
        >
          success
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-150",
            status === "error" ? "opacity-100" : "opacity-0",
          )}
        >
          error
        </span>
      </span>
    </button>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { collapsed, status } = useLudoLog();

  if (collapsed) return null;

  return (
    <div className="px-4 pb-3 pt-2">
      <div
        className={cn(
          "rounded-md bg-ludo-surface/30 px-3 py-2 font-mono text-xs",
          status === "error" ? "text-red-300" : "text-ludo-white-bright/90",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Line({ line }: { line: string }) {
  return <pre className="whitespace-pre-wrap break-all">{line}</pre>;
}

export const LudoLog = Object.assign(Root, {
  Trigger,
  Content,
  Line,
});
