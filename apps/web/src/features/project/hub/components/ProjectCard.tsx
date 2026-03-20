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
import { useDuplicateProject } from "@/queries/mutations/useDuplicateProject";
import { useLikeProject } from "@/queries/mutations/useLikeProject";
import { useUnlikeProject } from "@/queries/mutations/useUnlikeProject";
import { Copy, Heart } from "lucide-react";
import { cn } from "@ludocode/design-system/cn-utils";

type ProjectCardProps = {
  project: ProjectCardResponse;
  mode: "OWN" | "COMMUNITY";
  deleteAt?: string;
  currentUserId?: string;
};

export function ProjectCard({
  project,
  deleteAt,
  mode,
  currentUserId,
}: ProjectCardProps) {
  const {
    projectId,
    projectTitle,
    updatedAt,
    createdAt,
    visibility,
    languageIconName,
    authorId,
  } = project;

  const { data: author } = useQuery(qo.user(authorId));

  const iconName = languageIconName as IconName;
  const authorDisplayName = author?.displayName?.trim() || "Anonymous";

  const updatedAtTime = updatedAt ? parseToDate(updatedAt) : "-";
  const createdAtTime = createdAt ? parseToDate(createdAt) : "-";
  const timeToDisplay =
    mode == "OWN" ? updatedAtTime : createdAtTime;

  return (
    <LudoButton
      data-testid={`project-hub-card`}
      clickable={false}
      onClick={() => {
        router.navigate(ludoNavigation.project.toProject(authorId, projectId));
      }}
      className="w-full h-24 flex items-start text-ludo-white-bright hover:bg-ludo-surface-hover hover:cursor-pointer justify-between p-4"
    >
      <div className="w-full h-full items-start text-ludo-white-bright flex gap-4">
        <div className="flex flex-col gap-1.5 text-start">
          <p className="m-0 text-lg leading-tight">{projectTitle}</p>
          <p className="m-0 text-xs text-ludo-white leading-tight">
            By {authorDisplayName}
          </p>
          <p className="m-0 text-xs text-ludo-white leading-tight text-start">
            {timeToDisplay}
          </p>
          {deleteAt && (
            <p className="m-0 text-xs text-red-400 leading-tight">
              Scheduled for deletion on {parseToDigitDate(Number(deleteAt))}
            </p>
          )}
        </div>
      </div>
      <div className="flex h-full flex-col items-end justify-between">
        <div className="flex h-full items-start gap-2 justify-end">
          {mode === "OWN" && (
            <>
              <ProjectVisibilityMenu
                projectId={projectId}
                visibility={visibility}
              />
              <ProjectActionsMenu
                projectId={projectId}
                projectTitle={projectTitle}
              />
            </>
          )}
          <CustomIcon iconName={iconName} color="white" className="h-5 pr-2" />
        </div>
        <div className="flex justify-end gap-2 items-end text-ludo-white ">
          {!!currentUserId && mode !== "OWN" && (
            <ProjectDuplicateButton
              userId={currentUserId}
              projectId={projectId}
            />
          )}
          <ProjectLikeButton
            projectId={projectId}
            canLike={Boolean(currentUserId)}
          />
        </div>
      </div>
    </LudoButton>
  );
}

function ProjectActionsMenu({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const { handleRenameProject, handleDeleteProject } =
    useModifyProject(projectId);
  return (
    <FileActionsMenu
      trigger={
        <div
          role="button"
          className={
            "hover:cursor-pointer rounded-full hover:text-ludo-accent-muted"
          }
        >
          <HeroIcon className={"h-5"} iconName="EllipsisVerticalIcon" />
        </div>
      }
      itemType={"project"}
      targetId={projectId}
      targetName={projectTitle}
      renameItem={handleRenameProject}
      deleteItem={handleDeleteProject}
    />
  );
}
type ProjectDuplicateButtonProps = {
  projectId: string;
  userId: string;
};

function ProjectDuplicateButton({
  projectId,
  userId,
}: ProjectDuplicateButtonProps) {
  const duplicateMutation = useDuplicateProject(projectId, {
    onSuccess: async (newProjectId) => {
      if (!userId) return;

      router.navigate(ludoNavigation.project.toProject(userId, newProjectId));
    },
  });

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        duplicateMutation.mutate();
      }}
      className={
        duplicateMutation.isPending
          ? "hover:cursor-not-allowed"
          : "hover:cursor-pointer"
      }
    >
      <Copy className="h-4" />
    </button>
  );
}

type ProjectLikeButtonProps = {
  projectId: string;
  canLike: boolean;
};

function ProjectLikeButton({ projectId, canLike }: ProjectLikeButtonProps) {
  const { data: likeState } = useQuery(qo.projectLike(projectId));
  const likeProjectMutation = useLikeProject(projectId);
  const unlikeProjectMutation = useUnlikeProject(projectId);

  const count = likeState?.count ?? 0;
  const isLikedByMe = likeState?.likedByMe;
  const isPending =
    likeProjectMutation.isPending || unlikeProjectMutation.isPending;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canLike || isPending) return;

    if (isLikedByMe) {
      unlikeProjectMutation.mutate();
      return;
    }

    likeProjectMutation.mutate();
  };

  return (
    <button
      disabled={!canLike || isPending}
      onClick={handleClick}
      className={
        !canLike || isPending
          ? "hover:cursor-not-allowed"
          : "hover:cursor-pointer"
      }
    >
      <div className="flex items-end justify-end gap-0.5">
        <Heart
          fill={isLikedByMe ? "#F87171" : "none"}
          className={cn(
            "h-4",
            isLikedByMe ? "text-[#F87171]" : "text-ludo-white",
          )}
        />
        <p className="text-sm leading-none m-0">{count}</p>
      </div>
    </button>
  );
}
