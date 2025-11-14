import { useEffect, useState, type RefObject } from "react";
import { ProjectEditor } from "./Editor/ProjectEditor";
import { ProjectFileTree } from "./FileTree/ProjectFileTree";
import { useProject } from "@/Hooks/Logic/Playground/useProject";
import * as monaco from "monaco-editor";
import { ProjectWinbar } from "./ProjectWinbar";
import { NewFilePopover } from "@/components/Molecules/Popover/NewFilePopover";
import { PlusIcon, TrashIcon } from "lucide-react";
import { stripFileName } from "@/Hooks/Logic/Playground/playgroundFileUtils";
import { useRunner } from "@/Hooks/Logic/Playground/useRunner";
import { RunnerWinbar } from "./Runner/RunnerWinbar";
import { EditorWinbar } from "./Editor/EditorWinbar";
import { useLoaderData } from "@tanstack/react-router";
import { projectRoute } from "@/routes/router";
import { useAutoSaveProject } from "@/Hooks/Logic/Playground/useAutoSaveProject";

type ProjectPageProps = {};

export function ProjectPage({}: ProjectPageProps) {
  const { project } = useLoaderData({ from: projectRoute.id });

  const {
    files,
    current,
    active,
    deleteFile,
    setCurrent,
    updateContent,
    addFile,
    addFileChoices,
  } = useProject({ project });

  useAutoSaveProject({ project, files, debounceMs: 1000 });

  const { outputLog, clearOutput } = useRunner();

  return (
    <div className="grid col-span-full h-full grid-cols-12">
      <div className="col-span-1 bg-ludoGrayDark border-r-2 border-r-ludoGrayLight lg:col-span-3">
        <ProjectWinbar>
          <div className="flex h-full text-white justify-between items-center">
            <p>Files</p>

            <NewFilePopover content={addFileChoices} addFile={addFile}>
              <div className="p-0.5 hover:cursor-pointer hover:bg-ludoLightPurple/80 rounded-full">
                <PlusIcon className="h-4 w-4" />
              </div>
            </NewFilePopover>
          </div>
        </ProjectWinbar>
        <ProjectFileTree
          projects={files}
          current={current}
          changeFile={setCurrent}
          deleteFile={deleteFile}
        />
      </div>

      <div className="col-span-10 relative lg:col-span-6 flex flex-col gap-8 items-stretch justify-start min-w-0">
        <EditorWinbar current={current} files={files} />
        <ProjectEditor
          path={active.path}
          language={active.language}
          value={active.content}
          onChange={updateContent}
        />
        <div className="absolute z-10 hover:cursor-pointer rounded-lg py-0.5 px-8 border-ludoLightPurple border-2 text-ludoLightPurple bottom-10 right-10 flex items-center justify-center">
          <p className="font-bold text-lg">Run</p>
        </div>
      </div>

      <div className="col-span-1 border-l-2 border-l-ludoGrayLight bg-ludoGrayDark lg:col-span-3">
        <RunnerWinbar clearOutput={() => clearOutput} />
        <div></div>
      </div>
    </div>
  );
}
