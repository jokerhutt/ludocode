import type { CurriculumDraft } from "@ludocode/types";
import { ModuleEditorCard } from "./ModuleEditorCard";
import { withForm } from "../../types";
import { ShadowLessButton } from "../ShadowLessButton";

export const CurriculumEditor = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    onSave: () => {},
    onCancel: () => {},
    canSubmit: false,
    isSubmitting: false,
  },
  render: function Render({ form, onSave, onCancel, canSubmit, isSubmitting }) {
    return (
      <div className="w-full h-full min-h-0 pr-2 overflow-y-auto scrollbar-ludo-accent flex flex-col gap-4">
        <div className="w-full text-white flex justify-between">
          <p>Editing Curriculum</p>
          <div className="flex gap-2">
            <ShadowLessButton variant="white" onClick={onCancel}>
              Cancel
            </ShadowLessButton>
            <ShadowLessButton
              variant="alt"
              onClick={onSave}
              disabled={!canSubmit}
            >
              {isSubmitting ? "Saving..." : "Save All"}
            </ShadowLessButton>
          </div>
        </div>
        {form.state.values.modules.map((module, moduleIndex) => (
          <ModuleEditorCard
            onSave={onSave}
            key={module.id}
            form={form}
            moduleIndex={moduleIndex}
          />
        ))}
      </div>
    );
  },
});
