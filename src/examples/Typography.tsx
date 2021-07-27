import styled from "styled-components";
import { styled as tonamiStyled } from "tonami";
import React, { useEffect, useState } from "react";
import { Columns, Highlight } from "../components";
import { styled as s } from "goober";

const scale = 1.25;
const base = 18;

const TypographySC = styled.span<{ size: number }>`
  font-size: ${({ size = 0 }) => Math.pow(scale, size) * base + "px"};
`;

const TypographyT = tonamiStyled.span<{ $size: number }>({
  fontSize: ({ $size }) => Math.pow(scale, $size) * base + "px"
});

const Protect = s("div")`width: 100%; overflow-x: hidden;`;

export default function Typography({ cb }: { cb: () => any }) {
  const [size, setSize] = useState(0);
  useEffect(cb, []);
  return (
    <div className="grid">
      <h2>Typography Component</h2>
      <p>Try altering the text size with the slider</p>
      <input
        type="range"
        min={-1}
        value={size}
        max={4}
        onChange={(e) => setSize(parseInt(e.target.value, 10))}
      />
      <Columns>
        <div className="grid">
          <h3>Styled Components</h3>
          <Highlight
            language={"tsx"}
          >{`const TypographySC = styled.span<{ size: number }>\`
  font-size: \${({ size = 0 }) => Math.pow(scale, size) * base + "px"};
\`;`}</Highlight>
          <Protect>
            <TypographySC size={size}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              magni doloribus unde quas tenetur, blanditiis illo sint
              dignissimos! Fugiat temporibus repellat est quos similique ducimus
              adipisci sed et culpa voluptas.
            </TypographySC>
          </Protect>
        </div>
        <div className="grid">
          <h3>Tonami</h3>
          <Highlight
            language={"tsx"}
          >{`const TypographyT = tonamiStyled.span<{ $size: number }>({
  fontSize: ({ $size }) => Math.pow(scale, $size) * base + "px"
});`}</Highlight>
          <Protect>
            <TypographyT $size={size}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              magni doloribus unde quas tenetur, blanditiis illo sint
              dignissimos! Fugiat temporibus repellat est quos similique ducimus
              adipisci sed et culpa voluptas.
            </TypographyT>
          </Protect>
        </div>
      </Columns>
    </div>
  );
}
