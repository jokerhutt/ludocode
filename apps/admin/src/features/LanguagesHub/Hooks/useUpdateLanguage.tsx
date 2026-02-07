import { mutations } from "@/hooks/Queries/Definitions/mutations";
import { qk } from "@/hooks/Queries/Definitions/qk";
import type { LanguageMetadata } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  languageId: number;
};

export function useUpdateLanguage({ languageId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.updateLanguage(languageId),
    onSuccess: (payload: LanguageMetadata[]) => {
      qc.setQueryData(qk.languages(), payload);
    },
  });
}
