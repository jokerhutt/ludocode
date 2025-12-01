import { useResetCourseProgress } from "../../../../Hooks/Queries/Mutations/useResetCourseProgress";
import { AsideComponent } from "@/components/LudoComponents/Layouts/Aside/AsideComponent";
import type { LudoModule } from "../../../../Types/Catalog/LudoModule";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ModulesList } from "../Selection/ModulesList";

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
        <Button
          variant={isResettingCourse ? "disabled" : "default"}
          className="w-full text-xl"
          onClick={() => handleResetCourse(courseId)}
        >
          Reset
          {isResettingCourse && <Spinner className="text-ludoLightPurple" />}
        </Button>
      </div>
    </AsideComponent>
  );
}
