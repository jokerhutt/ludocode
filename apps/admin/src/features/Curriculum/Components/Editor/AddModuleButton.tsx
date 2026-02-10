import { Plus } from "lucide-react";

type AddModuleButtonProps = {
  onAdd: () => void;
};

export function AddModuleButton({ onAdd }: AddModuleButtonProps) {
  return (
    <div
      role="button"
      onClick={onAdd}
      className="w-full hover:cursor-pointer hover:bg-ludo-accent/20
                 text-ludo-accent border border-dashed py-2 px-4
                 flex items-center border-ludo-accent rounded-sm gap-4"
    >
      <Plus />
      <p>Add Module</p>
    </div>
  );
}