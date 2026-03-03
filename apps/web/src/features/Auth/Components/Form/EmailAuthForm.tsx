import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { Checkbox } from "@ludocode/external/ui/checkbox.tsx";
import { useState } from "react";
import type { EmailLoginMode } from "@/hooks/Queries/Mutations/useFirebaseEmailAuth.tsx";
import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";

type EmailAuthFormProps = {
  mode: EmailLoginMode;
  onSubmit: (username: string, password: string, mode: EmailLoginMode) => void;
};

export function EmailAuthForm({ mode, onSubmit }: EmailAuthFormProps) {
  const buttonText = mode === "REGISTER" ? "Sign up & continue" : "Sign in";

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [hasAgreedToToS, setHasAgreedToToS] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const canSubmitNow =
      emailInput.length > 0 &&
      passwordInput.length > 0 &&
      (mode === "LOGIN" || hasAgreedToToS);

    if (!canSubmitNow) {
      return;
    }

    onSubmit(emailInput, passwordInput, mode);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <LudoInput
          value={emailInput}
          setValue={setEmailInput}
          title="Email"
          placeholder="Your email"
        />

        <LudoInput
          value={passwordInput}
          isProtected
          setValue={setPasswordInput}
          title="Password"
          placeholder="Your password"
        />

        {mode === "REGISTER" && (
          <div className="w-full my-0.5 text-ludoAltText lg:items-center flex gap-2">
            <Checkbox
              data-testid="register-tos"
              checked={hasAgreedToToS}
              onCheckedChange={(checked) => setHasAgreedToToS(checked === true)}
              className="hover:cursor-pointer  data-[state=checked]:bg-ludo-accent"
            />
            <p className="text-xs">
              By signing up, you agree to Ludocode's{" "}
              <a
                onClick={() =>
                  router.navigate(ludoNavigation.resources.toToS())
                }
                className="underline hover:text-ludo-accent-muted hover:cursor-pointer"
              >
                Terms
              </a>{" "}
              &{" "}
              <a
                onClick={() =>
                  router.navigate(ludoNavigation.resources.toPrivacy())
                }
                className="underline hover:text-ludo-accent-muted hover:cursor-pointer"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </div>

      <LudoButton type="submit" variant="alt">
        {buttonText}
      </LudoButton>
    </form>
  );
}
