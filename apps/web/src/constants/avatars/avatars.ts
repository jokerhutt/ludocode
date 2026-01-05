import { AVATAR_BASE_URL } from "@/constants/environment/env.ts";

export const getUserAvatar = (version: string, index: number) =>
  `${AVATAR_BASE_URL}/avatars/${version}/${index}.png`;
