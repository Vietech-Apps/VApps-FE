import {
  CheckCircleTwoTone,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";

import { Avatar, Button, Image, Popconfirm, Space, Tooltip } from "antd";
import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios, { BackEnd_URL } from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useAuthUser } from "meta/utility/AuthHooks";
import { StyledOrderId } from "pages/root/Company/List/index.styled";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogTitle, deleteCode, formTitle, proTitle, route } from "./Codes";
import { usePermissions } from "meta/common/CheckPermission";
export default function ListTable() {
  const { user } = useAuthUser();
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const restTable = () => actionRef?.current?.reset();
  const delRowConfirm = async (record) => {
    record.removed = !record.removed;
    try {
      const response = await jwtAxios.patch(`${route}/disabled/${record._id}`, {
        ...record,
      });
      successHandler(response);
      refreshTable();
    } catch (error) {
      errorHandler(error);
    }
  };
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "cuId",
      width: 120,
      key: "id",
      fixed: "left",
      render: (Id) => <StyledOrderId>{Id}</StyledOrderId>,
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "operations",
      key: "operations",
      dataIndex: "operations",
    },
    {
      title: "team",
      key: "team",
      // render: (_, e) => e.team?.title,
    },
    {
      title: "controlPer",
      key: "controlPer",
      // render: (_, e) => e.operations.map((d) => d),
    },

    {
      title: "CreatedBy",
      key: "createdBy",
      render: (_, key) => <span key={key._id}>{key.createdBy?.name}</span>,
    },

    {
      title: "Action",
      valueType: "option",
      key: "option",
      width: 110,
      fixed: "right",
      render: (text, record, _, action) => (
        <Space>
          <Popconfirm
            key="del"
            placement="left"
            title="Are you sure!"
            onConfirm={() => delRowConfirm(record)}
          >
            {user?.power?.indexOf(deleteCode) > -1 &&
              (record.removed == true ? (
                <StopOutlined key="delete" style={{ color: "red" }} />
              ) : (
                <CheckCircleTwoTone key="delete" />
              ))}
          </Popconfirm>
          <EditOutlined
            key={"edit"}
            onClick={() => navigate(`${pathname}/create/${record._id}`)}
          />

          {/* <EyeOutlined
            key={"view"}
            onClick={() => navigate(`${pathname}/${record._id}`)}
          /> */}
        </Space>
      ),
    },
  ];

  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const { canUpdate, canDelete, canCreate } = usePermissions(
    RoutePermittedRole.gatein
  );
  return (
    <>
      <AppPageMetadata title={proTitle} />
      <ProTableComponent
        dataPath={`${route}/prolist`}
        columns={columns}
        actionRef={actionRef}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        headerTitle={proTitle}
        menu={true}
        LogTitle={LogTitle}
        canCreate={canCreate}
        formTitle={formTitle}
        status={"grnStatus"}
        scroll={1300}
        searchPlaceHolder="Search here"
      />
    </>
  );
}
