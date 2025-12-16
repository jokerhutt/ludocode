import { HeroIcon } from "@/components/design-system/atoms/hero-icon/hero-icon";

type CodeUtilsGroupProps = {
  enabled: boolean;
  visible?: boolean;
  clearExerciseInputs: () => void;
  popLast: () => void;
  isEmpty: boolean;
};

export function CodeUtilsGroup({
  enabled,
  visible,
  clearExerciseInputs,
  popLast,
  isEmpty,
}: CodeUtilsGroupProps) {
  if (visible) return (
    <div className="w-full flex items-end gap-6">
      <div
        onClick={() => {
          if (!enabled) return;
          clearExerciseInputs();
        }}
      >
        <HeroIcon
          iconName="TrashIcon"
          className={`h-6 hover:cursor-pointer ${
            isEmpty ? "text-ludoAltText/40" : "text-ludoAltText"
          } w-6`}
        />
      </div>
      <div
        onClick={() => {
          if (!enabled) return;
          popLast();
        }}
      >
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
