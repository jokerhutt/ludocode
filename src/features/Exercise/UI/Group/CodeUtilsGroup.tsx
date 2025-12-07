import { HeroIcon } from "@/components/design-system/atoms/hero-icon/hero-icon";

type CodeUtilsGroupProps = {
  clearExerciseInputs: () => void;
  popLast: () => void;
  isEmpty: boolean;
};

export function CodeUtilsGroup({
  clearExerciseInputs,
  popLast,
  isEmpty,
}: CodeUtilsGroupProps) {
  return (
    <div className="w-full flex mt-6 items-end gap-6">
      <div onClick={() => clearExerciseInputs()}>
        <HeroIcon
          iconName="TrashIcon"
          className={`h-6 hover:cursor-pointer ${
            isEmpty ? "text-ludoAltText/40" : "text-ludoAltText"
          } w-6`}
        />
      </div>
      <div onClick={() => popLast()}>
        <HeroIcon
          iconName="BackspaceIcon"
          className={`h-6 hover:cursor-pointer ${
            isEmpty ? "text-ludoAltText/40" : "text-ludoAltText"
          } w-6`}
        />
      </div>
    </div>
  );
}
