import { FireIcon, HeartIcon } from "@heroicons/react/24/solid";
import { CommonHeader } from "../components/Header/CommonHeader";
import { navIcons } from "../constants/navIcons";
import { HollowSlot } from "../features/Module/Header/HollowSlot";
import { CommitIcon } from "../components/HeroIcons/CustomIcon";

type DesktopHeaderProps = {};

export function DesktopHeader({}: DesktopHeaderProps) {
  const icons = navIcons;

  return (
    <CommonHeader device="Desktop">
      <div className="col-start-2 col-end-12 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {icons.map((icon) => (
            <HollowSlot>
              <p onClick={() => !!icon.onClick && icon.onClick()} className="text-white">{icon.name}</p>
            </HollowSlot>
          ))}
        </div>

        <div className="flex w-full text-white justify-end gap-2 items-center">
          <HollowSlot>
            <HeartIcon className="h-7 text-red-400" />
            <p>2</p>
          </HollowSlot>
          <HollowSlot>
            <CommitIcon className="h-7 text-pythonYellow" />
            <p>2</p>
          </HollowSlot>
          <HollowSlot>
            <FireIcon className="h-7 text-orange-400" />
            <p>2</p>
          </HollowSlot>
        </div>
      </div>
    </CommonHeader>
  );
}
