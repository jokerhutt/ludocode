import { CustomIcon } from "@/components/design-system/atoms/hero-icon/custom-icon.tsx";
import { FileActionsButton } from "@/components/design-system/blocks/popover/file-actions-button.tsx";
import { useModifyProject } from "@/hooks/Queries/Mutations/useModifyProject.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { LANGUAGE_MAP } from "@/types/Project/LanguageType.ts";
import type { ProjectSnapshot } from "@/types/Project/ProjectSnapshot.ts";
import { useRouter } from "@tanstack/react-router";
import { LudoButton } from "@/components/design/primitives/LudoButton";

type ProjectCardProps = { project: ProjectSnapshot };

export function ProjectCard({ project }: ProjectCardProps) {
  const { projectId, projectName, projectLanguage } = project;
  const router = useRouter();

  const { handleRenameProject, handleDeleteProject } =
    useModifyProject(projectId);

  const { title: languageName, iconName } = LANGUAGE_MAP[projectLanguage];

  return (
    <LudoButton
      onClick={() =>
        router.navigate(ludoNavigation.project.toProject(projectId))
      }
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
            Modified 4 days ago
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
