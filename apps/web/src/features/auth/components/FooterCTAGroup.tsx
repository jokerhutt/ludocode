import { track } from "@/analytics/track";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { NavButton } from "@ludocode/design-system/primitives/NavButton.tsx";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LogIn } from "lucide-react";

type FooterCTAGroupProps = { source: string };

export function FooterCTAGroup({ source }: FooterCTAGroupProps) {
  const handleLoginClick = () => {
    track({
      event: "LOGIN_CLICK",
      properties: { source: source },
    });
    router.navigate(ludoNavigation.auth.login(false));
  };

  const handleRegisterClick = () => {
    track({
      event: "SIGNUP_CLICK",
      properties: { source: source },
    });
    router.navigate(ludoNavigation.auth.register(false));
  };

  return (
    <div className="px-3 py-1">
      <div className="flex items-center gap-2">
        <div className="h-8 flex-1 flex items-center justify-center">
          <NavButton onClick={handleLoginClick}>
            <LogIn className="w-4 h-4" />
            <span>Log in</span>
          </NavButton>
        </div>
        <LudoButton
          variant="alt"
          shadow={false}
          className="h-8 flex-1 px-3 text-sm font-medium"
          onClick={handleRegisterClick}
        >
          Register
        </LudoButton>
      </div>
    </div>
  );
}
