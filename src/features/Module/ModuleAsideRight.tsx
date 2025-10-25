import { ActionButton } from "../../components/Atoms/Button/ActionButton";
import { useResetCourseProgress } from "../../Hooks/Queries/Mutations/useResetCourseProgress";
import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import { ModulesList } from "./ModulesList";

type ModuleAsideRightProps = { modules: LudoModule[], courseId: string };

export function ModuleAsideRight({ modules, courseId }: ModuleAsideRightProps) {

  const resetCourseProgressMutation = useResetCourseProgress();

  const handleResetCourse = (courseId: string) => {
    resetCourseProgressMutation.mutate(courseId);
  };

  return (
    <AsideComponent orientation="RIGHT" paddingX="pl-6">
      <ModulesList modules={modules} />
      <div className="mt-6">
        <ActionButton onClick={() => handleResetCourse(courseId)} active={true} text="RESET PROGRESS" />
      </div>
    </AsideComponent>
  );
}
