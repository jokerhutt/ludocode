import { toast } from "react-toastify";

export function errorToast(message: string) {
  toast.error(message, {
    position: "top-center",
    style: {
      background: "#dc2626",
      color: "#ffffff",
      fontWeight: 600,
    },
  });
}