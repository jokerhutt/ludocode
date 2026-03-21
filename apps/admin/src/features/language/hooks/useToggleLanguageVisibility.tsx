import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type {
  LanguageMetadata,
  ToggleLanguageVisibilityRequest,
} from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  languageId: number;
};

export function useToggleLanguageVisibility({ languageId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.toggleLanguageVisibility(languageId),
    onSuccess: (payload: LanguageMetadata[]) => {
      qc.setQueryData(qk.languages(), payload);
    },
  });
}

export type { ToggleLanguageVisibilityRequest };
