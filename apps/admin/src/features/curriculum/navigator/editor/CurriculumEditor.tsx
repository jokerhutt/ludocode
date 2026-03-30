import type { CurriculumDraft, LanguageKey } from "@ludocode/types";
import { EditorModule } from "./EditorModule.tsx";
import { withForm } from "../../types.ts";
import { EditorActions } from "./EditorActions.tsx";
import { AddCurriculumItemButton } from "./AddModuleButton.tsx";
import { createNewModuleTemplate } from "../../templates.ts";
import {
  CurriculumCard,
  CurriculumCardContent,
  CurriculumCardHeader,
} from "../../components/CurriculumList.tsx";

export const CurriculumEditor = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    onSave: () => {},
    onCancel: () => {},
    canSubmit: false,
    isSubmitting: false,
    courseLanguage: undefined as LanguageKey | undefined,
  },
  render: function Render({
    form,
    onSave,
    onCancel,
    canSubmit,
    isSubmitting,
    courseLanguage,
  }) {
    return (
      <CurriculumCard>
        <CurriculumCardHeader>
          <p className="text-ludo-white-bright font-bold">Editing Curriculum</p>
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
                      courseLanguage={courseLanguage}
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
