import { Image } from "antd";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { dataInfo } from "./Code";

export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);

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
      width: 100,
      align: "center", // Adjust alignment if needed
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
