import { qo } from "@/Hooks/Queries/Definitions/queries";
import { ActionButton } from "../../components/Atoms/Button/ActionButton";
import { useResetCourseProgress } from "../../Hooks/Queries/Mutations/useResetCourseProgress";
import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import { ModulesList } from "./ModulesList";
import { useSuspenseQuery } from "@tanstack/react-query";

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
    resetCourseProgressMutation.mutate(courseId);
  };

  return (
    <AsideComponent orientation="RIGHT" paddingX="pl-6">
      <ModulesList modules={modules} header={{ courseName }} />
      <div className="mt-6">
        <ActionButton
          onClick={() => handleResetCourse(courseId)}
          orientation="center"
          active={true}
          text="Reset"
        />
      </div>
    </AsideComponent>
  );
}
