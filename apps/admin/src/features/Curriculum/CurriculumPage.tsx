import { useSuspenseQuery } from "@tanstack/react-query";
import { CurriculumBody } from "./Components/CurriculumBody";
import { CurriculumHero } from "./Components/CurriculumHero";
import { CurriculumPreview } from "./Components/CurriculumPreview";
import { LessonPreview } from "./Components/LessonPreview";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { getRouteApi } from "@tanstack/react-router";

type CurriculumPageProps = {};

export function CurriculumPage({}: CurriculumPageProps) {
  const routeApi = getRouteApi("/_app/curriculum/$courseId");
  const { courseId } = routeApi.useParams();

  const { data: courseSnap } = useSuspenseQuery(qo.courseSnapshot(courseId));

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0">
      <div className="w-full flex gap-4 flex-col border-b border-b-ludo-accent-muted pb-6">
        <h1 className="text-white text-3xl font-bold">Python Developer</h1>
        <CurriculumHero />
      </div>

      <CurriculumBody courseSnap={courseSnap}/>
    </div>
  );
}
