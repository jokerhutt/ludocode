import { ProjectWinbar } from "../ProjectWinbar.tsx";
import { stripFileName } from "@/Hooks/Logic/Playground/playgroundFileUtils.ts";
import type { ProjectFileSnapshot } from "@/Types/Playground/ProjectFileSnapshot.ts";
import { EditorTab } from "@/components/Atoms/Tab/EditorTab.tsx";
import { EditorTabGroup } from "@/components/Molecules/Group/EditorTabGroup.tsx";

type EditorWinbarProps = { current: number; files: ProjectFileSnapshot[] };

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
