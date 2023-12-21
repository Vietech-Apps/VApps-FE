import {
  CheckCircleTwoTone,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";

import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import dayjs from "dayjs";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { dataInfo } from "./Codes";
export default function ListTable(date) {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const columns = [
    {
      title: "Date",
      key: "date",
      // dataIndex: "date",
      // valueType:"date",
      render: (_, re) => dayjs(re.date).format("DD-MM-YYYY"),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "paymentType",
    },
    // {
    //   title: "Transaction",
    //   key: "journal",
    //   render: (c, record) => {
    //     console.log(c);
    //     return c.internalTransfer
    //       ? c.paymentType == "Send"
    //         ? c.companyAccount?.accountHolderName +
    //           "-" +
    //           "to" +
    //           "-" +
    //           c.toAccount?.accountHolderName
    //         : c.toAccount?.accountHolderName +
    //           "-" +
    //           "to" +
    //           "-" +
    //           c.companyAccount?.accountHolderName
    //       : c.paymentType == "Send"
    //       ? c.companyAccount?.accountHolderName +
    //         "-" +
    //         "to" +
    //         "-" +
    //         c.contactAccount?.accountHolderName
    //       : c.contactAccount?.accountHolderName +
    //         "-" +
    //         "to" +
    //         "-" +
    //         c.companyAccount?.accountHolderName;
    //   },
    // },
    {
      title: "Partner",
      key: "contact",
      render: (c, _) => c.contact?.title,
    },
    {
      title: "Amount",
      key: "amount",
      render: (c, _) => c.debit || -c.credit || c.amount,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Reference",
      key: "refernece",
      dataIndex: "reference",
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
        otherParams={{ status: status, module: "Vendor" }}
      />
    </>
  );
}
