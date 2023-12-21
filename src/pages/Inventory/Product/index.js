import React from "react";
import AppPageMetadata from "meta/core/AppPageMetadata";
import Table from "./Table";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { useGetData } from "meta/services/auth/ezAPI";
import { pInfo } from "./Code";

const TableMain = () => {
  const [{ apiData: makeList }] = useGetData(`erp/make/list`, []);

  return (
    <>
      <AppPageMetadata title={pInfo.metaData} />
      <Table makeList={makeList} />
    </>
  );
};

export default TableMain;
