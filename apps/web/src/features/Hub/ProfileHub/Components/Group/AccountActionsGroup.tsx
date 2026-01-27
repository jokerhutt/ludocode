import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

type AccountActionsGroupProps = {};

export function AccountActionsGroup({}: AccountActionsGroupProps) {
  return (
    <div className="w-full flex gap-2 lg:gap-4 justify-between mb-8 lg:justify-end">
      <LudoButton variant="alt" className="text-lg w-full px-4">
        Account Settings
      </LudoButton>
    </div>
  );
}
