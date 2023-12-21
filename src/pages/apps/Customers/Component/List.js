import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import {  useSearchParams } from "react-router-dom";
import { contactInfo } from "./Code";
import { useState } from "react";

export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Country",
      ellipsis: true,
      dataIndex: "country",
      key: "Country",
    },
  ];

  return (
    <>
      <AppPageMetadata title={contactInfo.metaData} />
      <ProTableComponent
        codes={contactInfo} // Added codes prop
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
