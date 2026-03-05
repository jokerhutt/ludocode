import {
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "lucide-react";
import { cn } from "../cn-utils";
import { type ReactNode } from "react";

import { createContext, useContext, useState } from "react";

type LudoLogContextType = {
  collapsed: boolean;
  toggle: () => void;
  error: boolean;
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
  error = false,
  collapsible = true,
  defaultCollapsed = false,
}: {
  children: ReactNode;
  error?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggle = () => {
    if (!collapsible) return;
    setCollapsed((prev) => !prev);
  };

  return (
    <LudoLogContext.Provider value={{ collapsed, toggle, error, collapsible }}>
      <div
        className={cn(
          "w-full border-b border-white/5",
          error ? "bg-red-950/20" : "bg-transparent",
        )}
      >
        {children}
      </div>
    </LudoLogContext.Provider>
  );
}

type TriggerProps = {
  position?: number;
};

function Trigger({ position }: TriggerProps) {
  const { collapsed, toggle, error, collapsible } = useLudoLog();
  if (!collapsible) return null;
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
      {error ? (
        <XCircleIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
      ) : (
        <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      )}
      <span
        className={cn(
          "text-xs font-medium",
          error ? "text-red-400" : "text-emerald-400",
        )}
      >
        Run #{position}
      </span>
      <span className="text-[10px] text-ludo-white-bright/25 ml-auto">
        {error ? "exited with error" : "success"}
      </span>
    </button>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { collapsed, error } = useLudoLog();

  if (collapsed) return null;

  return (
    <div className="px-4 pb-3 pt-2">
      <div
        className={cn(
          "rounded-md bg-ludo-surface/30 px-3 py-2 font-mono text-xs",
          error ? "text-red-300" : "text-ludo-white-bright/90",
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
