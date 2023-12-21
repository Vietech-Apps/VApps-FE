import { Checkbox, Space } from "antd";
import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios, { BackEnd_URL } from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useAuthUser } from "meta/utility/AuthHooks";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  LogTitle,
  deleteCode,
  formTitle,
  path,
  proTitle,
  route,
} from "./Codes";
import { usePermissions } from "meta/common/CheckPermission";
import { EyeOutlined } from "@ant-design/icons";
export default function ListTable() {
  const { user } = useAuthUser();
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const restTable = () => actionRef?.current?.reset();
  const delRowConfirm = async (record) => {
    record.removed = !record.removed;
    try {
      const response = await jwtAxios.patch(
        `${route}/disabled/${record?._id}`,
        {
          ...record,
        }
      );
      successHandler(response);
      refreshTable();
    } catch (error) {
      errorHandler(error);
    }
  };
  const navigate = useNavigate();
  const columns = [
    {
      title: "Id",
      key: "Id",
      dataIndex: "Id",
    },
    {
      title: "Journal Name",
      key: "journalName",
      dataIndex: "journalName",
    },

    {
      title: " Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Journal Groups",
      key: "journalGroups",
      dataIndex: "journalGroups",
    },
    {
      title: "Short Code",
      key: "shortCode",
      dataIndex: "shortCode",
    },
    {
      title: "Action",
      render: (_, e) => (
        <Space.Compact>
          <EyeOutlined onClick={() => navigate(`${path}/create/${e._id}`)} />
        </Space.Compact>
      ),
    },
  ];

  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

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
        refreshTable={refreshTable}
        LogTitle={LogTitle}
        canCreate={true}
        formTitle={formTitle}
        status={"status"}
        scroll={1400}
        searchPlaceHolder="Search here"
        otherParams={{ status: status }}
      />
    </>
  );
}
