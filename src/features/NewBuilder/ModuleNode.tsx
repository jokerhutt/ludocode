import type { ModuleSnap } from "@/Types/Snapshot/SnapshotTypes";
import { BuilderNode } from "./BuilderNode";
import { TreeItem } from "./TreeItem";
import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";

type ModuleNodeProps = { courseId: string; moduleSnapshot: ModuleSnap };

export function ModuleNode({ courseId, moduleSnapshot }: ModuleNodeProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const moduleId = moduleSnapshot.moduleId;

  const selectModule = () => {
    if (!moduleId) return;
    router.navigate(ludoNavigation.build.toBuilderModule(courseId, moduleId));
  };
  const selectLesson = (lessonId: string | null) => {
    if (!moduleId || !lessonId) return;
    router.navigate(
      ludoNavigation.build.toBuilderLesson(courseId, moduleId, lessonId)
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 pr-4">
        <BuilderNode
          onSelect={() => selectModule()}
          title={moduleSnapshot.title}
          status
        />
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="flex h-6 w-6 items-center justify-center rounded hover:bg-ludoGrayLight/60"
        >
          <ChevronRightIcon
            className={`h-4 w-4 text-white transition-transform ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <div className={`ml-6 ${isExpanded ? "flex" : "hidden"} flex-col`}>
        {moduleSnapshot.lessons.map((lesson, idx) => (
          <TreeItem key={idx}>
            <BuilderNode
              onSelect={() => selectLesson(lesson.id)}
              title={lesson.title}
              status
            />
          </TreeItem>
        ))}
      </div>
    </div>
  );
}
