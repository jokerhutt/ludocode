import type { FirebaseError } from "firebase/app";
import type { EmailLoginMode } from "@/queries/mutations/useFirebaseEmailAuth.tsx";
import { errorToast } from "@ludocode/design-system/primitives/toast.tsx";

export function handleFirebaseAuthError(
  error: FirebaseError,
  mode?: EmailLoginMode
) {
  switch (error.code) {
    case "auth/email-already-in-use":
      errorToast(
        mode === "REGISTER"
          ? "An user with this email already exists. Please log in."
          : "This email is already registered."
      );
      break;

    case "auth/user-exists-with-different-credential":
      errorToast(
        "This email is registered using another provider. Please sign in with that provider."
      );
      break;

    case "auth/wrong-password":
      errorToast("Incorrect password.");
      break;

    case "auth/user-not-found":
      errorToast("No user found with this email.");
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
