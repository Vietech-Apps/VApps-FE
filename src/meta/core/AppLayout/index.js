import React, { useEffect } from "react";
import { useUrlSearchParams } from "use-url-search-params";
import { AppContentView } from "../../index";
import Layouts from "./Layouts";
import { LayoutType } from "shared/constants/AppEnums";
import {
  useLayoutActionsContext,
  useLayoutContext,
} from "../../utility/AppContextProvider/LayoutContextProvider";
import { useAuthUser } from "../../utility/AuthHooks";
import { useSidebarActionsContext } from "../../utility/AppContextProvider/SidebarContextProvider";
import { StyledAuth, StyledMainAuthScrollbar } from "./index.styled";

const AppLayout = () => {
  const { isAuthenticated } = useAuthUser();
  const { navStyle, layoutType } = useLayoutContext();
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const [params] = useUrlSearchParams();

  const AppLayout = Layouts[navStyle];

  useEffect(() => {
    if (layoutType === LayoutType.BOXED) {
      document.body.classList.add("boxedLayout");
      document.body.classList.remove("framedLayout");
    } else if (layoutType === LayoutType.FRAMED) {
      document.body.classList.remove("boxedLayout");
      document.body.classList.add("framedLayout");
    } else {
      document.body.classList.remove("boxedLayout");
      document.body.classList.remove("framedLayout");
    }
  }, [layoutType]);

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout);
    if (params.menuStyle) updateMenuStyle(params.menuStyle);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, []);

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <AppLayout />
      ) : (
        <StyledAuth>
          <StyledMainAuthScrollbar>
            <AppContentView />
          </StyledMainAuthScrollbar>
        </StyledAuth>
      )}
    </React.Fragment>
  );
};

export default React.memo(AppLayout);
