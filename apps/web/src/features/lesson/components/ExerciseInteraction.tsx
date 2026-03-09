import type { useExerciseBodyData } from "@/features/lesson/hooks/useExerciseBodyData.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useLessonContext } from "@/features/lesson/context/useLessonContext.tsx";
import type { AnswerToken } from "@ludocode/types";
import { useIsMobile } from "@ludocode/hooks";
import { LudoCodePreview } from "@ludocode/design-system/widgets/LudoCodePreview.tsx";
import { LudoOption } from "@ludocode/design-system/primitives/ludo-option.tsx";
import type { ReactNode } from "react";

export type OptionLayout = "ROW" | "COLUMN";
export type SelectionMode = "APPEND" | "REPLACE";

export function ExerciseInteraction({
  body,
  output = null,
  showOutput = false,
  mobileOutput = false,
}: {
  body: ReturnType<typeof useExerciseBodyData>;
  output?: string | null;
  showOutput?: boolean;
  mobileOutput?: boolean;
}) {
  const {
    options,
    interactionFile,
    currentExerciseInputs,
    exerciseType,
    setAnswerAt,
    replaceAnswerAt,
    popLastAnswer,
    clearExerciseInputs,
  } = body;

  const isMobile = useIsMobile({});

  const { phase } = useLessonContext();

  const handleSelect = (token: AnswerToken) => {
    if (phase !== "DEFAULT") return;
    if (selectionMode === "APPEND") {
      setAnswerAt(token);
    } else {
      replaceAnswerAt(0, token);
    }
  };

  const selectionMode: SelectionMode =
    exerciseType == "CLOZE" ? "APPEND" : "REPLACE";
  const optionsLayout: OptionLayout =
    exerciseType == "CLOZE" ? "ROW" : "COLUMN";

  return (
    <div
      className={cn("flex flex-col w-full items-center justify-start gap-8")}
    >
      {interactionFile && (
        <LudoCodePreview.WithOutput
          output={output}
          show={showOutput}
          mobile={mobileOutput}
        >
          <LudoCodePreview
            className="lg:max-w-xl"
            prompt={interactionFile.content}
            options={options}
            userResponses={currentExerciseInputs}
            typing={!isMobile && phase === "DEFAULT"}
            actionsEnabled={phase === "DEFAULT"}
            onChange={replaceAnswerAt}
            clear={clearExerciseInputs}
            popLast={popLastAnswer}
            shadow
          >
            <LudoCodePreview.Header />
            <LudoCodePreview.Code withGaps={true} />
            <LudoCodePreview.Footer>
              <LudoCodePreview.DeleteButton />
              <LudoCodePreview.BackspaceButton />
            </LudoCodePreview.Footer>
          </LudoCodePreview>
        </LudoCodePreview.WithOutput>
      )}

      {/* OPTIONS */}
      <OptionListWrapper className="lg:max-w-xl max-w-xl" type={optionsLayout}>
        {options.map((option) => {
          const isSelected =
            currentExerciseInputs.find((t) => t.id === option.id) != null;

          if (optionsLayout === "ROW") {
            return (
              <LudoOption
                key={option.id}
                variant="pill"
                enabled={phase === "DEFAULT"}
                content={option.content}
                isSelected={isSelected}
                onSelect={() =>
                  handleSelect({ id: option.id, value: option.content })
                }
              />
            );
          }

          return (
            <LudoOption
              key={option.id}
              variant="wideSingleSelect"
              enabled={phase === "DEFAULT"}
              status={phase === "SUBMITTED" ? "DEFAULT" : phase}
              option={option}
              userSelections={currentExerciseInputs}
              setAnswerAt={replaceAnswerAt}
            />
          );
        })}
      </OptionListWrapper>
    </div>
  );
}

type OptionListWrapperProps = {
  children: ReactNode;
  type: "ROW" | "COLUMN";
  className?: string;
};

export function OptionListWrapper({
  children,
  type,
  className,
}: OptionListWrapperProps) {
  const rowStyle = "flex justify-center flex-wrap items-center gap-4";
  const colStyle = "flex flex-col items-center gap-4";

  const style = type == "ROW" ? rowStyle : colStyle;

  return <div className={cn("w-full", style, className)}>{children}</div>;
}
