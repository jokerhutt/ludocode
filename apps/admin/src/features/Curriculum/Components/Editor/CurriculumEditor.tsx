import type { CurriculumDraft } from "@ludocode/types";
import { EditorModule } from "./EditorModule";
import { withForm } from "../../types";
import { EditorActions } from "./EditorActions";
import { AddCurriculumItemButton } from "./AddModuleButton";
import { createNewModuleTemplate } from "./templates";
import {
  CurriculumCard,
  CurriculumCardContent,
  CurriculumCardHeader,
} from "../CurriculumList";

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
  render: function Render({
    form,
    onSave,
    onCancel,
    canSubmit,
    isSubmitting,
  }) {


    return (
      <CurriculumCard>
        <CurriculumCardHeader>
          <p className="text-white font-bold">Editing Curriculum</p>
            <EditorActions
              onSave={onSave}
              onCancel={onCancel}
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
        </CurriculumCardHeader>

        <CurriculumCardContent className="bg-ludo-background gap-4">
          <form.Field name="modules" mode="array">
            {(modulesField) => (
              <>
                {modulesField.state.value.map((_module, moduleIndex) => (
                  <div key={moduleIndex} className="flex flex-col gap-4">
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
                      canDelete={modulesField.state.value.length > 1}
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
        </CurriculumCardContent>
      </CurriculumCard>
    );
  },
});
