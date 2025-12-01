
import { Winbar } from "@/components/LudoComponents/Blocks/Winbar/Winbar.tsx";
import { useProjectContext } from "../../../Hooks/Context/Project/ProjectContext.tsx";
import { stripFileName } from "../Util/filenameUtil.ts";
import { EditorTabGroup } from "@/components/LudoComponents/Blocks/Group/EditorTabGroup.tsx";
import { EditorTab } from "@/components/LudoComponents/Atoms/Tab/EditorTab.tsx";

export function EditorWinbar() {
  const { current, files } = useProjectContext();

  return (
    <Winbar>
      <EditorTabGroup>
        {current !== null && current !== undefined && (
          <EditorTab>
            <p>{stripFileName(files[current].path)}</p>
          </EditorTab>
        )}
      </EditorTabGroup>
    </Winbar>
  );
}
