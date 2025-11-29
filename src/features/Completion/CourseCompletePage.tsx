import { MainContentWrapper } from "@/Layouts/Grids/MainContentWrapper";
import { MainGridWrapper } from "@/Layouts/Grids/MainGridWrapper";
import { CompletionFooter } from "./CompletionFooter";
import { courseCompleteRoute, router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";
import animationData from "../../../public/Animations/LC_CONFETTI_SLOW.json";
import { useTimedLottie } from "@/Hooks/UI/useTimedLottie";
import Lottie from "lottie-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries";
type CourseCompletePageProps = {};

export function CourseCompletePage({}: CourseCompletePageProps) {
  const handleContinue = () =>
    router.navigate(ludoNavigation.module.toCurrent());

  const { lottieRef } = useTimedLottie({ minusFrames: 1 });

  const { courseId } = courseCompleteRoute.useParams();
  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const course = courses.find((course) => course.id == courseId);

  if (!course) return null;
  const courseName = course.title;

  return (
    <MainGridWrapper gridRows="SITE_INVERSE">
      <MainContentWrapper>
        <div className="col-span-full grid grid-cols-12 h-full">
          <div className="text-white col-start-5 col-end-9 flex flex-col items-stretch gap-4 justify-center min-w-0">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              autoPlay={false}
              loop={true}
              className="w-full h-100 border-t border-b mb-4"
            />
            <div className="flex text-center gap-8 flex-col">
              <h2 className="text-3xl">Course Complete!</h2>
              <p className="text-lg">
                Congratulations on completing the {courseName} course!
              </p>
            </div>
          </div>
        </div>
      </MainContentWrapper>
      <CompletionFooter handleContinue={handleContinue} />
    </MainGridWrapper>
  );
}
