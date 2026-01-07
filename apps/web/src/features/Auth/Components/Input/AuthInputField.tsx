import { cn } from "@ludocode/design-system/cn-utils";
import { Input } from "@ludocode/external/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type AuthInputFieldProps = {
  value: string;
  setValue: (newValue: string) => void;
  title?: string;
  placeHolder?: string;
  isProtected?: boolean;
  errorMsg?: string;
  isError?: boolean;
};

export function AuthInputField({
  value,
  setValue,
  title,
  placeHolder,
  isProtected,
  errorMsg = "Required",
  isError,
}: AuthInputFieldProps) {
  const errorStyle = isError ? "border border-red-400" : "";
  const [isHidden, setIsHidden] = useState<boolean>(isProtected ?? false);

  return (
    <div className="w-full text-ludoAltText flex flex-col gap-2">
      {title && <p className="text-sm">{title}</p>}
      <div className="relative">
        <Input
          type={isHidden ? "password" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "bg-ludoGrayLight placeholder:text-ludoGray pr-10 h-12 border border-transparent text-white",
            errorStyle
          )}
          placeholder={placeHolder}
        />
        {isProtected && (
          <button
            type="button"
            onClick={() => setIsHidden((v) => !v)}
            className="absolute hover:cursor-pointer h-4 w-4 z-10 right-4 top-1/2 -translate-y-1/2"
          >
            {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4"/>}
          </button>
        )}
      </div>

      {isError && errorMsg && <p className="text-red-400 text-xs">Error</p>}
    </div>
  );
}
