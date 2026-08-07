import { cn } from "@ludocode/design-system/cn-utils.ts";
import { CustomIcon } from "@ludocode/design-system/primitives/custom-icon.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { Languages } from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import { testIds } from "@ludocode/util/test-ids";
import type { ProjectTemplates } from "./projectTemplates.ts";

export type TemplateKey = keyof typeof ProjectTemplates;

const templateButtons = [
  { key: "lua", label: "Lua", iconName: Languages.lua.iconName },
  { key: "python", label: "Python", iconName: Languages.python.iconName },
  { key: "web", label: "Static site", iconName: "HTML" as const },
  {
    key: "javascript",
    label: "Javascript",
    iconName: Languages.javascript.iconName,
  },
] as const;

type ProjectLauncherProps = {
  isAtLimit: boolean;
  isPending: boolean;
  onCreate: (templateKey: TemplateKey) => void;
};

export function ProjectLauncher({
  isAtLimit,
  isPending,
  onCreate,
}: ProjectLauncherProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {templateButtons.map((template) => (
        <LudoButton
          key={template.key}
          data-testid={testIds.projectHub.createTemplate(template.key)}
          className="h-24 flex-col gap-2 rounded-xl"
          variant="default"
          disabled={isPending}
          onClick={() => onCreate(template.key)}
          title={isAtLimit ? "project limit reached" : undefined}
        >
          <CustomIcon
            color="white"
            iconName={template.iconName}
            className="h-7 w-7"
          />
          <span className="text-sm font-semibold">{template.label}</span>
        </LudoButton>
      ))}
    </div>
  );
}

type ProjectQuotaProps = {
  used: number;
  max: number;
  isAtLimit: boolean;
};

export function ProjectQuota({ used, max, isAtLimit }: ProjectQuotaProps) {
  return (
    <span
      data-testid={testIds.projectHub.limits}
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-lg border px-4 lg:w-auto",
        isAtLimit
          ? "border-ludo-danger/40 bg-ludo-danger/10"
          : "border-ludo-border bg-ludo-surface-dim",
      )}
    >
      <span
        className={cn(
          "text-lg font-bold tabular-nums leading-none",
          isAtLimit ? "text-ludo-danger" : "text-ludo-white-bright",
        )}
      >
        {used}
        <span className="text-ludo-white-dim">/{max}</span>
      </span>
      <span className="text-[10px] uppercase tracking-widest text-ludo-white-dim">
        projects used
      </span>
    </span>
  );
}
