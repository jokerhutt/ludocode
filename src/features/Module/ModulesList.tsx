import { ListRow } from "@/components/Atoms/Row/ListRow";
import { ListContainer } from "../../components/Molecules/List/ListContainer";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { moduleRoute, router } from "../../routes/router";
import type { LudoModule } from "../../Types/Catalog/LudoModule";

type ModulesListProps = { modules: LudoModule[] };

export function ModulesList({ modules }: ModulesListProps) {

  const {courseId, moduleId} = moduleRoute.useParams()

  const selectModule = (selectedModuleId: string) => {
    if (moduleId == selectedModuleId) return;
    router.navigate(ludoNavigation.module.toModule(courseId, selectedModuleId));
  };

  return (
    <ListContainer title="Python" rounded="MD">
      {modules.map((module) => (
        <ListRow
          hover
          active={moduleId == module.id}
          key={module.id}
          onClick={() => selectModule(module.id)}
        >
          <p>
            {module.orderIndex}.{module.title}
          </p>
        </ListRow>
      ))}
    </ListContainer>
  );
}
