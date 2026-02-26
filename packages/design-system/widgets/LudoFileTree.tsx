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
      <div className="flex flex-col gap-1">{children}</div>
    </FileTreeContext.Provider>
  );
}

type ItemProps = {
  id: string;
  name: string;
  icon?: ReactNode;
  actions?: ReactNode;
  dataTestId?: string;
};

function Item({ id, name, icon, actions, dataTestId }: ItemProps) {
  const { selectedId, onSelect } = useFileTree();
  const isSelected = selectedId === id;

  return (
    <button
        data-testid={dataTestId}
      onClick={() => onSelect?.(id)}
      className={cn(
        "flex w-full hover:cursor-pointer justify-between px-2 py-1 rounded-lg items-center",
        isSelected
          ? "bg-ludo-accent-muted/70"
          : "hover:bg-ludo-accent-muted/50",
      )}
    >
      <div className="flex gap-3 items-center">
        {icon}
        <span className="text-sm">{name}</span>
      </div>

      {actions}
    </button>
  );
}

export const LudoFileTree = Object.assign(Root, {
  Item,
});
