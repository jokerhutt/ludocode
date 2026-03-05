import type { AuthProviderMode } from "@/queries/mutations/useFirebaseAuthEntry.tsx";
import {
  GithubIcon,
  GoogleIcon,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";

type ProviderLoginGroupProps = {
  onLogin: (provider: AuthProviderMode) => void;
};

export function ProviderLoginGroup({ onLogin }: ProviderLoginGroupProps) {
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <div className="flex gap-4 justify-between items-center w-full">
        <LudoButton
          className="font-bold"
          variant="white"
          onClick={() => onLogin("GOOGLE")}
        >
          <GoogleIcon />
          Google
        </LudoButton>
        <LudoButton
          className="font-bold"
          variant="white"
          onClick={() => onLogin("GITHUB")}
        >
          <GithubIcon />
          Github
        </LudoButton>
      </div>
    </div>
  );
}
