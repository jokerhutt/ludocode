import { ProjectWinbar } from "../ProjectWinbar.tsx";
import { EditorTab } from "@/components/Atoms/Tab/EditorTab.tsx";
import { EditorTabGroup } from "@/components/Molecules/Group/EditorTabGroup.tsx";
import { useProjectContext } from "../../../Hooks/Context/ProjectContext.tsx";
import { stripFileName } from "../Util/filenameUtil.ts";

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
