import { Avatar, Button, Select, Tooltip } from "antd";
import { usePermissions } from "meta/common/CheckPermission";
import { getOptions, getStatusOption } from "meta/common/MyFns";
import { getStatusTag } from "meta/common/status";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useGetData } from "meta/services/auth/ezAPI";
import { BackEnd_URL } from "meta/services/auth/jwt-api";
import { useAuthUser } from "meta/utility/AuthHooks";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import ForwardToNext from "meta/Reusable/ForwardToNext";
import { AiOutlineEye } from "react-icons/ai";
import LifeCycle from "./LifeCycle";
import { dataInfo } from "./Codes";
import ProTableComponent from "meta/JLayouts/ProTable";
export default function ListTable() {
  const { canUpdate } = usePermissions(RoutePermittedRole[dataInfo.permission]);
  const [{ apiData: customerList }] = useGetData(`meta/contact/list`, []);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuthUser();
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const columns = [
    {
      title: "Status",
      key: "allStatus",
      fixed: "left",
      width: 80,
      dataIndex: "status",
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
    },
    {
      title: "Customer",
      key: "customer",
      width: 160,
      render: (_, key) => <small key={key._id}>{key.customer?.title}</small>,
      ellipsis: true,
      renderFormItem: () => {
        return <Select allowClear options={getOptions(customerList)} />;
      },
    },

    {
      title: "Detail",
      key: "detail",
      dataIndex: "detail",
      render: (key) => <small key={key._id}>{key}</small>,
      valueType: "string",
      hideInSearch: true,
      ellipsis: true,
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
      title: "Reference",
      hideInSearch: true,
      responsive: ["md"],
      key: "referenceNo",
      dataIndex: "referenceNo",
    },

    {
      title: "Industry Type",
      key: "industryType",
      render: (_, c) => c.industryType?.title,
      // hideInSearch: true,
    },
    {
      title: "Project",
      key: "project",
      render: (_, c) => c.project?.title,
      ellipsis: true,
      // hideInSearch: true,
    },
    {
      title: "Assigned",
      key: "assigned",
      hideInSearch: true,
      render: (record) => (
        <Avatar.Group size={"small"}>
          {record.assignTo?.map((item, index) => (
            <Tooltip
              title={`${item.name} ${item.lastName}`}
              placement="top"
              key={index}
            >
              <Avatar src={item.avatar} />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
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
            <Tooltip title="View">
              <Button
                type="text"
                size="small"
                disabled={
                  record.status !== "Enquiry" ||
                  !canUpdate ||
                  record.createdBy?._id !== user?._id
                }
                key={"edit"}
                icon={<AiOutlineEye />}
                onClick={() => navigate(`${pathname}/workspace/${record._id}`)}
              />
            </Tooltip>
            <Tooltip key={3} color="cyan" title="Proceed">
              <ForwardToNext
                route={`erp/Enquiry/update/${record?._id}`}
                disabled={record.status !== "Enquiry"}
                refreshTable={refreshTable}
                status="Estimation"
                tooltipTitle="Forward"
                key={"next"}
              />
            </Tooltip>
          </>
        )}
      />
    </>
  );
}
