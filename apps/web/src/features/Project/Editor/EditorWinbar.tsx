
import { Winbar } from "../../../../../../packages/design-system/zones/winbar.tsx";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { stripFileName } from "../Util/filenameUtil.ts";
import { EditorTabGroup } from "@/features/Project/Editor/EditorTabGroup.tsx";
import { EditorTab } from "../../../../../../packages/design-system/primitives/tab.tsx";

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
