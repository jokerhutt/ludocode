import { ProjectEditor } from "./Editor/ProjectEditor.tsx";
import { ProjectFileTree } from "./FileTree/ProjectFileTree.tsx";
import { RunnerWinbar } from "./Runner/RunnerWinbar.tsx";
import { EditorWinbar } from "./Editor/EditorWinbar.tsx";
import { ProjectRunner } from "./Runner/ProjectRunner.tsx";
import { FileTreeWinbar } from "./FileTree/FileTreeWinbar.tsx";

import { ChatBotProvider } from "../../Hooks/Context/ChatBot/ChatBotContext.tsx";
import { RunCodeButton } from "./Editor/RunCodeButton.tsx";
import { CodeRunnerProvider } from "../../Hooks/Context/Runner/CodeRunnerContext.tsx";
import { useProjectContext } from "../../Hooks/Context/Project/ProjectContext.tsx";
import { ChatBotAccordion } from "@/components/LudoComponents/Blocks/Chatbot/ChatBotAccordion.tsx";
import ChatBotWindow from "@/components/LudoComponents/Composites/ChatBot/ChatBotWindow.tsx";

export function ProjectPage() {
  const { project, files, currentFileId } = useProjectContext();

  return (
    <div className="grid col-span-full min-h-0 grid-cols-12">
      <div className="col-span-1 min-h-0 bg-ludoGrayDark border-r-2 grid grid-rows-[auto_1fr_auto] border-r-ludoGrayLight lg:col-span-3">
        <FileTreeWinbar />
        <ProjectFileTree />
        <div className="min-h-0 w-full h-full flex flex-col justify-end">
          <ChatBotProvider targetId={currentFileId} type="PROJECT">
            <ChatBotAccordion>
              <ChatBotWindow type="PROJECT" targetId={currentFileId} />
            </ChatBotAccordion>
          </ChatBotProvider>
        </div>
      </div>

      <CodeRunnerProvider project={project} files={files}>
        <>
          <div className="col-span-10 min-h-0 relative lg:col-span-6 flex flex-col gap-8 items-stretch justify-start min-w-0">
            <EditorWinbar />
            <ProjectEditor />
            <RunCodeButton />
          </div>

          <div className="col-span-1 min-h-0 border-l-2 border-l-ludoGrayLight bg-ludoGrayDark lg:col-span-3 flex flex-col">
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
