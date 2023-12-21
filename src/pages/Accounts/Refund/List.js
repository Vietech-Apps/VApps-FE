import { Select, Table } from "antd";
import { getOptions, calculateTotalAmount } from "meta/common/MyFns";
import { getStatusTag } from "meta/common/status";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import { useGetData } from "meta/services/auth/ezAPI";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { refundInfo } from "./Code";
export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const [{ apiData: contactList }] = useGetData(`meta/contact/list`, []);

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
      width: 200,
      render: (_, key) => <span key={key._id}>{key.contact?.title}</span>,
      ellipsis: true,
      renderFormItem: () => {
        return <Select allowClear options={getOptions(contactList)} />;
      },
    },

    {
      title: "Total",
      key: "amount",
      dataIndex: "amount",
      hideInSearch: true,
      width: 120,
      render: (key) => <span>Rs {key}</span>,
      valueType: "digit",
    },
    {
      title: "Payments",
      key: "payments",
      width: 120,
      dataIndex: "payments",
      render: (key, r) => <span>Rs {calculateTotalAmount(r.payments)}</span>,
      valueType: "digit",
    },
  ];

  return (
    <>
      <AppPageMetadata title={refundInfo.metaData} />
      <ProTableComponent
        codes={refundInfo}
        columns={columns}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        otherParams={{ status: status }}
        // other={{
        //   summary: () => (
        //     <Table.Summary fixed={"top"}>
        //       <Table.Summary.Row>
        //         {tableData?.statusCountsWithToday?.map((c, i) => (
        //           <Table.Summary.Cell index={i} colSpan={1} key={i}>
        //             {c.status} {c.total}
        //           </Table.Summary.Cell>
        //         ))}
        //       </Table.Summary.Row>
        //     </Table.Summary>
        //   ),
        // }}
      />
    </>
  );
}
