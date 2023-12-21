import { Tag } from "antd";
import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { dataInfo } from "./QCCodes";
export default function ListTable() {
  const columns = [
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (record) => {
        let color;
        switch (record) {
          case "Drafts":
            color = "red";
            break;
          case "Ready":
            color = "blue";
            break;
          case "Done":
            color = "green";
            break;
          case "Waiting":
            color = "yellow";
            break;
          default:
            color = "default";
        }
        return (
          <Tag color={color} key={record}>
            {record}
          </Tag>
        );
      },
    },
    {
      title: "Quality By",
      key: "customer",
      render: (_, key) => <span key={key._id}>{key.createdBy?.name}</span>,
    },
    {
      title: "P.O",
      key: "po",
      render: (e, r) => r.po?.cuId,
    },
    {
      title: "GateIn",
      key: "gateIn",
      render: (e, r) => r.gateIn?.cuId,
    },
    {
      title: "Quality At",
      key: "createdAt",
      dataIndex: "createdAt",
      valueType: "date",
    },
    {
      title: "Q.Status",
      key: "qualityCheckStatus",
      dataIndex: "qualityCheckStatus",
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <ProTableComponent
        codes={dataInfo}
        columns={columns}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"qualityCheckStatus"}
      />
    </>
  );
}
