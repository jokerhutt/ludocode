import { FireIcon, HeartIcon } from "@heroicons/react/24/solid";
import { CommonHeader } from "../../components/Header/CommonHeader";
import { HeroIcon } from "../../components/HeroIcons/HeroIcon";
import { HeaderStatIcon } from "./Header/HeaderStatIcon";
import { PathButton } from "./PathButton";
import { PathRow } from "./PathRow";
import { CommitIcon, PythonIcon } from "../../components/HeroIcons/CustomIcon";

export function CoursePage() {
  const mockLessons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="grid grid-cols-12 relative grid-rows-[auto_1fr_auto] min-h-screen  bg-ludoGrayDark">
      <CommonHeader>
        <div className="col-span-5 py-2 pl-3 flex items-center">
          <HeaderStatIcon text={"Python"}>
            <PythonIcon className="h-6" />
          </HeaderStatIcon>
        </div>
        <div className="col-span-7 flex justify-between py-2 pr-3 items-center">
          <HeaderStatIcon text={6}>
            <HeartIcon className="h-7 text-red-400" />
          </HeaderStatIcon>
          <HeaderStatIcon text={6}>
            <CommitIcon className="h-7 text-pythonYellow" />
          </HeaderStatIcon>
          <HeaderStatIcon text={6}>
            <FireIcon className="h-7 text-orange-400" />
          </HeaderStatIcon>
        </div>
      </CommonHeader>

      <div className="col-start-5 col-end-9 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0">
        {mockLessons.map((_, i) => (
          <PathRow key={i} index={i}>
            <PathButton />
          </PathRow>
        ))}
      </div>
    </div>
  );
}
