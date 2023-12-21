import React from "react";
import { RoutePermittedRole } from "shared/constants/AppEnums";

const Dashboard = React.lazy(() => import("./dashboard"));
const Gatein = React.lazy(() => import("./Gatein"));
const Gateout = React.lazy(() => import("./Gateout"));
const Gatesetting = React.lazy(() => import("./setting"));
const GateinForm = React.lazy(() => import("./Gatein/CreateForm"));
const GateOutForm = React.lazy(() => import("./Gateout/CreateForm"));

export const gatepassConfig = [
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/gatepass/gatedashboard"],
    element: <Dashboard />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/gatepass/GateIn/workspace", "/gatepass/GateIn/workspace/:id"],
    element: <GateinForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/gatepass/GateIn"],
    element: <Gatein />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/gatepass/GateOut"],
    element: <Gateout />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/gatepass/GateOut/workspace", "/gatepass/GateOut/workspace/:id"],
    element: <GateOutForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/gatepass/gate-setting"],
    element: <Gatesetting />,
  },
];
