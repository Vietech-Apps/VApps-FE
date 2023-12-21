import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { dataInfo } from "./CPCodes";
export default function ListTable() {
  const columns = [
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
      render: (_, e) => e.team?.title,
    },
    {
      title: "controlPer",
      key: "controlPer",
      render: (_, e) => e.operations.map((d) => d),
    },
    {
      title: "responsible",
      key: "responsible",
      render: (_, key) => <span key={key._id}>{key.responsible?.name}</span>,
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
