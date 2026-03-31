import type { Block } from "@ludocode/types/Exercise/LudoExercise.ts";
import { LudoCodePreview } from "@ludocode/design-system/widgets/ludo-code-preview";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { type LessonType } from "@ludocode/types";
import { cn } from "@ludocode/design-system/cn-utils";
const noop = () => {};

const headerComponents: Components = {
  p: ({ children }) => <>{children}</>,
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded bg-ludo-surface-dim border border-ludo-border/60 text-ludo-accent-muted text-[0.8125rem] font-mono">
      {children}
    </code>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-ludo-white-bright">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};

const paragraphComponents: Components = {
  p: ({ children }) => <>{children}</>,
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded bg-ludo-surface-dim border border-ludo-border/60 text-ludo-accent-muted text-[0.8125rem] font-mono">
      {children}
    </code>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ludo-white-bright">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};

export function BlockRenderer({
  block,
  showOutput = false,
  lessonType = "NORMAL",
  mobile = false,
}: {
  block: Block;
  showOutput?: boolean;
  mobile?: boolean;
  lessonType?: LessonType;
}) {
  switch (block.type) {
    case "header":
      return (
        <h2 className="text-ludo-white-bright text-center text-lg sm:text-xl lg:max-w-xl font-semibold leading-snug">
          <ReactMarkdown components={headerComponents}>
            {block.content}
          </ReactMarkdown>
        </h2>
      );
    case "paragraph":
      return (
        <p className={cn("lg:max-w-xl text-sm sm:text-base leading-relaxed", lessonType == "NORMAL" ? "text-ludo-white text-center" : "text-ludo-white-bright text-start")}>
          <ReactMarkdown components={paragraphComponents}>
            {block.content}
          </ReactMarkdown>
        </p>
      );
    case "code":
      return (
        <LudoCodePreview.WithOutput
          outputFooter={false}
          output={block.output ?? null}
          show={showOutput}
          mobile={mobile}
        >
          <LudoCodePreview
            className="lg:max-w-xl"
            prompt={block.content}
            options={[]}
            userResponses={[]}
            onChange={noop}
            clear={noop}
            shadow
            popLast={noop}
          >
            <LudoCodePreview.Header />
            <LudoCodePreview.Code withGaps={false} />
          </LudoCodePreview>
        </LudoCodePreview.WithOutput>
      );
    case "media":
      return <ExerciseMedia media={block.src} />;
    case "instructions":
      return (
        <div className="flex flex-col gap-2 w-full lg:max-w-xl">
          {block.instructions.map((step, idx) => (
            <div key={idx} className="flex w-full items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-ludo-white-bright">
                <span className="h-1 w-1 rounded-full bg-current" />
              </span>
              <p className="min-w-0 flex-1 text-left text-sm leading-relaxed text-ludo-white">
                {step}
              </p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

type ExerciseMediaProps = { media: string };

function ExerciseMedia({ media }: ExerciseMediaProps) {
  return (
    <div className="w-full items-center flex justify-center">
      <img className="max-h-60 w-auto" src={media} />
    </div>
  );
}
