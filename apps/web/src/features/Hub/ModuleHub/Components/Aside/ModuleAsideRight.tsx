import { useResetCourseProgress } from "@/hooks/Queries/Mutations/useResetCourseProgress.tsx";
import { ModulesList } from "@/features/Hub/ModuleHub/Components/Selection/ModulesList.tsx";
import { Aside } from "@ludocode/design-system/zones/aside";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Spinner } from "@ludocode/external/ui/spinner";
import type { LudoModule } from "@ludocode/types";

type ModuleAsideRightProps = {
  modules: LudoModule[];
  courseId: string;
  courseName: string;
};

export function ModuleAsideRight({
  modules,
  courseId,
  courseName,
}: ModuleAsideRightProps) {
  const resetCourseProgressMutation = useResetCourseProgress();

  const handleResetCourse = (courseId: string) => {
    if (isResettingCourse) return;
    resetCourseProgressMutation.mutate(courseId);
  };

  const isResettingCourse = resetCourseProgressMutation.isPending;

  return (
    <>
      <ModulesList modules={modules} header={{ courseName }} />
      <div className="mt-6">
        <LudoButton
          variant="alt"
          disabled={isResettingCourse}
          className="w-full h-12 text-xl"
          onClick={() => handleResetCourse(courseId)}
        >
          Reset
          {isResettingCourse && <Spinner className="text-ludo-accent-muted" />}
        </LudoButton>
      </div>
    </>
  );
}
