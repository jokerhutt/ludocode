import { StatusButton } from "@/components/Atoms/Button/StatusButton";
import { Button } from "@/components/ui/button";
import { BuilderNodeContainer } from "./BuilderNodeContainer";

type BuilderNodeProps = {
  title: string;
  onSelect: () => void;
  isSelected?: boolean;
  status: boolean;
  onStatusClick?: () => void;
  onEditClick?: () => void;
};

export function BuilderNode({
  title,
  onSelect,
  isSelected,
  status,
  onStatusClick,
  onEditClick,
}: BuilderNodeProps) {
  return (
    <div className="w-full py-1 flex items-center">
      <BuilderNodeContainer onClick={() => onSelect()} isSelected={!!isSelected}>
        <p className="text-lg">{title}</p>
        <div className="flex items-center gap-4">
          <Button className="h-6">Edit</Button>
          <StatusButton status="default" />
        </div>
      </BuilderNodeContainer>
    </div>
  );
}
