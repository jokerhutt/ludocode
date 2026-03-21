export type LudoBanner = {

    id: number;
    type: BannerType
    text: string;

}

export type BannerType = "MAINTENANCE" | "FEATURE" | "INCIDENT"

export type LudoBannerSnapshot = {
    id: number;
    type: BannerType;
    text: string;
    active: boolean;
    expiresAt: number;
    createdAt: number;
}