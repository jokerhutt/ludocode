import { useSuspenseQuery } from "@tanstack/react-query";
import { CurriculumBody } from "./Components/CurriculumBody";
import { CurriculumHero } from "./Components/CurriculumHero";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { getRouteApi } from "@tanstack/react-router";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { curriculumDraftSchema, type CurriculumDraft } from "@ludocode/types";

type CurriculumPageProps = {};

export function CurriculumPage({}: CurriculumPageProps) {
  const routeApi = getRouteApi("/_app/curriculum/$courseId");
  const { courseId } = routeApi.useParams();

  const { data: curriculumSnap } = useSuspenseQuery(
    qo.curriculumSnapshot(courseId),
  );

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
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
      // value is CurriculumDraft
    },
  });

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0">
      <div className="w-full flex justify-between border-b border-b-ludo-accent-muted pb-6">
        <div className="w-full flex gap-4 flex-col">
          <h1 className="text-white text-3xl font-bold">Python Developer</h1>
          <CurriculumHero />
        </div>
        <div className="flex items-end justify-end w-full">
          <LudoButton
            onClick={() => setIsEditing(!isEditing)}
            className="w-auto h-auto px-4 py-1 rounded-sm"
            shadow={false}
            variant="alt"
          >
            {isEditing ? "Save & Exit" : "Edit"}
          </LudoButton>
        </div>
      </div>

      <CurriculumBody
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        curriculumSnap={curriculumSnap}
      />
    </div>
  );
}
