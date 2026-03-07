import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import { router } from "@/main.tsx";
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
      router.navigate(adminNavigation.hub.courses.toCoursesHub());
    },
  });
}
