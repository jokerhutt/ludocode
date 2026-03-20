import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { Workbench } from "@ludocode/design-system/widgets/Workbench.tsx";
import { NewFileMenu } from "./NewFileMenu.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { LudoFileTree } from "@ludocode/design-system/widgets/LudoFileTree.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { FileActionsMenu } from "./FileActionsMenu.tsx";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import { ChatBotProvider } from "@/features/ai/context/ChatBotContext.tsx";
import { ChatBotAccordion } from "@ludocode/design-system/widgets/chatbot/ChatbotAccordion.tsx";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow.tsx";
import {
  buildProjectUserMessage,
  PROJECT_SYSTEM_PROMPT,
} from "@ludocode/design-system/widgets/chatbot/chatbotSystemPrompts";
import { useQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { useUserPreferencesContext } from "@/features/user/context/useUserPreferenceContext.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck.tsx";
import { Play } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@ludocode/external/ui/tooltip.tsx";
import { useCallback, useRef } from "react";

type WorkbenchTreePaneProps = {
  readOnly?: boolean;
  className?: string;
  showAi?: boolean;
  onFileSelect?: () => void;
};

export function WorkbenchTreePane({
  readOnly,
  className,
  showAi,
  onFileSelect,
}: WorkbenchTreePaneProps) {
  const {
    renameFile,
    deleteFile,
    project,
    files,
    current,
    currentFileId,
    setCurrent,
    entryFileId,
  } = useProjectContext();
  const { data: chatbotCredits } = useQuery(qo.credits());
  const { aiEnabled } = useUserPreferencesContext();
  const aiFeature = useFeatureEnabledCheck({ feature: "isAIEnabled" });
  const latestRef = useRef({
    project,
    files,
    active: files[current] ?? files[0],
  });
  latestRef.current = { project, files, active: files[current] ?? files[0] };
  const promptWrapper = useCallback(() => {
    const { project, files, active } = latestRef.current;
    const activeId = active?.id ?? active?.tempId ?? null;
    return buildProjectUserMessage(project, files, activeId);
  }, []);

  const canDeleteFiles = files.length > 1;

  return (
    <>
      <Workbench.Pane
        dataTestId="project-aside-left"
        className={cn("border-r-2 flex-1 border-r-ludo-surface", className)}
      >
        <Workbench.Pane.Winbar>
          <p>Files</p>
          <NewFileMenu
            readOnly={readOnly}
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
              if (index !== -1) {
                setCurrent(index);
                onFileSelect?.();
              }
            }}
          >
            {files.map((file) => {
              const key = file.id ?? file.tempId!;
              const isEntryFile = key === entryFileId;
              return (
                <LudoFileTree.Item
                  dataTestId={`tree-file-${file.path}`}
                  key={key}
                  id={key}
                  name={file.path}
                  indicator={
                    isEntryFile ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center">
                            <Play className="h-3 w-3 fill-amber-400 text-amber-400" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={6}>
                          This file is the entry point & can not be deleted
                        </TooltipContent>
                      </Tooltip>
                    ) : null
                  }
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
                        canDelete={canDeleteFiles && !isEntryFile}
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
        {showAi && aiEnabled && aiFeature.enabled && (
          <div className="min-h-0 min-w-0 w-full h-full flex flex-col justify-end">
            <ChatBotProvider
              credits={chatbotCredits ?? 0}
              sessionId={project.projectId}
              type="PROJECT"
            >
              <ChatBotAccordion>
                <ChatBotWindow
                  promptWrapper={promptWrapper}
                  systemPrompt={PROJECT_SYSTEM_PROMPT}
                />
              </ChatBotAccordion>
            </ChatBotProvider>
          </div>
        )}
      </Workbench.Pane>
    </>
  );
}
