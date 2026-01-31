import type { ReactNode } from "react";

type FileWrapperProps = {
  children: ReactNode;
  isSelected: boolean;
  onClick?: React.MouseEventHandler;
};

export function FileWrapper({
  children,
  isSelected,
  onClick,
}: FileWrapperProps) {
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
      }}
      className={`flex w-full gap-8 px-2 py-1 justify-between rounded-lg hover:cursor-pointer items-center ${
        isSelected ? "bg-ludo-accent-muted/70" : "hover:bg-ludo-accent-muted/50"
      }`}
    >
      {children}
    </button>
  );
}

type FileInfoRowProps = {
  fileName: string;
  children: ReactNode;
};

export function FileInfoRow({
  fileName,
  children,
}: FileInfoRowProps) {
  return (
    <div className="flex gap-4 hover:cursor-pointer items-center">
      {children}
      <p className="text-sm">{fileName}</p>
    </div>
  );
}
