import { Button, Switch, Tooltip } from "antd";
import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { dataInfo } from "./Codes";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { AiOutlineEye } from "react-icons/ai";
export default function ListTable() {
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

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <ProTableComponent
        codes={dataInfo}
        columns={columns}
        search={search}
        extra={
          <Tooltip title="View">
            <Button
              key={"edit"}
              icon={<AiOutlineEye />}
              type="text"
              onClick={() => navigate(`/reports/chartOfAccounts`)}
            >
              Details
            </Button>
          </Tooltip>
        }
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        otherParams={{ status: status, selectAble: true }}
      />
    </>
  );
}
