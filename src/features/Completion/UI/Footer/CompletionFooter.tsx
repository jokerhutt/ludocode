
import { useCompletionContext } from "@/hooks/Context/Completion/CompletionContext.tsx";
import { router } from "@/routes/router.tsx";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";
import { AppFooter } from "@/components/design-system/blocks/footer/app-footer.tsx";
import { ActionButton } from "@/components/design-system/atoms/button/action-button.tsx";

export function CompletionFooter() {
  const { courseId, moduleId, search } = useCompletionContext();
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
          return ludoNavigation.hub.module.toModule(courseId, moduleId);
        }

      case "streak":
        if (isCourseCompleteForFirstTime) {
          return ludoNavigation.completion.toCourseComplete();
        } else {
          return ludoNavigation.hub.module.toModule(courseId, moduleId);
        }

      case "course":
        return ludoNavigation.hub.module.toModule(courseId, moduleId);
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
