import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import type { LanguageFormInput, ModifyLanguageRequest } from "@ludocode/types";
import { useUpdateLanguage } from "../hooks/useUpdateLanguage.tsx";

type UpdateLanguageButtonProps = {
  validate: () => LanguageFormInput | null;
  hasChanged: boolean;
  languageId: number;
};

export function UpdateLanguageButton({
  hasChanged,
  validate,
  languageId,
}: UpdateLanguageButtonProps) {
  const updateLanguageMutation = useUpdateLanguage({
    languageId: languageId,
  });

  const handleUpdateAccount = (payload: ModifyLanguageRequest) => {
    if (updateLanguageMutation.isPending) return;
    if (!hasChanged) {
      router.navigate(adminNavigation.hub.languages.toLanguagesHub());
    } else {
      updateLanguageMutation.mutate(payload);
    }
  };

  return (
    <LudoButton
      onClick={() => {
        const payload = validate();
        if (!payload) return;
        handleUpdateAccount(payload);
      }}
      variant={"alt"}
      className="w-full"
    >
      Save & Exit
    </LudoButton>
  );
}
