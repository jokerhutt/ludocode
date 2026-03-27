import type { ReactNode } from "react";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { LudoMenu } from "@ludocode/design-system/widgets/ludo-menu.tsx";
import {
  CustomIcon,
  stringToCustomIcon,
} from "@ludocode/design-system/primitives/custom-icon.tsx";

type NewFileMenuProps = {
  trigger: ReactNode;
  readOnly?: boolean;
};

export function NewFileMenu({ trigger, readOnly = true }: NewFileMenuProps) {
  const { project, addFile } = useProjectContext();
  const allLanguages = useSuspenseQuery(qo.languages()).data;

  const choices =
    project.projectType === "WEB"
      ? allLanguages.filter(
          (it) => it.enabled === true && it.runtime === "BROWSER",
        )
      : [project.projectLanguage];

  return (
    <LudoMenu>
      <LudoMenu.Trigger>{trigger}</LudoMenu.Trigger>

      <LudoMenu.Content align="end" className="w-48">
        <p className="text-[10px] uppercase tracking-wider text-ludo-white-bright/30 px-2 pb-1.5">
          New file
        </p>

        {choices.map((lang) => (
          <LudoMenu.Item
            key={lang.languageId}
            dataTestId={
              lang.languageId === project.projectLanguage.languageId
                ? "new-file-button"
                : `new-file-button-${lang.slug}`
            }
            disabled={readOnly}
            onSelect={() => {
              if (readOnly) return;
              addFile(lang);
            }}
            className={readOnly ? "" : "hover:bg-ludo-accent-muted/50"}
          >
            <LudoMenu.Row className={readOnly ? "" : "cursor-pointer"}>
              <LudoMenu.Icon>
                <CustomIcon
                  color="white"
                  className="h-4"
                  iconName={stringToCustomIcon(lang.iconName)}
                />
              </LudoMenu.Icon>
              <LudoMenu.Label>{lang.name}</LudoMenu.Label>
            </LudoMenu.Row>
          </LudoMenu.Item>
        ))}
      </LudoMenu.Content>
    </LudoMenu>
  );
}
