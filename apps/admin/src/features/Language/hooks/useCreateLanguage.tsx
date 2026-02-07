import { mutations } from "@/hooks/Queries/Definitions/mutations.ts";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { type LanguageMetadata } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLanguage(closeModal?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createLanguage(),
    onSuccess: (payload: LanguageMetadata[]) => {
      qc.setQueryData(qk.languages(), payload);
      closeModal?.();
    },
  });
}
