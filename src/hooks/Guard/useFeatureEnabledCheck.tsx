import { useSuspenseQuery } from "@tanstack/react-query";
import { FEATURE_META, type ActiveFeaturesResponse } from "@/types/FeatureFlags/FeatureFlags";
import { qo } from "../Queries/Definitions/queries";

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