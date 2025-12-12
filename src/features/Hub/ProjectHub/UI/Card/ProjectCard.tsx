import { CustomIcon } from "@/components/design-system/atoms/hero-icon/custom-icon.tsx";
import { FileActionsButton } from "@/components/design-system/blocks/popover/file-actions-button.tsx";
import { useModifyProject } from "@/hooks/Queries/Mutations/useModifyProject.tsx";
import { ludoNavigation } from "@/old-routes/navigator/ludoNavigation.tsx";
import { LANGUAGE_MAP } from "@/types/Project/LanguageType.ts";
import type { ProjectSnapshot } from "@/types/Project/ProjectSnapshot.ts";
import { useRouter } from "@tanstack/react-router";

type ProjectCardProps = { project: ProjectSnapshot };

export function ProjectCard({ project }: ProjectCardProps) {
  const { projectId, projectName, projectLanguage } = project;
  const router = useRouter()

  const { handleRenameProject, handleDeleteProject } =
    useModifyProject(projectId);

  const { title: languageName, iconName } = LANGUAGE_MAP[projectLanguage];

  return (
    <div
      onClick={() =>
        router.navigate(ludoNavigation.project.toProject(projectId))
      }
      className="w-full text-white hover:cursor-pointer flex justify-between border-ludoLightPurple border p-4 rounded-xl bg-ludoGrayLight"
    >
      <div className="flex flex-col">
        <div className="w-full items-center pb-1 text-white flex gap-2">
          <p>Project - {languageName}</p>
          <CustomIcon iconName={iconName} color="white" className="h-4" />
        </div>
        <h4 className="text-white text-lg font-bold">{projectName}</h4>
      </div>
      <div>
        <FileActionsButton
          itemType="Project"
          targetId={projectId}
          variant="secondary"
          fileName={projectName}
          renameItem={handleRenameProject}
          deleteItem={handleDeleteProject}
        />
      </div>
    </div>
  );
}
