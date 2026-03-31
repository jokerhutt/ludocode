import type { ReactNode } from "react";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { LudoMenu } from "@ludocode/design-system/widgets/ludo-menu.tsx";
import { CustomIcon } from "@ludocode/design-system/primitives/custom-icon.tsx";
import {
  Languages,
  type LanguageKey,
} from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import { testIds } from "@ludocode/util/test-ids";

type NewFileMenuProps = {
  trigger: ReactNode;
  readOnly?: boolean;
};

export function NewFileMenu({ trigger, readOnly = true }: NewFileMenuProps) {
  const { project, files, entryFileId, addFile } = useProjectContext();

  const entryFile = files.find((file) => file.path === entryFileId) ?? files[0];
  const entryLanguage = entryFile?.language;

  const choices: LanguageKey[] =
    project.projectType === "WEB"
      ? (Object.keys(Languages) as LanguageKey[]).filter(
          (languageKey) => Languages[languageKey].webAllowed === true,
        )
      : entryLanguage
        ? [entryLanguage]
        : [];

  return (
    <LudoMenu>
      <LudoMenu.Trigger>{trigger}</LudoMenu.Trigger>

      <LudoMenu.Content align="end" className="w-48">
        <p className="text-[10px] uppercase tracking-wider text-ludo-white-bright/30 px-2 pb-1.5">
          New file
        </p>

        {choices.map((languageKey, index) => {
          const language = Languages[languageKey];
          return (
            <LudoMenu.Item
              key={languageKey}
              dataTestId={
                index === 0
                  ? testIds.project.newFileButton
                  : testIds.project.newFileButtonLang(languageKey)
              }
              disabled={readOnly}
              onSelect={() => {
                if (readOnly) return;
                addFile(languageKey);
              }}
              className={readOnly ? "" : "hover:bg-ludo-accent-muted/50"}
            >
              <LudoMenu.Row className={readOnly ? "" : "cursor-pointer"}>
                <LudoMenu.Icon>
                  <CustomIcon
                    color="white"
                    className="h-4"
                    iconName={language.iconName}
                  />
                </LudoMenu.Icon>
                <LudoMenu.Label>{language.name}</LudoMenu.Label>
              </LudoMenu.Row>
            </LudoMenu.Item>
          );
        })}
      </LudoMenu.Content>
    </LudoMenu>
  );
}
