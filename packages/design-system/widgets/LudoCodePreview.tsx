import type { AnswerToken } from "@ludocode/types";
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useRef,
  type ReactNode,
  Fragment,
} from "react";
import { InlineCode } from "../primitives/inline-code";
import { OptionInputSlot } from "../primitives/option-input-slot";
import { HeroIcon } from "../primitives/hero-icon";
import { cn } from "../cn-utils";

type ContextType = {
  parts: string[];
  responses: AnswerToken[];
  typing?: boolean;

  handleChange: (index: number, value: string) => void;
  refs: React.RefObject<HTMLInputElement[]>;
  focusPrev: (index: number) => void;
  focusNextEmptyAfter: (index: number) => void;

  clear: () => void;
  popLast: () => void;
  isEmpty: boolean;
};

const Ctx = createContext<ContextType | null>(null);

function usePreview() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("LudoCodePreview must wrap its children");
  return ctx;
}

type RootProps = {
  prompt: string;
  options: { id: string; content: string }[];
  userResponses: AnswerToken[];
  typing?: boolean;
  onChange: (index: number, value: AnswerToken) => void;
  clear: () => void;
  popLast: () => void;
  className?: string;
  shadow?: boolean;
  children: ReactNode;
};

function Root({
  prompt,
  options,
  userResponses,
  typing,
  onChange,
  shadow,
  clear,
  popLast,
  className,
  children,
}: RootProps) {
  const parts = useMemo(() => prompt.split("___"), [prompt]);
  const gaps = parts.length - 1;

  const shadowStyle = shadow ? "shadow-lg shadow-black/15" : "";

  const responses = useMemo(
    () =>
      Array.from(
        { length: gaps },
        (_, i) => userResponses[i] ?? { id: undefined, value: "" },
      ),
    [gaps, userResponses],
  );

  const isEmpty = useMemo(() => responses.every((r) => !r.value), [responses]);

  const optionPrompts = options.map((o) => o.content);
  const refs = useRef<HTMLInputElement[]>([]);

  const focusPrev = useCallback((index: number) => {
    const prev = index - 1;
    if (prev >= 0) refs.current[prev]?.focus({ preventScroll: true });
  }, []);

  const focusNextEmptyAfter = useCallback(
    (index: number) => {
      const nextIndex = responses.findIndex((v, i) => i > index && !v.value);
      if (nextIndex !== -1)
        requestAnimationFrame(() =>
          refs.current[nextIndex]?.focus({ preventScroll: true }),
        );
    },
    [responses],
  );

  const handleChange = useCallback(
    (index: number, raw: string) => {
      const trimmed = raw.trim();
      const match = options.find((o) => o.content.trim() === trimmed);

      onChange(index, { id: match?.id, value: trimmed });

      if (optionPrompts.includes(trimmed)) {
        focusNextEmptyAfter(index);
      }
    },
    [options, onChange, optionPrompts, focusNextEmptyAfter],
  );

  return (
    <Ctx.Provider
      value={{
        parts,
        responses,
        typing,
        handleChange,
        refs,
        focusPrev,
        focusNextEmptyAfter,
        clear,
        popLast,
        isEmpty,
      }}
    >
      <Shell className={cn("bg-ludo-surface", shadowStyle, className)}>
        {children}
      </Shell>
    </Ctx.Provider>
  );
}

function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full rounded-xl overflow-hidden", className)}>
      {children}
    </div>
  );
}

function Code({
  withGaps = false,
  className,
}: {
  withGaps?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-ludo-background py-6 sm:py-8 min-h-[120px] sm:min-h-[160px]",
        className,
      )}
    >
      <div className="flex items-start gap-3 md:gap-5 min-w-0">
        <Gutter />
        <Body withGaps={withGaps} />
      </div>
    </div>
  );
}

function Header({ title = "code" }: { title?: string }) {
  return (
    <div className="h-9 px-4 flex items-center justify-between bg-ludo-surface/70 w-full">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      </div>
      <span className="text-[11px] text-white/30 tracking-wide select-none">
        {title}
      </span>
    </div>
  );
}

function Gutter() {
  const { parts } = usePreview();

  const lineCount = Math.max(
    1,
    parts.filter((p) => p.includes("\n")).length + 1,
  );

  return (
    <div className="select-none shrink-0 pt-0.5">
      {Array.from({ length: lineCount }, (_, i) => (
        <div
          key={i}
          className="text-xs md:text-sm leading-8 md:leading-9 text-white/15 text-right font-mono tabular-nums w-5 md:w-6"
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

function Body({ withGaps = false }: { withGaps?: boolean }) {
  const {
    parts,
    responses,
    typing,
    handleChange,
    refs,
    focusPrev,
    focusNextEmptyAfter,
  } = usePreview();

  return (
    <p
      className="text-white text-sm md:text-base text-start items-center leading-8 md:leading-9 font-light
      flex flex-wrap
      *:mr-1 sm:*:mr-1.5
      [&>*:last-child]:mr-0
      gap-y-2
      overflow-x-auto
      min-w-0 flex-1"
    >
      {parts.map((part, index) => (
        <Fragment key={index}>
          <InlineCode lineHeight="36px" code={part} />

          {withGaps && index < parts.length - 1 && (
            <OptionInputSlot
              disabled={!typing}
              value={responses[index].value}
              onChange={(value) => handleChange(index, value)}
              ref={(el: HTMLInputElement) => (refs.current[index] = el)}
              onBackspaceIfEmpty={() => focusPrev(index)}
              onTokenFinished={() => focusNextEmptyAfter(index)}
            />
          )}
        </Fragment>
      ))}
    </p>
  );
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1 px-4 py-1.5 bg-ludo-surface/40 w-full">
      {children}
    </div>
  );
}

function DeleteButton() {
  const { clear, isEmpty } = usePreview();

  const cursorStyle = isEmpty
    ? "hover:cursor-not-allowed"
    : "hover:cursor-pointer";

  return (
    <button
      type="button"
      onClick={() => !isEmpty && clear()}
      disabled={isEmpty}
      className={cn(
        "p-1.5 text-white/70 rounded-md hover:bg-white/5 transition-colors disabled:opacity-30",
        cursorStyle,
      )}
    >
      <HeroIcon iconName="TrashIcon" className="h-4 w-4" />
    </button>
  );
}

function BackspaceButton() {
  const { popLast, isEmpty } = usePreview();
  const cursorStyle = isEmpty
    ? "hover:cursor-not-allowed"
    : "hover:cursor-pointer";
  return (
    <button
      type="button"
      onClick={() => !isEmpty && popLast()}
      disabled={isEmpty}
      className={cn(
        "p-1.5 rounded-md text-white/70 hover:bg-white/5 transition-colors disabled:opacity-30",
        cursorStyle,
      )}
    >
      <HeroIcon iconName="BackspaceIcon" className="h-4 w-4" />
    </button>
  );
}

export const LudoCodePreview = Object.assign(Root, {
  Shell,
  Header,
  Code,
  Gutter,
  Body,
  Footer,
  DeleteButton,
  BackspaceButton,
});
