import { CompletionFooter } from "@/features/Completion/Components/Zone/CompletionFooter.tsx";
import {
  LessonCompletionPage,
  CourseCompletePage,
  StreakIncreasePage,
} from "@/features/Completion/Pages/CompletionPage.tsx";
import type {
  CompletionSearch,
  CompletionState,
} from "@ludocode/types/Completion/LessonCompletionResponse.ts";
import { CompletionContext } from "@/features/Completion/Context/CompletionContext.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper.tsx";
import { getRouteApi } from "@tanstack/react-router";

export const STEPS = ["lesson", "streak", "course"] as const;
export type Step = (typeof STEPS)[number];

export function assertStep(step: string): Step {
  if (!STEPS.includes(step as Step)) throw new Error("Invalid completion step");
  return step as Step;
}

export function CompletionLayout() {
  const completionRoute = getRouteApi(
    "/_app/completion/$courseId/$moduleId/$lessonId",
  );
  const { courseId, moduleId, lessonId } = completionRoute.useParams();
  const search: CompletionSearch = completionRoute.useSearch();
  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const course = courses.find((course) => course.id == courseId);
  if (!course) return null;
  const courseName = course.title;

  const completionState: CompletionState = {
    courseId,
    moduleId,
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
            <div className="text-ludo-white-bright col-start-2 col-end-12 lg:col-start-5 lg:col-end-9 flex flex-col gap-4 justify-center min-w-0">
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
