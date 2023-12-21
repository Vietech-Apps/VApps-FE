import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import clsx from "clsx";
import AppVerticalMenu from "../components/AppVerticalNav";
import { LayoutDirection } from "shared/constants/AppEnums";
import { useSidebarContext } from "../../../utility/AppContextProvider/SidebarContextProvider";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import {
  StyledAppHeaderDrawerFixed,
  StyledAppHorHeaderFixedSidebar,
  StyledAppHorScrollbar,
} from "./index.styled";

const AppSidebar = ({ visible, onClose }) => {
  const { isSidebarBgImage } = useSidebarContext();
  const { direction } = useLayoutContext();
  const { pathname } = useLocation();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <StyledAppHeaderDrawerFixed
      placement={direction === LayoutDirection.LTR ? "left" : "right"}
      closable={false}
      onClose={onClose}
      open={visible}
    >
      <StyledAppHorHeaderFixedSidebar
        className={clsx({
          "hor-header-fixed-sidebar-img-background": isSidebarBgImage,
        })}
        collapsible
      >
        <UserInfo />
        <StyledAppHorScrollbar scrollToTop={false}>
          <AppVerticalMenu />
        </StyledAppHorScrollbar>
      </StyledAppHorHeaderFixedSidebar>
    </StyledAppHeaderDrawerFixed>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
