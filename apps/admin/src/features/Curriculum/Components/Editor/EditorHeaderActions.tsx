import { ShadowLessButton } from "../ShadowLessButton";

type EditorHeaderActionsProps = {
  isSubmitting: boolean;
  onSave: () => void;
  onCancel: () => void;
  canSubmit: boolean;
};

export function EditorHeaderActions({
  isSubmitting,
  onCancel,
  canSubmit,
  onSave,
}: EditorHeaderActionsProps) {
  return (
    <div className="flex gap-2">
      <ShadowLessButton variant="white" onClick={onCancel}>
        Cancel
      </ShadowLessButton>
      <ShadowLessButton variant="white" onClick={onSave} disabled={!canSubmit}>
        {isSubmitting ? "Saving..." : "Save All"}
      </ShadowLessButton>
    </div>
  );
}
