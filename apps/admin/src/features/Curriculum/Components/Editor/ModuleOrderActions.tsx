import { ShadowLessButton } from "../ShadowLessButton";

type ModuleOrderActionsProps = {moveUp: () => void;};

export function ModuleOrderActions({}: ModuleOrderActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <ShadowLessButton
        disabled={moduleIndex === 0}
        onClick={() => moveUp()}
        className="w-6 h-6 rounded-sm"
      >
        <ArrowUp className="h-4 w-4" />
      </ShadowLessButton>

      <ShadowLessButton
        disabled={moduleIndex === modules.length - 1}
        onClick={() => moveDown()}
        className="w-6 h-6 rounded-sm"
      >
        <ArrowDown className="h-4 w-4" />
      </ShadowLessButton>
    </div>
  );
}
