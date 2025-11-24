import { useSuspenseQuery } from "@tanstack/react-query";
import { MainContentWrapper } from "../../Layouts/Grids/MainContentWrapper";
import { MainGridWrapper } from "../../Layouts/Grids/MainGridWrapper";
import { CompletionStatsRow } from "./CompletionStatsRow";
import { qo } from "../../Hooks/Queries/Definitions/queries";
import Lottie from "lottie-react";
import { useLottie } from "../../Hooks/Animation/useLottie";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { completeRoute, router } from "../../routes/router";
import { LessonCompletionFooter } from "./LessonCompletionFooter";

export function LessonCompletionPage() {
  const currentUser = useSuspenseQuery(qo.currentUser());

  const { coins, accuracy, oldStreak, newStreak } = completeRoute.useParams();
  const hasStreakIncreased = oldStreak < newStreak;

  const animationData = useLottie("/Animations/LC_CONFETTI.json");
  const altAnimation = useLottie("/Animations/LC_TROPHY.json");

  const handleContinue = () => {
    router.navigate(ludoNavigation.module.toCurrent(true));
  };

  return (
    <MainGridWrapper gridRows="SITE_INVERSE">
      <MainContentWrapper>
        <div className="col-span-full grid grid-cols-12 h-full">
          <div className="text-white col-span-full px-4 lg:px-0 lg:col-start-5 lg:col-end-9 flex flex-col items-stretch gap-4 justify-center min-w-0">
            <Lottie
              animationData={altAnimation}
              loop={false}
              autoplay
              className="w-full h-80"
            />
            <h2 className="text-center text-2xl">Lesson Complete!</h2>
            <CompletionStatsRow userStats={{ coins, accuracy }} />
          </div>
        </div>
      </MainContentWrapper>
      <LessonCompletionFooter handleContinue={handleContinue} />
    </MainGridWrapper>
  );
}
