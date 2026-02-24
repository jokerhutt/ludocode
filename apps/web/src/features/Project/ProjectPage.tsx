import { ProjectEditor } from "@/features/Project/Editor/ProjectEditor.tsx";
import { ProjectFileTree } from "@/features/Project/FileTree/ProjectFileTree.tsx";
import { RunnerWinbar } from "@/features/Project/Runner/RunnerWinbar.tsx";
import { EditorWinbar } from "@/features/Project/Editor/EditorWinbar.tsx";
import { ProjectRunner } from "@/features/Project/Runner/ProjectRunner.tsx";
import { FileTreeWinbar } from "@/features/Project/FileTree/FileTreeWinbar.tsx";

import { ChatBotProvider } from "@/features/AI/Context/ChatBotContext.tsx";
import { RunCodeButton } from "@/features/Project/Editor/RunCodeButton.tsx";
import { CodeRunnerProvider } from "@/features/Project/Context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { ChatBotAccordion } from "@ludocode/design-system/widgets/chatbot/ChatbotAccordion.tsx";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useUserPreferencesContext } from "@/hooks/Context/useUserPreferenceContext";

export function ProjectPage() {
  const { project, files, currentFileId } = useProjectContext();
  const { data: chatbotCredits } = useSuspenseQuery(qo.credits());
  const { aiEnabled } = useUserPreferencesContext();

  return (
    <div className="grid col-span-full min-h-0 grid-cols-12">
      <div data-testid={`project-aside-left`} className="col-span-1 min-w-0 w-full min-h-0 bg-ludo-background border-r-2 grid grid-rows-[auto_1fr_auto] border-r-ludo-surface lg:col-span-3">
        <FileTreeWinbar />
        <ProjectFileTree />
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
      </div>

      <CodeRunnerProvider project={project} files={files}>
        <>
          <div className="col-span-10 min-h-0 relative lg:col-span-6 flex flex-col gap-8 items-stretch justify-start min-w-0">
            <EditorWinbar />
            <ProjectEditor isMarkedForDeletion={!!project.deleteAt}/>
            <RunCodeButton />
          </div>

          <div className="col-span-1 min-h-0 border-l-2 border-l-ludo-surface bg-ludo-background lg:col-span-3 flex flex-col">
            <RunnerWinbar />
            <div className="flex-1 min-h-0">
              <ProjectRunner />
            </div>
          </div>
        </>
      </CodeRunnerProvider>
    </div>
  );
}
