import { cn } from "@ludocode/design-system/cn-utils";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";

type EditorActionsProps = {
  isSubmitting: boolean;
  onSave: () => void;
  onCancel: () => void;
  className?: string;
  canSubmit: boolean;
};

export function EditorActions({
  isSubmitting,
  onCancel,
  canSubmit,
  className,
  onSave,
}: EditorActionsProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <ShadowLessButton variant="white" onClick={onCancel}>
        Cancel
      </ShadowLessButton>
      <ShadowLessButton variant="alt" onClick={onSave} disabled={!canSubmit}>
        {isSubmitting ? "Saving..." : "Save All"}
      </ShadowLessButton>
    </div>
  );
}
