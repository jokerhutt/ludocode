import { Plus } from "lucide-react";

type AddCurriculumItemButtonProps = {
  onAdd: () => void;
  text: string;
};

export function AddCurriculumItemButton({
  onAdd,
  text,
}: AddCurriculumItemButtonProps) {
  return (
    <div
      role="button"
      onClick={onAdd}
      className="w-full hover:cursor-pointer hover:bg-ludo-accent/20
                 text-ludo-accent border border-dashed py-2 px-4
                 flex items-center border-ludo-accent rounded-sm gap-4"
    >
      <Plus />
      <p>{text}</p>
    </div>
  );
}
