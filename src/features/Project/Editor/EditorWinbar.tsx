
import { Winbar } from "@/components/design-system/blocks/winbar/winbar.tsx";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { stripFileName } from "../Util/filenameUtil.ts";
import { EditorTabGroup } from "@/components/design-system/composites/editor/editor-tab-group.tsx";
import { EditorTab } from "@/components/design-system/atoms/tab/editor-tab.tsx";

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
