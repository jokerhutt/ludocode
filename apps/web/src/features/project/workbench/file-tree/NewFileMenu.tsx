import type { ReactNode } from "react";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { LudoMenu } from "@ludocode/design-system/widgets/ludo-menu.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";

type NewFileMenuProps = {
  trigger: ReactNode;
  readOnly?: boolean;
};

export function NewFileMenu({ trigger, readOnly = true}: NewFileMenuProps) {
  const { project, addFile } = useProjectContext();

  const iconName = project.projectLanguage.iconName as IconName;
  const choice = project.projectLanguage.name;

  return (
    <LudoMenu>
      <LudoMenu.Trigger>{trigger}</LudoMenu.Trigger>

      <LudoMenu.Content align="end" className="w-48">
        <p className="text-[10px] uppercase tracking-wider text-ludo-white-bright/30 px-2 pb-1.5">
          New file
        </p>

        <LudoMenu.Item
          dataTestId={`new-file-button`}
          disabled={readOnly}
          onSelect={() => {
            if (readOnly) return;
            addFile();
          }}
          className={readOnly ? "" : "hover:bg-ludo-accent-muted/50"}
        >
          <LudoMenu.Row className={readOnly ? "" : "cursor-pointer"}>
            <LudoMenu.Icon>
              <CustomIcon color="white" className="h-4" iconName={iconName} />
            </LudoMenu.Icon>
            <LudoMenu.Label>{choice}</LudoMenu.Label>
          </LudoMenu.Row>
        </LudoMenu.Item>
      </LudoMenu.Content>
    </LudoMenu>
  );
}
