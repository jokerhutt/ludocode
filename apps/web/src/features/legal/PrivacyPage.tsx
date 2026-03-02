import Privacy from "@/legal/privacy.mdx";
import { legalComponents } from "./legalComponents";

export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <Privacy components={legalComponents} />
    </div>
  );
}
