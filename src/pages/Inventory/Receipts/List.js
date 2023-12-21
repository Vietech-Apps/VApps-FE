import { Tag } from "antd";
import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useRef, useState } from "react";
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
      title: "Vendor",
      key: "vendor",
      render: (_, r) => r.vendor?.title,
    },
    {
      title: "Source",
      key: "type",
      render: (_, r) => r.po?.cuId,
    },

    {
      title: "Scheduled Date",
      key: "team",
      dataIndex: "scheduledDate",
      valueType: "date",
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
        status={"status"}
        otherParams={{ status: status }}
      />
    </>
  );
}
