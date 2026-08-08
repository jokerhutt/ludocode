import {
  useLikeProject,
  useUnlikeProject,
} from "@/queries/mutations/projectMutations";
import { qo } from "@/queries/definitions/queries.ts";
import { cn } from "@ludocode/design-system/cn-utils";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

type ProjectLikeButtonProps = {
  projectId: string;
  canLike: boolean;
  className?: string;
};

export function ProjectLikeButton({
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
