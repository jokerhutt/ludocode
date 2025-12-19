import { useResetCourseProgress } from "@/hooks/Queries/Mutations/useResetCourseProgress";
import { AsideComponent } from "@/components/design-system/layouts/aside/aside-component.tsx";
import type { LudoModule } from "@/types/Catalog/LudoModule";
import { Button } from "@/components/external/ui/button";
import { Spinner } from "@/components/external/ui/spinner";
import { ModulesList } from "../Selection/ModulesList";
import { LudoButton } from "@/components/design/primitives/LudoButton";

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
    <AsideComponent orientation="RIGHT_WIDE" innerClassName="py-6 px-12">
      <ModulesList modules={modules} header={{ courseName }} />
      <div className="mt-6">
        <LudoButton
          variant="alt"
          disabled={isResettingCourse}
          className="w-full h-12 text-xl"
          onClick={() => handleResetCourse(courseId)}
        >
          Reset
          {isResettingCourse && <Spinner className="text-ludoLightPurple" />}
        </LudoButton>
      </div>
    </AsideComponent>
  );
}
