import { useModifyProject } from "@/queries/mutations/useModifyProject.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { router } from "@/main.tsx";
import { parseToDate } from "@ludocode/util";
import { parseToDigitDate } from "@ludocode/util/date/dateUtils.ts";
import { FileActionsMenu } from "@/features/project/workbench/file-tree/FileActionsMenu.tsx";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import type { ProjectCardResponse, ProjectVisibility } from "@ludocode/types";
import { EyeClosed, EyeIcon } from "lucide-react";

type ProjectCardProps = { project: ProjectCardResponse; deleteAt?: string };

export function ProjectCard({ project, deleteAt }: ProjectCardProps) {
  const { projectId, projectTitle, updatedAt, languageIconName } = project;

  const { handleRenameProject, handleDeleteProject } =
    useModifyProject(projectId);

  const iconName = languageIconName as IconName;

  const updatedAtTime = updatedAt ? parseToDate(updatedAt) : "-";

  return (
    <LudoButton
      data-testid={`project-hub-card`}
      onClick={() => {
        router.navigate(ludoNavigation.project.toProject(projectId));
      }}
      className="w-full h-22 flex items-start text-ludo-white-bright hover:cursor-pointer justify-between p-4"
    >
      <div className="w-full h-full items-start text-ludo-white-bright flex gap-4">
        <CustomIcon
          iconName={iconName}
          color="white"
          className="h-6 items-start"
        />
        <div className="flex flex-col gap-1 text-start">
          <p className="m-0 text-lg leading-tight">{projectTitle}</p>
          <p className="m-0 text-xs text-ludo-white leading-tight">
            Last modified: {updatedAtTime}
          </p>
          {deleteAt && (
            <p className="m-0 text-xs text-red-400 leading-tight">
              Scheduled for deletion on {parseToDigitDate(Number(deleteAt))}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col h-full items-center justify-between">
        <FileActionsMenu
          trigger={
            <div
              role="button"
              className={
                "hover:cursor-pointer rounded-full p-1 hover:text-ludo-accent-muted"
              }
            >
              <HeroIcon className={"h-6"} iconName="EllipsisVerticalIcon" />
            </div>
          }
          itemType={"project"}
          targetId={projectId}
          targetName={projectTitle}
          renameItem={handleRenameProject}
          deleteItem={handleDeleteProject}
        />
        <EyeIcon className="h-4 w-4" />
      </div>
    </LudoButton>
  );
}

