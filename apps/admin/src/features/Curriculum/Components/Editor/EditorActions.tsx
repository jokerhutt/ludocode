import { ShadowLessButton } from "../ShadowLessButton";

type EditorActionsProps = {
  isSubmitting: boolean;
  onSave: () => void;
  onCancel: () => void;
  canSubmit: boolean;
};

export function EditorActions({
  isSubmitting,
  onCancel,
  canSubmit,
  onSave,
}: EditorActionsProps) {
  return (
    <div className="flex gap-2">
      <ShadowLessButton variant="white" onClick={onCancel}>
        Cancel
      </ShadowLessButton>
      <ShadowLessButton variant="alt" onClick={onSave} disabled={!canSubmit}>
        {isSubmitting ? "Saving..." : "Save All"}
      </ShadowLessButton>
    </div>
  );
}
