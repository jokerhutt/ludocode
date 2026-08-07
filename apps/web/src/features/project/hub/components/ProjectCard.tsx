import {
  useDuplicateProject,
  useLikeProject,
  useModifyProject,
  useUnlikeProject,
} from "@/queries/mutations/projectMutations";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { CustomIcon } from "@ludocode/design-system/primitives/custom-icon.tsx";
import { Avatar } from "@ludocode/design-system/primitives/avatar.tsx";
import { getUserAvatar } from "@/constants/avatars/avatars.ts";
import { router } from "@/main.tsx";
import { parseToDate } from "@ludocode/util";
import { parseToDigitDate } from "@ludocode/util/date/dateUtils.ts";
import { testIds } from "@ludocode/util/test-ids";
import { FileActionsMenu } from "@/features/project/workbench/components/FileActionsMenu";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import type { ProjectCardResponse } from "@ludocode/types";
import { qo } from "@/queries/definitions/queries.ts";
import { useQuery } from "@tanstack/react-query";
import { ProjectVisibilityMenu } from "./ProjectVisibilityMenu";
import { ArrowRightIcon, Copy, Heart } from "lucide-react";
import { cn } from "@ludocode/design-system/cn-utils";
import { Languages } from "@ludocode/types/Project/ProjectFileSnapshot.ts";

type ProjectCardProps = {
  project: ProjectCardResponse;
  mode: "OWN" | "COMMUNITY";
  deleteAt?: string;
  currentUserId?: string;
};

const cardShell =
  "group relative flex min-h-44 flex-col overflow-hidden rounded-xl border border-ludo-border bg-ludo-surface-dim shadow-[0_7px_0_#262E57] transition-colors duration-100 hover:bg-ludo-surface-hover";

const cardStrip = "flex items-center gap-2 px-3 py-2 min-h-11";

export function ProjectCard({
  project,
  deleteAt,
  mode,
  currentUserId,
}: ProjectCardProps) {
  if (mode === "OWN") {
    return <OwnProjectCard project={project} deleteAt={deleteAt} />;
  }

  return (
    <CommunityProjectCard project={project} currentUserId={currentUserId} />
  );
}

function openProject(authorId: string, projectId: string) {
  router.navigate(ludoNavigation.project.toProject(authorId, projectId));
}

function TechnologyIcons({ project }: { project: ProjectCardResponse }) {
  return (
    <div className="flex items-center gap-2">
      {project.technologies.map((tech) => (
        <CustomIcon
          key={tech}
          iconName={Languages[tech].iconName}
          color="white"
          className="h-4"
        />
      ))}
    </div>
  );
}

function OwnProjectCard({
  project,
  deleteAt,
}: {
  project: ProjectCardResponse;
  deleteAt?: string;
}) {
  const {
    projectId,
    projectTitle,
    updatedAt,
    createdAt,
    visibility,
    technologies,
    authorId,
  } = project;

  const primaryTech = technologies[0];

  return (
    <article className={cardShell}>
      <div
        className={cn(
          cardStrip,
          "border-b-2 border-ludo-background bg-ludo-background/40",
        )}
      >
        {primaryTech && (
          <CustomIcon
            iconName={Languages[primaryTech].iconName}
            color="white"
            className="h-4 shrink-0"
          />
        )}
        <span className="truncate text-sm font-semibold text-ludo-white-bright">
          {projectTitle}
        </span>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <ProjectVisibilityMenu
            projectId={projectId}
            visibility={visibility}
          />
          <ProjectActionsMenu
            projectId={projectId}
            projectTitle={projectTitle}
          />
        </div>
      </div>

      <button
        type="button"
        data-testid={testIds.projectHub.card}
        onClick={() => openProject(authorId, projectId)}
        className="flex flex-1 flex-col gap-2 p-4 text-left hover:cursor-pointer"
      >
        <MetaRow label="Updated" value={parseToDate(updatedAt)} />
        <MetaRow label="Created" value={parseToDate(createdAt)} />

        {deleteAt && (
          <p className="text-xs leading-tight text-ludo-danger">
            Scheduled for deletion on {parseToDigitDate(Number(deleteAt))}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <TechnologyIcons project={project} />
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ludo-accent-muted">
            Open
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </span>
        </div>
      </button>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-[10px] uppercase tracking-widest text-ludo-white-dim">
        {label}
      </span>
      <span className="truncate text-xs text-ludo-white">{value}</span>
    </div>
  );
}

function CommunityProjectCard({
  project,
  currentUserId,
}: {
  project: ProjectCardResponse;
  currentUserId?: string;
}) {
  const { projectId, projectTitle, createdAt, authorId } = project;

  const { data: author } = useQuery(qo.user(authorId));
  const authorDisplayName = author?.displayName?.trim() || "Anonymous";

  return (
    <article className={cardShell}>
      <button
        type="button"
        data-testid={testIds.projectHub.card}
        onClick={() => openProject(authorId, projectId)}
        className="flex flex-1 flex-col gap-3 p-4 text-left hover:cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          {author ? (
            <Avatar
              className="h-9 w-9 shrink-0 border-2 lg:h-9 lg:w-9"
              src={getUserAvatar(author.avatarVersion, author.avatarIndex)}
            />
          ) : (
            <div className="h-9 w-9 shrink-0 rounded-full bg-ludo-background" />
          )}
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-ludo-white-bright">
              {authorDisplayName}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-ludo-white-dim">
              shared {parseToDate(createdAt)}
            </span>
          </div>
        </div>

        <p className="mt-auto truncate text-lg font-bold leading-tight text-ludo-white-bright">
          {projectTitle}
        </p>
      </button>

      <div
        className={cn(
          cardStrip,
          "justify-between border-t-2 border-ludo-background",
        )}
      >
        <TechnologyIcons project={project} />
        <div className="flex items-center gap-3">
          <ProjectLikeButton
            projectId={projectId}
            canLike={Boolean(currentUserId)}
          />
          {!!currentUserId && (
            <ProjectCopyButton userId={currentUserId} projectId={projectId} />
          )}
        </div>
      </div>
    </article>
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
          <HeroIcon className={"h-5 text-ludo-white"} iconName="EllipsisVerticalIcon" />
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

type ProjectRemixButtonProps = {
  projectId: string;
  userId: string;
};

function ProjectCopyButton({ projectId, userId }: ProjectRemixButtonProps) {
  const duplicateMutation = useDuplicateProject(projectId, {
    onSuccess: async (newProjectId) => {
      if (!userId) return;

      router.navigate(ludoNavigation.project.toProject(userId, newProjectId));
    },
  });

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        duplicateMutation.mutate();
      }}
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-ludo-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ludo-white transition-colors",
        duplicateMutation.isPending
          ? "hover:cursor-not-allowed"
          : "hover:cursor-pointer hover:bg-ludo-surface hover:text-ludo-white-bright",
      )}
    >
      <Copy className="h-3 w-3" />
      Copy
    </button>
  );
}

type ProjectLikeButtonProps = {
  projectId: string;
  canLike: boolean;
  className?: string;
};

function ProjectLikeButton({
  projectId,
  canLike,
  className,
}: ProjectLikeButtonProps) {
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
      type="button"
      disabled={!canLike || isPending}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1 text-ludo-white",
        !canLike || isPending
          ? "hover:cursor-not-allowed"
          : "hover:cursor-pointer",
        className,
      )}
    >
      <Heart
        fill={isLikedByMe ? "#F87171" : "none"}
        className={cn(
          "h-4",
          isLikedByMe ? "text-[#F87171]" : "text-ludo-white",
        )}
      />
      <span className="text-sm leading-none tabular-nums">{count}</span>
    </button>
  );
}
