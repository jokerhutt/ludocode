import { DialogTitle } from "@ludocode/external/ui/dialog";
import { useState, type ReactNode } from "react";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { Spinner } from "@ludocode/external/ui/spinner";

import { useCreateSubject } from "../../Hooks/useCreateSubject";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { subjectsDraftSchema } from "@ludocode/types";

type CreateSubjectDialogProps = {
  open: boolean;
  close: () => void;
  children: ReactNode;
};

export function CreateSubjectDialog({
  open,
  close,
  children,
}: CreateSubjectDialogProps) {
  const { data: subjects } = useSuspenseQuery(qo.allSubjects());
  const createMutation = useCreateSubject();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});

  const isLoading = createMutation.isPending;

  const handleCreate = () => {
    const data = {
      subjects: [
        ...subjects,
        {
          id: 0,
          name,
          slug,
        },
      ],
    };

    const result = subjectsDraftSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: { name?: string; slug?: string } = {};
      for (const issue of result.error.issues) {
        const key = issue.path.at(-1) as "name" | "slug";
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    createMutation.mutate(
      { id: 0, name, slug },
      {
        onSuccess: () => {
          setName("");
          setSlug("");
          close();
        },
      },
    );
  };

  return (
    <LudoDialog
      trigger={children}
      open={open}
      onOpenChange={(next) => {
        if (next) return;
        close();
      }}
    >
      <DialogTitle className="text-white font-bold text-xl">
        Create Subject
      </DialogTitle>

      <div className="flex flex-col gap-6 mt-4">
        <LudoInput
          variant="dark"
          title="Name"
          value={name}
          setValue={setName}
          error={errors.name}
          placeholder="e.g. Python"
        />

        <LudoInput
          title="Slug"
          variant="dark"
          value={slug}
          setValue={setSlug}
          error={errors.slug}
          placeholder="python"
        />

        <LudoButton
          disabled={isLoading}
          variant="alt"
          onClick={handleCreate}
          className="w-full flex justify-center"
        >
          Create Subject
          {isLoading && <Spinner className="ml-2 text-ludo-accent-muted" />}
        </LudoButton>
      </div>
    </LudoDialog>
  );
}
