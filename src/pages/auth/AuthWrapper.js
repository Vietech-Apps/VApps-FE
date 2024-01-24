import React from "react";
import PropTypes from "prop-types";
import AppAnimateGroup from "meta/core/AppAnimateGroup";
import { AppInfoView } from "meta";
import AppLogo from "meta/core/AppLayout/components/AppLogo";
import {
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap,
} from "./AuthWrapper.styled";
import moment from "moment";

const AuthWrapper = ({ children }) => {
  const array = [
    "Streamline your operations, eliminate paperwork, and thrive in the digital era with Vapps.",
    "Experience the power of streamlined processes, simplified workflows, and unrivaled success with Vapps.",
    "Join the movement towards a paperless future and boost your organization's productivity with Vapps.",
    "Say goodbye to inefficient processes and unnecessary paperwork; Vapps optimizes your workflow for maximum productivity.",
    "Unlock the potential of a paperless office and achieve unparalleled success with Vapps as your digital ally.",
    "Harness the power of Vapps to transform your organization into a highly productive force in the business world.",
    "Drive innovation, reduce environmental impact, and create a better future with Vapps as your technological partner.",
    "Seamlessly integrate your processes, eliminate paper-based bottlenecks, and experience unparalleled efficiency with Vapps",
    "Unleash the full potential of efficiency within your organization with the comprehensive capabilities of Vapps.",
    "Stay ahead of the competition by embracing the future of productivity through Vapps' innovative ERP solutions.",
  ];
  function getDateNumber(date) {
    var day = date.getDate();

    if (day <= 10) {
      return array[day];
    } else {
      var remainder = day % 10;
      if (remainder === 0) {
        return 10;
      } else {
        return array[remainder];
      }
    }
  }
  const date = new Date();
  const slogan = getDateNumber(date);
  console.log(slogan);
  return (
    <AppAnimateGroup
      type="scale"
      animateStyle={{ flex: 1 }}
      delay={0}
      interval={10}
      duration={200}
    >
      <StyledAuthWrap key={"wrap"}>
        <StyledAuthCard>
          <StyledAuthMainContent>
            {/* <StyledUpperLayer /> */}
            <StyledAuthCardHeader></StyledAuthCardHeader>
            {children}
            {/* <StyledLowerLayer /> */}
          </StyledAuthMainContent>
          <StyledAuthWellAction>
            <StyledAuthWelContent className="flex flex-col items-center justify-center text-center">
              <AppLogo />
              <p className="">
                Integrated Business & Compliance <b>Apps</b>
              </p>
              <small className="mt-2">{slogan}</small>
              <h className="mt-8 text-lg font-semibold">
                VieTech (Private) Limited
              </h>
              <a>+92 321 0404042</a>
              <div className="flex space-x-2">
                <a href="https://www.vietech.pro/">www.vietech.pro</a>
                <a href="https://www.vapps.click/">www.vapps.click</a>
              </div>
            </StyledAuthWelContent>
          </StyledAuthWellAction>
        </StyledAuthCard>
      </StyledAuthWrap>

      <AppInfoView />
    </AppAnimateGroup>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
