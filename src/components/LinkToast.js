import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
  padding-left: 0.2rem;
  text-decoration: none;
`;
const LinkToast = () => {
  return (
    <div>
      Token expired, please<StyledLink to="/">login</StyledLink>
    </div>
  );
};
export default withRouter(LinkToast);
