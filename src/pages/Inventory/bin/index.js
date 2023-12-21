import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";

import { StyledOrderId } from "pages/root/Company/List/index.styled";
import { useRef, useState } from "react";
import { dataInfo } from "./Codes";

export default function ListTable() {
  const columns = [
    {
      title: "Short Code",
      dataIndex: "binLocationCode",
      width: 160,
      key: "binLocationCode",
      fixed: "left",
      copyable: true,
      render: (Id) => <StyledOrderId>{Id}</StyledOrderId>,
    },
    {
      title: "Weight(Kg)",
      key: "itemWeight",
      width: 60,
      dataIndex: "itemWeight",
      ellipsis: true,
    },

    {
      title: "Qty",
      dataIndex: "itemQty",
      key: "itemQty",
      width: 50,
      valueType: "number",
      hideInSearch: true,
    },
    {
      title: "Mix",
      dataIndex: "minimumQty",
      key: "minimumQty",
      width: 50,
      valueType: "number",
      hideInSearch: true,
    },
    {
      title: "Max",
      dataIndex: "maximumQty",
      key: "maximumQty",
      width: 50,
      valueType: "number",
      hideInSearch: true,
    },
    {
      title: "Detail",
      key: "detail",
      dataIndex: "description",
      valueType: "string",
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: "Altr.Code",
      key: "alternativeShortCode",
      dataIndex: "alternativeShortCode",
      valueType: "string",
      ellipsis: true,
      width: 50,
      hideInSearch: true,
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
        tableData={tableData}
        setTableData={setTableData}
      />
    </>
  );
}
