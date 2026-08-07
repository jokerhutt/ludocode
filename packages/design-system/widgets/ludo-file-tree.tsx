import { cn } from "../cn-utils";

import { createContext, useContext, type ReactNode } from "react";

type FileTreeContextType = {
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  rename?: (id: string, newName: string) => void;
  deleteItem?: (id: string) => void;
  readOnly?: boolean;
};

const FileTreeContext = createContext<FileTreeContextType | null>(null);

function useFileTree() {
  const ctx = useContext(FileTreeContext);
  if (!ctx) {
    throw new Error("LudoFileTree must be used inside LudoFileTree.Root");
  }
  return ctx;
}

type RootProps = {
  children: ReactNode;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  rename?: (id: string, newName: string) => void;
  deleteItem?: (id: string) => void;
  readOnly?: boolean;
};

function Root({
  children,
  selectedId,
  onSelect,
  rename,
  deleteItem,
  readOnly,
}: RootProps) {
  return (
    <FileTreeContext.Provider
      value={{ selectedId, onSelect, rename, deleteItem, readOnly }}
    >
      <div className="relative flex flex-col gap-0.5 pl-3">
        <span
          aria-hidden
          className="absolute left-0 top-[1.125rem] bottom-[1.125rem] w-0.5 rounded-full bg-ludo-surface"
        />
        {children}
      </div>
    </FileTreeContext.Provider>
  );
}

type ItemProps = {
  id: string;
  name: string;
  icon?: ReactNode;
  actions?: ReactNode;
  indicator?: ReactNode;
  dataTestId?: string;
};

function Item({ id, name, icon, actions, indicator, dataTestId }: ItemProps) {
  const { selectedId, onSelect } = useFileTree();
  const isSelected = selectedId === id;

  const dotIndex = name.lastIndexOf(".");
  const baseName = dotIndex > 0 ? name.slice(0, dotIndex) : name;
  const extension = dotIndex > 0 ? name.slice(dotIndex) : "";

  return (
    <button
      data-testid={dataTestId}
      onClick={() => onSelect?.(id)}
      className={cn(
        "group relative flex h-9 w-full min-w-0 items-center justify-between gap-2 overflow-hidden rounded-lg pl-3 pr-2 transition-colors hover:cursor-pointer",
        isSelected
          ? "bg-ludo-surface text-ludo-white-bright"
          : "text-ludo-white hover:bg-ludo-surface/60",
      )}
    >
      {isSelected && (
        <span
          aria-hidden
          className="absolute bottom-1 left-0 top-1 w-0.5 rounded-full bg-ludo-accent-muted"
        />
      )}

      <span className="flex min-w-0 items-center gap-2.5">
        {icon}
        <span className="min-w-0 truncate text-sm">
          {baseName}
          {extension && (
            <span
              className={isSelected ? "text-ludo-white" : "text-ludo-white-dim"}
            >
              {extension}
            </span>
          )}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-1">
        {indicator}
        {actions}
      </span>
    </button>
  );
}

export const LudoFileTree = Object.assign(Root, {
  Item,
});
