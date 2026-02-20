import { api } from "@/constants/api/api";

export function useStripeManage() {
  async function openManagePortal() {
    const res = await fetch(api.subscriptions.manage, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to create billing portal session");
    }

    const { url } = await res.json();

    window.location.href = url;
  }

  return { openManagePortal };
}