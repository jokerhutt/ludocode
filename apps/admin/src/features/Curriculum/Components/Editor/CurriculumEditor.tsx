import type { CurriculumDraft } from "@ludocode/types";
import { EditorModule } from "./EditorModule";
import { withForm } from "../../types";
import { EditorActions } from "./EditorActions";
import { AddCurriculumItemButton } from "./AddModuleButton";
import { createNewModuleTemplate } from "./templates";

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
      <div className="w-full h-full min-h-0 flex flex-col">
        <div className="w-full text-white flex justify-between pb-4 border-b border-b-ludo-accent">
          <p>Editing Curriculum</p>
          <EditorActions
            onSave={onSave}
            onCancel={onCancel}
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="overflow-y-auto scrollbar-ludo-accent py-2 pr-2 h-full w-full min-h-0">
          <form.Field name="modules" mode="array">
            {(modulesField) => (
              <>
                {modulesField.state.value.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="flex flex-col pb-4 gap-4">
                    <EditorModule
                      onSave={onSave}
                      form={form}
                      moduleIndex={moduleIndex}
                      onMoveUp={() =>
                        modulesField.swapValues(moduleIndex, moduleIndex - 1)
                      }
                      onMoveDown={() =>
                        modulesField.swapValues(moduleIndex, moduleIndex + 1)
                      }
                      onDelete={() => modulesField.removeValue(moduleIndex)}
                    />

                    <AddCurriculumItemButton
                      text={"Add Module"}
                      onAdd={() =>
                        modulesField.insertValue(
                          moduleIndex + 1,
                          createNewModuleTemplate(),
                        )
                      }
                    />
                  </div>
                ))}
              </>
            )}
          </form.Field>
        </div>
      </div>
    );
  },
});
