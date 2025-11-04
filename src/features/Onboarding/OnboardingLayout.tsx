import { MainContentWrapper } from "@/Layouts/LayoutWrappers/MainContentWrapper";
import { MainGridWrapper } from "@/Layouts/LayoutWrappers/MainGridWrapper";
import { TutorialHeader } from "../Tutorial/TutorialHeader";
import { LessonFooter } from "@/components/Molecules/Footer/LessonFooter";
import { onboardingFormOpts, useAppForm } from "@/form/formKit";

type OnboardingLayoutProps = {};

export function OnboardingLayout({}: OnboardingLayoutProps) {
  const form = useAppForm({
    ...onboardingFormOpts,
    defaultValues: {},
  });

  return (
    <form.AppForm>
      <MainGridWrapper gridRows={"FULL"}>
        <TutorialHeader total={10} position={1} />
        <MainContentWrapper>
          <div className="grid col-span-full grid-cols-12">
            <div className="col-start-2 col-end-11 overflow-auto lg:col-start-3 lg:col-end-11 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0">
              <h1 className="text-2xl text-center font-bold text-white">
                Which direction in Programming Interests you most?
              </h1>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 min-h-40 flex flex-col items-center justify-center rounded-2xl bg-ludoGrayLight">
                  <h1 className="text-white text-xl font-bold">
                    Data Scientist
                  </h1>
                </div>
                <div className="p-6 min-h-40 flex flex-col items-center justify-center rounded-2xl bg-ludoGrayLight">
                  <h1 className="text-white text-xl font-bold">
                    Frontend Developer
                  </h1>
                </div>
                <div className="p-6 min-h-40 flex flex-col items-center justify-center rounded-2xl bg-ludoGrayLight">
                  <h1 className="text-white text-xl font-bold">
                    Backend Developer
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </MainContentWrapper>
        <LessonFooter phase="DEFAULT">
          <div
            className={`flex w-full justify-between py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
          ></div>
        </LessonFooter>
      </MainGridWrapper>
    </form.AppForm>
  );
}
