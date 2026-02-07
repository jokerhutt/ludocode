import { adminNavigation } from "@/constants/adminNavigation";
import { mutations } from "@/hooks/Queries/Definitions/mutations";
import { qk } from "@/hooks/Queries/Definitions/qk";
import { router } from "@/main";
import type { LanguageMetadata } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  languageId: number;
};

export function useDeleteLanguage({ languageId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteLanguage(languageId),
    onSuccess: async (payload: LanguageMetadata[]) => {
      await router.navigate(adminNavigation.hub.languages.toLanguagesHub())
      qc.setQueryData(qk.languages(), payload);
    },
  });
}
