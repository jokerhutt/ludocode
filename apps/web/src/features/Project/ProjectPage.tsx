import { ProjectEditor } from "@/features/Project/Editor/ProjectEditor.tsx";
import { EditorWinbar } from "@/features/Project/Editor/EditorWinbar.tsx";
import { ChatBotProvider } from "@/features/AI/Context/ChatBotContext.tsx";
import { RunCodeButton } from "@/features/Project/Editor/RunCodeButton.tsx";
import { CodeRunnerProvider } from "@/features/Project/Context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { ChatBotAccordion } from "@ludocode/design-system/widgets/chatbot/ChatbotAccordion.tsx";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useUserPreferencesContext } from "@/hooks/Context/useUserPreferenceContext";
import { Workbench } from "./components/Workbench";
import { NewFilePopover } from "./FileTree/new-file-popover";
import { IconButton } from "@ludocode/design-system/primitives/icon-button";
import { TreeFile } from "./FileTree/TreeFile";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon";
import { WorkbenchOutputPane } from "./Runner/WorkbenchOutputPane";
import { EditorTab } from "@ludocode/design-system/primitives/tab";
import { stripFileName } from "./Util/filenameUtil";
import { EditorTabGroup } from "./Editor/EditorTabGroup";

export function ProjectPage() {
  const { project, files, currentFileId, current, setCurrent } =
    useProjectContext();
  const { data: chatbotCredits } = useSuspenseQuery(qo.credits());
  const { aiEnabled } = useUserPreferencesContext();

  return (
    <div className="grid col-span-full min-h-0 grid-cols-12">
      <Workbench.Pane
        dataTestId="project-aside-left"
        className="col-span-1 border-r-2 grid-rows-[auto_1fr_auto] border-r-ludo-surface lg:col-span-3"
      >
        <Workbench.Pane.Winbar>
          <p>Files</p>
          <NewFilePopover>
            <IconButton
              dataTestId="open-file-popover-icon"
              iconName="PlusIcon"
            />
          </NewFilePopover>
        </Workbench.Pane.Winbar>
        <Workbench.Pane.Content>
          {files.map((file, index) => {
            const key = file.id ?? file.tempId!;
            const readOnly = !!project.deleteAt;
            return (
              <TreeFile
                key={key}
                id={key}
                readOnly={readOnly}
                onClick={() => setCurrent(index)}
                fileName={file.path}
                icon={file.language.iconName as IconName}
                index={index}
                isSelected={current == index}
              />
            );
          })}
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

      <CodeRunnerProvider project={project} files={files}>
        <>
          <Workbench.Pane className="col-span-10 min-h-0 grid relative lg:col-span-6 gap-4 items-stretch justify-start min-w-0">
            <Workbench.Pane.Winbar>
              <EditorTabGroup>
                {current !== null && current !== undefined && (
                  <EditorTab>
                    <p>{stripFileName(files[current].path)}</p>
                  </EditorTab>
                )}
              </EditorTabGroup>
            </Workbench.Pane.Winbar>
            <ProjectEditor isMarkedForDeletion={!!project.deleteAt} />
            <RunCodeButton />
          </Workbench.Pane>

          <WorkbenchOutputPane />
        </>
      </CodeRunnerProvider>
    </div>
  );
}
