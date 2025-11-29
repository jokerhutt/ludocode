import { MainContentWrapper } from "../../Layouts/Grids/MainContentWrapper";
import { MainGridWrapper } from "../../Layouts/Grids/MainGridWrapper";
import { CompletionStatsRow } from "./CompletionStatsRow";
import Lottie from "lottie-react";
import { useLottie } from "../../Hooks/Animation/useLottie";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { completeRoute, router } from "../../routes/router";
import { CompletionFooter } from "./CompletionFooter";

export function LessonCompletionPage() {
  const { courseId, lessonId, coins, accuracy, oldStreak, newStreak, completionStatus } =
    completeRoute.useParams();
  const hasStreakIncreased = oldStreak < newStreak;

  const trophyAnimation = useLottie("/Animations/LC_TROPHY.json");

  const handleContinue = () => {
    if (hasStreakIncreased) {
      router.navigate(
        ludoNavigation.completion.toStreakIncrease(
          courseId,
          lessonId,
          oldStreak,
          newStreak,
          completionStatus
        )
      );
    } else {
      router.navigate(ludoNavigation.module.toCurrent(true));
    }
  };

  return (
    <MainGridWrapper gridRows="SITE_INVERSE">
      <MainContentWrapper>
        <div className="col-span-full grid grid-cols-12 h-full">
          <div className="text-white col-span-full px-4 lg:px-0 lg:col-start-5 lg:col-end-9 flex flex-col items-stretch gap-4 justify-center min-w-0">
            <Lottie
              animationData={trophyAnimation}
              loop={false}
              autoplay
              className="w-full h-80"
            />
            <h2 className="text-center text-2xl">Lesson Complete!</h2>
            <CompletionStatsRow userStats={{ coins, accuracy }} />
          </div>
        </div>
      </MainContentWrapper>
      <CompletionFooter handleContinue={handleContinue} />
    </MainGridWrapper>
  );
}
