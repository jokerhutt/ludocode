import Terms from "@/legal/terms.mdx";
import { legalComponents } from "./legalComponents";

export function ToSPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <Terms components={legalComponents} />
    </div>
  );
}
