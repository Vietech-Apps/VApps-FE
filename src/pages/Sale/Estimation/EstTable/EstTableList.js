import { Avatar, Button, Select, Tooltip } from "antd";
import { usePermissions } from "meta/common/CheckPermission";
import { getOptions, getStatusOption } from "meta/common/MyFns";

import { getStatusTag } from "meta/common/status";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { Rs } from "meta/Reusable/CalcData";
import { useGetData } from "meta/services/auth/ezAPI";
import { BackEnd_URL } from "meta/services/auth/jwt-api";
import { useAuthUser } from "meta/utility/AuthHooks";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiAnalyse } from "react-icons/bi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutePermittedRole } from "shared/constants/AppEnums";

import AddAssign from "./AddAssign";
import { dataInfo } from "../code";
import LifeCycle from "pages/Sale/Enquiry/LifeCycle";
import ProTableComponent from "meta/JLayouts/ProTable";

export default function ListTable() {
  const { canUpdate } = usePermissions(RoutePermittedRole[dataInfo.permission]);
  const { pathname } = useLocation();
  const [tableData, setTableData] = useState([]);
  const { user } = useAuthUser();
  const [{ apiData: contactList }] = useGetData(`meta/contact/list`, []);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Status",
      tip: "status",
      key: "status",
      fixed: "left",
      dataIndex: "estimationStatus",
      width: 80,
      render: (p) => (
        <small>
          <Link to={`/sales/${p}`}>{getStatusTag(p)}</Link>
        </small>
      ),
      renderFormItem: () => {
        return (
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={getStatusOption(
              tableData?.statusCountsWithToday?.filter(
                (d) => d.status !== "All" && d.status !== "Today"
              ) || []
            )}
            placeholder="status"
          />
        );
      },
    },
    {
      title: "Customer",
      key: "customer",
      width: 160,
      render: (_, key) => <small key={key._id}>{key.customer?.title}</small>,
      ellipsis: true,
      renderFormItem: () => {
        return <Select options={getOptions(contactList)} />;
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
      title: "Due date",
      key: "dueDate",
      dataIndex: "dueDate",
      render: (key) => <small>{key}</small>,
      width: 95,
      valueType: "date",
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

    {
      title: "Medium",
      key: "medium",
      render: (record) => record.medium?.map((p) => <small key={p}>{p}</small>),
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value="Email">Email</Select.Option>
            <Select.Option value="Call">Call</Select.Option>
            <Select.Option value="Visit">Visit</Select.Option>
            <Select.Option value="Direct">Direct</Select.Option>
            <Select.Option value="Whatsapp">Whatsapp</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        );
      },
    },
    {
      title: "Project",
      key: "projectName",
      hideInSearch: true,
      dataIndex: "projectName",
      ellipsis: true,
    },
    {
      title: "Reference",
      responsive: ["md"],
      key: "referenceNo",
      dataIndex: "referenceNo",
      hideInSearch: true,
    },
    {
      title: "Detail",
      key: "detail",
      dataIndex: "detail",
      valueType: "string",
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "Date",
      key: "estimationDate",
      width: 100,
      dataIndex: "estimationDate",
      valueType: "date",
    },
  ];
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
        otherParams={{ isEstimation: true }}
        status={"estimationStatus"}
        expandedRowRender={(record) => (
          <>
            Life cycle
            <LifeCycle record={record} />
            <br></br>
            {record.attachments?.length > 0 && (
              <>
                Attachments
                <iframe
                  src={`${BackEnd_URL}${record?.attachments[0]?.url}`}
                  width="100%"
                  height="600"
                ></iframe>
              </>
            )}
          </>
        )}
        isCustomViewButton={true}
        additionalActionButtons={(record, refreshTable) => (
          <>
            {" "}
            <Tooltip title="View">
              <Button
                type="text"
                size="small"
                disabled={
                  !record.assignTo?.some((item) => item._id == user?._id)
                }
                key={"edit"}
                onClick={() => navigate(`${pathname}/workspaces/${record._id}`)}
                icon={<AiOutlineEye />}
              />
            </Tooltip>
            <AddAssign
              key={"assign"}
              hidden={
                !canUpdate && !record.forwardToQuotation && !record.isComplete
              }
              value={record}
              refreshTable={refreshTable}
            />
            <Tooltip key={4} color="cyan" title="Analytic">
              <Button
                type="text"
                size="small"
                key={"analyse"}
                onClick={() => navigate(`/sales/analytic/${record._id}`)}
                icon={<BiAnalyse />}
              />
            </Tooltip>
          </>
        )}
      />
    </>
  );
}
