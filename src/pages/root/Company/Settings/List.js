import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { companyInfo } from "./Code";
import Branches from "../List/Branches";
export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const actionRef = useRef();
  const expandedRowRender = (rowdata) => {
    return <Branches rowdata={rowdata} />;
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      render: (p) => p.name,
    },
    {
      key: "taxationType",
      title: "Taxation Type",
      dataIndex: "taxationType",
      valueType: "select",
      request: async () => [
        { value: "GST", label: "GST" },
        { value: "Non GST", label: "Non GST" },
        {
          value: "Composition Scheme",
          label: "Composition Scheme",
        },
      ],
    },
    {
      key: "ntn",
      title: "NTN",
      dataIndex: "ntn",
    },
  ];

  return (
    <>
      <AppPageMetadata title={companyInfo.metaData} />
      <ProTableComponent
        codes={companyInfo}
        columns={columns}
        actionRef={actionRef}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        scroll={1000}
        expandedRowRender={expandedRowRender}
        otherParams={{ status: status }}
      />
    </>
  );
}
