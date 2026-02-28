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
            ? "border-emerald-500/40 text-emerald-400"
            : "border-ludo-surface/50 text-white",
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
          ? "border-emerald-500/40 bg-emerald-500/5"
          : "border-ludo-surface bg-ludo-surface",
      )}
    >
      <p className="text-left text-white">{content}</p>
    </div>
  );
}

function StaticCodeBlock({ prompt }: { prompt: string }) {
  const parts = useMemo(() => prompt.split("___"), [prompt]);

  return (
    <p
      className="text-white text-lg text-start items-center leading-loose font-light
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
          <div className="w-full px-8 bg-ludo-code-surface lg:rounded-lg py-4 flex flex-col gap-3">
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

  return null;
}
