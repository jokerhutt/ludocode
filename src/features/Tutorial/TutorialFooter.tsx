import { CommonFooter } from "../../components/Footer/CommonFooter";
import { SubmitButton } from "../Exercise/SubmitButton";

type TutorialFooterProps = {
    canSubmit: boolean;
}

export function TutorialFooter({canSubmit}: TutorialFooterProps) {
  return (
    <CommonFooter>
      <div className="flex w-full justify-between h-full py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11">
        <div></div>
        <SubmitButton canSubmit={canSubmit} />
      </div>
    </CommonFooter>
  );
}
