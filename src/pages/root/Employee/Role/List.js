import { CheckOutlined, CloseOutlined, StopOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { roleInfo } from "./Code";

export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },

    {
      title: "Restricted",
      key: "isBound",
      dataIndex: "isBound",
      render: (Id) => (
        <Switch
          checked={Id}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      ),
    },
    {
      title: "Detail",
      key: "detail",
      dataIndex: "detail",
      valueType: "string",
      ellipsis: true,
    },
  ];

  return (
    <>
      <AppPageMetadata title={roleInfo.metaData} />
      <ProTableComponent
        codes={roleInfo}
        columns={columns}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        otherParams={{ status: status }}
      />
    </>
  );
}
