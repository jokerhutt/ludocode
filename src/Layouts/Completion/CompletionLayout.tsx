
import { CompletionFooter } from "@/features/Completion/Footer/CompletionFooter";
import { completionRoute } from "@/routes/router";
import {
  LessonCompletionPage,
  CourseCompletePage,
  StreakIncreasePage,
} from "@/features/Completion/CompletionPage";
import type {
  CompletionSearch,
  CompletionState,
} from "@/Types/Exercise/LessonCompletionResponse";
import { CompletionContext } from "@/Hooks/Context/Completion/CompletionContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { MainGridWrapper } from "@/components/LudoComponents/Layouts/Grids/MainGridWrapper";
import { MainContentWrapper } from "@/components/LudoComponents/Layouts/Grids/MainContentWrapper";

export const STEPS = ["lesson", "streak", "course"] as const;
export type Step = (typeof STEPS)[number];

export function assertStep(step: string): Step {
  if (!STEPS.includes(step as Step)) throw new Error("Invalid completion step");
  return step as Step;
}

export function CompletionLayout() {
  const { courseId, lessonId } = completionRoute.useParams();
  const search: CompletionSearch = completionRoute.useSearch();
  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const course = courses.find((course) => course.id == courseId);
  if (!course) return null;
  const courseName = course.title;

  const completionState: CompletionState = {
    courseId,
    courseName,
    lessonId,
    search,
  };

  const { step } = search;

  return (
    <MainGridWrapper gridRows="SITE_INVERSE">
      <CompletionContext.Provider value={completionState}>
        <MainContentWrapper>
          <div className="col-span-full grid grid-cols-12 h-full">
            <div className="text-white col-start-2 col-end-12 lg:col-start-5 lg:col-end-9 flex flex-col gap-4 justify-center min-w-0">
              {step === "lesson" && <LessonCompletionPage />}

              {step === "streak" && <StreakIncreasePage />}

              {step === "course" && <CourseCompletePage />}
            </div>
          </div>
        </MainContentWrapper>
        <CompletionFooter />
      </CompletionContext.Provider>
    </MainGridWrapper>
  );
}
