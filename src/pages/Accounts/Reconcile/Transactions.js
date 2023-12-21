import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useAuthUser } from "meta/utility/AuthHooks";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { reconcileInfo } from "./Codes";
import { Rs } from "meta/Reusable/CalcData";
export default function ListTable({ id }) {
  const { user } = useAuthUser();
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const navigate = useNavigate();
  const columns = [
    {
      title: "Date",
      key: "date",
      render: (_, re) => dayjs(re.date).format("DD-MM-YYYY"),
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Payee",
      key: "payee",
      dataIndex: "payee",
    },
    {
      title: "Check No",
      key: "checkNo",
      dataIndex: "checkNo",
    },
    {
      title: "Reference",
      key: "reference",
      dataIndex: "reference",
    },
    {
      title: "Credit",
      key: "credit",
      render: (_, re) => Rs(re.credit),
    },
    {
      title: "Debit",
      key: "received",
      render: (_, re) => Rs(re.debit),
    },
    {
      title: "Balance",
      key: "Balance",
      render: (_, re) => Rs(re.balance),
    },
    {
      title: "Source",
      key: "source",
      render: (_, re) => re.source,
    },
    {
      title: "Status",
      key: "status",
      render: (_, re) => re.status,
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  console.log(tableData);
  return (
    <>
      <AppPageMetadata title={reconcileInfo.metaData} />
      <ProTableComponent
        codes={reconcileInfo}
        columns={columns}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        refreshTable={refreshTable}
        status={"status"}
        otherParams={{ status: status, bankAcc: id }}
      />
    </>
  );
}
