import React from "react";
import { RoutePermittedRole } from "shared/constants/AppEnums";
const Process = React.lazy(() => import("./Employee/Process"));
const Designation = React.lazy(() => import("./Employee/Designation"));
const Employees = React.lazy(() => import("./Employee/Employee/List"));
const EmployeesCreate = React.lazy(() =>
  import("./Employee/Employee/CreateEmployee")
);
const Events = React.lazy(() => import("./Workspace"));
const MyDashboard = React.lazy(() => import("./MyDashboard"));
const AdminDashboard = React.lazy(() => import("./AdminDashboard"));
const Venue = React.lazy(() => import("./Workspace/Venue"));
const Role = React.lazy(() => import("./Employee/Role/CreateForm"));
const RoleList = React.lazy(() => import("./Employee/Role/List"));
const CompanyNList = React.lazy(() => import("./Company/Settings"));
const CompanyN = React.lazy(() => import("./Company/Settings/MainForm"));
export const rootConfig = [
  {
    permittedRole: RoutePermittedRole.admin,
    path: ["/admin/company-setting"],
    element: <CompanyNList />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: [
      "/admin/company-setting/workspace",
      "/admin/company-setting/workspace/:id",
    ],
    element: <CompanyN />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/admin/employees/permission",
    element: <RoleList />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/admin/employees/permission/workspace",
      "/admin/employees/permission/workspace/:id",
    ],
    element: <Role />,
  },

  {
    permittedRole: RoutePermittedRole.events,
    path: ["/meta-workspace/event-management"],
    element: <Events />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/insights/vapps-dashboard"],
    element: <MyDashboard />,
  },
  {
    permittedRole: RoutePermittedRole.mainDashboard,
    path: ["/meta-workspace/admin-pannel"],
    element: <AdminDashboard />,
  },

  {
    permittedRole: RoutePermittedRole.department,
    path: "/admin/employees/process",
    element: <Process />,
  },
  {
    permittedRole: RoutePermittedRole.venues,
    path: "/admin/setting/venue",
    element: <Venue />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/admin/employees/designation",
    element: <Designation />,
  },
  {
    permittedRole: RoutePermittedRole.employee,
    path: "/apps/employees/employee",
    element: <Employees />,
  },

  {
    permittedRole: RoutePermittedRole.admin,
    path: [
      "/apps/employees/employee/workspace",
      "/apps/employees/employee/workspace/:id",
      "/employee/profile/:id",
    ],
    element: <EmployeesCreate />,
  },
];
