import { api } from "@/constants/api/api.ts";

export function useStripeCheckout() {
  async function startCheckout(planCode: string) {
    const res = await fetch(api.subscriptions.checkout, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planCode }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to create checkout session");
    }

    const { url } = await res.json();

    console.log(url);
    window.location.href = url;
  }

  return { startCheckout };
}
