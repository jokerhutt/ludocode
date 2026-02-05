import { FileActionsButton } from "@/features/Project/FileTree/file-actions-button.tsx";
import { useModifyProject } from "@/hooks/Queries/Mutations/useModifyProject.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { router } from "@/main";
import { parseToDate } from "@ludocode/util";

type ProjectCardProps = { project: ProjectSnapshot };

export function ProjectCard({ project }: ProjectCardProps) {
  const { projectId, projectName, projectLanguage, updatedAt } = project;

  const { handleRenameProject, handleDeleteProject } =
    useModifyProject(projectId);

  const iconName = projectLanguage.name as IconName;

  const updatedAtTime = updatedAt ? parseToDate(updatedAt) : "-";

  return (
    <LudoButton
      onClick={() => {
        router.navigate(ludoNavigation.project.toProject(projectId));
      }}
      className="w-full h-20 flex items-start text-white hover:cursor-pointer justify-between p-4"
    >
      <div className="w-full items-start text-white flex gap-4">
        <CustomIcon
          iconName={iconName}
          color="white"
          className="h-6 items-start"
        />
        <div className="flex flex-col gap-1 text-start">
          <p className="m-0 text-lg leading-tight">{projectName}</p>
          <p className="m-0 text-xs text-ludoAltText leading-tight">
            Last modified: {updatedAtTime}
          </p>
        </div>
      </div>
      <div>
        <FileActionsButton
          size="lg"
          itemType="Project"
          targetId={projectId}
          variant="secondary"
          fileName={projectName}
          renameItem={handleRenameProject}
          deleteItem={handleDeleteProject}
        />
      </div>
    </LudoButton>
  );
}
