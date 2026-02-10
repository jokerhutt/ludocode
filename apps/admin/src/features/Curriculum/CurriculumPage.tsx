import { useSuspenseQuery } from "@tanstack/react-query";
import { CurriculumBody } from "./Components/CurriculumBody";
import { CurriculumHero } from "./Components/CurriculumHero";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { curriculumDraftSchema, type CurriculumDraft } from "@ludocode/types";
import { useAppForm } from "./types";

type CurriculumPageProps = {};

export function CurriculumPage({}: CurriculumPageProps) {
  const routeApi = getRouteApi("/_app/curriculum/$courseId");
  const { courseId } = routeApi.useParams();

  const { data: curriculumSnap } = useSuspenseQuery(
    qo.curriculumSnapshot(courseId),
  );

  const [isEditing, setIsEditing] = useState(false);

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
    // validators: {
    //   onSubmit: curriculumDraftSchema,
    // },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value);
      setIsEditing(false);
    },
  });

  const handleSaveOrEdit = () => {
    
    if (isEditing) {
      form.handleSubmit();
    } else {
      setIsEditing(true);
    }
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
            <CurriculumBody
              form={form}
              isEditing={isEditing}
              onEditClick={() => setIsEditing(true)}
              onSave={handleSaveOrEdit}
              onCancel={() => {
                form.reset();
                setIsEditing(false);
              }}
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        />
      </form>
    </div>
  );
}
