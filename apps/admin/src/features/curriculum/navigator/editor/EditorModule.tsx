import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import type { CurriculumDraft } from "@ludocode/types";
import { withForm } from "../../types.ts";

import { ModuleOrderActions } from "./ModuleOrderActions.tsx";
import { SortableLessonContainer } from "./SortableLessonContainer.tsx";
import { LudoTrashIcon } from "@ludocode/design-system/primitives/action-icon.tsx";

export const EditorModule = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    moduleIndex: 0,
    onSave: () => {},
    onMoveUp: () => {},
    onMoveDown: () => {},
    onDelete: undefined as undefined | (() => void),
    canDelete: true,
  },
  render: function Render({
    form,
    moduleIndex,
    onMoveUp,
    onMoveDown,
    onDelete,
    canDelete,
  }) {
    const modules = form.state.values.modules;

    return (
      <div className="flex rounded-lg text-ludo-white-bright border-3 border-ludo-border w-full flex-col">
        <div className="flex items-center gap-3 border-b-3 border-b-ludo-border px-4 py-2 h-14">
          <ModuleOrderActions
            moduleIndex={moduleIndex}
            totalModules={modules.length}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
          />
          <form.Field
            name={`modules[${moduleIndex}].title`}
            children={(field) => (
              <LudoInput
                className="flex-1 h-8"
                setValue={(value) => field.handleChange(value)}
                value={String(field.state.value)}
              />
            )}
          />
          {onDelete && (
            <LudoTrashIcon
              onClick={canDelete ? onDelete : undefined}
              disabled={!canDelete}
            />
          )}
        </div>

        <SortableLessonContainer form={form} moduleIndex={moduleIndex} />
      </div>
    );
  },
});
