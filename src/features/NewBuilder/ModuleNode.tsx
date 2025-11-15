import type { ModuleSnap } from "@/Types/Snapshot/SnapshotTypes";
import { BuilderNode } from "./BuilderNode";
import { TreeItem } from "./TreeItem";

type ModuleNodeProps = { moduleSnapshot: ModuleSnap };

export function ModuleNode({ moduleSnapshot }: ModuleNodeProps) {
  return (
    <div className="flex flex-col">
      {/* Module root */}
      <BuilderNode title={moduleSnapshot.title} status />

      {/* Lessons */}
      <div className="ml-6 flex flex-col">
        {moduleSnapshot.lessons.map((lesson, idx) => (
          <TreeItem key={idx}>
            <BuilderNode title={lesson.title} status />
          </TreeItem>
        ))}
        <TreeItem>
          <BuilderNode title={moduleSnapshot.title} status />
        </TreeItem>
        <TreeItem>
          <BuilderNode title={moduleSnapshot.title} status />
        </TreeItem>
      </div>
    </div>
  );
}
