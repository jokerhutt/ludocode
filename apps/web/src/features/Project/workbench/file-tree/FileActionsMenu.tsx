import type { ReactNode } from "react";
import { LudoMenu } from "@ludocode/design-system/widgets/ludo-menu.tsx";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import { RenameDialog } from "@ludocode/design-system/templates/dialog/rename-dialog.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog.tsx";

type FileActionsMenuProps = {
  trigger: ReactNode;
  itemType: string;
  targetId: string;
  targetName: string;
  renameItem: (oldPath: string, newPath: string) => void;
  deleteItem: () => void;
  canDelete?: boolean;
};

export function FileActionsMenu({
  trigger,
  targetId,
  targetName,
  renameItem,
  itemType,
  deleteItem,
  canDelete,
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
          <LudoMenu.Item closeOnSelect={false}>
            <LudoMenu.Row>
              <LudoMenu.Icon>
                <HeroIcon iconName="PencilIcon" className="h-4 text-white/70" />
              </LudoMenu.Icon>
              <LudoMenu.Label>Rename</LudoMenu.Label>
            </LudoMenu.Row>
          </LudoMenu.Item>
        </RenameDialog>

        {canDelete && (
          <>
            <LudoMenu.Divider />

            <DeleteDialog onClick={() => deleteItem()} targetName={targetName}>
              <LudoMenu.Item closeOnSelect={false} destructive>
                <LudoMenu.Row>
                  <LudoMenu.Icon>
                    <HeroIcon
                      iconName="TrashIcon"
                      className="h-4 text-red-400"
                    />
                  </LudoMenu.Icon>
                  <LudoMenu.Label>Delete</LudoMenu.Label>
                </LudoMenu.Row>
              </LudoMenu.Item>
            </DeleteDialog>
          </>
        )}
      </LudoMenu.Content>
    </LudoMenu>
  );
}
