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
import type { PistonRuntime } from "@ludocode/types";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";

type CreateLanguageDialogProps = {
  open: boolean;
  close: () => void;
  hash: string;
  runtimes: PistonRuntime[];
};

export function CreateLanguageDialog({ open, runtimes, close }: CreateLanguageDialogProps) {
  const resetForm = () => {
    setLanguageName("");
    setEditorId("");
    setPistonId("");
    setSlug("");
    setInitialScript("");
    setBase("");
    setExtension("");
    setIconName("");
  };

  const closeModal = () => {
    resetForm();
    close();
  };

  const [languageName, setLanguageName] = useState<string>("");
  const [editorId, setEditorId] = useState<string>("");
  const [pistonId, setPistonId] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [initialScript, setInitialScript] = useState<string>("");
  const [base, setBase] = useState<string>("");
  const [extension, setExtension] = useState<string>("");
  const [iconName, setIconName] = useState<IconName | "">("");

  return (
    <Dialog open={open} onOpenChange={() => closeModal()}>
      <DialogWrapper>
        <DialogHeader className="text-white code font-bold text-xl">
          New Course
        </DialogHeader>

        <InputWrapper>
          <InputTitle>Language name</InputTitle>
          <Input
            placeholder="E.g. Python"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <InputTitle>Slug</InputTitle>
          <Input
            placeholder="python"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <InputTitle>Editor ID</InputTitle>
          <Input
            placeholder="python"
            value={editorId}
            onChange={(e) => setEditorId(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <InputTitle>Runtime</InputTitle>

          <select
            className="w-full bg-transparent border border-ludo-accent-muted rounded px-2 py-1 text-white"
            value={pistonId}
            onChange={(e) => setPistonId(e.target.value)}
          >
            <option value="">Select runtime</option>

            {runtimes.map((rt) => (
              <option
                key={`${rt.language}-${rt.version}-${rt.runtime ?? "default"}`}
                value={rt.language}
              >
                {rt.language}
              </option>
            ))}
          </select>
        </InputWrapper>

        <InputWrapper>
          <InputTitle>Extension</InputTitle>
          <Input
            placeholder=".py"
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <InputTitle>Base</InputTitle>
          <Input
            placeholder="main"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <InputTitle>Icon</InputTitle>
          <select
            className="w-full bg-transparent border border-ludo-accent-muted rounded px-2 py-1 text-white"
            value={iconName}
            onChange={(e) => setIconName(e.target.value as IconName)}
          >
            <option value="">Select icon</option>
            {(Object.keys(Icons) as IconName[]).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </InputWrapper>

        <p className="text-left text-ludoAltText">
          Icon Preview:{" "}
          {iconName.length > 0 ? (
            <CustomIcon
              className="h-6 w-6"
              color="white"
              iconName={iconName as IconName}
            />
          ) : (
            "None Set"
          )}
        </p>

        <InputWrapper>
          <InputTitle>Initial script</InputTitle>
          <Textarea
            placeholder="print('Hello world')"
            value={initialScript}
            onChange={(e) => setInitialScript(e.target.value)}
          />
        </InputWrapper>

        <div className="py-2 flex justify-center items-center">
          <LudoButton variant={"alt"} className="w-full">
            Create Language
          </LudoButton>
        </div>
      </DialogWrapper>
    </Dialog>
  );
}
