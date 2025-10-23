import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export function InlineCode({ code, lang = "js" }:{
  code:string; lang?:string;
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
        fontSize: "20px",
        lineHeight: "28px",
      }}
      codeTagProps={{ style: { font: "inherit" } }}
    >
      {code}
    </SyntaxHighlighter>
  );
}