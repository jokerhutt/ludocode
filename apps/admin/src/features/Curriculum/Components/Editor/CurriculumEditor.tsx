import type { CurriculumDraft } from "@ludocode/types";
import { ModuleEditorCard } from "./ModuleEditorCard";
import { withForm } from "../../types";
import { ShadowLessButton } from "../ShadowLessButton";
import { Plus } from "lucide-react";

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
        <form.Field name="modules" mode="array">
          {(modulesField) => (
            <>
              {modulesField.state.value.map((module, moduleIndex) => (
                <div key={module.id} className="flex flex-col gap-2">
                  <ModuleEditorCard
                    onSave={onSave}
                    form={form}
                    moduleIndex={moduleIndex}
                  />

                  <div
                    role="button"
                    onClick={() =>
                      modulesField.insertValue(moduleIndex + 1, {
                        id: crypto.randomUUID(),
                        title: "Untitled Module",
                        lessons: [
                          {
                            id: crypto.randomUUID(),
                            title: "Untitled Lesson",
                          },
                        ],
                      })
                    }
                    className="w-full hover:cursor-pointer hover:bg-ludo-accent/20
                               text-ludo-accent border border-dashed py-2 px-4
                               flex items-center border-ludo-accent rounded-sm gap-4"
                  >
                    <Plus />
                    <p>Add Module</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </form.Field>
      </div>
    );
  },
});
