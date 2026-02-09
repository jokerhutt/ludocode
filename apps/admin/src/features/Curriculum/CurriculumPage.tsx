import { CurriculumHero } from "./Components/CurriculumHero";
import { CurriculumPreview } from "./Components/CurriculumPreview";
import { LessonPreview } from "./Components/LessonPreview";

type CurriculumPageProps = {};

export function CurriculumPage({}: CurriculumPageProps) {
  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0">
      <div className="w-full flex gap-4 min-h-0 flex-col border-b border-b-ludo-accent-muted pb-6">
        <h1 className="text-white text-3xl font-bold">Python Developer</h1>
        <CurriculumHero />
      </div>
      <div className="flex gap-4 min-h-0">
        <div className="w-full  flex flex-col h-full">
          <CurriculumPreview />
        </div>

        <div className="w-full flex min-h-0 flex-col h-full">
          <LessonPreview />
        </div>
      </div>
    </div>
  );
}
