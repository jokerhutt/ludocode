import { LessonFooter } from "../../components/Molecules/Footer/LessonFooter";
import { CommonHeader } from "../../components/Molecules/Header/CommonHeader";
import { MainContentWrapper } from "../../Layouts/LayoutWrappers/MainContentWrapper";
import { MainGridWrapper } from "../../Layouts/LayoutWrappers/MainGridWrapper";
import { SubGridWrapper } from "../../Layouts/LayoutWrappers/SubGridWrapper";
import { BuilderPage } from "./BuilderPage";

type BuilderPageProps = {};

export function BuilderLayout({}: BuilderPageProps) {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-0">
      <MainContentWrapper>
        <BuilderPage/>  
      </MainContentWrapper>
      <LessonFooter phase="DEFAULT">
        <div
          className={`flex w-full justify-end py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
        >
          
        </div>
      </LessonFooter>
    </div>
  );
}
