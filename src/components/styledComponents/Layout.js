import React from "react";
import styled, { css } from "styled-components";

export const flex = css`
  display: flex;
  ${props => props.alignItems && `align-items: ${props.alignItems}`};
  ${props => props.alignContent && `align-content: ${props.alignContent}`};
  ${props =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};
  flex-direction: ${props => props.flexDirection || "row"};
  flex-wrap: ${props => props.flexWrap || "no-wrap"};
`;

export const flexChild = css`
  flex: ${props => props.flex && props.flex};
`;

export const GridAncestor = styled.section`
  ${flex};
`;

export const GridParentChild = styled.div`
  ${flex}
  ${flexChild}
`;

export const GridChild = styled.div`
  ${flexChild}
`;

// ${props =>
//   props.addGrid && (props.gridRows || props.gridColumn)
//     ? `grid-template-rows: ${props.gridRows}; grid-template-columns: ${props.gridColumns}`
//     : ""};
