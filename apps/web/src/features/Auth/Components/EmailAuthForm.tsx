import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Checkbox } from "@ludocode/external/ui/checkbox";
import { useState } from "react";
import { AuthInputField } from "./Input/AuthInputField";

type EmailAuthFormProps = { mode: "REGISTER" | "LOGIN" };

export function EmailAuthForm({ mode }: EmailAuthFormProps) {
  const buttonText = mode == "REGISTER" ? "Sign up & continue" : "Sign in";

  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [hasAgreedToToS, setHasAgreedToToS] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <AuthInputField
          value={emailInput}
          setValue={setEmailInput}
          title="Email"
          placeHolder="Your email"
        />
        <div className="relative">
          <AuthInputField
            value={passwordInput}
            isProtected
            setValue={setPasswordInput}
            title="Password"
            placeHolder="Your password"
          />


        </div>

        <div className="w-full my-0.5 text-ludoAltText lg:items-center flex gap-2">
          <Checkbox
            onSelect={() => setHasAgreedToToS(!hasAgreedToToS)}
            className="hover:cursor-pointer data-[state=checked]:bg-ludoAltAccent"
          />
          <p className="text-xs">
            By signing up, you agree to Ludocode's Terms of Service
          </p>
        </div>
      </div>

      <div className="w-full">
        <LudoButton variant="alt">{buttonText}</LudoButton>
      </div>
    </div>
  );
}
