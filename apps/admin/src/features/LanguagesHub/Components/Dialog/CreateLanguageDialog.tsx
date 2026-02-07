import {
  CustomIcon,
  Icons,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";
import {
  InputTitle,
  InputWrapper,
} from "@ludocode/design-system/primitives/input";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog";
import { DialogHeader } from "@ludocode/external/ui/dialog";
import { Input } from "@ludocode/external/ui/input";
import { Textarea } from "@ludocode/external/ui/textarea";
import type { LanguageMetadata, PistonRuntime } from "@ludocode/types";
import { Dialog } from "@radix-ui/react-dialog";
import type * as monaco from "monaco-editor";
import {
  useCreateLanguage,
  useLanguageForm,
} from "../../../Language/hooks/useCreateLanguage.tsx";
import { RuntimeSelect } from "../Selection/RuntimeSelection";
import { EditorLanguageSelect } from "../Selection/EditorLanguageSelect";
import { LanguageIconSelect } from "../Selection/LanguageIconSelect";

export type MonacoLanguage = monaco.languages.ILanguageExtensionPoint;

type CreateLanguageDialogProps = {
  existingUserLanguages: LanguageMetadata[];
  open: boolean;
  close: () => void;
  hash: string;
  runtimes: PistonRuntime[];
};

export function CreateLanguageDialog({
  open,
  runtimes,
  existingUserLanguages,
  close,
}: CreateLanguageDialogProps) {
  const formHook = useLanguageForm({ existingUserLanguages, runtimes });
  const closeModal = () => {
    formHook.reset();
    close();
  };

  const createLanguage = useCreateLanguage(closeModal);

  return (
    <Dialog open={open} onOpenChange={() => closeModal()}>
      <DialogWrapper className="sm:max-w-4xl">
        <DialogHeader className="text-white code font-bold text-xl">
          New Language
          {formHook.iconName.length > 0 && (
            <CustomIcon
              className="h-6 w-6"
              color="white"
              iconName={formHook.iconName as IconName}
            />
          )}
        </DialogHeader>

        <div className=" grid gap-6 text-left text-sm grid-cols-4">
          <InputWrapper error={formHook.errors.name} className="col-span-2">
            <InputTitle>Language name</InputTitle>
            <Input
              placeholder="E.g. Python"
              value={formHook.languageName}
              onChange={(e) => formHook.setLanguageName(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper error={formHook.errors.slug} className="col-span-2">
            <InputTitle>Slug</InputTitle>
            <Input
              placeholder="python"
              value={formHook.slug}
              onChange={(e) => formHook.setSlug(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper error={formHook.errors.editorId} className="col-span-2">
            <InputTitle>
              Editor ID
              <span className="text-xs pl-2 text-ludoAltText">
                {formHook.extension && `Extension: ${formHook.extension}`}
              </span>
            </InputTitle>

            <EditorLanguageSelect
              editorId={formHook.editorId}
              editorLanguages={formHook.editorLanguages}
              setEditorId={formHook.setEditorId}
            />
          </InputWrapper>

          <InputWrapper error={formHook.errors.pistonId} className="col-span-2">
            <InputTitle>Runtime</InputTitle>
            <RuntimeSelect
              pistonId={formHook.pistonId}
              setPistonId={formHook.setPistonId}
              availableRuntimes={formHook.availableRuntimes}
            />
          </InputWrapper>

          <InputWrapper error={formHook.errors.base} className="col-span-2">
            <InputTitle>Base</InputTitle>
            <Input
              placeholder="main"
              value={formHook.base}
              onChange={(e) => formHook.setBase(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper error={formHook.errors.iconName}>
            <InputTitle>Icon</InputTitle>
            <LanguageIconSelect
              iconName={formHook.iconName}
              setIconName={formHook.setIconName}
            />
            {formHook.errors.iconName && (
              <p className="text-xs text-red-400">{formHook.errors.iconName}</p>
            )}
          </InputWrapper>

          <InputWrapper className="col-span-4">
            <InputTitle>Initial script</InputTitle>
            <Textarea
              placeholder="print('Hello world')"
              value={formHook.initialScript}
              onChange={(e) => formHook.setInitialScript(e.target.value)}
            />
            {formHook.errors.initialScript && (
              <p className="text-xs text-red-400">
                {formHook.errors.initialScript}
              </p>
            )}
          </InputWrapper>

          <div className="py-2 flex justify-center items-center">
            <LudoButton
              onClick={() => closeModal()}
              variant={"white"}
              className="w-full"
            >
              Cancel
            </LudoButton>
          </div>
          <div className="py-2 col-span-3 flex justify-center items-center">
            <LudoButton
              onClick={() => {
                const payload = formHook.validate();
                if (!payload) return;

                createLanguage.mutate(payload);
              }}
              variant={"alt"}
              className="w-full"
            >
              Submit
            </LudoButton>
          </div>
        </div>
      </DialogWrapper>
    </Dialog>
  );
}
