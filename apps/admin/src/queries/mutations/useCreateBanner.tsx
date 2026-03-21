import type { BannerType } from "@ludocode/types"

export type CreateBannerRequest = {
    type: BannerType;
    text: string;
    expiresAt?: string;
}