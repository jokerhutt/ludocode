import { useSuspenseQueries } from "@tanstack/react-query";
import { ListContainer } from "../../components/Molecules/List/ListContainer";
import { qo } from "../../Hooks/Queries/Definitions/queries";
import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import { buildRoute } from "../../routes/router";
import type { FlatModule } from "../../Types/Catalog/FlatCourseTree";
import type { LudoModule } from "../../Types/Catalog/LudoModule";

type BuilderPageProps = {};

export function BuilderPage({}: BuilderPageProps) {
  const { courseId } = buildRoute.useParams();
  const { tree } = buildRoute.useLoaderData();

  const moduleQueries = useSuspenseQueries({
    queries: tree.modules.map((module: FlatModule) => qo.module(module.id)),
  });

  const mappedModules = moduleQueries.map((moduleQuery) => moduleQuery.data);
  const modules = mappedModules as LudoModule[]

  return (
    <div className="grid grid-cols-12 bg-ludoGrayDark">
      <AsideComponent orientation="LEFT">
        <div className="flex flex-col p-6">
          <ListContainer title="Modules">
            {modules.map((module) => (
              <div
                key={module.id}
                className="text-white hover:cursor-pointer hover:bg-ludoGrayLight/20 w-full px-2 py-4 text-lg border-b border-b-ludoGrayLight"
              >
                <p>
                  {module.orderIndex}.{module.title}
                </p>
              </div>
            ))}
          </ListContainer>
        </div>
      </AsideComponent>
      <div className="col-start-5 col-end-9 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0"></div>
      <AsideComponent orientation="RIGHT">
        <div></div>
      </AsideComponent>
    </div>
  );
}
