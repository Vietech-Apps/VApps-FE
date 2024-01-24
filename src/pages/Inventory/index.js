import React from "react";
import { RoutePermittedRole } from "shared/constants/AppEnums";

// Lazily import React components for dynamic loading
const Product = React.lazy(() => import("./Product"));
const ImportProducts = React.lazy(() => import("./Import"));
const Create = React.lazy(() => import("./Product/Forms"));
const WareHouse = React.lazy(() => import("./Warehouse"));
const WareHouseForm = React.lazy(() => import("./Warehouse/Forms"));
const Bin = React.lazy(() => import("./bin"));
const WareHouseSetting = React.lazy(() => import("./Setting"));
const BinForm = React.lazy(() => import("./bin/Forms"));

const Receipts = React.lazy(() => import("./Receipts"));
const UOM = React.lazy(() => import("./UOM"));
const UOMForm = React.lazy(() => import("./UOM/CreateForm"));
const ReceiptForm = React.lazy(() => import("./Receipts/ReceiptForm"));
// const PCatForm = React.lazy(() => import("./Category/ReceiptForm"));
// const PCategory = React.lazy(() => import("./Category"));
//const Alerts = React.lazy(() => import("./Alerts"));

/**
 * Configuration for inventory module routes.
 * @typedef {Object} InvConfig
 * @property {RoutePermittedRole} permittedRole - The permitted role for accessing the route.
 * @property {string|string[]} path - The path or array of paths for the route.
 * @property {React.Component} element - The React component to be rendered for the route.
 */

/**
 * Array of inventory module route configurations.
 * @type {InvConfig[]}
 */
export const invConfigs = [
  {
    permittedRole: RoutePermittedRole.user,
    path: "/Inventory/Receipts",
    element: <Receipts />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/Inventory/uom",
    element: <UOM />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/Inventory/uom/workspace", "/Inventory/uom/workspace/:id"],
    element: <UOMForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/Inventory/Receipts/workspace",
      "/Inventory/Receipts/workspace/:id",
    ],
    element: <ReceiptForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/inventory/products",
    element: <Product />,
  },
  // {
  //   permittedRole: RoutePermittedRole.user,
  //   path: "/Inventory/Alerts",
  //   element: <Alerts />,
  // },
  // {
  //   permittedRole: RoutePermittedRole.user,
  //   path: "/Inventory/productcategory",
  //   element: <PCategory />,
  // },
  // {
  //   permittedRole: RoutePermittedRole.user,
  //   path: [
  //     "/Inventory/productcategory/workspace",
  //     "/Inventory/productcategory/workspace/:id",
  //   ],
  //   element: <PCatForm />,
  // },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/inventory/products/import",
    element: <ImportProducts />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/inventory/products/workspace",
      "/inventory/products/workspace/:id",
    ],
    element: <Create />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/inventory/warehouse",
    element: <WareHouse />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/inventory/warehouseSetting",
    element: <WareHouseSetting />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/inventory/warehouse/workspace",
      "/inventory/warehouse/workspace/:id",
    ],
    element: <WareHouseForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/inventory/binlocations",
    element: <Bin />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/inventory/binlocations/workspace",
      "/inventory/binlocations/workspace/:id",
    ],
    element: <BinForm />,
  },
];
