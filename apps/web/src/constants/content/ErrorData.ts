import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import type { LudoButtonVariant } from "@ludocode/design-system/primitives/ludo-button";

import { RefreshCcwIcon } from "lucide-react";

type ErrorAction = {
  text: string;
  variant?: LudoButtonVariant;
  icon?: React.ComponentType<{ className?: string }>;
  handler: (router: ReturnType<typeof import("@tanstack/react-router").useRouter>) => void;
};

type ErrorEntry = {
  status: ErrorStatus;
  title: string;
  suggestion: string;
  actions?: ErrorAction[];
};
export type ErrorStatus = 404 | 500;

type ErrorMap = Record<ErrorStatus, ErrorEntry>;


export const errorMap: ErrorMap = {
  404: {
    status: 404,
    title: "The page you are looking for couldn't be found",
    suggestion: "Did you make sure the url is correct?",
    actions: [
      {
        text: "Go to home",
        variant: "white",
        handler: (router) =>
          router.navigate(ludoNavigation.courseRoot()),
      },
    ],
  },
  500: {
    status: 500,
    title: "Encountered unexpected error on our side, sorry!",
    suggestion:
      "Try refreshing the page or inspecting the error in the developer tools",
    actions: [
      {
        text: "Refresh",
        variant: "alt",
        icon: RefreshCcwIcon,
        handler: () => window.location.reload(),
      },
      {
        text: "Go to home",
        variant: "white",
        handler: (router) =>
          router.navigate(ludoNavigation.courseRoot()),
      },
    ],
  },
};