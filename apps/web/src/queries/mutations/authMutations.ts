import { mutations } from "@/queries/definitions/mutations.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { auth } from "@/constants/auth/firebase.ts";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useFinalizeLogin } from "./session.ts";
import { handleFirebaseAuthError } from "@/features/auth/util/handleFirebaseAuthError.tsx";
import type { FirebaseError } from "firebase/app";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import validator from "validator";
import { errorToast } from "@ludocode/design-system/primitives/toast.tsx";

export function useLogout() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    ...mutations.logOut(),
    onSuccess: () => {
      qc.clear();
      router.navigate(ludoNavigation.auth.register());
    },
  });
}

export function useDeleteAccount() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteAccount(),
    onSuccess: async () => {
      qc.clear();
      await router.navigate({ to: "/", replace: true });
    },
  });
}

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
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";

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
