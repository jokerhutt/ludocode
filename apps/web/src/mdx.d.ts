declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { MDXComponents } from "mdx/types";

  export const frontmatter: {
    title: string;
    slug: string;
    section: string;
    order: number;
    description?: string;
  };

  const MDXComponent: ComponentType<{ components?: MDXComponents }>;
  export default MDXComponent;
}
