import { create } from "zustand";

export type OnboardingDraft = { username?: string; career?: string; course?: string; experience?: boolean; };

type OnboardingDraftStore = {
  draft: OnboardingDraft;
  setDraft: (patch: Partial<OnboardingDraft>) => void;
  clearDraft: () => void;
};

export const onboardingDraftStore = create<OnboardingDraftStore>((set) => ({
  draft: {},
  setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
  clearDraft: () => set({ draft: {} }),
}));

export const useOnboardingDraftStore = onboardingDraftStore;