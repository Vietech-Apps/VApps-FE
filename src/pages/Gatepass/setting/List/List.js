import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Avatar, Button, Image, message, Popconfirm, Select } from "antd";
import { getOptions } from "meta/common/MyFns";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import { putDataApi } from "meta/utility/APIHooks";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  StyledDealsUserInfo,
  StyledDetailUserInfoContent,
  StyledOrderId,
} from "./index.styled";

export default function ListTable({
  DataPath,
  HeaderTitle,
  ButtonTitle,
  createCode,
  updateCode,
  viewCode,
  deleteCode,
  user,
}) {
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const delRowConfirm = async (record) => {
    // try {
    //   const response = await putDataApi(`/admin/disabled/${id}`, {});
    //   message.success(response.data.message);
    //   refreshTable();
    // } catch (error) {
    //   message.error(error.response.data.message);
    // }
    refreshTable();
    message.success("Deleted");
  };
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 40,
      key: "id",
      fixed: "left",
      render: (Id) => <StyledOrderId>{Id}</StyledOrderId>,
    },
    {
      key: "name",
      title: "Name",
      render: (p) => (
        <StyledDealsUserInfo>
          <Avatar src={<Image src={p.logo} />} />
          <StyledDetailUserInfoContent>
            <h3>{`${p.name}`}</h3>
          </StyledDetailUserInfoContent>
        </StyledDealsUserInfo>
      ),
    },
    {
      key: "taxationType",
      title: "Taxation Type",

      render: (p) => p.taxationType,
    },
    {
      title: "Created",
      key: "createdAt1",
      dataIndex: "createdAt",
      valueType: "date",
    },

    {
      title: "Action",
      valueType: "option",
      key: "option",
      fixed: "right",
      render: (text, record, _, action) => [
        <Popconfirm
          key="del"
          placement="left"
          title="Are you sure!"
          onConfirm={() => delRowConfirm(record)}
        >
          {user?.power?.indexOf(deleteCode) > -1 && (
            <DeleteOutlined key="delete" />
          )}
        </Popconfirm>,

        user?.power?.indexOf(updateCode) > -1 && (
          <EditOutlined
            key={"edit"}
            onClick={() => navigate(`${pathname}/${record._id}`)}
          />
        ),
        user?.power?.indexOf(viewCode) > -1 && (
          <EyeOutlined
            key={"view"}
            onClick={() => navigate(`${pathname}/${record._id}`)}
          />
        ),
      ],
    },
  ];

  const { pathname } = useLocation();
  
  console.log(pathname);
  return (
    <ProTable
      size="small"
      columns={columns}
      actionRef={actionRef}
      cardBordered
      rowKey={(p) => p._id}
      request={async (params = {}, sort, filter) => {
        const res = await jwtAxios.get(DataPath, {
          params,
        });

        return res.data;
      }}
      scroll={{ x: 1300 }}
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 200,
        },
      }}
      // pagination={{
      //   pageSize: 10,
      //   onChange: (page) => console.log(page),
      // }}
      dateFormatter="string"
      headerTitle={HeaderTitle}
      toolBarRender={() => [
        user?.power?.indexOf(createCode) > -1 && (
          <Button
            key={"create"}
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => navigate(`${pathname}/create`)}
          >
            {ButtonTitle}
          </Button>
        ),
      ]}
    />
  );
}
