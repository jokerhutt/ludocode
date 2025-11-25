import { ListRow } from "@/components/Atoms/Row/ListRow";
import { ListContainer } from "../../components/Molecules/List/ListContainer";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { moduleRoute, router } from "../../routes/router";
import type { LudoModule } from "../../Types/Catalog/LudoModule";

type ModulesListProps = { courseName: string; modules: LudoModule[] };

export function ModulesList({ courseName, modules }: ModulesListProps) {
  const { courseId, moduleId } = moduleRoute.useParams();

  const selectModule = (selectedModuleId: string, isSelected: boolean) => {
    if (isSelected) return;
    router.navigate(ludoNavigation.module.toModule(courseId, selectedModuleId));
  };

  return (
    <ListContainer title={courseName} rounded="MD">
      {modules.map((module, index) => {
        const isSelected = moduleId == module.id;
        const isLast = index >= modules.length - 1;
        return (
          <ListRow
            className={isLast ? "rounded-b-xl border-b-0" : ""}
            hover
            active={isSelected}
            key={module.id}
            onClick={() => selectModule(module.id, isSelected)}
          >
            <p>
              {module.orderIndex}.{module.title}
            </p>
          </ListRow>
        );
      })}
    </ListContainer>
  );
}
