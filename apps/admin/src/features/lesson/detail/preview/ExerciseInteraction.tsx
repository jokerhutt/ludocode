import { cn } from "@ludocode/design-system/cn-utils.ts";
import { InlineCode } from "@ludocode/design-system/primitives/inline-code.tsx";
import type { CurriculumDraftLessonExercise } from "@ludocode/types";
import { Fragment, useMemo } from "react";

type StaticOptionProps = {
  content: string;
  isCorrect: boolean;
  layout: "ROW" | "COLUMN";
};

function StaticOption({ content, isCorrect, layout }: StaticOptionProps) {
  if (layout === "ROW") {
    return (
      <div
        className={cn(
          "py-2 code px-4 border-3 rounded-xl",
          isCorrect
            ? "border-ludo-success-alt-dim text-ludo-success"
            : "border-ludo-surface-dim text-ludo-white-bright",
        )}
      >
        <p className="text-md">{content}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full border-2 px-6 py-2 rounded-lg",
        isCorrect
          ? "border-ludo-success-alt-dim bg-ludo-success-alt/5"
          : "border-ludo-surface bg-ludo-surface",
      )}
    >
      <p className="text-left text-ludo-white-bright">{content}</p>
    </div>
  );
}

function StaticCodeBlock({ prompt }: { prompt: string }) {
  const parts = useMemo(() => prompt.split("___"), [prompt]);

  return (
    <p
      className="text-ludo-white-bright text-lg text-start items-center leading-loose font-light
        flex flex-wrap *:mr-1 [&>*:last-child]:mr-0 gap-y-2 overflow-x-hidden"
    >
      {parts.map((part, index) => (
        <Fragment key={index}>
          <InlineCode lineHeight="26px" code={part} />
          {index < parts.length - 1 && (
            <span className="inline-block bg-ludo-background rounded-lg h-7 min-w-12 mx-0.5 border border-dashed border-ludo-accent-muted/50" />
          )}
        </Fragment>
      ))}
    </p>
  );
}

export function ExerciseInteraction({
  exercise,
}: {
  exercise: CurriculumDraftLessonExercise;
}) {
  const { interaction } = exercise;

  if (!interaction) return null;

  if (interaction.type === "SELECT") {
    return (
      <div className={cn("flex flex-col h-full justify-start gap-8")}>
        <div
          className={cn("w-full px-8 lg:px-0 flex flex-col items-center gap-6")}
        >
          {interaction.items.map((item, idx) => (
            <StaticOption
              key={idx}
              content={item}
              isCorrect={item === interaction.correctValue}
              layout="COLUMN"
            />
          ))}
        </div>
      </div>
    );
  }

  if (interaction.type === "CLOZE") {
    return (
      <div className={cn("flex flex-col h-full justify-start gap-8")}>
        {interaction.file && (
          <div className="w-full px-8 bg-ludo-background lg:rounded-lg py-4 flex flex-col gap-3">
            <StaticCodeBlock prompt={interaction.file.content} />
          </div>
        )}

        {interaction.options.length > 0 && (
          <div
            className={cn(
              "w-full px-8 lg:px-0 flex justify-center flex-wrap items-center gap-4",
            )}
          >
            {interaction.options.map((option, idx) => (
              <StaticOption
                key={idx}
                content={option}
                isCorrect={interaction.blanks.some((b) =>
                  b.correctOptions.includes(option),
                )}
                layout="ROW"
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (interaction.type === "EXECUTABLE") {
    return (
      <div className={cn("flex flex-col h-full justify-start gap-6")}>
        <p className="text-xs text-ludo-white/60">
          Starter files come from the lesson project snapshot.
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-orange-400">Solution</p>
          <pre className="bg-ludo-surface rounded px-3 py-2 text-xs text-ludo-white-bright font-mono whitespace-pre-wrap wrap-break-word">
            {interaction.solution || "(empty)"}
          </pre>
        </div>

        {/* Tests */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-orange-400">
            Tests ({interaction.tests.length})
          </p>
          {interaction.tests.map((test, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-ludo-surface rounded px-3 py-2"
            >
              <span className="text-xs text-ludo-white-bright font-medium">
                {test.type}
              </span>
              <span className="text-xs text-ludo-white/60">&rarr;</span>
              <span className="text-xs text-ludo-success font-mono">
                {test.expected || "(empty)"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
