import styled, { css } from "styled-components";

export const flex = css`
  display: flex;
  ${props => props.alignItems && `align-items: ${props.alignItems}`};
  ${props => props.alignContent && `align-content: ${props.alignContent}`};
  ${props =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};
  flex-direction: ${props => props.flexDirection || "row"};
  flex-wrap: ${props => props.flexWrap || "nowrap"};
`;

export const flexChild = css`
  flex: ${props => props.flex && props.flex};
  height: ${props => (props.height ? props.height : "auto")};
  width: ${props => (props.width ? props.width : "auto")};
`;

export const GridAncestor = styled.section`
  ${flex};
  width: 100%;
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
