import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

type EditorFooterActionsProps = {
  onAddLesson: () => void;
  onAbort: () => void;
  onSave: () => void;
};

export function EditorFooterActions({
  onAddLesson,
  onAbort,
  onSave,
}: EditorFooterActionsProps) {
  return (
    <div className="w-full flex justify-end pr-4 items-center gap-4">
      <div className="flex justify-end gap-4">
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
          onClick={onSave}
        >
          Save
        </LudoButton>
      </div>
    </div>
  );
}
