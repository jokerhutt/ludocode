import { useSuspenseQuery } from "@tanstack/react-query";
import { ActionButton } from "../../components/Atoms/Button/ActionButton";
import { HollowSlot } from "../../components/Atoms/Slot/HollowSlot";
import { LessonFooter } from "../../components/Molecules/Footer/LessonFooter";
import { MainContentWrapper } from "../../Layouts/LayoutWrappers/MainContentWrapper";
import { MainGridWrapper } from "../../Layouts/LayoutWrappers/MainGridWrapper";
import { CompletionStatsRow } from "./CompletionStatsRow";
import { qo } from "../../Hooks/Queries/Definitions/queries";
import type { LudoStats } from "../../Types/User/LudoStats";
import Lottie from "lottie-react";
import { useLottie } from "../../Hooks/Animation/useLottie";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { completeRoute, router } from "../../routes/router";

export function LessonCompletionPage() {



  const currentUser = useSuspenseQuery(qo.currentUser());

  const {coins, accuracy, oldStreak, newStreak} = completeRoute.useParams()
  const hasStreakIncreased = oldStreak < newStreak

  const animationData = useLottie("/Animations/LC_CONFETTI.json");
  const altAnimation = useLottie("/Animations/LC_TROPHY.json");

  const handleContinue = () => {
    router.navigate(ludoNavigation.module.toCurrent())
  }

  return (
    <MainGridWrapper gridRows="SITE_INVERSE">
      <MainContentWrapper>
        <div className="col-span-full grid grid-cols-12 h-full">
          <div className="text-white col-start-5 col-end-9 flex flex-col items-stretch gap-4 justify-center min-w-0">
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
      <LessonFooter phase="DEFAULT">
        <div
          className={`flex w-full justify-end py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
        >
          <ActionButton onClick={() => handleContinue()} text="Continue" active={true} />
        </div>
      </LessonFooter>
    </MainGridWrapper>
  );
}
