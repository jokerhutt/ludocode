import { ProjectWinbar } from "../ProjectWinbar.tsx";
import { stripFileName } from "@/Hooks/Logic/Playground/playgroundFileUtils.ts";
import { EditorTab } from "@/components/Atoms/Tab/EditorTab.tsx";
import { EditorTabGroup } from "@/components/Molecules/Group/EditorTabGroup.tsx";
import { useProjectContext } from "../ProjectContext.tsx";

export function EditorWinbar() {
  const { current, files } = useProjectContext();

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
