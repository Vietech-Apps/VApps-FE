import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios  from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useAuthUser } from "meta/utility/AuthHooks";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { reconcileInfo } from "./Codes";
export default function ListTable({ id }) {
  const { user } = useAuthUser();
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  
  const navigate = useNavigate();
  const columns = [
    {
      title: "Imported Date",
      key: "date",
      render: (_, re) => dayjs(re.date).format("DD-MM-YYYY"),
    },
    {
      title: "Start Date",
      key: "startDate",
      render: (_, re) => dayjs(re.startDate).format("DD-MM-YYYY"),
    },
    {
      title: "End Date",
      key: "endDate",
      render: (_, re) => dayjs(re.endDate).format("DD-MM-YYYY"),
    },
    {
      title: "Start Balance",
      key: "startBalance",
      dataIndex: "startBalance",
    },
    {
      title: "End Balance",
      key: "endBalance",
      dataIndex: "endBalance",
    },
    {
      title: "Source",
      key: "source",
      render: (_, re) => "Imported",
    },
    {
      title: "Status",
      key: "status",
      render: (_, re) => "Unreconcilled",
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  console.log(tableData);
  return (
    <>
      <AppPageMetadata title={reconcileInfo.LogTitle} />
    </>
  );
}
