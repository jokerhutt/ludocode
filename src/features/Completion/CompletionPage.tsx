import confettiAnimationData from "../../../public/Animations/LC_CONFETTI_SLOW.json";
import streakAnimationData from "../../../public/Animations/STR_INCREASE.json";
import { useTimedLottie } from "@/Hooks/UI/useTimedLottie";
import Lottie from "lottie-react";
import { useCompletionContext } from "../../Hooks/Context/Completion/CompletionContext";
import { useLottie } from "@/Hooks/Animation/useLottie";
import { CompletionStatsRow } from "./Stats/CompletionStatsRow";
import { IncrementingMotionCounter } from "@/components/LudoComponents/Atoms/Motion/IncrementingMotionCounter";

export function LessonCompletionPage() {
  const { search } = useCompletionContext();
  const { coins, accuracy } = search;

  const trophyAnimation = useLottie("/Animations/LC_TROPHY.json");

  return (
    <>
      <Lottie
        animationData={trophyAnimation}
        loop={false}
        autoplay
        className="w-full h-80"
      />
      <h2 className="text-center text-2xl">Lesson Complete!</h2>
      <CompletionStatsRow userStats={{ coins, accuracy }} />
    </>
  );
}

export function StreakIncreasePage() {
  const { search } = useCompletionContext();
  const { oldStreak, newStreak } = search;

  const { lottieRef } = useTimedLottie({ minusFrames: 20 });

  return (
    <>
      <Lottie
        lottieRef={lottieRef}
        animationData={streakAnimationData}
        autoPlay={false}
        loop={false}
        className="w-full h-80"
      />
      <IncrementingMotionCounter oldCount={oldStreak} newCount={newStreak} />
      <p className="text-center text-3xl">Day Streak!</p>
    </>
  );
}

export function CourseCompletePage() {
  const { lottieRef } = useTimedLottie({ minusFrames: 1 });
  const { courseName } = useCompletionContext();

  return (
    <>
      <Lottie
        lottieRef={lottieRef}
        animationData={confettiAnimationData}
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
    </>
  );
}
