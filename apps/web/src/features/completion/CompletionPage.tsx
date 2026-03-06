import streakAnimationData from "../../../public/animation/STR_INCREASE.json";
import Lottie from "lottie-react";
import { useCompletionContext } from "@/features/completion/context/CompletionContext.tsx";
import { CompletionStatsGroup } from "@/features/completion/components/CompletionStatsGroup.tsx";
import { IncrementingCounter } from "@ludocode/design-system/primitives/incrementing-counter.tsx";
import { BadgeSingleCard } from "@/features/user/profile/components/BadgeCard.tsx";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon.tsx";
import { useLottie, useTimedLottie } from "@ludocode/hooks";

export function LessonCompletionPage() {
  const { search } = useCompletionContext();
  const { coins, accuracy } = search;

  const trophyAnimation = useLottie("/animation/LC_TROPHY.json");

  return (
    <>
      <Lottie
        animationData={trophyAnimation}
        loop={false}
        autoplay
        className="w-full h-80"
      />
      <h2 className="text-center text-2xl">Lesson Complete!</h2>
      <CompletionStatsGroup userStats={{ coins, accuracy }} />
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
      <IncrementingCounter oldCount={oldStreak} newCount={newStreak} />
      <p data-testid={`streak-complete-text`} className="text-center text-3xl">Day Streak!</p>
    </>
  );
}

// TODO fix course name issue
export function CourseCompletePage() {
  const { courseName } = useCompletionContext();

  return (
    <>
      <div className="flex text-center gap-8 flex-col">
        <h2 data-testid={`course-complete-header`} className="text-3xl">Course Complete!</h2>
        <p data-testid={`course-complete-congratulation`} className="text-lg">
          Congratulations on completing the {courseName} course!
        </p>
        <p data-testid={`course-complete-badge-text`}>You've earned the {courseName} badge!</p>
        <div className="w-full flex items-center justify-center">
          <BadgeSingleCard clickable={false} icon={courseName as IconName} />
        </div>
      </div>
    </>
  );
}
