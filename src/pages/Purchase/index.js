import React from "react";
import { RoutePermittedRole } from "shared/constants/AppEnums";

const RfqCreate = React.lazy(() => import("./RFQ/WorkSpace"));
const RfqList = React.lazy(() => import("./RFQ/List"));
//const Alerts = React.lazy(() => import("./Alerts"));
const Comparing = React.lazy(() => import("./RFQ/Comparing"));
const MaterialDemand = React.lazy(() => import("./Demand"));

const MaterialDemandForm = React.lazy(() => import("./Demand/Form"));
export const purchaseConfig = [
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/purchase/reqforquote/workspace/:id",
      "/purchase/reqforquote/workspace",
    ],
    element: <RfqCreate />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/purchase/reqforquote"],
    element: <RfqList />,
  },
  // {
  //   permittedRole: RoutePermittedRole.user,
  //   path: ["/Purchase/Alerts"],
  //   element: <Alerts />,
  // },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/Purchase/MaterialDemand"],
    element: <MaterialDemand />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/Purchase/MaterialDemand/workspace",
      "/Purchase/MaterialDemand/workspace/:id",
    ],
    element: <MaterialDemandForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/purchase/reqforquote/comparing/:id"],
    element: <Comparing />,
  },
];
