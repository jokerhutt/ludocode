import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { Workbench } from "@ludocode/design-system/widgets/Workbench.tsx";
import { NewFileMenu } from "./NewFileMenu.tsx";
import { useProjectContext } from "@/features/Project/context/ProjectContext.tsx";
import { LudoFileTree } from "@ludocode/design-system/widgets/LudoFileTree.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { FileActionsMenu } from "./FileActionsMenu.tsx";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import { ChatBotProvider } from "@/features/AI/Context/ChatBotContext.tsx";
import { ChatBotAccordion } from "@ludocode/design-system/widgets/chatbot/ChatbotAccordion.tsx";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useUserPreferencesContext } from "@/hooks/Context/useUserPreferenceContext.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";

type WorkbenchTreePaneProps = { className?: string };

export function WorkbenchTreePane({ className }: WorkbenchTreePaneProps) {
  const { renameFile, deleteFile, project, files, currentFileId, setCurrent } =
    useProjectContext();
  const { data: chatbotCredits } = useSuspenseQuery(qo.credits());
  const { aiEnabled } = useUserPreferencesContext();
  return (
    <>
      <Workbench.Pane
        dataTestId="project-aside-left"
        className={cn(
          "border-r-2 grid-rows-[auto_1fr_auto] border-r-ludo-surface",
          className,
        )}
      >
        <Workbench.Pane.Winbar>
          <p>Files</p>
          <NewFileMenu
            trigger={
              <IconButton
                dataTestId="open-file-popover-icon"
                iconName="PlusIcon"
              />
            }
          />
        </Workbench.Pane.Winbar>
        <Workbench.Pane.Content>
          <LudoFileTree
            selectedId={currentFileId}
            onSelect={(id) => {
              const index = files.findIndex((f) => (f.id ?? f.tempId!) === id);
              if (index !== -1) setCurrent(index);
            }}
          >
            {files.map((file) => {
              const key = file.id ?? file.tempId!;
              const readOnly = !!project.deleteAt;
              return (
                <LudoFileTree.Item
                  dataTestId={`tree-file-${file.path}`}
                  key={key}
                  id={key}
                  name={file.path}
                  icon={
                    <CustomIcon
                      color="white"
                      className="h-4"
                      iconName={project.projectLanguage.iconName as IconName}
                    />
                  }
                  actions={
                    !readOnly && (
                      <FileActionsMenu
                        trigger={
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-full hover:bg-ludo-accent-muted"
                          >
                            <HeroIcon
                              iconName="EllipsisVerticalIcon"
                              className="h-4"
                            />
                          </div>
                        }
                        itemType="File"
                        targetId={key}
                        targetName={file.path}
                        renameItem={renameFile}
                        deleteItem={() => deleteFile(file.path)}
                      />
                    )
                  }
                />
              );
            })}
          </LudoFileTree>
        </Workbench.Pane.Content>
        {aiEnabled && (
          <div className="min-h-0 min-w-0 w-full h-full flex flex-col justify-end">
            <ChatBotProvider
              credits={chatbotCredits}
              targetId={project.projectId}
              type="PROJECT"
            >
              <ChatBotAccordion>
                <ChatBotWindow type="PROJECT" targetId={currentFileId} />
              </ChatBotAccordion>
            </ChatBotProvider>
          </div>
        )}
      </Workbench.Pane>
    </>
  );
}
