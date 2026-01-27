import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Badge } from "./Badge";

type BadgeCardProps = {};

export function BadgeCard({}: BadgeCardProps) {
  return (
    <div className="w-full flex">
      <LudoButton className="flex items-center justify-start px-4 py-4 h-auto gap-2">
        <Badge icon="Python" />
      </LudoButton>
    </div>
  );
}
