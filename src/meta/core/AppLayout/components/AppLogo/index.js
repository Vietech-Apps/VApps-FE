import React from "react";
import PropTypes from "prop-types";
import { useSidebarContext } from "../../../../utility/AppContextProvider/SidebarContextProvider";
import { StyledAppLogo } from "./index.styled";
import { StyledMsgAvatar } from "meta/core/AppHeaderMessages/MessageItem.styled";

const AppLogo = ({ hasSidebarColor }) => {
  const { sidebarColorSet } = useSidebarContext();
  return (
    <StyledAppLogo>
      {hasSidebarColor && sidebarColorSet.mode === "dark" ? (
        <img
          style={{ height: "100px" }}
          className="mt-5 mb-3"
          src="/assets/images/logos/vapps.png"
        />
      ) : (
        <img
          style={{ height: "100px" }}
          className="mt-5 mb-3"
          src="/assets/images/logos/vapps.png"
        />
      )}
    </StyledAppLogo>
  );
};

export default AppLogo;

AppLogo.propTypes = {
  hasSidebarColor: PropTypes.bool,
};
