import { css } from "styled-components";

// sizes
export const small = "480px";
export const medium = "768px";
export const large = "1200px";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${props => props.flexDirection || "row"};
`;
