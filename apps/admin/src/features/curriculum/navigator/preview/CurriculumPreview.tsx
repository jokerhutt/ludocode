import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import {
  CurriculumCard,
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "../../components/CurriculumList.tsx";
import type { CurriculumDraft, CurriculumDraftLesson } from "@ludocode/types";
import { ModulePreviewItem } from "./ModulePreviewItem.tsx";
import { useRef } from "react";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog.tsx";

type CurriculumPreviewProps = {
  selectedLesson: CurriculumDraftLesson | null;
  onLessonClick: (lesson: CurriculumDraftLesson) => void;
  onLessonNavigate?: (lesson: CurriculumDraftLesson) => void;
  modules: CurriculumDraft["modules"];
  onEditClick: () => void;
  onYamlUpload: (_file: File) => void;
  isUploadingYaml: boolean;
  onDownload: () => void;
};

export function CurriculumPreview({
  onLessonClick,
  onLessonNavigate,
  modules,
  selectedLesson,
  onEditClick,
  onYamlUpload,
  isUploadingYaml,
  onDownload,
}: CurriculumPreviewProps) {
  const yamlInputRef = useRef<HTMLInputElement>(null);

  function handleYamlFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onYamlUpload(file);
    e.target.value = "";
  }

  return (
    <CurriculumCard>
      <CurriculumCardHeader>
        <p className="text-ludo-white-bright font-bold">Curriculum Preview</p>
        <div className="flex items-center gap-3">
          <input
            ref={yamlInputRef}
            type="file"
            accept=".yaml,.yml,application/x-yaml,text/yaml"
            className="hidden"
            onChange={handleYamlFileChange}
          />
          <ShadowLessButton
            variant="white"
            className="w-auto text-sm h-auto px-4 py-1 rounded-sm"
            onClick={() => yamlInputRef.current?.click()}
            disabled={isUploadingYaml}
          >
            {isUploadingYaml ? "Uploading…" : "Upload YAML"}
          </ShadowLessButton>
          <ShadowLessButton
            className="w-auto text-sm h-auto px-4 py-1 rounded-sm"
            variant="white"
            onClick={onDownload}
          >
            Download
          </ShadowLessButton>
          <LudoButton
            className="w-auto h-auto px-4 py-1 rounded-sm"
            shadow={false}
            variant="alt"
            onClick={onEditClick}
          >
            <p className="text-sm">Edit Curriculum</p>
          </LudoButton>
        </div>
      </CurriculumCardHeader>

      <CurriculumCardContent className="bg-ludo-background">
        {modules.map((module) => (
          <ModulePreviewItem
            key={module.id}
            selectedLesson={selectedLesson}
            onLessonClick={onLessonClick}
            onLessonNavigate={onLessonNavigate}
            title={module.title}
            lessons={module.lessons}
          />
        ))}
      </CurriculumCardContent>

      <CurriculumCardFooter>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <p className="text-xs">Revision: 6</p>
      </CurriculumCardFooter>
    </CurriculumCard>
  );
}
