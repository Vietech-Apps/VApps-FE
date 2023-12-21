import { Avatar, Image, Select, Tooltip } from "antd";
import { getOptions } from "meta/common/MyFns";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProTableComponent from "meta/JLayouts/ProTable";
import { useGetData } from "meta/services/auth/ezAPI";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { employeInfo } from "../Code";
import {
  StyledDealsUserInfo,
  StyledDetailUserInfoContent,
} from "../List/index.styled";
import DisabledReason from "./DisabledReason";
import ChangePassword from "./ChangePassword";
import { usePermissions } from "meta/common/CheckPermission";
import { RoutePermittedRole } from "shared/constants/AppEnums";
export default function ListTable() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const actionRef = useRef();
  const [{ apiData: dList }] = useGetData("meta/designation/alllist", []);
  const [{ apiData: processList }] = useGetData("meta/process/alllist", []);
  const [{ apiData: roleList }] = useGetData("meta/permission/list", []);
  const { canDelete, canUpdate } = usePermissions(
    RoutePermittedRole[employeInfo.permission || "admin"]
  );

  const options = [
    { value: "Active", label: "Active" },
    { value: "Resigned", label: "Resigned" },
    { value: "Retired", label: "Retired" },
    { value: "Separated", label: "Separated" },
    { value: "Deactivated", label: "Deactivated" },
    { value: "Disqualified", label: "Disqualified" },
    { value: "Removed", label: "Removed" },
    { value: "Disengaged", label: "Disengaged" },
  ];
  const columns = [
    {
      key: "name",
      title: "Name",
      width: 200,
      fieldProps: { placeholder: "write first name" },
      render: (p) => (
        <StyledDealsUserInfo>
          <Avatar
            src={<Image src={p.picture ? p.picture[0]?.url : p.avatar} />}
          />
          <StyledDetailUserInfoContent>
            <h3>{`${p.name} ${p.lastName}`}</h3>
          </StyledDetailUserInfoContent>
        </StyledDealsUserInfo>
      ),
    },
    {
      title: "Department",
      key: "process",
      hideInTable: true,
      dataIndex: "process",
      renderFormItem: () => {
        return (
          <Select
            options={getOptions(processList)}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder={`Department list`}
            allowClear
          />
        );
      },
    },
    {
      title: "Designation",
      key: "designation",
      hideInTable: true,
      dataIndex: "designation",
      renderFormItem: () => {
        return (
          <Select
            options={getOptions(dList)}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder={"Designation list"}
            allowClear
          />
        );
      },
    },
    {
      title: "Role",
      key: "power",
      hideInSearch: true,
      render: (key) => (key.isAdmin ? "Admin" : key.power?.title || ""),
      renderFormItem: () => {
        return (
          <Select
            options={getOptions(roleList)}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      copyable: true,
      width: 220,
      render: (email) => (
        <small
          style={{
            color: "#43C888",
          }}
        >
          {email}
        </small>
      ),
    },
    {
      title: "Department",
      key: "process",
      hideInSearch: true,
      dataIndex: "process",
      render: (process) => <span className="order-id">{process?.title}</span>,
    },
    {
      title: "Designation",
      key: "designation",
      hideInSearch: true,
      dataIndex: "designation",
      render: (designation) => (
        <span className="order-id">{designation?.title}</span>
      ),
    },

    {
      title: "Phone",
      key: "phone",
      width: 150,
      fieldProps: { placeholder: "without country code " },
      render: (p) => (
        <span className="order-id">{`${p.whatsappCode}-${p.whatsappNumber}`}</span>
      ),
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      valueType: "radio",
      valueEnum: {
        Male: "Male",
        Female: "Female",
      },
    },
    {
      title: "address",
      key: "address",
      dataIndex: "address",
      ellipsis: true,
      copyable: true,
    },
    {
      title: "Created",
      key: "createdAt1",
      dataIndex: "createdAt",
      valueType: "date",
    },
    {
      title: "Status",
      key: "removed",
      dataIndex: "status",
      valueType: "radio",
      valueEnum: {
        Active: { text: "Active", status: "Processing" },
        Resigned: { text: "Resigned", status: "Error" },
        Retired: { text: "Retired", status: "Error" },
        Separated: { text: "Separated", status: "Error" },
        Deactivated: { text: "Deactivated", status: "Error" },
        Disqualified: { text: "Disqualified", status: "Error" },
        Removed: { text: "Removed", status: "Error" },
        Disengaged: { text: "Disengaged", status: "Error" },
      },
    },
  ];

  return (
    <>
      <AppPageMetadata title={employeInfo.metaData} />
      <ProTableComponent
        codes={employeInfo}
        columns={columns}
        actionRef={actionRef}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        otherParams={{ status: status }}
        additionalActionButtons={(record, refreshTable) => (
          <>
            {canDelete && (
              <DisabledReason
                record={record}
                options={options}
                refreshTable={refreshTable}
                route={employeInfo.dataRoute}
                key="Delete"
              />
            )}

            {canUpdate && (
              <Tooltip title="Change Password">
                <ChangePassword data={record} isProfile={false} />
              </Tooltip>
            )}
          </>
        )}
      />
    </>
  );
}
