import { CommonHeader } from "../../components/Header/CommonHeader";
import { PathButton } from "./PathButton";
import { PathRow } from "./PathRow";

export function CoursePage() {
  const mockLessons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen bg-ludoGrayDark">
      <CommonHeader>
        <div></div>
      </CommonHeader>

      <div className="col-span-full flex justify-center p-6">
        <div className="w-1/2 flex flex-col gap-8">
          {mockLessons.map((lesson, index) => (
            <PathRow index={index}>
              <PathButton />
            </PathRow>
          ))}
        </div>
      </div>
    </div>
  );
}
