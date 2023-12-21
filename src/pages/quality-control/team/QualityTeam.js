import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { dataInfo } from "./QTCodes";
export default function ListTable() {
  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "CreatedBy",
      key: "createdBy",
      render: (_, key) => <span key={key._id}>{key.createdBy?.name}</span>,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Status",
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
      />
    </>
  );
}
