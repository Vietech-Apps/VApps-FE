import { Avatar, Form, Image, Popconfirm, Select, Space, Table } from "antd";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import { useRef, useState } from "react";
import { dataInfo } from "./Codes";
import { StyledOrderId } from "meta/JLayouts/index.styled";

export default function ListTable() {
  const columns = [
    {
      title: "Short Code",
      dataIndex: "warehouseCode",
      width: 110,
      key: "warehouseCode",
      fixed: "left",
      render: (Id, re) => <StyledOrderId>{re?.warehouseCode}</StyledOrderId>,
    },
    {
      title: "Name",
      key: "title",
      width: 200,
      dataIndex: "title",
      ellipsis: true,
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
        menu={true}
        status={"status"}
      />
    </>
  );
}
