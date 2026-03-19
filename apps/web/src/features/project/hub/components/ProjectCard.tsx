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
import type { ProjectCardResponse } from "@ludocode/types";
import { qo } from "@/queries/definitions/queries.ts";
import { useQuery } from "@tanstack/react-query";
import { ProjectVisibilityMenu } from "./ProjectVisibilityMenu";

type ProjectCardProps = {
  project: ProjectCardResponse;
  deleteAt?: string;
};

export function ProjectCard({ project, deleteAt }: ProjectCardProps) {
  const {
    projectId,
    projectTitle,
    updatedAt,
    visibility,
    languageIconName,
    authorId,
  } = project;

  const { handleRenameProject, handleDeleteProject } =
    useModifyProject(projectId);
  const { data: author } = useQuery(qo.user(authorId));

  const iconName = languageIconName as IconName;
  const authorDisplayName = author?.displayName?.trim() || "Anonymous";

  const updatedAtTime = updatedAt ? parseToDate(updatedAt) : "-";

  return (
    <LudoButton
      data-testid={`project-hub-card`}
      onClick={() => {
        router.navigate(ludoNavigation.project.toProject(authorId, projectId));
      }}
      className="w-full h-24 flex items-start text-ludo-white-bright hover:cursor-pointer justify-between p-4"
    >
      <div className="w-full h-full items-start text-ludo-white-bright flex gap-4">
        <div className="flex flex-col gap-1.5 text-start">
          <p className="m-0 text-lg leading-tight">{projectTitle}</p>
          <p className="m-0 text-xs text-ludo-white leading-tight">
            By {authorDisplayName}
          </p>
          <p className="m-0 text-xs text-ludo-white leading-tight text-start">
            Last modified: {updatedAtTime}
          </p>
          {deleteAt && (
            <p className="m-0 text-xs text-red-400 leading-tight">
              Scheduled for deletion on {parseToDigitDate(Number(deleteAt))}
            </p>
          )}
        </div>
      </div>
      <div className="flex h-full flex-col items-end justify-between">
        <div className="flex items-center gap-2 justify-end">
          <CustomIcon iconName={iconName} color="white" className="h-5 pr-2" />
          <ProjectVisibilityMenu
            projectId={projectId}
            visibility={visibility}
          />

          <FileActionsMenu
            trigger={
              <div
                role="button"
                className={
                  "hover:cursor-pointer rounded-full hover:text-ludo-accent-muted"
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
        </div>
      </div>
    </LudoButton>
  );
}
