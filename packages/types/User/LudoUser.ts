export type LudoUser = {
  id: string;
  displayName: string | null;
  avatarVersion: string;
  avatarIndex: number;
  email: string;
  hasOnboarded: boolean;
  createdAt: number;
};
