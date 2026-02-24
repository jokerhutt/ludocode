import type { ReactNode } from "react";
import { cn } from "../cn-utils";

type FileWrapperProps = {
  children: ReactNode;
  isSelected: boolean;
  dataTestId?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
};

export function FileWrapper({
  children,
  isSelected,
  dataTestId,
  disabled,
  onClick,
}: FileWrapperProps) {
  const cursorStyle = disabled
    ? "hover:cursor-not-allowed"
    : "hover:cursor-pointer";

  return (
    <button
      data-testid={dataTestId}
      onClick={(e) => {
        onClick?.(e);
      }}
      className={cn(
        `flex w-full gap-8 px-2 py-1 justify-between rounded-lg items-center ${
          isSelected
            ? "bg-ludo-accent-muted/70"
            : "hover:bg-ludo-accent-muted/50"
        }`,
        cursorStyle,
      )}
    >
      {children}
    </button>
  );
}

type FileInfoRowProps = {
  fileName: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export function FileInfoRow({
  fileName,
  children,
  className,
}: FileInfoRowProps) {
  return (
    <div
      className={cn("flex gap-4 hover:cursor-pointer items-center", className)}
    >
      {children}
      <p className="text-sm">{fileName}</p>
    </div>
  );
}
