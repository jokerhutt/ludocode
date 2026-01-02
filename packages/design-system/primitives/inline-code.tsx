import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export function InlineCode({
  code,
  lang = "py",
  fontSize = "17px",
  lineHeight = "28px",
}: {
  code: string;
  lang?: string;
  fontSize?: string;
  lineHeight: string;
}) {
  return (
    <SyntaxHighlighter
      language={lang}
      style={theme}
      PreTag="span"
      CodeTag="span"
      customStyle={{
        display: "inline",
        background: "transparent",
        padding: 0,
        margin: 0,
        fontFamily: "DMMono, ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize,
        lineHeight,
      }}
      codeTagProps={{ style: { font: "inherit" } }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
