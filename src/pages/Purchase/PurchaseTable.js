import React, { useState } from "react";
// import LifeCycle from "./LifeCycle";
import { Space, Button, Tooltip } from "antd";
import { BackEnd_URL } from "meta/services/auth/jwt-api";

import { usePermissions } from "meta/common/CheckPermission";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import ProTableWithoutFormLayout from "meta/JLayouts/ProTable/ProTableWithoutFormLayout";
const PurchaseTable = ({
  status,
  columns,
  actionRef,
  formTitle,
  otherParams,
  setTableData,
  route,
  proTitle,
  LogTitle,
  isNew,
  scroll,
}) => {
  const [search, setSearch] = useState("");
  const restTable = () => actionRef?.current?.reset();
  const { canCreate } = usePermissions(RoutePermittedRole.enquiry);
  return (
    <ProTableWithoutFormLayout
      dataPath={`${route}/prolist`}
      columns={columns}
      scroll={scroll}
      isNew={isNew}
      formTitle={formTitle}
      actionRef={actionRef}
      search={search}
      LogTitle={LogTitle}
      canCreate={canCreate}
      otherParams={otherParams}
      setSearch={setSearch}
      setTableData={setTableData}
      headerTitle={proTitle}
      menu={true}
      status={status}
      restTable={restTable}
      //   expandedRowRender={(record) => (
      //     <>
      //       Life cycle
      //       <LifeCycle record={record} />
      //       <br></br>
      //       {record.attachments?.length > 0 && (
      //         <>
      //           Attachments
      //           <iframe
      //             src={`${BackEnd_URL}${record?.attachments[0]?.url}`}
      //             width="100%"
      //             height="600"
      //           ></iframe>
      //         </>
      //       )}
      //     </>
      //   )}
      searchPlaceHolder="Search here"
   
    />
  );
};

export default PurchaseTable;
