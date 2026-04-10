import { AVATAR_BASE_PATH as AVATAR_BASE_PATH } from "@/constants/environment/env.ts";

export const getUserAvatar = (version: string, index: number) =>
  `${AVATAR_BASE_PATH}/${version}/${index}.png`;
