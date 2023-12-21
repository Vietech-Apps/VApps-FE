import { calculateTotalAmount } from "meta/common/MyFns";
import { getStatusTag } from "meta/common/status";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import { useRef, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { dataInfo } from "./Code";
export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);

  const actionRef = useRef();

  const columns = [
    {
      title: "Status",
      width: 100,
      key: "status",
      fixed: "left",
      dataIndex: "status",
      render: (p) => (
        <span>
          <Link to={p.path}>{getStatusTag(p)}</Link>
        </span>
      ),
    },

    {
      title: "Customer",
      key: "contact",
      width: 160,
      render: (_, key) => <span key={key._id}>{key.contact?.title}</span>,
      ellipsis: true,
    },

    {
      title: "DC Status",
      key: "dcStatus",
      dataIndex: "dcStatus",

      width: 100,

      valueType: "tag",
    },
    {
      title: "Payments",
      key: "payments",
      width: 90,
      dataIndex: "payments",
      render: (key, r) => <span>Rs {calculateTotalAmount(r.payments)}</span>,
      valueType: "digit",
    },
  ];

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <ProTableComponent
        codes={dataInfo}
        columns={columns}
        actionRef={actionRef}
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
