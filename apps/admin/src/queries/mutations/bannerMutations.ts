import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { BannerType, LudoBannerSnapshot } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CreateBannerRequest = {
  type: BannerType;
  text: string;
  expiresAt?: string;
};

export function useCreateBanner() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createBanner(),
    onSuccess: async (payload: LudoBannerSnapshot[]) => {
      qc.setQueryData(qk.banners(), payload);
      await qc.invalidateQueries({ queryKey: qk.banners() });
    },
  });
}

type DeleteBannerArgs = {
  bannerId: number;
};

export function useDeleteBanner({ bannerId }: DeleteBannerArgs) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteBanner(bannerId),
    onSuccess: async (payload: LudoBannerSnapshot[]) => {
      qc.setQueryData(qk.banners(), payload);
      await qc.invalidateQueries({ queryKey: qk.banners() });
    },
  });
}
