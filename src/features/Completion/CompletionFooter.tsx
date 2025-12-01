import { ActionButton } from "@/components/Atoms/Button/ActionButton";
import { AppFooter } from "@/components/Molecules/Footer/AppFooter";
import { useCompletionContext } from "../Common/CompletionContext";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";

export function CompletionFooter() {
  const { search } = useCompletionContext();
  const { step, completionStatus, oldStreak, newStreak } = search;

  const hasStreakIncreased = oldStreak < newStreak;
  const isCourseCompleteForFirstTime = completionStatus === "COURSE_COMPLETE";

  const handleCompletionContinue = () => {

    switch (step) {
      case "lesson":
        if (hasStreakIncreased) {
          return ludoNavigation.completion.toStreakIncrease();
        } else if (isCourseCompleteForFirstTime) {
          return ludoNavigation.completion.toCourseComplete();
        } else {
          return ludoNavigation.module.toCurrent();
        }

      case "streak":
        if (isCourseCompleteForFirstTime) {
          return ludoNavigation.completion.toCourseComplete();
        } else {
          return ludoNavigation.module.toCurrent();
        }

      case "course":
        return ludoNavigation.module.toCurrent();
    }
  };

  return (
    <AppFooter>
      <div
        className={`flex w-full justify-end py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
      >
        <ActionButton
          onClick={() => router.navigate(handleCompletionContinue())}
          text="Continue"
          active={true}
        />
      </div>
    </AppFooter>
  );
}
