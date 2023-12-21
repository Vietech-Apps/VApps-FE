import { ReloadOutlined, StopOutlined } from "@ant-design/icons";
import { Badge, Button, Popconfirm, Select, Space, Tooltip } from "antd";
import { getIconByName } from "meta/common/AppIcons";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import LogDrawer from "pages/root/Logs/LogDrawer";
import React, { useRef, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FcClearFilters, FcFilledFilter } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import FormLayout from "../Layout";
import { StyleProTable } from "./index.style";
import successHandler from "meta/services/auth/successHandler";
import { StyledButtonComponent, StyledIconButton } from "../Layout/index.style";
import { StyledOrderId } from "../index.styled";
import { UserOptions } from "meta/common/MyFns";
import { useGetData } from "meta/services/auth/ezAPI";
import { MdDeleteOutline } from "react-icons/md";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { usePermissions } from "meta/common/CheckPermission";

const ProTableComponent = ({
  columns,
  searchPlaceHolder = null,
  expandedRowRender,
  setTableData,
  other,
  setSearch,
  search,
  codes,
  dataPath = null,
  otherParams,
  status,
  menu,
  extra,
  scroll,
  isNew = true,
  pagination = true,
  key = "_id",
  additionalActionButtons,
  isCustomViewButton = false,
  newPageSize = 10,
  customId = false,
}) => {
  const { canDelete, canCreate } = usePermissions(
    RoutePermittedRole[codes?.permission || "admin"]
  );
  const [pageSize, setPageSize] = useState(newPageSize);
  const [current, setCurrent] = useState(1);
  const [badgeParams, setBadgeParams] = useState();
  const [activeKey, setActiveKey] = useState("tab1");
  const [created, setCreated] = useState();
  const navigate = useNavigate();
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const [{ apiData: adminList }] = useGetData("admin/alllist", []);

  const [statusTpye, setStatusTpye] = useState([]);
  const [filters, setFilters] = useState(false);
  const delRowConfirm = async (record) => {
    record.removed = !record.removed;
    try {
      const response = await jwtAxios.patch(
        `${codes.dataRoute}/disabled/${record._id}`,
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

  const Mycolumns = [
    {
      title: "ID",
      width: 120,
      key: "cuId",
      fixed: "left",
      valueType: "string",
      hideInTable: customId,
      render: (_, doc) => (
        <StyledOrderId>
          {doc.cuId || doc.cuIdDraft || doc.id || doc.Id}
        </StyledOrderId>
      ),
    },
    ...columns,
    {
      title: "CreatedAt",
      key: "createdat",
      dataIndex: "createdAt",
      width: 120,
      valueType: "date",
    },
    {
      title: "Created By",
      key: "createdBy",
      render: (text, record) => record?.createdBy?.name,
      valueType: "select",
      renderFormItem: () => {
        return <Select options={UserOptions(adminList)} />;
      },
    },
    {
      title: "Status",
      key: "removed",
      dataIndex: "removed",
      valueType: "radio",
      valueEnum: {
        true: { text: "Disabled", status: "Error" },
        false: { text: "Enabled", status: "Processing" },
      },
    },
    {
      title: "Creation time",
      dataIndex: "createdAt",
      key: "createdAt",
      valueType: "dateRange",
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: "",
      dataIndex: "more",
      hideInSearch: true,
      width: 120,
      fixed: "right",
      key: "more",
      className: "order-transaction-table-more",
      render: (text, record) => (
        <Space.Compact block size={"span"}>
          {additionalActionButtons &&
            additionalActionButtons(record, refreshTable)}
          {/* Invoke the additionalButton function */}
          {!isCustomViewButton && (
            <Tooltip title="View">
              <Button
                type="text"
                size="span"
                key={"edit"}
                onClick={() =>
                  navigate(`${codes.navPath}/workspace/${record._id}`)
                }
                icon={<AiOutlineEye />}
              />
            </Tooltip>
          )}
          <Popconfirm
            key={5}
            placement="left"
            title={`Are you sure you want to ${
              record.removed ? "restore" : "delete"
            } this document (${record.cuId})!`}
            onConfirm={() => delRowConfirm(record)}
          >
            {canDelete && (
              <Tooltip title={record.removed ? "Restore" : "Delete"}>
                <Button
                  type="text"
                  size="span"
                  icon={
                    record.removed == true ? (
                      <StopOutlined key="delete" style={{ color: "red" }} />
                    ) : (
                      <MdDeleteOutline key="delete" />
                    )
                  }
                />
              </Tooltip>
            )}
          </Popconfirm>
        </Space.Compact>
      ),
    },
  ];
  return (
    <FormLayout
      footerComponent={false}
      isTable={true}
      codes={codes}
      extra={[
        canCreate && isNew && (
          <Tooltip
            placement={"bottomLeft"}
            title={`Create New ${codes.formTitle}`}
            key={11}
          >
            <StyledButtonComponent>
              <StyledIconButton
                icon={<ReloadOutlined />}
                onClick={() => {
                  refreshTable();
                }}
                type="text"
                key={"refresh"}
              ></StyledIconButton>

              <StyledIconButton
                key={codes.formTitle}
                type="text"
                className="rounded-full"
                icon={getIconByName("create")}
                onClick={() => navigate(`${codes.navPath}/workspace`)}
              >
                New
              </StyledIconButton>
            </StyledButtonComponent>
          </Tooltip>
        ),
        extra && { ...extra },

        <LogDrawer key={"LogTitle"} name={codes.LogTitle} />,
      ]}
    >
      <StyleProTable
        params={{
          [status]: badgeParams,
          createdat: created,
          ...otherParams,
        }}
        size="small"
        search={filters}
        columns={Mycolumns}
        actionRef={actionRef}
        cardBordered
        expandable={{ expandedRowRender }}
        onRequestError={(error) => errorHandler(error)}
        rowKey={(p) => p[key]}
        pagination={
          pagination
            ? {
                // pageSizeOptions: [10, 20, 30, 50],
                showQuickJumper: true,
                showSizeChanger: true,
                pageSize: pageSize,
              }
            : false
        }
        onShowSizeChange={(current, size) => {
          setPageSize(size);
          setCurrent(current);
        }}
        request={async (params = { pageSize, current }, sort, filter) => {
          const res = await jwtAxios.get(
            dataPath || `${codes.dataRoute}/prolist`,
            {
              params,
            }
          );
          setTableData(res.data);
          setStatusTpye(res.data.statusCountsWithToday);
          setPageSize(res.data.pageSize);
          successHandler(res);
          return res.data;
        }}
        alwaysShowAlert={true}
        scroll={{ x: scroll || 1600 }}
        options={{
          setting: {
            listsHeight: 20,
          },
          search: true,
          reset: true,
          refresh: true,
          fullScreen: true,
        }}
        onReset={() => {
          setSearch("");
          setBadgeParams();
          setCreated();
          setActiveKey("tab1");
        }}
        toolbar={{
          search: {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: searchPlaceHolder || "Search here",
            style: { width: "100%" },
          },

          menu: menu && {
            type: "tab",
            activeKey: activeKey,
            items: statusTpye?.map((status, index) => {
              return {
                key: `tab${index + 1}`,
                label: (
                  <span
                    onClick={() => {
                      if (status.status == "All") {
                        setBadgeParams();
                      } else if (status.status == "Today") {
                        setBadgeParams(status.status);
                      } else {
                        setBadgeParams(status.status);
                      }
                      refreshTable();
                    }}
                  >
                    {status.status}
                    <Badge color={"grey"} count={status.count || 0} />
                  </span>
                ),
              };
            }),

            onChange: (key) => {
              setActiveKey(key);
            },
          },
        }}
        dateFormatter="string"
        toolBarRender={() => (
          <Space wrap>
            {search && (
              <Button
                key={"reset"}
                onClick={() => {
                  refreshTable(), setSearch("");
                }}
              >
                Reset
              </Button>
            )}
            {
              <Tooltip title={filters ? "Clear Filters" : "Show Filters"}>
                <Button
                  type="text"
                  key={"reset"}
                  onClick={() => setFilters(!filters)}
                  icon={filters ? <FcClearFilters /> : <FcFilledFilter />}
                />
              </Tooltip>
            }
          </Space>
        )}
        {...other}
      />
    </FormLayout>
  );
};

export default ProTableComponent;
