import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from "styled-components";

const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background: #212121;
`;
const FullPageLoader = () => {
  return (
    <StyledLoader className="fullpage-loader">
      <Loader type="BallTriangle" color="#29AD44" height={100} width={100} />
    </StyledLoader>
  );
};

export default FullPageLoader;
