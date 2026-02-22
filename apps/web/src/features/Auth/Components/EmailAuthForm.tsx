import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Checkbox } from "@ludocode/external/ui/checkbox";
import { useState } from "react";
import { cn } from "@ludocode/design-system/cn-utils";
import type { EmailLoginMode } from "@/hooks/Queries/Mutations/useFirebaseEmailAuth";
import {LudoInput} from "@ludocode/design-system/primitives/input.tsx";

type EmailAuthFormProps = {
  mode: EmailLoginMode;
  onSubmit: (username: string, password: string, mode: EmailLoginMode) => void;
};

export function EmailAuthForm({ mode, onSubmit }: EmailAuthFormProps) {
  const buttonText = mode == "REGISTER" ? "Sign up & continue" : "Sign in";

  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [hasAgreedToToS, setHasAgreedToToS] = useState<boolean>(false);

  const canSubmit =
    emailInput.length > 0 &&
    passwordInput.length > 0 &&
    (mode == "LOGIN" || hasAgreedToToS);

  const handleSubmit = () => {
    console.log("Has agreed to TOS: " + hasAgreedToToS);
    if (!canSubmit) {
      console.log("cant submit");
      return;
    }
    onSubmit(emailInput, passwordInput, mode);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <LudoInput
          value={emailInput}
          setValue={setEmailInput}
          title="Email"
          placeholder="Your email"
        />
        <div className="relative">
          <LudoInput
            value={passwordInput}
            isProtected
            setValue={setPasswordInput}
            title="Password"
            placeholder="Your password"
          />
        </div>

        <div
          className={cn(
            "w-full my-0.5 text-ludoAltText lg:items-center flex gap-2",
            mode == "REGISTER" ? "flex" : "hidden"
          )}
        >
          <Checkbox
            checked={hasAgreedToToS}
            onCheckedChange={(checked) => {
              setHasAgreedToToS(checked === true);
            }}
            className="hover:cursor-pointer data-[state=checked]:bg-ludo-accent"
          />
          <p className="text-xs">
            By signing up, you agree to Ludocode's Terms of Service
          </p>
        </div>
      </div>

      <div className="w-full">
        <LudoButton onClick={() => handleSubmit()} variant="alt">
          {buttonText}
        </LudoButton>
      </div>
    </div>
  );
}
