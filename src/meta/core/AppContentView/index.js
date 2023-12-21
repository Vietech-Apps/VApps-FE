import React from "react";
import { AppSuspense } from "../../index";
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from "../../../pages";
import AppErrorBoundary from "../AppErrorBoundary";
import generateRoutes from "../../utility/RouteGenerator";
import { useAuthUser } from "../../utility/AuthHooks";
import { StyledMainContentView } from "./index.styled";

const AppContentView = () => {
  const { user, isAuthenticated } = useAuthUser();
  return (
    <StyledMainContentView>
      <AppSuspense>
        <AppErrorBoundary>
          {generateRoutes({
            isAuthenticated: isAuthenticated,
            userRole: user?.power,
            isAdmin: user?.isAdmin,
            unAuthorizedStructure,
            authorizedStructure,
            anonymousStructure,
          })}
        </AppErrorBoundary>
      </AppSuspense>
    </StyledMainContentView>
  );
};

export default AppContentView;
