import React from "react";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import {
  StyledFooterBtnView,
  StyledMainFooter,
  StyledFooterBtn,
} from "./AppFooter.styled";

const AppFooter = () => {
  const { footer } = useLayoutContext();

  if (footer) {
    return (
      <StyledMainFooter>
        <p>Copy right meta 2021</p>
        <StyledFooterBtnView>
          <StyledFooterBtn type="link" color="primary">
            Buy Now
          </StyledFooterBtn>
        </StyledFooterBtnView>
      </StyledMainFooter>
    );
  }
  return null;
};

export default AppFooter;
