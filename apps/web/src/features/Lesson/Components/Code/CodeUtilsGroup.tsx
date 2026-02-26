import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";

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
  if (visible)
    return (
      <div className="flex items-center gap-1 px-4 py-1.5 bg-ludo-surface/40">
        <button
          type="button"
          onClick={() => {
            if (!enabled) return;
            clearExerciseInputs();
          }}
          className="p-1.5 rounded-md hover:bg-white/5 transition-colors disabled:opacity-30"
          disabled={!enabled || isEmpty}
        >
          <HeroIcon
            iconName="TrashIcon"
            className={`h-4 w-4 ${
              isEmpty
                ? "text-ludoAltText/30"
                : "text-ludoAltText hover:text-white"
            } transition-colors`}
          />
        </button>
        <button
          type="button"
          onClick={() => {
            if (!enabled) return;
            popLast();
          }}
          className="p-1.5 rounded-md hover:bg-white/5 transition-colors disabled:opacity-30"
          disabled={!enabled || isEmpty}
        >
          <HeroIcon
            iconName="BackspaceIcon"
            className={`h-4 w-4 ${
              isEmpty
                ? "text-ludoAltText/30"
                : "text-ludoAltText hover:text-white"
            } transition-colors`}
          />
        </button>
      </div>
    );
}
