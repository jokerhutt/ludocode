import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type {
  LanguageDisabledMessageRequest,
  LanguageMetadata,
} from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  languageId: number;
};

export function useChangeLanguageDisabledReason({ languageId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.changeLanguageDisabledMessage(languageId),
    onSuccess: (payload: LanguageMetadata[]) => {
      qc.setQueryData(qk.languages(), payload);
    },
  });
}

export type { LanguageDisabledMessageRequest };
