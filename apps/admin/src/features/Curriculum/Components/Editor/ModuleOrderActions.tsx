import { ArrowDown, ArrowUp } from "lucide-react";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";

type ModuleOrderActionsProps = {
  moduleIndex: number;
  totalModules: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function ModuleOrderActions({
  moduleIndex,
  totalModules,
  onMoveUp,
  onMoveDown,
}: ModuleOrderActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <ShadowLessButton
        disabled={moduleIndex === 0}
        onClick={onMoveUp}
        className="w-6 h-6 rounded-sm"
      >
        <ArrowUp className="h-4 w-4" />
      </ShadowLessButton>

      <ShadowLessButton
        disabled={moduleIndex === totalModules - 1}
        onClick={onMoveDown}
        className="w-6 h-6 rounded-sm"
      >
        <ArrowDown className="h-4 w-4" />
      </ShadowLessButton>
    </div>
  );
}
