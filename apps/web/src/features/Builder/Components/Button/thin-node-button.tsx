import { Button } from "../../../../../../../packages/external/ui/button.tsx";

type ThinNodeButtonProps = { onClick?: () => void; text: string };

export function ThinNodeButton({ text, onClick }: ThinNodeButtonProps) {
  return (
    <Button onClick={() => onClick?.()} className="h-6">
      {text}
    </Button>
  );
}
