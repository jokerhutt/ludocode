
import { ListRow } from "@/components/LudoComponents/Atoms/Row/ListRow";
import { ListContainer } from "@/components/LudoComponents/Blocks/List/ListContainer";
import type { ListHeaderProps } from "@/components/LudoComponents/Blocks/List/ListHeader";
import { cn } from "@/lib/utils";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { moduleHubRoute, router } from "@/routes/router";
import type { LudoModule } from "@/Types/Catalog/LudoModule";

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
  const { courseId, moduleId } = moduleHubRoute.useParams();

  const selectModule = (selectedModuleId: string, isSelected: boolean) => {
    if (isSelected) return;
    router.navigate(ludoNavigation.module.toModule(courseId, selectedModuleId));
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
