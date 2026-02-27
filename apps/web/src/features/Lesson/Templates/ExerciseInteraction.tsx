import type { useExerciseBodyData } from "@/features/Lesson//Hooks/useExerciseBodyData.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useLessonContext } from "@/features/Lesson//Context/useLessonContext.tsx";
import { OptionListWrapper } from "@/features/Lesson/Components/Code/option-list-wrapper.tsx";
import type { AnswerToken } from "@ludocode/types";
import { useIsMobile } from "@ludocode/hooks";
import { LudoCodePreview } from "@ludocode/design-system/widgets/LudoCodePreview";
import { LudoOption } from "@ludocode/design-system/primitives/ludo-option";

export type OptionLayout = "ROW" | "COLUMN";
export type SelectionMode = "APPEND" | "REPLACE";

export function ExerciseInteraction({
  body,
}: {
  body: ReturnType<typeof useExerciseBodyData>;
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
    <div className={cn("flex flex-col h-full justify-start gap-6")}>
      {/* INTERACTIVE CODE BLOCK — rendered when interaction has a file */}
      {interactionFile && (
        <div className="w-full">
          <LudoCodePreview
            prompt={interactionFile.content}
            options={options}
            userResponses={currentExerciseInputs}
            typing={!isMobile && phase === "DEFAULT"}
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
        </div>
      )}

      {/* OPTIONS */}
      <OptionListWrapper type={optionsLayout}>
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
              status={phase}
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
