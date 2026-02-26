import type { ReactNode } from "react";
import { LudoMenu } from "@ludocode/design-system/widgets/ludo-menu";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon";
import { RenameDialog } from "@ludocode/design-system/templates/dialog/rename-dialog";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog";

type FileActionsMenuProps = {
  trigger: ReactNode;
  itemType: string;
  targetId: string;
  targetName: string;
  renameItem: (oldPath: string, newPath: string) => void;
  deleteItem: () => void;
};

export function FileActionsMenu({
  trigger,
  targetId,
  targetName,
  renameItem,
  itemType,
  deleteItem,
}: FileActionsMenuProps) {
  return (
    <LudoMenu>
      <LudoMenu.Trigger>{trigger}</LudoMenu.Trigger>

      <LudoMenu.Content align="end">
        <RenameDialog
          itemCategory={itemType}
          key={`rename-${targetId}`}
          itemName={targetName}
          onSubmit={renameItem}
        >
          <LudoMenu.Item>
            <LudoMenu.Row>
              <LudoMenu.Icon>
                <HeroIcon iconName="PencilIcon" className="h-4 text-white/70" />
              </LudoMenu.Icon>
              <LudoMenu.Label>Rename</LudoMenu.Label>
            </LudoMenu.Row>
          </LudoMenu.Item>
        </RenameDialog>

        <LudoMenu.Divider />

        <DeleteDialog onClick={() => deleteItem()} targetName={targetName}>
          <LudoMenu.Item destructive>
            <LudoMenu.Row>
              <LudoMenu.Icon>
                <HeroIcon iconName="TrashIcon" className="h-4 text-red-400" />
              </LudoMenu.Icon>
              <LudoMenu.Label>Delete</LudoMenu.Label>
            </LudoMenu.Row>
          </LudoMenu.Item>
        </DeleteDialog>
      </LudoMenu.Content>
    </LudoMenu>
  );
}