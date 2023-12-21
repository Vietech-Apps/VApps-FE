import React from "react";
import { dashboardConfig } from "./dashboard";
import { errorPagesConfigs } from "./basicPages/errorPages";
import { authRouteConfig } from "./auth";
import { initialUrl } from "../shared/constants/AppConst";
import { extraPagesConfigs } from "./basicPages/extraPages";
import { userPagesConfig } from "./basicPages/userPages";
import { appsConfig } from "./apps";
import { rootConfig } from "./root";
import Error403 from "./basicPages/errorPages/Error403";
import { Navigate } from "react-router-dom";
import { gatepassConfig } from "./Gatepass";
import { saleConfig } from "./Sale";
import { invConfigs } from "./Inventory";
import { purchaseConfig } from "./Purchase";
import { qualityControlConfigs } from "./quality-control";
import { accConfigs } from "./Accounts";

const authorizedStructure = {
  fallbackPath: "/signin",
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashboardConfig,
    ...extraPagesConfigs,
    ...accConfigs,
    ...userPagesConfig,
    ...appsConfig,
    ...purchaseConfig,
    ...rootConfig,
    ...gatepassConfig,
    ...saleConfig,
    ...invConfigs,
    ...qualityControlConfigs,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: "/",
      element: <Navigate to={initialUrl} />,
    },
    {
      path: "*",
      element: <Navigate to="/page-not-found/er-404" />,
    },
  ]),
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
