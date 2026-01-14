import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useFinalizeLogin } from "./useFinalizeLogin";
import { auth } from "@/constants/auth/firebase";

export type EmailLoginMode = "REGISTER" | "LOGIN";

export function useFirebaseEmailAuth() {
  const finalizeLogin = useFinalizeLogin();

  return async (email: string, password: string, mode: EmailLoginMode) => {
    const result =
      mode === "LOGIN"
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

    const idToken = await result.user.getIdToken();
    await finalizeLogin(idToken);
  };
}
