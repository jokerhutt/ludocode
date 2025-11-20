import Lottie from "lottie-react";
import { ActionButton } from "../../components/Atoms/Button/ActionButton";
import { DefaultFooter } from "../../components/Molecules/Footer/DefaultFooter";
import { MainContentWrapper } from "../../Layouts/LayoutWrappers/MainContentWrapper";
import { MainGridWrapper } from "../../Layouts/LayoutWrappers/MainGridWrapper";
import { useLottie } from "../../Hooks/Animation/useLottie";
import { streakIncreaseRoute } from "../../routes/router";

type StreakIncreasePageProps = {};

export function StreakIncreasePage({}: StreakIncreasePageProps) {
  const { oldCount, newCount } = streakIncreaseRoute.useParams();
  const animationData = useLottie("/Animations/STR_INCREASE.json");

  return (
    <MainGridWrapper gridRows="SITE_INVERSE">
      <MainContentWrapper>
        <div className="col-span-full grid grid-cols-12 h-full">
          <div className="text-white col-start-5 col-end-9 flex flex-col items-stretch gap-4 justify-center min-w-0">
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay
              className="w-full h-80"
            />
            <h2 className="text-center text-2xl">
              Streak Increase! {newCount}
            </h2>
          </div>
        </div>
      </MainContentWrapper>
      <DefaultFooter phase="DEFAULT">
        <div
          className={`flex w-full justify-end py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
        >
          <ActionButton text="Continue" active={true} />
        </div>
      </DefaultFooter>
    </MainGridWrapper>
  );
}
