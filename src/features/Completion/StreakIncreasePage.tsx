import Lottie from "lottie-react";
import { MainContentWrapper } from "../../Layouts/Grids/MainContentWrapper";
import { MainGridWrapper } from "../../Layouts/Grids/MainGridWrapper";
import { router, streakIncreaseRoute } from "../../routes/router";
import { StreakCountIncrement } from "./StreakCountIncrement";
import animationData from "../../../public/Animations/STR_INCREASE.json";
import { useTimedLottie } from "@/Hooks/UI/useTimedLottie";
import { ludoNavigation } from "@/routes/ludoNavigation";
import type { LessonCompletionStatus } from "@/Types/Exercise/LessonCompletionResponse";
import { CompletionFooter } from "./CompletionFooter";

type StreakIncreasePageProps = {};

export function StreakIncreasePage({}: StreakIncreasePageProps) {
  const { courseId, oldStreak, newStreak, completionStatus } =
    streakIncreaseRoute.useParams();
  const typedCompletionStats = completionStatus as LessonCompletionStatus;

  const oldNumCount = Number(oldStreak);
  const newNumCount = Number(newStreak) + 1;

  //todo add this as a param
  const isCourseComplete = typedCompletionStats === "COURSE_COMPLETE";

  const handleContinue = () => {
    if (isCourseComplete) {
      router.navigate(ludoNavigation.completion.toCourseComplete(courseId))
    } else {
      router.navigate(ludoNavigation.module.toCurrent());
    }
  };

  const { lottieRef } = useTimedLottie({ minusFrames: 20 });

  return (
    <MainGridWrapper gridRows="SITE_INVERSE">
      <MainContentWrapper>
        <div className="col-span-full grid grid-cols-12 h-full">
          <div className="text-white col-start-5 col-end-9 flex flex-col items-stretch gap-4 justify-center min-w-0">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              autoPlay={false}
              loop={false}
              className="w-full h-80"
            />
            <StreakCountIncrement
              oldCount={oldNumCount}
              newCount={newNumCount}
            />
          </div>
        </div>
      </MainContentWrapper>
      <CompletionFooter handleContinue={handleContinue} />
    </MainGridWrapper>
  );
}
