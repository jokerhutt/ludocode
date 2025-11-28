import type { ReactNode } from "react";

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
