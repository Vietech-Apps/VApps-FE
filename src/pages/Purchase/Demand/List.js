import { Tag } from "antd";
import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { dataInfo } from "./Codes";
export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
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
      title: "Approval",
      key: "approvedBy",
      render: (_, e) =>
        // <Avatar size="small"  src={e.approvedBy?.picture[0]?.url} />
        e.approvedBy?.name,
    },
    {
      title: "S.Document",
      key: "sourceDocument",
      dataIndex: "sourceDocument",
    },
    {
      title: "Date",
      key: "cuDate",
      dataIndex: "cuDate",
      valueType: "date",
    },
    {
      title: "Depart",
      key: "department",
      render: (_, e) => e.department?.title,
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
  ];

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <ProTableComponent
        codes={dataInfo}
        search={search}
        columns={columns}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        otherParams={{ status: status }}
      />
    </>
  );
}
