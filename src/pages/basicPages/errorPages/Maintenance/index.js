import React from "react";
import { useNavigate } from "react-router-dom";
import IntlMessages from "meta/utility/IntlMessages";
import AppAnimate from "meta/core/AppAnimate";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { ReactComponent as Logo } from "assets/icon/maintenance.svg";
import {
  StyledErrorButton,
  StyledErrorContainer,
  StyledErrorContent,
  StyledErrorImageLg,
  StyledErrorPara,
} from "../index.styled";

const Maintenance = () => {
  const navigate = useNavigate();
  const onGoBackToHome = () => {
    navigate(-1);
  };

  return (
    <>
      <AppPageMetadata title="Maintenance" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledErrorContainer key="a">
          <StyledErrorImageLg>
            <Logo />
          </StyledErrorImageLg>
          <StyledErrorContent className="error-content-lg">
            <h3>
              <IntlMessages id="error.mantainanceMessage1" />
            </h3>
            <StyledErrorPara>
              <p className="mb-0">
                <IntlMessages id="error.mantainanceMessage2" />
              </p>
              <p className="mb-0">
                <IntlMessages id="error.mantainanceMessage3" />.
              </p>
            </StyledErrorPara>
            <StyledErrorButton type="primary" onClick={onGoBackToHome}>
              <IntlMessages id="error.takeMeToHome" />
            </StyledErrorButton>
          </StyledErrorContent>
        </StyledErrorContainer>
      </AppAnimate>
    </>
  );
};

export default Maintenance;
