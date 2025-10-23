import { useState } from "react";

type PracticePageProps = {};

export function BuilderPage({}: PracticePageProps) {
  const [courseModules, setCourseModules] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  return (
    //   <div className="grid col-span-full grid-cols-12">
    //     <AsideComponent orientation="LEFT">
    //       <BuilderLessonContainer
    //         currentLesson={currentLesson}
    //         currentModule={currentModule}
    //         moduleLessons={mockLessons}
    //       />
    //     </AsideComponent>

    //     <div className="col-start-5 col-end-9 flex flex-col gap-8 p-6 items-stretch justify-start h-full min-w-0">
    //       <BuilderCreatorContainer currentLesson={currentLesson} />
    //     </div>

    //     <ModuleAsideRight />
    //   </div>
    // );
    <></>
  );
}
