import React from "react";
import { RoutePermittedRole } from "shared/constants/AppEnums";

const ControlPointForm = React.lazy(() => import("./points/ControlPointForm"));
const ControlPoints = React.lazy(() => import("./points/ControlPoint"));
const QualityCheck = React.lazy(() => import("./checks/QualityCheck"));
const QualityCheckCreate = React.lazy(() =>
  import("./checks/QualityCheckForm")
);
const QualityTeam = React.lazy(() => import("./team/QualityTeamForm"));
const QualityTeamList = React.lazy(() => import("./team/QualityTeam"));
export const qualityControlConfigs = [
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/Quality/ControlPoints"],
    element: <ControlPoints />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/Quality/ControlPoints/workspace",
      "/Quality/ControlPoints/workspace/:id",
    ],
    element: <ControlPointForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/Quality/Check/workspace", "/Quality/Check/workspace/:id"],
    element: <QualityCheckCreate />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/Quality/Check"],
    element: <QualityCheck />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/Quality/Team"],
    element: <QualityTeamList />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/Quality/Team/workspace", "/Quality/Team/workspace/:id"],
    element: <QualityTeam />,
  },
];
