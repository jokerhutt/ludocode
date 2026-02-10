import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { CurriculumBody } from "./Components/CurriculumBody";
import { CurriculumHero } from "./Components/CurriculumHero";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import {
  curriculumDraftSchema,
  type CurriculumDraft,
  type CurriculumDraftLesson,
} from "@ludocode/types";
import { useAppForm } from "./types";
import { useUpdateCourse } from "@/hooks/Queries/Mutations/useUpdateCourse";
import { CurriculumPreview } from "./Components/CurriculumPreview";
import { CurriculumEditor } from "./Components/Editor/CurriculumEditor";
import { LessonPreview } from "./Components/LessonPreview";

type CurriculumPageProps = {};

export function CurriculumPage({}: CurriculumPageProps) {
  const routeApi = getRouteApi("/_app/curriculum/$courseId");
  const { courseId } = routeApi.useParams();

  const { data: curriculumSnap } = useSuspenseQuery(
    qo.curriculumSnapshot(courseId),
  );

  const [isEditing, setIsEditing] = useState(true);

  const submitMutation = useUpdateCourse({
    courseId,
  });

  const form = useAppForm({
    defaultValues: {
      modules: curriculumSnap.modules.map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: l.title,
        })),
      })),
    } satisfies CurriculumDraft,
    validators: {
      onSubmit: curriculumDraftSchema,
    },
    onSubmit: async ({ value }) => {
      submitMutation.mutate(value, {
        onSuccess: (payload) => {
          form.reset(payload);
        },
      });
      setIsEditing(false);
    },
  });

  const [selectedLesson, setSelectedLesson] =
    useState<CurriculumDraftLesson | null>(null);

  const handleSaveOrEdit = () => {
    if (isEditing) {
      form.handleSubmit();
    } else {
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0">
      <form
        className="min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="w-full flex justify-between border-b border-b-ludo-accent-muted pb-6">
          <div className="w-full flex gap-4 flex-col">
            <h1 className="text-white text-3xl font-bold">Python Developer</h1>
            <CurriculumHero />
          </div>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-4 min-h-0">
              <div className="w-full flex flex-col h-full">
                {!isEditing ? (
                  <CurriculumPreview
                    selectedLesson={selectedLesson}
                    onLessonClick={setSelectedLesson}
                    modules={form.state.values.modules}
                    onEditClick={handleSaveOrEdit}
                  />
                ) : (
                  <CurriculumEditor
                    form={form}
                    onSave={handleSaveOrEdit}
                    onCancel={cancelEditing}
                    canSubmit={canSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>

              <div className="w-1/2 flex min-h-0 flex-col h-full">
                {!isEditing && selectedLesson && (
                  <LessonPreview lesson={selectedLesson} />
                )}
              </div>
            </div>
          )}
        />
      </form>
    </div>
  );
}
