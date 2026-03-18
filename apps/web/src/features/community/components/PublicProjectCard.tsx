import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { CustomIcon, type IconName } from "@ludocode/design-system/primitives/custom-icon";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { ProjectCardResponse } from "@ludocode/types";
import { parseToDate } from "@ludocode/util";

export function PublicProjectCard({ project }: { project: ProjectCardResponse }) {
  const { projectId, projectTitle, updatedAt, languageIconName } = project;
  const iconName = languageIconName as IconName;
  const createdAtTime = updatedAt ? parseToDate(updatedAt) : "-";

  return (
    <LudoButton
      data-testid="community-project-card"
      onClick={() => {
        router.navigate(ludoNavigation.project.toProject(projectId));
      }}
      className="w-full h-22 flex items-start text-ludo-white-bright hover:cursor-pointer justify-between p-4"
    >
      <div className="w-full items-start text-ludo-white-bright flex gap-4">
        <CustomIcon
          iconName={iconName}
          color="white"
          className="h-6 items-start"
        />
        <div className="flex flex-col gap-1 text-start">
          <p className="m-0 text-lg leading-tight">{projectTitle}</p>
          <p className="m-0 text-xs text-ludo-white leading-tight">
            {createdAtTime}
          </p>
        </div>
      </div>
    </LudoButton>
  );
}
