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
  StyledAppLayoutMain,
  StyledMainScrollbar,
  StyledAppLayout,
} from "./index.styled";

const { useBreakpoint } = Grid;

const Default = () => {
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
    <StyledAppLayout
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar isCollapsed={isCollapsed} />
      <StyledAppLayoutMain className="app-layout-main">
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <StyledMainScrollbar>
          <AppContentView />
          <AppFooter />
        </StyledMainScrollbar>
      </StyledAppLayoutMain>
      <AppThemeSetting />
    </StyledAppLayout>
  );
};

export default React.memo(Default);
