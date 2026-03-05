import { auth } from "@/constants/auth/firebase.ts";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useFinalizeLogin } from "./useFinalizeLogin.tsx";
import { handleFirebaseAuthError } from "@/features/auth/util/handleFirebaseAuthError.tsx";
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

import { useRef } from "react";

export function useFirebaseAuthEntry() {
  const finalizeLogin = useFinalizeLogin();
  const isRunningRef = useRef(false);

  return async (provider: AuthProviderMode) => {
    if (isRunningRef.current) return;

    try {
      isRunningRef.current = true;

      const firebaseProvider = getFirebaseProvider(provider);
      const result = await signInWithPopup(auth, firebaseProvider);
      const idToken = await result.user.getIdToken();

      await finalizeLogin(idToken);
    } catch (err) {
      handleFirebaseAuthError(err as FirebaseError);
    } finally {
      isRunningRef.current = false;
    }
  };
}
