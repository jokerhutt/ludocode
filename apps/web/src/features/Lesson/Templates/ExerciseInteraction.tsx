import { InteractiveCodeBlock } from "@/features/Lesson/Components/Code/InteractiveCodeBlock.tsx";
import { useSelectOption } from "@/features/Lesson/Hooks/useSelectOption.tsx";

import type { ExerciseInteractionConfig } from "@/features/Lesson//Pages/LessonPage.tsx";
import type { useExerciseBodyData } from "@/features/Lesson//Hooks/useExerciseBodyData.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { CodeUtilsGroup } from "@/features/Lesson/Components/Code/CodeUtilsGroup.tsx";
import { useLessonContext } from "@/features/Lesson//Context/useLessonContext.tsx";
import { OptionListWrapper } from "@/features/Lesson/Components/Code/option-list-wrapper.tsx";
import {
  ClickableOption,
  WideClickableOption,
} from "@ludocode/design-system/primitives/clickable-option.tsx";
import type { AnswerToken } from "@ludocode/types";
import { useIsMobile } from "@ludocode/hooks";

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
    isEmpty,
    clearExerciseInputs,
  } = body;

  const { selectionMode, showAnswerField, optionLayout, withGaps } = config;

  const isMobile = useIsMobile({})

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
    <div className={cn("flex flex-col h-full justify-start gap-8")}>
      {showAnswerField && (
        <div className="w-full px-8 sm:px-8 lg:px-0">
          <div className="w-full rounded-xl overflow-hidden shadow-lg shadow-black/15">
            {/* Editor winbar */}
            <div className="h-9 px-4 flex items-center justify-between bg-ludo-surface/70">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="text-[11px] text-white/30 tracking-wide select-none">
                code
              </span>
            </div>

            {/* Editor content area */}
            <div className="bg-ludo-background py-6 sm:py-8 min-h-[120px] sm:min-h-[160px]">
              <InteractiveCodeBlock
                withGaps={withGaps}
                typing={!isMobile}
                options={options}
                answerField={prompt!}
                userResponses={currentExerciseInputs}
                setAnswerAt={replaceAnswerAt}
              />
            </div>

            {/* Utility toolbar */}
            <CodeUtilsGroup
              visible={withGaps}
              enabled={phase == "DEFAULT"}
              clearExerciseInputs={clearExerciseInputs}
              popLast={popLastAnswer}
              isEmpty={isEmpty}
            />
          </div>
        </div>
      )}

      <OptionListWrapper className="px-8 lg:px-0" type={optionLayout}>
        {options.map((option) => {
          const { isSelected, handleClick } = useSelectOption({
            option,
            currentExerciseInputs,
            addSelection: handleSelect,
          });

          return config.optionLayout === "ROW" ? (
            <ClickableOption
              enabled={phase === "DEFAULT"}
              key={option.id}
              handleClick={handleClick}
              content={option.content}
              isSelected={isSelected}
            />
          ) : (
            <WideClickableOption
              status={phase}
              enabled={phase === "DEFAULT"}
              key={option.id}
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
