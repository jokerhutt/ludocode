import { ListContainer, ListRow, type ListHeaderProps } from "@ludocode/design-system/widgets/ludo-list.tsx";

import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { cn } from "@ludocode/design-system/cn-utils";

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
              isLast ? "rounded-b-lg border-b-0" : "",
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
