import { ListContainer } from "../../components/Molecules/List/ListContainer";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { router } from "../../routes/router";
import type { LudoModule } from "../../Types/Catalog/LudoModule";

type ModulesListProps = { modules: LudoModule[] };

export function ModulesList({ modules }: ModulesListProps) {
  return (
    <ListContainer title="Python" rounded="MD">
      {modules.map((module) => (
        <div
          key={module.id}
          onClick={() =>
            router.navigate(
              ludoNavigation.module.toModule(module.courseId, module.id)
            )
          }
          className="text-white hover:cursor-pointer hover:bg-ludoGrayLight/20 w-full px-2 py-4 text-lg border-b border-b-ludoGrayLight"
        >
          <p>
            {module.orderIndex}.{module.title}
          </p>
        </div>
      ))}
    </ListContainer>
  );
}
