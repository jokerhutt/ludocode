import type { ExerciseInteractionConfig } from "@/features/Lesson//Pages/LessonPage.tsx";
import type { useExerciseBodyData } from "@/features/Lesson//Hooks/useExerciseBodyData.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useLessonContext } from "@/features/Lesson//Context/useLessonContext.tsx";
import { OptionListWrapper } from "@/features/Lesson/Components/Code/option-list-wrapper.tsx";
import type { AnswerToken } from "@ludocode/types";
import { useIsMobile } from "@ludocode/hooks";
import { LudoCodePreview } from "@ludocode/design-system/widgets/LudoCodePreview";
import {LudoOption} from "@ludocode/design-system/primitives/ludo-option"


export function ExerciseInteraction({
  config,
  body,
}: {
  config: ExerciseInteractionConfig;
  body: ReturnType<typeof useExerciseBodyData>;
}) {
  const {
    options,
    prompt,
    currentExerciseInputs,
    setAnswerAt,
    replaceAnswerAt,
    popLastAnswer,
    clearExerciseInputs,
  } = body;

  const { selectionMode, showAnswerField, optionLayout, withGaps } = config;

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

  return (
    <div className={cn("flex flex-col h-full justify-start gap-6")}>
      {showAnswerField && (
        <div className="w-full">
          <LudoCodePreview
            prompt={prompt!}
            options={options}
            userResponses={currentExerciseInputs}
            typing={!isMobile && phase === "DEFAULT"}
            onChange={replaceAnswerAt}
            clear={clearExerciseInputs}
            popLast={popLastAnswer}
            className="shadow-lg shadow-black/15"
          >
            <LudoCodePreview.Header />
            <LudoCodePreview.Code withGaps={withGaps} />
            {withGaps && (
              <LudoCodePreview.Footer>
                <LudoCodePreview.DeleteButton />
                <LudoCodePreview.BackspaceButton />
              </LudoCodePreview.Footer>
            )}
          </LudoCodePreview>
        </div>
      )}

      <OptionListWrapper type={optionLayout}>
        {options.map((option) => {
          const isSelected =
            currentExerciseInputs.find((t) => t.id === option.id) != null;

          if (optionLayout === "ROW") {
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
