import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { JEInfo } from "./Codes";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export default function ListTable() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const columns = [
    {
      title: "Partner",
      key: "contact",
      render: (r) => r.contact?.title,
    },
    {
      title: "Reference",
      key: "reference",
      dataIndex: "reference",
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <>
      <AppPageMetadata title={JEInfo.metaData} />
      <ProTableComponent
        codes={JEInfo}
        columns={columns}
        // isCustomViewButton={true}
        search={search}
        // additionalActionButtons={(record, refreshTable) => (
        //   <Tooltip title="View">
        //     <Button
        //       type="text"
        //       size="span"
        //       key={"edit"}
        //       onClick={() => navigate(`${record.path}/workspace/${record._id}`)}
        //       icon={<EyeOutlined />}
        //     />
        //   </Tooltip>
        // )}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        otherParams={{ status: status }}
      />
    </>
  );
}
