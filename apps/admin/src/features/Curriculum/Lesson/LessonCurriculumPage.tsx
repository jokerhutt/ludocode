import { getRouteApi } from "@tanstack/react-router";
import { CurriculumHero } from "../Components/Zone/CurriculumHero";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";

type LessonCurriculumPageProps = {};

export function LessonCurriculumPage({}: LessonCurriculumPageProps) {
  const routeApi = getRouteApi("/_app/curriculum/$courseId/lesson/$lessonId");

  const {lessonId} = routeApi.useParams()

  const {data: lessonCurriculum} = useSuspenseQuery(qo.lessonCurriculumSnapshot(lessonId))

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0">
      <div className="w-full flex justify-between border-b border-b-ludo-accent-muted pb-6">
        <div className="w-full flex gap-4 flex-col">
          <h1 className="text-white text-3xl font-bold">Print Statements</h1>
        </div>
      </div>
      <div className="flex gap-4 min-h-0">
        <aside className="w-full flex flex-col h-full">

        </aside>

        <aside className="w-1/2 flex min-h-0 flex-col h-full">

        </aside>
      </div>
    </div>
  );
}
