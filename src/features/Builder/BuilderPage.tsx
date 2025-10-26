import { useSuspenseQueries } from "@tanstack/react-query";
import { ListContainer } from "../../components/Molecules/List/ListContainer";
import { qo } from "../../Hooks/Queries/Definitions/queries";
import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import { buildRoute, router } from "../../routes/router";
import type { FlatModule } from "../../Types/Catalog/FlatCourseTree";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import { useTreeData } from "../../Hooks/Logic/Catalog/useTreeData";
import { ListRow } from "../../components/Atoms/Row/ListRow";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { BuilderAsideModules } from "./BuilderAsideModules";

type BuilderPageProps = {};

export function BuilderPage({}: BuilderPageProps) {

  const { courseId, moduleId } = buildRoute.useParams();
  const { tree } = buildRoute.useLoaderData();

  const { courseProgress, modules, lessons } = useTreeData({
    tree,
    courseId,
    moduleId,
  });

  return (
    <div className="grid grid-cols-12 bg-ludoGrayDark">
      <BuilderAsideModules modules={modules} moduleId={moduleId} courseId={courseId}/>
      <div className="col-start-5 col-end-9 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0"></div>
      <AsideComponent orientation="RIGHT">
        <div></div>
      </AsideComponent>
    </div>
  );
}
