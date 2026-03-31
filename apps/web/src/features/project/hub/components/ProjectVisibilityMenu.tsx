import { useChangeProjectVisibility } from "@/queries/mutations/useModifyProject";
import { LudoMenu } from "@ludocode/design-system/widgets/ludo-menu";
import type { ProjectVisibility } from "@ludocode/types";
import { Globe2, Link2, LockKeyhole, type LucideIcon } from "lucide-react";

type ProjectVisibilityMenuProps = {
  projectId: string;
  visibility: ProjectVisibility;
};

const visibilityStyles: Record<
  ProjectVisibility,
  {
    label: string;
    Icon: LucideIcon;
    buttonClassName: string;
  }
> = {
  PUBLIC: {
    label: "Public",
    Icon: Globe2,
    buttonClassName:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15",
  },
  UNLISTED: {
    label: "Unlisted",
    Icon: Link2,
    buttonClassName:
      "border-amber-400/20 bg-amber-400/10 text-amber-300 hover:bg-amber-400/15",
  },
  PRIVATE: {
    label: "Private",
    Icon: LockKeyhole,
    buttonClassName:
      "border-white/10 bg-white/5 text-ludo-white-bright/75 hover:bg-white/10",
  },
};

export function ProjectVisibilityMenu({
  projectId,
  visibility,
}: ProjectVisibilityMenuProps) {
  const changeProjectVisibilityMutation = useChangeProjectVisibility(projectId);
  return (
    <LudoMenu modal={false}>
      <LudoMenu.Trigger>
        <button
          type="button"
          disabled={changeProjectVisibilityMutation.isPending}
          className={`flex items-start gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors disabled:cursor-wait disabled:opacity-70 ${visibilityStyles[visibility].buttonClassName}`}
          aria-label={`Project visibility: ${visibility.toLowerCase()}`}
        >
          <VisibilityIcon visibility={visibility} className="h-3 w-3" />
        </button>
      </LudoMenu.Trigger>
      <LudoMenu.Content align="end" className="w-44">
        {(Object.keys(visibilityStyles) as ProjectVisibility[]).map(
          (option) => {
            const { Icon, label } = visibilityStyles[option];
            const isCurrent = option === visibility;

            return (
              <LudoMenu.Item
                key={option}
                disabled={
                  isCurrent || changeProjectVisibilityMutation.isPending
                }
                onSelect={() =>
                  changeProjectVisibilityMutation.mutate({ value: option })
                }
              >
                <LudoMenu.Row className="justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <LudoMenu.Label>{label}</LudoMenu.Label>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-ludo-accent-muted">
                      Current
                    </span>
                  )}
                </LudoMenu.Row>
              </LudoMenu.Item>
            );
          },
        )}
      </LudoMenu.Content>
    </LudoMenu>
  );
}

function VisibilityIcon({
  visibility,
  className,
}: {
  visibility: ProjectVisibility;
  className?: string;
}) {
  const { Icon } = visibilityStyles[visibility];

  return <Icon className={className} />;
}
