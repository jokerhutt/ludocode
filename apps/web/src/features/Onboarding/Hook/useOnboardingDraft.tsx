import { qk } from "@/hooks/Queries/Definitions/qk";
import type { CareerType } from "@ludocode/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type OnboardingDraft = {
  username?: string;
  career?: CareerType;
  course?: string;
  experience?: boolean;
};

export type UseOnboardingDraftReturn = {
  draft: OnboardingDraft;
  setDraft: (patch: Partial<OnboardingDraft>) => void;
  clearDraft: () => void;
};

export function useOnboardingDraft(): UseOnboardingDraftReturn {
  const queryClient = useQueryClient();

  const { data: draft = {} } = useQuery<OnboardingDraft>({
    queryFn: async () => ({}),
    queryKey: qk.onboardingDraft(),
    initialData: {},
    staleTime: Infinity,
    enabled: false,
  });

  const setDraft = (patch: Partial<OnboardingDraft>) =>
    queryClient.setQueryData<OnboardingDraft>(
      qk.onboardingDraft(),
      (draft = {}) => ({
        ...draft,
        ...patch,
      }),
    );

  const clearDraft = () =>
    queryClient.removeQueries({ queryKey: qk.onboardingDraft() });

  return { draft, setDraft, clearDraft };
}
