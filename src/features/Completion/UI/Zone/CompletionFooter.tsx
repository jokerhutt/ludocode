import { useCompletionContext } from "@/features/Completion/Context/CompletionContext.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { AppFooter } from "@/components/design-system/blocks/footer/app-footer.tsx";
import { ActionButton } from "@/components/design-system/atoms/button/action-button.tsx";
import { useRouter } from "@tanstack/react-router";

export function CompletionFooter() {
  const router = useRouter();
  const { courseId, moduleId, lessonId, search } = useCompletionContext();
  const { step, completionStatus, oldStreak, newStreak } = search;

  const hasStreakIncreased = oldStreak < newStreak;
  const isCourseCompleteForFirstTime = completionStatus === "COURSE_COMPLETE";

  const handleCompletionContinue = () => {
    switch (step) {
      case "lesson":
        if (hasStreakIncreased) {
          router.navigate(
            ludoNavigation.completion.toStreakIncrease(
              courseId,
              moduleId,
              lessonId
            )
          );
        } else if (isCourseCompleteForFirstTime) {
          router.navigate(
            ludoNavigation.completion.toCourseComplete(
              courseId,
              moduleId,
              lessonId
            )
          );
        } else {
          router.navigate(
            ludoNavigation.hub.module.toModule(courseId, moduleId)
          );
        }
        break;

      case "streak":
        if (isCourseCompleteForFirstTime) {
          router.navigate(
            ludoNavigation.completion.toCourseComplete(
              courseId,
              moduleId,
              lessonId
            )
          );
        } else {
          router.navigate(
            ludoNavigation.hub.module.toModule(courseId, moduleId)
          );
        }
        break;

      case "course":
        router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId));
        break;
    }
  };

  return (
    <AppFooter>
      <div
        className={`flex w-full justify-end py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
      >
        <ActionButton
          onClick={() => handleCompletionContinue()}
          text="Continue"
          active={true}
        />
      </div>
    </AppFooter>
  );
}
