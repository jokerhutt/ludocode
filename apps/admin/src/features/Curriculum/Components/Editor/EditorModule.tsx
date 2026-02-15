import { LudoInput } from "@ludocode/design-system/primitives/input";
import type { CurriculumDraft } from "@ludocode/types";
import { Trash2 } from "lucide-react";
import { withForm } from "../../types";

import { ModuleOrderActions } from "./ModuleOrderActions";
import { SortableLessonContainer } from "./SortableLessonContainer";

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
  },
  render: function Render({
    form,
    moduleIndex,
    onMoveUp,
    onMoveDown,
    onDelete,
  }) {
    const modules = form.state.values.modules;

    return (
      <div className="flex rounded-lg text-white border-3 p-4 gap-6 border-dashed border-ludo-accent h-full w-full">
        <ModuleOrderActions
          moduleIndex={moduleIndex}
          totalModules={modules.length}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
        <div className="flex flex-col w-full h-full">
          <div className="w-full flex items-center gap-4">
            <form.Field
              name={`modules[${moduleIndex}].title`}
              children={(field) => (
                <LudoInput
                  setValue={(value) => field.handleChange(value)}
                  value={String(field.state.value)}
                />
              )}
            />
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="text-red-400 hover:text-red-300 transition-colors p-1 rounded hover:bg-red-400/10 shrink-0"
                title="Delete module"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <SortableLessonContainer form={form} moduleIndex={moduleIndex} />
        </div>
      </div>
    );
  },
});
