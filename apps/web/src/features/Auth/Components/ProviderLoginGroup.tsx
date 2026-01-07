import type { AuthProviderMode } from "@/hooks/Queries/Mutations/useFirebaseAuthEntry";
import {
  GithubIcon,
  GoogleIcon,
} from "@ludocode/design-system/primitives/custom-icon";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

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
