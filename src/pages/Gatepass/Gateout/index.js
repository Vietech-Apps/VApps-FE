import { Image } from "antd";
import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { BackEnd_URL } from "meta/services/auth/jwt-api";
import { useState } from "react";
import { dataInfo } from "./Codes";
export default function ListTable() {
  function countUniqueProducts(orders) {
    const uniqueProductIds = new Set(
      orders.flatMap((order) =>
        order.products.map((product) => product.productId)
      )
    );

    return uniqueProductIds.size;
  }

  const columns = [
    {
      title: "Gate.No",
      key: "gateNo",
      width: 80,
      dataIndex: "gateNo",
    },
    {
      title: "Type",
      key: "passType",
      dataIndex: "passType",
      responsive: ["md"],
    },
    {
      title: "Person",
      key: "name",
      render: (_, key) => key.visitorName,
    },
    {
      title: "Detail",
      key: "purpose",
      dataIndex: "purpose",
    },
    {
      title: "Visit",
      key: "visitorType",
      dataIndex: "visitorType",
    },
    {
      title: "Picture",
      render: (_, key) =>
        key.photos?.length > 0 && (
          <Image src={key.photos} height={30} width={60} />
        ),
    },
    {
      title: "Veh.No",
      key: "vehicleNo",
      dataIndex: "vehicleNo",
    },
    {
      title: "Material Type",
      key: "materialType",
      dataIndex: "materialType",
    },
    {
      title: "Due Date",
      key: "returnableDate",
      dataIndex: "returnableDate",
    },
    {
      title: "Received",
      key: "status",
      render: (_, key) =>
        key.pos?.reduce((accumulator, currentValue) => {
          return (
            accumulator +
            currentValue.products?.reduce(
              (acc, curr) => acc + curr.deliveredQty,
              0
            )
          );
        }, 0),
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
        expandedRowRender={(record) => (
          <>
            Remarks: {record.remarks}
            <br></br>
            Attachments
            <iframe
              src={`${BackEnd_URL}${record?.attachments[0]?.url}`}
              width="100%"
              height="600"
            ></iframe>
          </>
        )}
      />
    </>
  );
}
 