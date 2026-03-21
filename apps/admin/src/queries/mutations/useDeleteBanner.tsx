import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { LudoBannerSnapshot } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  bannerId: number;
};

export function useDeleteBanner({ bannerId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteBanner(bannerId),
    onSuccess: async (payload: LudoBannerSnapshot[]) => {
      qc.setQueryData(qk.banners(), payload);
      await qc.invalidateQueries({ queryKey: qk.banners() });
    },
  });
}
