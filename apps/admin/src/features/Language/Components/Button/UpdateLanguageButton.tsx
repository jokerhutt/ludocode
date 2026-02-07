import { adminNavigation } from "@/constants/adminNavigation";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { CreateLanguageFormInput, UpdateLanguageRequest } from "@ludocode/types";
import { useUpdateLanguage } from "../../hooks/useUpdateLanguage";

type UpdateLanguageButtonProps = {
  validate: () => CreateLanguageFormInput | null;
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

  const handleUpdateAccount = (payload: UpdateLanguageRequest) => {
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
