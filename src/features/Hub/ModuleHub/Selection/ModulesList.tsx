import { ListRow } from "@/components/design-system/atoms/row/list-row.tsx";
import { ListContainer } from "@/components/design-system/blocks/list/list-container.tsx";
import type { ListHeaderProps } from "@/components/design-system/blocks/list/list-header.tsx";
import { cn } from "@/components/cn-utils.ts";
import { ludoNavigation } from "@/old-routes/navigator/ludoNavigation.tsx";
import type { LudoModule } from "@/types/Catalog/LudoModule";
import { getRouteApi, useRouter } from "@tanstack/react-router";

type ModulesListHeaderProps = {
  courseName: string;
};

type ModulesListProps = {
  header?: ModulesListHeaderProps;
  modules: LudoModule[];
  containerClassName?: string;
  rowClassName?: string;
};

export function ModulesList({
  header,
  modules,
  containerClassName,
  rowClassName,
}: ModulesListProps) {
  const routeApi = getRouteApi("/_app/_hub/learn/$courseId/$moduleId");
  const router = useRouter();
  const { courseId, moduleId } = routeApi.useParams();

  const selectModule = (selectedModuleId: string, isSelected: boolean) => {
    if (isSelected) return;
    router.navigate(
      ludoNavigation.hub.module.toModule(courseId, selectedModuleId)
    );
  };

  const headerContent: ListHeaderProps | undefined = !!header
    ? { title: header.courseName }
    : undefined;

  return (
    <ListContainer header={headerContent} className={containerClassName}>
      {modules.map((module, index) => {
        const isSelected = moduleId == module.id;
        const isLast = index >= modules.length - 1;
        return (
          <ListRow
            className={cn(
              isLast ? "rounded-b-xl border-b-0" : "",
              rowClassName
            )}
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
