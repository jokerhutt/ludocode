import type { AnswerToken } from "@ludocode/types";
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "motion/react";
import { InlineCode } from "../primitives/inline-code";
import { OptionInputSlot } from "../primitives/option-input-slot";
import { HeroIcon } from "../primitives/hero-icon";
import { cn } from "../cn-utils";

type ContextType = {
  parts: string[];
  responses: AnswerToken[];
  typing?: boolean;
  actionsEnabled?: boolean;

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
  actionsEnabled?: boolean;
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
  actionsEnabled,
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

      if (match) {
        const alreadyUsed = responses.some(
          (r, i) => i !== index && r.id === match.id,
        );
        if (!alreadyUsed) {
          focusNextEmptyAfter(index);
        }
      }
    },
    [options, onChange, responses, focusNextEmptyAfter],
  );

  return (
    <Ctx.Provider
      value={{
        parts,
        responses,
        typing,
        actionsEnabled: actionsEnabled ?? typing,
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
        "bg-ludo-background py-6 sm:py-8 min-h-30 sm:min-h-40",
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

function Header({
  title = "code",
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="h-9 px-4 flex items-center justify-between bg-ludo-surface w-full">
      <span className="text-[11px] text-ludo-white-bright/30 tracking-wide select-none">
        {title}
      </span>
      {children}
    </div>
  );
}

export function TrafficLights({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
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
          className="text-xs md:text-sm leading-8 md:leading-9 text-ludo-white-bright/15 text-right font-mono tabular-nums w-5 md:w-6"
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

  const tokens = useMemo(() => {
    const result: { type: "text" | "gap"; value?: string; index?: number }[] =
      [];

    parts.forEach((part, i) => {
      const lines = part.split("\n");

      lines.forEach((line, lineIndex) => {
        if (line) result.push({ type: "text", value: line });

        if (lineIndex < lines.length - 1) {
          result.push({ type: "text", value: "\n" });
        }
      });

      if (i < parts.length - 1) {
        result.push({ type: "gap", index: i });
      }
    });

    return result;
  }, [parts]);

  return (
    <div
      className="text-ludo-white-bright text-sm md:text-base text-start leading-8 md:leading-9 font-light
      whitespace-pre-wrap
      *:mr-1 sm:*:mr-1.5
      [&>*:last-child]:mr-0
      gap-y-2
      overflow-x-auto
      min-w-0 flex-1"
    >
      {tokens.map((token, i) => {
        if (token.type === "text") {
          return (
            <InlineCode key={i} lineHeight="36px" code={token.value ?? ""} />
          );
        }

        if (!withGaps) return null;

        const index = token.index!;

        return (
          <OptionInputSlot
            key={i}
            disabled={!typing}
            value={responses[index].value}
            onChange={(value) => handleChange(index, value)}
            ref={(el: HTMLInputElement) => (refs.current[index] = el)}
            onBackspaceIfEmpty={() => focusPrev(index)}
          />
        );
      })}
    </div>
  );
}

function Footer({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center h-9 gap-1 px-4 py-1.5 bg-ludo-surface w-full",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DeleteButton() {
  const { clear, isEmpty, actionsEnabled } = usePreview();
  const disabled = isEmpty || !actionsEnabled;
  const cursorStyle = isEmpty
    ? "hover:cursor-not-allowed"
    : "hover:cursor-pointer";

  return (
    <button
      type="button"
      onClick={() => !disabled && clear()}
      disabled={disabled}
      className={cn(
        "p-1.5 text-ludo-white-bright/70 rounded-md hover:bg-white/5 transition-colors disabled:opacity-30",
        cursorStyle,
      )}
    >
      <HeroIcon iconName="TrashIcon" className="h-4 w-4" />
    </button>
  );
}

function BackspaceButton() {
  const { popLast, isEmpty, actionsEnabled } = usePreview();
  const disabled = isEmpty || !actionsEnabled;
  const cursorStyle = disabled
    ? "hover:cursor-not-allowed"
    : "hover:cursor-pointer";
  return (
    <button
      type="button"
      onClick={() => !disabled && popLast()}
      disabled={disabled}
      className={cn(
        "p-1.5 rounded-md text-ludo-white-bright/70 hover:bg-white/5 transition-colors disabled:opacity-30",
        cursorStyle,
      )}
    >
      <HeroIcon iconName="BackspaceIcon" className="h-4 w-4" />
    </button>
  );
}

const OUTPUT_PANEL_W = 224;
const OUTPUT_GAP = 16;
const OUTPUT_TOTAL = OUTPUT_PANEL_W + OUTPUT_GAP;
const OUTPUT_TRANSITION = { duration: 0.8, ease: [0.22, 1, 0.36, 1] } as const;
const SHADOW_PAD = 20;

function MobileSwipeOutput({
  output,
  show,
  outputFooter = true,
  children,
}: {
  output: string | null;
  show: boolean;
  outputFooter?: boolean;
  children: ReactNode;
}) {
  const hasOutput = show && !!output;
  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const goTo = useCallback(
    (p: number) => {
      const w = containerRef.current?.offsetWidth ?? 0;
      setPage(p);
      animate(x, p === 0 ? 0 : -w, {
        type: "spring",
        stiffness: 320,
        damping: 32,
        mass: 0.8,
      });
    },
    [x],
  );

  const prevHasOutput = useRef(false);
  useEffect(() => {
    if (!hasOutput) {
      x.set(0);
      setPage(0);
      prevHasOutput.current = false;
    } else if (!prevHasOutput.current) {
      // AutoswipeAfterDelay
      prevHasOutput.current = true;
      const id = setTimeout(() => goTo(1), 350);
      return () => clearTimeout(id);
    }
  }, [hasOutput, x, goTo]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full overflow-hidden py-5 -my-5" ref={containerRef}>
        <motion.div
          className="flex w-[200%]"
          style={{ x }}
          drag={hasOutput ? "x" : false}
          dragElastic={hasOutput ? 0.08 : 0}
          dragConstraints={hasOutput ? undefined : { left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (!hasOutput) return;
            const w = containerRef.current?.offsetWidth ?? 300;
            const swipedLeft =
              info.offset.x < -(w * 0.25) || info.velocity.x < -300;
            const swipedRight =
              info.offset.x > w * 0.25 || info.velocity.x > 300;
            if (page === 0 && swipedLeft) goTo(1);
            else if (page === 1 && swipedRight) goTo(0);
            else goTo(page);
          }}
        >
          <div className="w-1/2 shrink-0">{children}</div>
          <div className="w-1/2 px-6 shrink-0">
            {hasOutput && (
              <div className="shadow-lg shadow-black/15">
                <Shell>
                  <Header title="output" />

                  <div className="bg-ludo-background py-6 sm:py-8 min-h-30 sm:min-h-40 px-5">
                    <pre className="font-mono text-sm text-emerald-300 whitespace-pre-wrap wrap-break-word leading-relaxed">
                      {output}
                    </pre>
                  </div>

                  {outputFooter && <Footer />}
                </Shell>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center items-center gap-1.5 h-4">
        {hasOutput && (
          <>
            <button
              type="button"
              onClick={() => goTo(0)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                page === 0 ? "w-4 bg-ludo-white-dim" : "w-1.5 bg-white/15",
              )}
            />
            <button
              type="button"
              onClick={() => goTo(1)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                page === 1 ? "w-4 bg-emerald-400/60" : "w-1.5 bg-white/15",
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}

function WithOutput({
  output,
  show,
  outputFooter = true,
  mobile = false,
  children,
}: {
  output: string | null;
  show: boolean;
  outputFooter?: boolean;
  mobile?: boolean;
  children: ReactNode;
}) {
  if (mobile) {
    return (
      <MobileSwipeOutput
        outputFooter={outputFooter}
        output={output}
        show={show}
      >
        {children}
      </MobileSwipeOutput>
    );
  }

  return (
    <div className="flex items-start justify-center w-full">
      <motion.div
        layout="position"
        transition={{ layout: OUTPUT_TRANSITION }}
        className="w-full max-w-lg shrink-0"
      >
        {children}
      </motion.div>
      <Output footer={outputFooter} output={output} show={show} />
    </div>
  );
}

function Output({
  output,
  show,
  footer = true,
}: {
  output: string | null;
  show: boolean;
  footer?: boolean;
}) {
  return (
    <AnimatePresence>
      {show && output && (
        <motion.div
          key="code-output-clip"
          initial={{ width: 0 }}
          animate={{ width: OUTPUT_TOTAL + SHADOW_PAD }}
          exit={{ width: 0 }}
          transition={OUTPUT_TRANSITION}
          className="shrink-0 overflow-hidden"
          style={{
            paddingTop: SHADOW_PAD,
            paddingBottom: SHADOW_PAD,
            paddingRight: SHADOW_PAD,
            marginTop: -SHADOW_PAD,
            marginBottom: -SHADOW_PAD,
            marginRight: -SHADOW_PAD,
          }}
        >
          <motion.div
            initial={{ x: -OUTPUT_TOTAL }}
            animate={{ x: 0 }}
            exit={{ x: -OUTPUT_TOTAL }}
            transition={OUTPUT_TRANSITION}
            style={{ width: OUTPUT_TOTAL }}
            className="pl-4 "
          >
            <div className="w-56 shadow-lg shadow-black/15">
              <Shell>
                <Header title="output" />

                <div className="bg-ludo-background/95 py-6 sm:py-8 min-h-30 sm:min-h-40 px-5">
                  <pre className="font-mono text-sm text-emerald-300 whitespace-pre-wrap wrap-break-word leading-relaxed">
                    {output}
                  </pre>
                </div>

                {footer && <Footer />}
              </Shell>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
  WithOutput,
});
