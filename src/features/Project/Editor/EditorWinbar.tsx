import type { ProjectFile } from "@/Hooks/Logic/Playground/useProject.tsx";
import { ProjectWinbar } from "../ProjectWinbar.tsx";
import { stripFileName } from "@/Hooks/Logic/Playground/playgroundFileUtils.ts";

type EditorWinbarProps = { current: number; files: ProjectFile[] };

export function EditorWinbar({ current, files }: EditorWinbarProps) {
  return (
    <ProjectWinbar>
      <div className="flex h-full pt-2 px-6 items-center">
        {current !== null && current !== undefined && (
          <div className=" h-full px-8 flex items-center border hover:cursor-pointer border-ludoLightPurple border-b-ludoGrayLight bg-ludoGrayDark">
            <p className="text-white text-center">
              {stripFileName(files[current].path)}
            </p>
          </div>
        )}
      </div>
    </ProjectWinbar>
  );
}
