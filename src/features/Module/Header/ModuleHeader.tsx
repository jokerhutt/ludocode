import {
  ArrowsRightLeftIcon,
  Bars3Icon,
  FireIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { CommonHeader } from "../../../components/Header/CommonHeader";
import {
  CommitIcon,
  PythonIcon,
} from "../../../components/HeroIcons/CustomIcon";
import { HollowSlot } from "./HollowSlot";

type ModuleHeaderProps = {};

export function ModuleHeader({}: ModuleHeaderProps) {

  

  return (
    <CommonHeader>
      <div className="col-start-2 col-end-12 flex py-2 items-center justify-between">
        <div>
          <HollowSlot gap="gap-4">
            <PythonIcon className="h-6" />
            <ArrowsRightLeftIcon className="h-6 text-white" />
          </HollowSlot>
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
