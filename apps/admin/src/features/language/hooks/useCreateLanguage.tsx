import { adminNavigation } from "@/constants/adminNavigation";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import { router } from "@/main";
import { type LanguageMetadata } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLanguage() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createLanguage(),
    onSuccess: (payload: LanguageMetadata[]) => {
      qc.setQueryData(qk.languages(), payload);
      router.navigate(adminNavigation.hub.courses.toCoursesHub());
    },
  });
}
