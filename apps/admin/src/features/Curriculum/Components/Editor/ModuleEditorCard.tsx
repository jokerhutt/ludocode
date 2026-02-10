import { LudoInput } from "@ludocode/design-system/primitives/input";
import type { CurriculumDraft } from "@ludocode/types";
import { Grip } from "lucide-react";
import { withForm } from "../../types";
import { EditorFooterActions } from "./EditorFooterActions";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

export const ModuleEditorCard = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    moduleIndex: 0,
    onSave: () => {},
  },
  render: function Render({ form, moduleIndex, onSave }) {
    return (
      <div className="flex rounded-lg text-white border-3 p-4 border-dashed border-ludo-accent h-full flex-col w-full">
        <div className="w-full flex items-center gap-4">
          <Grip className="h-5 w-5" />
          <form.Field
            name={`modules[${moduleIndex}].title`}
            children={(field) => <p>{String(field.state.value)}</p>}
          />
        </div>
        <form.Field
          name={`modules[${moduleIndex}].lessons`}
          mode="array"
          children={(lessonsField) => (
            <>
              <div className="flex flex-col gap-4 w-full p-4 h-full">
                {lessonsField.state.value.map((lesson, lessonIndex) => (
                  <div
                    key={lesson.id}
                    className="w-full flex items-center gap-2"
                  >
                    <Grip className="h-5 w-5" />
                    <form.Field
                      name={`modules[${moduleIndex}].lessons[${lessonIndex}].title`}
                      children={(field) => (
                        <LudoInput
                          className="h-10"
                          value={String(field.state.value)}
                          setValue={(value) => field.handleChange(value)}
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-end pr-4 items-center gap-4">
                  <LudoButton
                    className="w-auto h-auto px-4 py-1 rounded-sm"
                    shadow={false}
                    variant="white"
                    onClick={() =>
                      lessonsField.pushValue({
                        id: crypto.randomUUID(),
                        title: "",
                      })
                    }
                  >
                    Add Lesson
                  </LudoButton>
                </div>
            </>
          )}
        />
      </div>
    );
  },
});
