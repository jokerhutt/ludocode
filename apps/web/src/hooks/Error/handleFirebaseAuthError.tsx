import { toast } from "react-toastify";
import type { FirebaseError } from "firebase/app";
import type { EmailLoginMode } from "../Queries/Mutations/useFirebaseEmailAuth";
import { errorToast } from "@ludocode/design-system/primitives/toast";

export function handleFirebaseAuthError(
  error: FirebaseError,
  mode?: EmailLoginMode
) {
  switch (error.code) {
    case "auth/email-already-in-use":
      errorToast(
        mode === "REGISTER"
          ? "An account with this email already exists. Please log in."
          : "This email is already registered."
      );
      break;

    case "auth/account-exists-with-different-credential":
      errorToast(
        "This email is registered using another provider. Please sign in with that provider."
      );
      break;

    case "auth/wrong-password":
      errorToast("Incorrect password.");
      break;

    case "auth/user-not-found":
      errorToast("No account found with this email.");
      break;

    case "auth/invalid-credential":
      errorToast(
        mode
          ? "Invalid email or password."
          : "This email is registered with another provider."
      );
      break;

    case "auth/popup-closed-by-user":
      // optional: no toast
      break;

    default:
      errorToast("Authentication failed. Please try again.");
  }
}
