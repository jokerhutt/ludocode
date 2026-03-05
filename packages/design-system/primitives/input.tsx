import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type InputWrapperProps = {
  children: ReactNode;
  className?: string;
  error?: string;
};

export function InputWrapper({
  children,
  className,
  error,
}: InputWrapperProps) {
  return (
    <div
      className={cn(
        "flex flex-col text-ludo-white-bright w-full gap-2 items-start",
        className,
      )}
    >
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

type InputTitleProps = { children: ReactNode };

export function InputTitle({ children }: InputTitleProps) {
  return <h3>{children}</h3>;
}

import { Input } from "@ludocode/external/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type LudoInputProps = {
  value: string;
  setValue: (newValue: string) => void;
  title?: string;
  placeholder?: string;
  isProtected?: boolean;
  containerClassName?: string;
  className?: string;
  ring?: boolean;
  dataTestId?: string;

  variant?: "default" | "alt" | "dark";
  error?: string;
};

export function LudoInput({
  value,
  setValue,
  title,
  placeholder,
  isProtected,
  containerClassName,
  dataTestId,
  className,
  ring = false,
  variant = "default",
  error,
}: LudoInputProps) {
  const errorStyle = error ? "border border-red-400" : "";
  const ringStyle = ring ? "" : "focus:ring-0 focus-visible:ring-0";
  const variantStyle =
    variant == "default"
      ? "border-transparent"
      : variant == "dark"
        ? "bg-ludo-background"
        : "border-3 border-ludo-accent focus:border-ludo-accent focus-visible:border-ludo-accent font-bold";

  const [isHidden, setIsHidden] = useState<boolean>(isProtected ?? false);

  return (
    <div
      className={cn(
        "w-full text-ludo-white items-start flex flex-col gap-2",
        containerClassName,
      )}
    >
      {title && <p className="text-sm">{title}</p>}
      <div className="relative w-full">
        <Input
          data-testid={dataTestId}
          type={isHidden ? "password" : "text"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={cn(
            "bg-ludo-surface placeholder:text-ludoGray pr-10 h-12 border border-transparent text-ludo-white-bright",
            ringStyle,
            errorStyle,
            variantStyle,
            className,
          )}
          placeholder={placeholder}
        />
        {isProtected && (
          <button
            type="button"
            onClick={() => setIsHidden((v) => !v)}
            className="absolute hover:cursor-pointer h-4 w-4 z-10 right-4 top-1/2 -translate-y-1/2"
          >
            {isHidden ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
