import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";

type ErrorEntry = {
  status: ErrorStatus;
  title: string;
  suggestion: string;
  actionText: string;
  fallbackAction?: () => void;
};

export type ErrorStatus = 404 | 500;

type ErrorMap = Record<ErrorStatus, ErrorEntry>;

export const errorMap: ErrorMap = {
  404: {
    status: 404,
    title: "The page you are looking for couldn't be found",
    suggestion: "Did you make sure the url is correct?",
    actionText: "Go to home",
    fallbackAction: () => router.navigate(ludoNavigation.courseRoot()),
  },
  500: {
    status: 500,
    title: "Encountered unexpected error on our server, sorry!",
    suggestion:
      "Try refreshing the page or inspecting the error in the developer tools",
    actionText: "Go to home",
  },
};
