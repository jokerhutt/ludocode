import type { CurriculumDraft } from "@ludocode/types";
import { ModuleEditorCard } from "./ModuleEditorCard";
import { withForm } from "../../types";
import { EditorActions } from "./EditorActions";
import { AddModuleButton } from "./AddModuleButton";
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
      <div className="w-full h-full min-h-0 pr-2 overflow-y-auto scrollbar-ludo-accent flex flex-col gap-4">
        <div className="w-full text-white flex justify-between">
          <p>Editing Curriculum</p>
          <EditorActions
            onSave={onSave}
            onCancel={onCancel}
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        <form.Field name="modules" mode="array">
          {(modulesField) => (
            <>
              {modulesField.state.value.map((module, moduleIndex) => (
                <div key={moduleIndex} className="flex flex-col gap-2">
                  <ModuleEditorCard
                    onSave={onSave}
                    form={form}
                    moduleIndex={moduleIndex}
                    onMoveUp={() =>
                      modulesField.swapValues(moduleIndex, moduleIndex - 1)
                    }
                    onMoveDown={() =>
                      modulesField.swapValues(moduleIndex, moduleIndex + 1)
                    }
                  />

                  <AddModuleButton
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
    );
  },
});
