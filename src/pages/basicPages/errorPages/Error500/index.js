import React from "react";
import { useNavigate } from "react-router-dom";
import IntlMessages from "meta/utility/IntlMessages";
import AppAnimate from "meta/core/AppAnimate";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { ReactComponent as Logo } from "assets/icon/500.svg";
import {
  StyledErrorButton,
  StyledErrorContainer,
  StyledErrorContent,
  StyledErrorImage,
  StyledErrorPara,
} from "../index.styled";

const Error500 = () => {
  const navigate = useNavigate();
  const onGoBackToHome = () => {
    navigate(-1);
  };

  return (
    <>
      <AppPageMetadata title="Server Error" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledErrorContainer key="a">
          <StyledErrorImage>
            <Logo />
          </StyledErrorImage>
          <StyledErrorContent>
            <h3>
              <IntlMessages id="error.500Error" />.
            </h3>
            <StyledErrorPara>
              <p className="mb-0">
                <IntlMessages id="error.500Message1" />
              </p>
              <p className="mb-0">
                <IntlMessages id="error.500Message2" />
              </p>
            </StyledErrorPara>
            <StyledErrorButton type="primary" onClick={onGoBackToHome}>
              <IntlMessages id="error.goBackToHome" />
            </StyledErrorButton>
          </StyledErrorContent>
        </StyledErrorContainer>
      </AppAnimate>
    </>
  );
};

export default Error500;
