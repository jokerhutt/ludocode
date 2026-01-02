import { InteractiveCodeBlock } from "@/features/Lesson/Components/Code/InteractiveCodeBlock.tsx";
import { useSelectOption } from "../Hooks/useSelectOption.tsx";

import type { ExerciseInteractionConfig } from "../Pages/LessonPage.tsx";
import type { useExerciseBodyData } from "../Hooks/useExerciseBodyData.tsx";
import { cn } from "../../../../../../packages/design-system/cn-utils.ts";
import { CodeUtilsGroup } from "@/features/Lesson/Components/Code/CodeUtilsGroup.tsx";
import { useLessonContext } from "../Context/useLessonContext.tsx";
import { OptionListWrapper } from "@/features/Lesson/Components/Code/option-list-wrapper.tsx";
import { ClickableOption, WideClickableOption } from "../../../../../../packages/design-system/primitives/clickable-option.tsx";
import type { AnswerToken } from "@ludocode/types";

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

  const { phase } = useLessonContext();

  const handleSelect = (token: AnswerToken) => {
    if (selectionMode === "APPEND") {
      setAnswerAt(token);
    } else {
      replaceAnswerAt(0, token);
    }
  };

  return (
    <div className={cn("flex flex-col h-full justify-start gap-8")}>
      {showAnswerField && (
        <div className="w-full px-8 bg-codeGray lg:rounded-lg py-4 flex flex-col gap-3">
          <InteractiveCodeBlock
            withGaps={withGaps}
            options={options}
            answerField={prompt!}
            userResponses={currentExerciseInputs}
            setAnswerAt={replaceAnswerAt}
          />
          <CodeUtilsGroup
            visible={withGaps}
            enabled={phase == "DEFAULT"}
            clearExerciseInputs={clearExerciseInputs}
            popLast={popLastAnswer}
            isEmpty={isEmpty}
          />
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
              key={option.id}
              handleClick={handleClick}
              content={option.content}
              isSelected={isSelected}
            />
          ) : (
            <WideClickableOption
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
