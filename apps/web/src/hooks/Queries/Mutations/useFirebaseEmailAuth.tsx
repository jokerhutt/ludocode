import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useFinalizeLogin } from "./useFinalizeLogin";
import { auth } from "@/constants/auth/firebase";
import { handleFirebaseAuthError } from "../handleFirebaseAuthError";
import type { FirebaseError } from "firebase/app";

export type EmailLoginMode = "REGISTER" | "LOGIN";

export function useFirebaseEmailAuth() {
  const finalizeLogin = useFinalizeLogin();

  return async (email: string, password: string, mode: EmailLoginMode) => {
    try {
      const result =
        mode === "LOGIN"
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);

      const idToken = await result.user.getIdToken();
      await finalizeLogin(idToken);
    } catch (err) {
      handleFirebaseAuthError(err as FirebaseError, mode);
    }
  };
}
