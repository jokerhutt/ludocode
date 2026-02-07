import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { LanguageFormInput } from "@ludocode/types";
import { useCreateLanguage } from "../../hooks/useCreateLanguage";

type CreateLanguageButtonProps = {
  validate: () => LanguageFormInput | null;
};

export function CreateLanguageButton({ validate }: CreateLanguageButtonProps) {
  const createLanguage = useCreateLanguage();

  return (
    <LudoButton
      onClick={() => {
        const payload = validate();
        if (!payload) return;

        createLanguage.mutate(payload);
      }}
      variant={"alt"}
      className="w-full"
    >
      Submit
    </LudoButton>
  );
}
