import { Tag } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { dataInfo } from "./Code";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import { useState } from "react";
export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const columns = [
    {
      title: "Title",
      key: "name",
      width: 160,
      dataIndex: "name",
    },
    {
      title: "UOM",
      key: "name",
      width: 160,
      render: (_, r) =>
        r.units?.map((c) => (
          <Tag key={c._id} color={c.type == "reference" ? "blue" : "default"}>
            {c.unit}
          </Tag>
        )),
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
