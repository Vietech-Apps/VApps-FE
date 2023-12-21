import React from "react";
import AppPageMetadata from "meta/core/AppPageMetadata";
import Table from "./Table";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { useGetData } from "meta/services/auth/ezAPI";

const TableMain = () => {
  const mainRoute = "erp/Warehouse";
  const moduleName = RoutePermittedRole.Warehouse;
  const [{ apiData: makeList }] = useGetData(`erp/make/list`, []);

  return (
    <>
      <AppPageMetadata title={moduleName} />
      <Table />
    </>
  );
};

export default TableMain;
