import ProTableComponent from "meta/JLayouts/ProTable";
import React, { useState } from "react";
import LifeCycle from "./LifeCycle";
import { Space, Button, Tooltip } from "antd";
import { BackEnd_URL } from "meta/services/auth/jwt-api";
import { useLocation, useNavigate } from "react-router-dom";
import { usePermissions } from "meta/common/CheckPermission";
import { RoutePermittedRole } from "shared/constants/AppEnums";
const SaleTable = ({
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
}) => {
  const [search, setSearch] = useState("");
  const restTable = () => actionRef?.current?.reset();
  const { canCreate } = usePermissions(RoutePermittedRole.enquiry);
  return (
    <ProTableComponent
      dataPath={`${route}/prolist`}
      columns={columns}
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
      expandedRowRender={(record) => (
        <>
          Life cycle
          <LifeCycle record={record} />
          <br></br>
          {record.attachments?.length > 0 && (
            <>
              Attachments
              <iframe
                src={`${BackEnd_URL}${record?.attachments[0]?.url}`}
                width="100%"
                height="600"
              ></iframe>
            </>
          )}
        </>
      )}
      searchPlaceHolder="Search here"
      toolBarRender={() => (
        <Space wrap key={"toolbar"}>
          <Button
            key={"reset"}
            onClick={() => {
              restTable(), setSearch("");
            }}
          >
            Reset
          </Button>
        </Space>
      )}
    />
  );
};

export default SaleTable;
