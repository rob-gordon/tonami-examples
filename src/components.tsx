import { styled } from "goober";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps
} from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
export const Columns = styled("div")`
  display: grid;
  grid-template: auto / minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
`;

export const BigButton = styled("button")`
  font-size: 1.5rem;
  padding: 20px;
`;

export const Highlight = (props: SyntaxHighlighterProps) => {
  return (
    <SyntaxHighlighter
      {...props}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: "5px",
        fontFamily:
          'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
      }}
    />
  );
};
