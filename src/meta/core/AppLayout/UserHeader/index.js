import React, { useEffect, useState } from "react";
import { Grid } from "antd";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { AppContentView } from "../../../index";
import AppThemeSetting from "../../AppThemeSetting";
import AppFooter from "../components/AppFooter";
import clsx from "clsx";
import { FooterType } from "shared/constants/AppEnums";
import { isEmpty } from "../../../utility/GlobalHelper";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import {
  StyledAppLayoutUserHeader,
  StyledAppLayoutUserHeaderMain,
  StyledUserHeaderMainScrollbar,
} from "./index.styled";

const { useBreakpoint } = Grid;

const UserHeader = () => {
  const width = useBreakpoint();
  const [isCollapsed, setCollapsed] = useState(false);
  const { footer, footerType } = useLayoutContext();

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!isEmpty(width)) {
      if (width.xl) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
  }, [width]);

  return (
    <StyledAppLayoutUserHeader
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar isCollapsed={isCollapsed} />
      <StyledAppLayoutUserHeaderMain className="app-layout-userHeader-main">
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <StyledUserHeaderMainScrollbar>
          <AppContentView />
          <AppFooter />
        </StyledUserHeaderMainScrollbar>
      </StyledAppLayoutUserHeaderMain>
      <AppThemeSetting />
    </StyledAppLayoutUserHeader>
  );
};

export default React.memo(UserHeader);
