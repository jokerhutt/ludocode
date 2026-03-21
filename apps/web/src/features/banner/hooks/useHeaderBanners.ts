import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import type { BannerType, LudoBanner } from "@ludocode/types";

export type HeaderBannerItem = {
  id: string;
  text: string;
  type?: BannerType;
};

type BannerInput = {
  id: string | number;
  text: string;
  type?: BannerType;
};

type UseHeaderBannersArgs = {
  localBanners?: BannerInput[];
  localBehavior?: "prepend" | "replace";
};

function toHeaderBanner(
  source: BannerInput,
  prefix: "global" | "local",
): HeaderBannerItem {
  return {
    id: `${prefix}-${source.id}`,
    text: source.text,
    type: source.type,
  };
}

function toBannerType(type: unknown): BannerType {
  if (type === "FEATURE") return "FEATURE";
  if (type === "MAINTENANCE" || type === "INFO") return "MAINTENANCE";
  return "INCIDENT";
}

function normalizeGlobalBanners(data: unknown): HeaderBannerItem[] {
  const items = Array.isArray(data) ? data : data ? [data] : [];

  return items
    .filter(
      (item): item is LudoBanner =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "text" in item &&
        typeof (item as { text?: unknown }).text === "string",
    )
    .map((item) =>
      toHeaderBanner(
        {
          id: item.id,
          text: item.text,
          type: toBannerType((item as { type?: unknown }).type),
        },
        "global",
      ),
    );
}

export function useHeaderBanners({
  localBanners = [],
  localBehavior = "prepend",
}: UseHeaderBannersArgs = {}) {
  const { data } = useQuery(qo.banners());

  const banners = useMemo(() => {
    const globalBanners = normalizeGlobalBanners(data);
    const local = localBanners
      .filter((banner) => banner.text.trim().length > 0)
      .map((banner) => toHeaderBanner(banner, "local"));

    const merged =
      localBehavior === "replace" ? local : [...local, ...globalBanners];

    const seen = new Set<string>();
    return merged.filter((banner) => {
      if (seen.has(banner.id)) return false;
      seen.add(banner.id);
      return true;
    });
  }, [data, localBehavior, localBanners]);

  return {
    banners,
    hasBanners: banners.length > 0,
  };
}
