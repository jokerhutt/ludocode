import type { ProjectFile } from "@/Hooks/Logic/Playground/useProject.tsx";
import { ProjectWinbar } from "../ProjectWinbar.tsx";
import { stripFileName } from "@/Hooks/Logic/Playground/playgroundFileUtils.ts";
import { EditorTab } from "@/components/Atoms/Tab/EditorTab.tsx";
import { EditorTabGroup } from "@/components/Molecules/Group/EditorTabGroup.tsx";

type EditorWinbarProps = { current: number; files: ProjectFile[] };

export function EditorWinbar({ current, files }: EditorWinbarProps) {
  return (
    <ProjectWinbar>
      <EditorTabGroup>
        {current !== null && current !== undefined && (
          <EditorTab>
            <p>{stripFileName(files[current].path)}</p>
          </EditorTab>
        )}
      </EditorTabGroup>
    </ProjectWinbar>
  );
}
