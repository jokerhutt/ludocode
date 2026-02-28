import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useFinalizeLogin } from "./useFinalizeLogin";
import { auth } from "@/constants/auth/firebase";
import { handleFirebaseAuthError } from "../../Error/handleFirebaseAuthError";
import type { FirebaseError } from "firebase/app";
import validator from "validator";
import { errorToast } from "@ludocode/design-system/primitives/toast";
import { useRef } from "react";

export type EmailLoginMode = "REGISTER" | "LOGIN";


export function useFirebaseEmailAuth() {
  const finalizeLogin = useFinalizeLogin();
  const isRunningRef = useRef(false);

  return async (email: string, password: string, mode: EmailLoginMode) => {
    if (isRunningRef.current) return; // prevent double submit

    try {
      isRunningRef.current = true;

      if (!validator.isEmail(email)) {
        errorToast("Please enter a valid email address.");
        return;
      }

      const result =
        mode === "LOGIN"
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);

      const idToken = await result.user.getIdToken();
      await finalizeLogin(idToken);
    } catch (err) {
      handleFirebaseAuthError(err as FirebaseError, mode);
    } finally {
      isRunningRef.current = false;
    }
  };
}
