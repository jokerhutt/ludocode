import { IconButton } from "@ludocode/design-system/primitives/icon-button";
import { Workbench } from "../components/Workbench";
import { NewFileMenu } from "../FileTree/NewFileMenu";
import { useProjectContext } from "../Context/ProjectContext";
import { LudoFileTree } from "@ludocode/design-system/widgets/LudoFileTree";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";
import { FileActionsMenu } from "../FileTree/FileActionsMenu";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon";
import { ChatBotProvider } from "@/features/AI/Context/ChatBotContext";
import { ChatBotAccordion } from "@ludocode/design-system/widgets/chatbot/ChatbotAccordion";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useUserPreferencesContext } from "@/hooks/Context/useUserPreferenceContext";
import { cn } from "@ludocode/design-system/cn-utils";

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
