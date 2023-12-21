import { Checkbox, Switch, Tooltip } from "antd";
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
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
export default function ListTable() {
  const { user } = useAuthUser();
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const options = [
    {
      label: "Assets(Receivable)",
      value: "11",
    },
    {
      label: "Assets(Bank & Cash)",
      value: "12",
    },
    {
      label: "Assets(Current Assets)",
      value: "13",
    },
    {
      label: "Assets(Non-current Assets)",
      value: "14",
    },
    {
      label: "Assets(Fixed Assets)",
      value: "15",
    },
    {
      label: "Assets(Prepayments)",
      value: "16",
    },

    {
      label: "Liabilities(Payable)",
      value: "21",
    },
    {
      label: "Liabilities(Current Liabilities)",
      value: "22",
    },
    {
      label: "Liabilities(Non-current Liabilities)",
      value: "23",
    },
    {
      label: "Equity(Equity)",
      value: "31",
    },
    {
      label: "Equity(Accumulated Profit)",
      value: "32",
    },
    {
      label: "Equity(Share Capital)",
      value: "33",
    },
    {
      label: "Income(Income)",
      value: "41",
    },
    {
      label: "Income(Other Income)",
      value: "42",
    },
    {
      label: "Expense(Expense)",
      value: "51",
    },
    {
      label: "Expense(Depreciation)",
      value: "52",
    },
    {
      label: "Expense(Cost Of Revenue)",
      value: "53",
    },
  ];
  function getCascaderNames(cascaderArray) {
    let names = [];
    for (let doc of cascaderArray) {
      if (doc && doc.name) {
        names.push(doc.name);
      }
    }
    return names.join("/");
  }

  const getLabelByValue = (value) => {
    const option = options.find((option) => option.value === value);
    return option ? option.label : null;
  };
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
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Account Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Allow Reconciliation",
      key: "allowReconciliation",
      dataIndex: "allowReconciliation",
      render: (active) => {
        return (
          <Switch
            checked={active}
            size="small"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );
      },
    },
    {
      title: "Type",
      key: "accountCategory",
      dataIndex: "accountCategory",
      render: (value, doc) => {
        return (
          <Tooltip title={getCascaderNames(doc.cascader)}>
            {getLabelByValue(value)}
          </Tooltip>
        );
      },
    },

    {
      title: "Parent",
      key: "cascader",
      dataIndex: "cascader",
      render: (value) => {
        return getCascaderNames(value);
      },
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
        otherParams={{ status: status, selectAble: true }}
      />
    </>
  );
}
