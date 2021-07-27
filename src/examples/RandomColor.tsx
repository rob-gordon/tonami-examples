import styled from "styled-components";
import { styled as tonamiStyled } from "tonami";
import React, { useEffect, useReducer } from "react";
import { BigButton, Columns, Highlight } from "../components";

const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padEnd(6, "0");

const BoxSC = styled.div<{ col: string }>`
  padding: 20px;
  background-color: ${(props) => props.col};
`;

const BoxT = tonamiStyled.div<{ $col: string }>({
  padding: "20px",
  backgroundColor: ({ $col }) => $col
});

export default function RandomColor({ cb }: { cb: () => any }) {
  const [color, newColor] = useReducer(randomColor, randomColor());
  useEffect(cb, []);
  return (
    <div className="grid">
      <h2>Random Color</h2>
      <p>
        Click the button below to choose a random color. Watch the styles in
        each libraries tag.
      </p>
      <BigButton onClick={newColor}>Toggle Color</BigButton>
      <Columns>
        <div className="grid">
          <h3>Styled Components</h3>
          <Highlight
            language={"tsx"}
          >{`const Box = styled.div<{ col: string }>\`
  background-color: \${(props) => props.col};
\`;`}</Highlight>
          <BoxSC col={color}>Test</BoxSC>
        </div>
        <div className="grid">
          <h3>Tonami</h3>
          <Highlight
            language={"tsx"}
          >{`const Box = styled.div<{ $col: string }>({
  backgroundColor: ({ $col }) => $col
});`}</Highlight>
          <BoxT $col={color}>Test</BoxT>
        </div>
      </Columns>
    </div>
  );
}
