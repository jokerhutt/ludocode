import { ListRow } from "@/components/Atoms/Row/ListRow";
import { ListContainer } from "../../components/Molecules/List/ListContainer";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { moduleRoute, router } from "../../routes/router";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import type { ListHeaderProps } from "@/components/Molecules/List/ListHeader";
import { cn } from "@/lib/utils";
import type { MobileModuleTabs } from "./ModuleSelectionBar";

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
  const { courseId, moduleId } = moduleRoute.useParams();

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
