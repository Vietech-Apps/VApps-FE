import React, { useEffect, useState } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { AppContentView } from "../../../index";
import AppFooter from "../components/AppFooter";
import clsx from "clsx";
import { FooterType, LayoutType } from "shared/constants/AppEnums";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import {
  StyledAppLayoutHeaderFixedMain,
  StyledAppLayoutHorFixed,
  StyledContainer,
} from "./index.styled";

const HorHeaderFixed = () => {
  const [isVisible, setVisible] = useState(false);
  const { footer, footerType, layoutType } = useLayoutContext();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (layoutType === LayoutType.FRAMED) {
      document.body.classList.add("framedHorHeaderFixedLayout");
    } else {
      document.body.classList.remove("framedHorHeaderFixedLayout");
    }
  }, [layoutType]);

  return (
    <StyledAppLayoutHorFixed
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar visible={isVisible} onClose={onClose} />
      <AppHeader showDrawer={showDrawer} />
      <StyledAppLayoutHeaderFixedMain>
        <StyledContainer className="container-set-body">
          <AppContentView />
          <AppFooter />
        </StyledContainer>
      </StyledAppLayoutHeaderFixedMain>
    </StyledAppLayoutHorFixed>
  );
};

export default HorHeaderFixed;
