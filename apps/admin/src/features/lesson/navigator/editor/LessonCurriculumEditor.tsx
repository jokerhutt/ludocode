import type {
  CurriculumDraftLessonForm,
  LanguageMetadata,
} from "@ludocode/types";
import { withForm } from "@/features/curriculum/types.ts";
import { EditorActions } from "@/features/curriculum/navigator/editor/EditorActions.tsx";
import { SortableExerciseContainer } from "../../detail/editor/SortableExerciseContainer.tsx";
import {
  createNewExerciseTemplate,
  createNewGuidedExerciseTemplate,
} from "../../detail/editor/templates.ts";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";
import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import { Textarea } from "@ludocode/external/ui/textarea.tsx";
import {
  getDefaultMainFilename,
  resolveCourseLanguage,
} from "../../detail/editor/language.ts";
import {
  CurriculumCard,
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/curriculum/components/CurriculumList.tsx";

export const LessonCurriculumEditor = withForm({
  defaultValues: {
    lessonType: "NORMAL" as CurriculumDraftLessonForm["lessonType"],
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    onSave: () => {},
    onCancel: () => {},
    canSubmit: false,
    isSubmitting: false,
    selectedExerciseId: null as string | null,
    onSelectExercise: (() => {}) as (id: string | null) => void,
    courseLanguage: undefined as LanguageMetadata | undefined,
  },
  render: function Render({
    form,
    onSave,
    onCancel,
    canSubmit,
    isSubmitting,
    selectedExerciseId,
    onSelectExercise,
    courseLanguage,
  }) {
    return (
      <CurriculumCard>
        <CurriculumCardHeader>
          <p className="text-ludo-white-bright font-bold">Editing Exercises</p>
          <EditorActions
            onSave={onSave}
            onCancel={onCancel}
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
          />
        </CurriculumCardHeader>

        <CurriculumCardContent className="p-0 bg-ludo-background">
          <LessonProjectSnapshotEditor
            form={form}
            courseLanguage={courseLanguage}
          />
          <SortableExerciseContainer
            form={form}
            selectedExerciseId={selectedExerciseId}
            onSelectExercise={onSelectExercise}
          />
        </CurriculumCardContent>

        <CurriculumCardFooter>
          <form.Subscribe
            selector={(state) => ({
              count: state.values.exercises.length,
              lessonType: state.values.lessonType,
            })}
            children={({ count, lessonType }) => (
              <div className="flex justify-between w-full items-center">
                <p className="text-xs">{count} exercises</p>
                <form.Field name="exercises" mode="array">
                  {(exercisesField: any) => (
                    <ShadowLessButton
                      type="button"
                      onClick={() =>
                        exercisesField.pushValue(
                          lessonType === "GUIDED"
                            ? createNewGuidedExerciseTemplate(courseLanguage)
                            : createNewExerciseTemplate(),
                        )
                      }
                    >
                      + Add Exercise
                    </ShadowLessButton>
                  )}
                </form.Field>
              </div>
            )}
          />
        </CurriculumCardFooter>
      </CurriculumCard>
    );
  },
});

function LessonProjectSnapshotEditor({
  form,
  courseLanguage,
}: {
  form: any;
  courseLanguage?: LanguageMetadata;
}) {
  return (
    <form.Subscribe
      selector={(state: any) => ({
        lessonType: state.values.lessonType,
        snapshot: state.values.projectSnapshot,
      })}
      children={({
        lessonType,
        snapshot,
      }: {
        lessonType: CurriculumDraftLessonForm["lessonType"];
        snapshot: CurriculumDraftLessonForm["projectSnapshot"];
      }) => {
        if (lessonType !== "GUIDED") {
          return (
            <div className="m-4 mb-2 rounded-lg border border-ludo-border bg-ludo-surface p-3">
              <p className="text-xs text-ludo-white/70">
                Project snapshot is only available for GUIDED lessons.
              </p>
            </div>
          );
        }

        if (!snapshot) {
          return (
            <div className="m-4 mb-2 rounded-lg border border-orange-400/30 bg-orange-400/10 p-3 flex items-center justify-between gap-3">
              <p className="text-xs text-orange-300">
                GUIDED lessons require a project snapshot.
              </p>
              <ShadowLessButton
                type="button"
                onClick={() =>
                  form.setFieldValue(
                    "projectSnapshot",
                    createDefaultProjectSnapshot(courseLanguage),
                  )
                }
              >
                + Create Snapshot
              </ShadowLessButton>
            </div>
          );
        }

        return (
          <div className="m-4 mb-2 rounded-lg border border-ludo-border bg-ludo-surface p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-orange-300 font-medium">
                Lesson Project Snapshot
              </p>
              <ShadowLessButton
                type="button"
                variant="danger"
                className="w-auto px-4 h-7 text-xs"
                onClick={() => form.setFieldValue("projectSnapshot", null)}
              >
                Remove Snapshot
              </ShadowLessButton>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <form.Field
                name="projectSnapshot.projectName"
                children={(field: any) => (
                  <LudoInput
                    value={String(field.state.value ?? "")}
                    setValue={(v: string) => field.handleChange(v)}
                    placeholder="Project name"
                  />
                )}
              />
              <form.Field
                name="projectSnapshot.projectId"
                children={(field: any) => (
                  <LudoInput
                    value={String(field.state.value ?? "")}
                    setValue={(v: string) => field.handleChange(v)}
                    placeholder="Project id"
                  />
                )}
              />
            </div>

            <form.Field name="projectSnapshot.files" mode="array">
              {(filesField: any) => {
                const files = filesField.state.value ?? [];

                return (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-orange-300">
                        Files ({files.length})
                      </p>
                      <p className="text-[11px] text-ludo-white/60">
                        Guided lessons use exactly one file.
                      </p>
                    </div>

                    {files.map((_f: unknown, fileIndex: number) => (
                      <div
                        key={fileIndex}
                        className="rounded-lg bg-ludo-background p-3 flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-ludo-white/70">
                            File {fileIndex + 1}
                          </p>
                        </div>

                        <form.Field
                          name={`projectSnapshot.files[${fileIndex}].path`}
                          children={(field: any) => (
                            <LudoInput
                              value={String(field.state.value ?? "")}
                              setValue={(v: string) => field.handleChange(v)}
                              placeholder="File path"
                            />
                          )}
                        />

                        <form.Field
                          name={`projectSnapshot.files[${fileIndex}].content`}
                          children={(field: any) => (
                            <Textarea
                              value={String(field.state.value ?? "")}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Starter code"
                              className="bg-ludo-surface border-transparent text-ludo-white-bright placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-none font-mono text-sm"
                            />
                          )}
                        />
                      </div>
                    ))}
                  </div>
                );
              }}
            </form.Field>

            <form.Field
              name="projectSnapshot.entryFilePath"
              children={(field: any) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(v: string) => field.handleChange(v)}
                  placeholder="Entry file path"
                />
              )}
            />
          </div>
        );
      }}
    />
  );
}

function createDefaultProjectSnapshot(courseLanguage?: LanguageMetadata) {
  const path = getDefaultMainFilename(courseLanguage);

  return {
    projectId: crypto.randomUUID(),
    projectName: "Guided Project",
    projectLanguage: resolveCourseLanguage(courseLanguage),
    projectType: "CODE" as const,
    files: [
      {
        tempId: crypto.randomUUID(),
        path,
        language: resolveCourseLanguage(courseLanguage),
        content: "",
      },
    ],
    entryFilePath: path,
  };
}
