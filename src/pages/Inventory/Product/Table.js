import {
  CheckCircleTwoTone,
  EditOutlined,
  EyeOutlined,
  StopOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  Form,
  Image,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import { usePermissions } from "meta/common/CheckPermission";
import { deleteDocuments, getOptions } from "meta/common/MyFns";

import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { StyledOrderId } from "pages/root/Company/List/index.styled";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtherComponent from "./Forms/BulkUpdate";

import ProTableWithoutFormLayout from "meta/JLayouts/ProTable/ProTableWithoutFormLayout";
import { pInfo } from "./Code";
import FormLayout from "meta/JLayouts/Layout";
import { StyledIconButton } from "meta/JLayouts/Layout/index.style";
import { getIconByName } from "meta/common/AppIcons";

export default function ListTable({
  mainRoute,
  moduleName,
  tableTitle = "",
  logTitle,
  makeList,
}) {
  const { canCreate, canUpdate, canDelete } = usePermissions(moduleName);
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const restTable = () => actionRef?.current.reset();
  const navigate = useNavigate();
  const calculateTotalQuantity = (items) => {
    return items?.reduce((total, item) => total + item.quantity, 0);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 120,
      key: "id",
      fixed: "left",
      render: (Id, re) => <StyledOrderId>{re.cuId}</StyledOrderId>,
    },

    {
      title: "Name",
      key: "name",
      width: 200,
      dataIndex: "name",
      ellipsis: true,
    },

    {
      title: "Stock",
      key: "stock",
      width: 100,
      render: (_, record) => calculateTotalQuantity(record.inventory),
    },
    {
      title: "Make",
      key: "make",
      width: 150,
      ellipsis: true,
      render: (key, record) => record.make?.title,
      renderFormItem: () => {
        return <Select options={getOptions(makeList)} />;
      },
    },
    {
      title: "P.Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      width: 100,
      ellipsis: true,
      valueType: "number",
      hideInSearch: true,
    },
    {
      title: "S.Price",
      dataIndex: "salePrice",
      key: "salePrice",
      width: 100,
      valueType: "number",
      hideInSearch: true,
    },
    {
      title: "P.Disc",
      dataIndex: "purchaseDiscount",
      key: "purchaseDiscount",
      width: 100,
      hideInSearch: true,
    },
    {
      title: "S.Disc",
      dataIndex: "saleDiscount",
      key: "saleDiscount",
      width: 100,
      hideInSearch: true,
    },
    {
      title: "Model",
      key: "model",
      width: 150,
      ellipsis: true,
      dataIndex: "model",
      hideInSearch: true,
    },

    {
      title: "Tax",
      render: (c, r) => r.tax?.taxRate + "%",
      valueType: "percent",
      width: 100,
      key: "tax",
      hideInSearch: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      hideInSearch: true,
    },
    {
      key: "code",
      title: "Code",
      dataIndex: "code",
      width: 180,
      copyable: true,
    },
    {
      title: "Curr",
      dataIndex: "currency",
      key: "currency",
      width: 150,
      hideInSearch: true,
    },
    {
      title: "UOM",
      render: (c, r) => r.uom?.name,
      width: 100,
      key: "uom",
      hideInSearch: true,
    },
    {
      title: "P.UOM",
      render: (c, r) => r.purchaseUom?.name,
      width: 100,
      key: "purchaseUom",
      hideInSearch: true,
    },
    {
      title: "Detail",
      key: "detail",
      dataIndex: "detail",
      valueType: "string",
      ellipsis: true,
      width: 150,
      hideInSearch: true,
    },
    {
      title: "Date",
      key: "date",
      width: 150,
      dataIndex: "createdAt",
      valueType: "date",
    },
    {
      title: "Status",
      key: "removed",
      width: 150,
      dataIndex: "removed",
      valueType: "radio",
      valueEnum: {
        true: { text: "Disabled", status: "Error" },
        false: { text: "Enabled", status: "Processing" },
      },
    },
    {
      title: "Pic",
      tip: "Product Picture",
      width: 150,
      key: "picture",
      render: (re, record) => (
        <Avatar src={<Image src={record.picture[0]?.url} />} />
      ),
      valueType: "date",
      hideInSearch: true,
    },
    {
      title: "Action",
      valueType: "option",
      key: "option",
      width: 100,
      fixed: "right",
      render: (text, record, _, action) => (
        <Space>
          <Popconfirm
            key="del"
            placement="left"
            title="Are you sure!"
            onConfirm={() => delRowConfirm(record)}
          >
            {canDelete &&
              (record.removed == true ? (
                <StopOutlined key="delete" style={{ color: "red" }} />
              ) : (
                <CheckCircleTwoTone key="delete" />
              ))}
          </Popconfirm>
          {canUpdate && (
            <EyeOutlined
              key={"edit"}
              onClick={() => navigate(`${pathname}/workspace/${record._id}`)}
            />
          )}
        </Space>
      ),
    },
  ];

  const { pathname } = useLocation();
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const delRowConfirm = async (record) => {
    record.removed = !record.removed;
    try {
      const response = await jwtAxios.patch(
        `erp/product/disabled/${record._id}`,
        {
          ...record,
        }
      );
      successHandler(response);
      refreshTable();
    } catch (error) {
      errorHandler(error);
    }
  };
  const other = {
    rowSelection: {
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
    },

    tableAlertOptionRender: ({
      selectedRowKeys,
      selectedRows,
      onCleanSelected,
    }) => {
      return (
        <OtherComponent
          selectedRowKeys={selectedRowKeys}
          selectedRows={selectedRows}
          onCleanSelected={onCleanSelected}
          deleteDocuments={deleteDocuments}
          setLoading={setLoading}
          refreshTable={refreshTable}
          form={form}
        />
      );
    },
  };

  return (
    <>
      <FormLayout
        isTable={true}
        codes={pInfo}
        extra={[
          <StyledIconButton
            key={2}
            className="rounded-full"
            type="text"
            onClick={() => {
              navigate(`${pInfo.navPath}/workspace`);
            }}
            icon={getIconByName("create")}
          >
            New
          </StyledIconButton>,
          <Button onClick={() => navigate(`${pInfo.navPath}/import`)} key={1}>
            Import
          </Button>,
        ]}
      >
        <ProTableWithoutFormLayout
          mainRoute={pInfo.dataRoute}
          logTitle={pInfo?.LogTitle}
          columns={columns}
          actionRef={actionRef}
          search={search}
          setSearch={setSearch}
          tableData={tableData}
          setTableData={setTableData}
          canCreate={canCreate}
          tableTitle={pInfo.proTitle}
          refreshTable={refreshTable}
          restTable={restTable}
          other={other}
        />
      </FormLayout>
    </>
  );
}
