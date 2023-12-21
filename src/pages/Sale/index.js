import React from "react";
import { RoutePermittedRole } from "shared/constants/AppEnums";

const Estimation = React.lazy(() => import("./Estimation"));
const Term = React.lazy(() => import("./TermCondition"));
const Enquiry = React.lazy(() => import("../Sale/Enquiry/CreateForm"));
const EstimationList = React.lazy(() => import("./Estimation/EstTable"));
const Dashboard = React.lazy(() => import("./dashboard"));
const Quotation = React.lazy(() => import("../Sale/Quotation"));
const DeliverChallanForm = React.lazy(() =>
  import("../Sale/DeliveryChallan/CreateForm")
);
const DeliveryChallan = React.lazy(() => import("../Sale/DeliveryChallan"));
const Create = React.lazy(() => import("../Sale/Quotation/Main"));
const EnquiryList = React.lazy(() => import("../Sale/Enquiry/List"));
const Preview = React.lazy(() => import("./Preview/techincal"));
const Summary = React.lazy(() => import("./Estimation/Summary"));
const EstTemplate = React.lazy(() => import("./Estimation/estTemplate"));
export const saleConfig = [
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/sales/sales-dashboard"],
    element: <Dashboard />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/sales/Enquiry/workspace",
      "/sales/Enquiry/workspace/:id",
      "/sales/Estimation/workspace",
      "/sales/Estimation/workspace/:id",
      "/sales/Quotation/workspace",
      "/sales/Quotation/workspace/:id",
    ],
    element: <Enquiry />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/sales/Enquiry"],
    element: <EnquiryList />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/sales/Estimation/workspaces/:id"],
    element: <Estimation />,
  },
  {
    permittedRole: RoutePermittedRole.estimation,
    path: ["/sales/Estimation"],
    element: <EstimationList />,
  },
  {
    permittedRole: RoutePermittedRole.estTempletes,
    path: ["/sales/Estimation-template"],
    element: <EstTemplate />,
  },
  {
    permittedRole: RoutePermittedRole.analytics,
    path: ["/sales/analytic", "/sales/analytic/:id"],
    element: <Summary />,
  },

  {
    permittedRole: RoutePermittedRole.quotation,
    path: ["/sales/Quotation"],
    element: <Quotation />,
  },
  {
    permittedRole: RoutePermittedRole.quotation,
    path: [
      "/sales/DeliveryChallan/workspace/:id",
      "/sales/DeliveryChallan/workspace",
    ],
    element: <DeliverChallanForm />,
  },
  {
    permittedRole: RoutePermittedRole.quotation,
    path: ["/sales/DeliveryChallan"],
    element: <DeliveryChallan />,
  },
  {
    permittedRole: RoutePermittedRole.quotation,
    path: ["/sales/Quotation/workspaces/:id"],
    element: <Create />,
  },
  {
    permittedRole: RoutePermittedRole.quotation,
    path: ["/sales/term-and-conditions"],
    element: <Term />,
  },
  {
    permittedRole: RoutePermittedRole.quotation,
    path: ["/sales/preview"],
    element: <Preview />,
  },
];
 