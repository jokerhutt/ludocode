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
  const handleMoveUp = () => {
    if (moduleIndex === 0) return;
    onMoveUp();
  };

  const handleMoveDown = () => {
    if (moduleIndex === totalModules - 1) return;
    onMoveDown();
  };

  return (
    <div className="flex flex-col gap-2">
      <ShadowLessButton
        disabled={moduleIndex === 0}
        onClick={() => handleMoveUp()}
        className="w-6 h-6 rounded-sm"
      >
        <ArrowUp className="h-4 w-4" />
      </ShadowLessButton>

      <ShadowLessButton
        disabled={moduleIndex === totalModules - 1}
        onClick={() => handleMoveDown()}
        className="w-6 h-6 rounded-sm"
      >
        <ArrowDown className="h-4 w-4" />
      </ShadowLessButton>
    </div>
  );
}
