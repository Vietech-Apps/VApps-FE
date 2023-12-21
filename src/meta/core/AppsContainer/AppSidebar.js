import React from "react";
import PropTypes from "prop-types";
import { LayoutDirection } from "shared/constants/AppEnums";
import { useLayoutContext } from "../../utility/AppContextProvider/LayoutContextProvider";
import {
  StyledAppSidebar,
  StyledAppSidebarCard,
  StyledAppSidebarDrawer,
} from "./index.styled";

const AppSidebar = (props) => {
  const { isAppDrawerOpen, setAppDrawerOpen, sidebarContent } = props;
  const { direction } = useLayoutContext();

  return (
    <StyledAppSidebar>
      <StyledAppSidebarDrawer
        closeIcon={null}
        placement={direction === LayoutDirection.LTR ? "left" : "right"}
        open={isAppDrawerOpen}
        onClose={() => setAppDrawerOpen(!isAppDrawerOpen)}
      >
        {sidebarContent}
      </StyledAppSidebarDrawer>
      <StyledAppSidebarCard style={{ borderRadius: 16 }}>
        {sidebarContent}
      </StyledAppSidebarCard>
    </StyledAppSidebar>
  );
};

export default AppSidebar;
AppSidebar.propTypes = {
  setAppDrawerOpen: PropTypes.func,
  sidebarContent: PropTypes.node,
  isAppDrawerOpen: PropTypes.bool,
};
