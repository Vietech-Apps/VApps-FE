import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { dataInfo } from "./Codes";
export default function ListTable(date) {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const columns = [
    {
      title: "Payment Terms",
      key: "paymentTerms",
      dataIndex: "paymentTerms",
    },
    {
      title: "company",
      key: "Company",
      dataIndex: "Company",
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
