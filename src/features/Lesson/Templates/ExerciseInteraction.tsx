import { OptionListWrapper } from "@/components/design-system/blocks/wrapper/option-list-wrapper";
import { LudoCodeBlock } from "../UI/AnswerField/ExerciseAnswerField";
import { useSelectOption } from "../Hooks/useSelectOption";
import { ClickableOption } from "@/components/design-system/atoms/option/clickable-option";
import { WideClickableOption } from "@/components/design-system/atoms/option/wide-clickable-option";
import type { ExerciseInteractionConfig } from "../LessonPage";
import type { AnswerToken } from "../Hooks/useExercise";
import type { useExerciseBodyData } from "../Hooks/useExerciseBodyData";
import { cn } from "@/components/cn-utils";
import { CodeUtilsGroup } from "../UI/Group/CodeUtilsGroup";
import { useLessonContext } from "../Context/useLessonContext";

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
          <LudoCodeBlock
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
