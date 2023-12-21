import { Avatar, Select, Tooltip } from "antd";
import { getStatusTag } from "meta/common/status";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";

import { getOptions, getStatusOption } from "meta/common/MyFns";
import { Rs } from "meta/Reusable/CalcData";
import ProTableComponent from "meta/JLayouts/ProTable";
import { dataInfo } from "./Codes";

export default function RFQTable() {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const columns = [
    {
      tip: "status",
      fixed: "left",
      title: "Status",
      key: "rfqStatus",
      dataIndex: "rfqStatus",
      width: 80,
      render: (p, data) => <small>{getStatusTag(data?.rfqStatus)}</small>,
      renderFormItem: () => {
        return (
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            allowClear
            options={getStatusOption(
              tableData?.statusCountsWithToday?.filter(
                (d) => d.status !== "All" && d.status !== "Today"
              ) || []
            )}
            placeholder="status"
          />
        );
      },
      valueType: "select",
    },
    {
      title: "Vendor",
      key: "vendor",
      copyable: true,
      width: 200,
      ellipsis: true,
      render: (_, key) => <small key={key._id}>{key.vendor?.title}</small>,
      renderFormItem: () => {
        return (
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder={`Total ${tableData?.vendors?.count} vendor in use for RFQs`}
            allowClear
            options={getOptions(tableData?.vendors?.vendors)}
          />
        );
      },
    },
    {
      title: "Priority",
      width: 70,
      key: "priority",
      dataIndex: "priority",
      render: (_, p) => {
        let priorityColor;
        switch (p.priority) {
          case "High":
            priorityColor = "red";
            break;
          case "Medium":
            priorityColor = "orange";
            break;
          case "Low":
            priorityColor = "green";
            break;
          case "Normal":
            priorityColor = "green";
            break;
          default:
            priorityColor = "black";
            break;
        }
        return <small style={{ color: priorityColor }}>{p.priority}</small>;
      },

      valueEnum: {
        High: { text: "High", status: "Processing" },
        Medium: { text: "Medium", status: "Error" },
        Low: { text: "Low", status: "Error" },
      },
    },
    {
      title: "To",
      key: "assigned",
      tip: "Assigned To",
      width: 70,
      hideInSearch: true,
      render: (record) => (
        <Avatar.Group size={"small"}>
          {record.assignTo?.map((item, index) => (
            <Tooltip
              color="cyan"
              title={`${item.name} ${item.lastName}`}
              placement="top"
              key={index}
            >
              <Avatar src={item.picture[0]?.url} />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "Total",
      width: 110,
      key: "grandTotal",
      hideInSearch: true,
      render: (_, p) => <small>{Rs(p.grandTotal)}</small>,
    },
  ];

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <ProTableComponent
        codes={dataInfo}
        columns={columns}
        status={"rfqStatus"}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
      />
    </>
  );
}
