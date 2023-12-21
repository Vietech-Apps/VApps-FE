import React from "react";
import { Navigate } from "react-router-dom";
import { RoutePermittedRole } from "shared/constants/AppEnums";

const Mail = React.lazy(() => import("./Mail"));
const Logs = React.lazy(() => import("./Logs"));
const ScrumBoard = React.lazy(() => import("./ScrumBoard"));
const Chat = React.lazy(() => import("./Chat"));
// const Wall = React.lazy(() => import("./Wall"));
const Customer = React.lazy(() => import("./Customers"));
const CreateCustomer = React.lazy(() => import("./Customers/Component/Create"));
const Todo = React.lazy(() => import("./ToDo"));
export const appsConfig = [
  {
    permittedRole: RoutePermittedRole.contacts,
    path: "/meta-workspace/contacts",
    element: <Customer />,
  },
  {
    permittedRole: RoutePermittedRole.contacts,
    path: "/apps/logs",
    element: <Logs />,
  },
  {
    permittedRole: RoutePermittedRole.contacts,
    path: [
      "/meta-workspace/contacts/workspace",
      "/meta-workspace/contacts/workspace/:id",
    ],
    element: <CreateCustomer />,
  },
  {
    path: [
      "/apps/mail/folder/:name",
      "/apps/mail/label/:name",
      "/apps/mail/compose",
      "/apps/mail/:name/:id",
    ],
    element: <Mail />,
  },
  {
    path: "/apps/mail",
    element: <Navigate to="/apps/mail/folder/inbox" />,
  },
  {
    path: [
      "/apps/todo/folder/:name",
      "/apps/todo/label/:name",
      "/apps/todo/process/:name",
      "/apps/todo/:name/:id",
    ],
    element: <Todo />,
  },
  {
    path: "/apps/todo",
    element: <Navigate to="/apps/todo/folder/all" />,
  },

  {
    path: ["/apps/scrum-board/:id", "/apps/scrum-board"],
    element: <ScrumBoard />,
  },
  {
    path: ["/apps/chat"],
    element: <Chat />,
  },
  // {
  //   path: ["/apps/wall"],
  //   element: <Wall />,
  // },
];
