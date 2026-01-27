import { AvatarInfo } from "@ludocode/types/User/AvatarInfo";

export type EditProfileRequest = {
  username: string;
  avatarInfo: AvatarInfo;
};
