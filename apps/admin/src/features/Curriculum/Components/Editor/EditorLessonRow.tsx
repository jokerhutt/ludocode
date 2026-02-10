import type { CurriculumDraftLesson } from "@ludocode/types";

type EditorLessonRowProps = { lesson: CurriculumDraftLesson };

export function EditorLessonRow({lesson}: EditorLessonRowProps) {
  return (
    <div key={lesson.id} className="w-full flex items-center gap-2">
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
  );
}
