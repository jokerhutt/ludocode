import { useSuspenseQuery } from "@tanstack/react-query";
import { FEATURE_META, type ActiveFeaturesResponse } from "@ludocode/types/FeatureFlags/FeatureFlags.ts";
import { qo } from "@/queries/definitions/queries.ts";

type Args = {
  feature: keyof ActiveFeaturesResponse;
};

export function useFeatureEnabledCheck({ feature }: Args) {
  const { data: features } = useSuspenseQuery(qo.activeFeatures());
  return {
    enabled: features[feature],
    meta: FEATURE_META[feature],
  };
}