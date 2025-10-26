import { ListRow } from "../../components/Atoms/Row/ListRow";
import { ListContainer } from "../../components/Molecules/List/ListContainer";
import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { router } from "../../routes/router";
import type { LudoModule } from "../../Types/Catalog/LudoModule";

type BuilderAsideModulesProps = {modules: LudoModule[], moduleId: string, courseId: string};

export function BuilderAsideModules({modules, moduleId, courseId}: BuilderAsideModulesProps) {
  return (
      <AsideComponent orientation="LEFT">
        <div className="flex flex-col p-6">
          <ListContainer title="Modules">
            {modules.map((module: LudoModule) => (
              <ListRow
                onClick={() => router.navigate(ludoNavigation.build.toBuilder(courseId, module.id))}
                key={module.id}
                active={moduleId === module.id}
                content={`${module.title} [${module.orderIndex}]`}
              />
            ))}
          </ListContainer>
        </div>
      </AsideComponent>
  );
}