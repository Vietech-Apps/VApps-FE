import {
  CheckCircleTwoTone,
  EditOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { ProList, ProTable } from "@ant-design/pro-components";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Branches = ({ rowdata }) => {
  const [{ apiData: branches, loading }, { setData }] = useGetData(
    `meta/company/branch/alllist/${rowdata?._id}`,
    []
  );

  const { pathname } = useLocation();

  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.removed = !e.removed;
    try {
      const response = await jwtAxios.put(
        `meta/company/branch/updateMeta/${e._id}`,
        { ...e }
      );

      successHandler(response);
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <ProTable
      columns={[
        {
          title: "S.No",
          dataIndex: "index",
          key: "idex",
          valueType: "indexBorder",
        },
        { title: "Branch Name", dataIndex: "branchName", key: "branchName" },

        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
          ellipsis: true,
        },
        {
          title: "Created By",
          key: "createdby",
          render: (text, record) => record?.createdBy?.name,
          valueType: "date",
        },
        {
          title: "Status",
          key: "createdby",
          dataIndex: "removed",
          valueType: "radio",
          valueEnum: {
            true: { text: "Disabled", status: "Error" },
            false: { text: "Enabled", status: "Processing" },
          },
        },
        {
          title: "Action",
          dataIndex: "operation",
          key: "operation",
          width: 80,
          fixed: "right",
          valueType: "option",
          render: (text, record) => [
            <Popconfirm
              key="delete"
              title="Disabled the branch"
              description="Are you sure to disabled this branch?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              {record.removed == true ? (
                <StopOutlined key="delete" style={{ color: "red" }} />
              ) : (
                <CheckCircleTwoTone key="delete" />
              )}
            </Popconfirm>,
            <EditOutlined
              key="Stop"
              onClick={() => navigate(`${pathname}/update/${record._id}`)}
            >
              Edit
            </EditOutlined>,
          ],
        },
      ]}
      headerTitle={`${rowdata?.name} Branches`}
      toolBarRender={() => [
        <Tooltip title="Create New Branch" key="submit">
          <Button
            icon={<PlusOutlined />}
            type="primary"
            key="submit"
            onClick={() => {
              navigate(`${pathname}/new-branch/${rowdata._id}`);
            }}
          ></Button>
        </Tooltip>,
      ]}
      search={false}
      options={false}
      dataSource={branches}
      pagination={false}
      loading={loading}
    />
  );
};
export default Branches;
