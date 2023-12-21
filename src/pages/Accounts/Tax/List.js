import { Checkbox } from "antd";
import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { taxInfo } from "./Codes";

export default function ListTable() {
  const columns = [
    {
      title: "Tax Name",
      key: "taxName",
      dataIndex: "taxName",
      width: "10%",
    },
    {
      title: "Percentage %",
      key: "taxRate",
      dataIndex: "taxRate",
      width: "7%",
    },

    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "10%",
    },
    {
      title: "Account",
      key: "account",
      width: "10%",
      render: (record) =>
        record.receivableAccount?.code + "-" + record.receivableAccount?.name,
    },
    {
      title: "Tax Type",
      key: "taxType",
      dataIndex: "taxType",
      width: "5%",
    },
    {
      title: "Tax Scope",
      key: "taxScope",
      dataIndex: "taxScope",
      width: "5%",
    },
    {
      title: "Label On Invoices",
      key: "labelOnInvoices",
      dataIndex: "labelOnInvoices",
      width: "5%",
    },
    {
      title: "Active",
      key: "active",
      width: "5%",
      dataIndex: "active",
      render: (active) => {
        return <Checkbox checked={active} />;
      },
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <>
      <AppPageMetadata title={taxInfo.metaData} />
      <ProTableComponent
        codes={taxInfo}
        columns={columns}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
      />
    </>
  );
}
