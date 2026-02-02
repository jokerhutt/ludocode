import { useCompletionContext } from "@/features/Completion/Context/CompletionContext.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useRouter } from "@tanstack/react-router";
import { FooterShell } from "@ludocode/design-system/zones/footer-shell";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

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
            ludoNavigation.hub.module.toModule(courseId, moduleId, true)
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
            ludoNavigation.hub.module.toModule(courseId, moduleId, true)
          );
        }
        break;

      case "course":
        router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId, true));
        break;
    }
  };

  return (
    <FooterShell className="bg-transparent border-t-ludo-surface lg:border-t z-20">
      <div
        className={`flex w-full justify-end py-4 px-8 lg:px-0 items-center col-start-2 col-end-12 lg:col-start-4 lg:col-end-10`}
      >
        <LudoButton
          variant="alt"
          className="w-full lg:w-1/3 text-lg font-bold h-full lg:h-2/3"
          onClick={() => handleCompletionContinue()}
        >
          <p>Continue</p>
        </LudoButton>
      </div>
    </FooterShell>
  );
}
