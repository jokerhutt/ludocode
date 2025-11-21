import { ProjectEditor } from "./Editor/ProjectEditor.tsx";
import { ProjectFileTree } from "./FileTree/ProjectFileTree.tsx";
import { useProject } from "@/Hooks/Logic/Playground/useProject.tsx";
import { useRunner } from "@/Hooks/Logic/Playground/useRunner.tsx";
import { RunnerWinbar } from "./Runner/RunnerWinbar.tsx";
import { EditorWinbar } from "./Editor/EditorWinbar.tsx";
import { useLoaderData } from "@tanstack/react-router";
import { projectRoute } from "@/routes/router.tsx";
import { useAutoSaveProject } from "@/Hooks/Logic/Playground/useAutoSaveProject.tsx";
import { ProjectRunner } from "./Runner/ProjectRunner.tsx";
import { MainGridWrapper } from "@/Layouts/LayoutWrappers/MainGridWrapper.tsx";
import { FileTreeWinbar } from "./FileTree/FileTreeWinbar.tsx";
import { RunProjectButton } from "./Editor/RunProjectButton.tsx";
import { ProjectHeader } from "./ProjectHeader.tsx";
import ChatBotDemo from "../Chatbot/ChatBotDemo.tsx";

type ProjectPageProps = {};

export function ProjectPage({}: ProjectPageProps) {
  const { project } = useLoaderData({ from: projectRoute.id });

  const {
    files,
    current,
    active,
    deleteFile,
    renameFile,
    setCurrent,
    updateContent,
    addFile,
    addFileChoices,
  } = useProject({ project });

  const saveStatus = useAutoSaveProject({
    project,
    files,
    debounceMs: 1000,
  });

  const { outputInfo, runCode } = useRunner({
    project,
    files,
  });

  return (
    <MainGridWrapper className="max-h-dvh" gridRows="SITE">
      <ProjectHeader projectName={project.fileName} saveStatus={saveStatus} />
      <div className="grid col-span-full grid-cols-12">
        <div className="col-span-1 bg-ludoGrayDark border-r-2 grid grid-rows-[auto_auto_1fr] border-r-ludoGrayLight lg:col-span-3">
          <FileTreeWinbar addFile={addFile} addFileChoices={addFileChoices} />
          <ProjectFileTree
            renameFile={renameFile}
            projects={files}
            current={current}
            changeFile={setCurrent}
            deleteFile={deleteFile}
          />
          <ChatBotDemo/>
        </div>

        <div className="col-span-10 relative lg:col-span-6 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <EditorWinbar current={current} files={files} />
          <ProjectEditor
            path={active.path}
            language={active.language}
            value={active.content}
            onChange={updateContent}
          />
          <RunProjectButton runCode={runCode} />
        </div>

        <div className="col-span-1 border-l-2 border-l-ludoGrayLight bg-ludoGrayDark lg:col-span-3">
          <RunnerWinbar clearOutput={outputInfo.clearOutput} />
          <ProjectRunner output={outputInfo.outputLog} />
        </div>
      </div>
    </MainGridWrapper>
  );
}
