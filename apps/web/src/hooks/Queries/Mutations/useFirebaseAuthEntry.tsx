import { auth } from "@/constants/auth/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useFinalizeLogin } from "./useFinalizeLogin";
import { handleFirebaseAuthError } from "../handleFirebaseAuthError";
import type { FirebaseError } from "firebase/app";

export type AuthProviderMode = "GOOGLE" | "GITHUB";

function getFirebaseProvider(mode: AuthProviderMode) {
  switch (mode) {
    case "GOOGLE":
      return new GoogleAuthProvider();
    case "GITHUB":
      return new GithubAuthProvider();
    default:
      throw new Error("Unsupported auth provider");
  }
}

export function useFirebaseAuthEntry() {
  const finalizeLogin = useFinalizeLogin();

  return async (provider: AuthProviderMode) => {
    try {
      const firebaseProvider = getFirebaseProvider(provider);

      const result = await signInWithPopup(auth, firebaseProvider);
      const idToken = await result.user.getIdToken();

      await finalizeLogin(idToken);
    } catch (err) {
      handleFirebaseAuthError(err as FirebaseError);
    }
  };
}
