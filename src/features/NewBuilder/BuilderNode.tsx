import { StatusButton } from "@/components/Atoms/Button/StatusButton";
import { Button } from "@/components/ui/button";

type BuilderNodeProps = {
  title: string;
  status: boolean;
  onStatusClick?: () => void;
  onEditClick?: () => void;
};

export function BuilderNode({
  title,
  status,
  onStatusClick,
  onEditClick,
}: BuilderNodeProps) {
  return (
    <div className="w-full py-2 justify-between flex items-center">
      <p className="text-lg">{title}</p>
      <div className="flex items-center gap-4">
        <Button className="h-6">Edit</Button>
        <StatusButton status="default"/>
      </div>
    </div>
  );
}
