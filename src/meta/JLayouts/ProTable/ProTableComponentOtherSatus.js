import { PlusOutlined } from "@ant-design/icons";
import { Badge, Button, message, Tooltip } from "antd";
import { getIconByName } from "meta/common/AppIcons";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import LogDrawer from "pages/root/Logs/LogDrawer";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStatusTag } from "../../common/status";
import FormLayout from "../Layout";
import { StyleProTable } from "./index.style";

const ProTableComponentOtherSatus = ({
  columns,
  canCreate = false,
  expandedRowRender,
  searchPlaceHolder,
  headerTitle,
  formTitle,
  LogTitle,
  setTableData,
  actionRef,
  other,
  setSearch,
  search,
  toolBarRender,
  dataPath,
  refreshTable,
  otherParams,
  menu,
  path,
  pagination = true,
  isNew = true,
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [badgeParams, setBadgeParams] = useState();
  const [activeKey, setActiveKey] = useState("tab1");
  const [created, setCreated] = useState();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [statusTpye, setStatusTpye] = useState([]);

  return (
    <FormLayout
      path={path}
      extra={[
        canCreate && (
          <Tooltip
            placement={"bottomLeft"}
            title={`Create New ${formTitle}`}
            key={11}
          >
            {isNew && (
              <Button
                key={formTitle}
                icon={getIconByName("create")}
                onClick={() => navigate(`${pathname}/create`)}
              >
                New
              </Button>
            )}
          </Tooltip>
        ),
        <LogDrawer key={"LogTitle"} name={LogTitle} />,
      ]}
      title={formTitle || headerTitle}
      footer={false}
    >
      <StyleProTable
        params={
          badgeParams
            ? {
                [badgeParams]: true,
                createdat: created,
                ...otherParams,
              }
            : {}
        }
        size="small"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        expandable={{ expandedRowRender }}
        onRequestError={(error) => errorHandler(error)}
        rowKey={(p) => p._id}
        pagination={
          pagination
            ? {
                pageSizeOptions: [10, 20, 30, 50],
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
          const res = await jwtAxios.get(dataPath, {
            params,
          });
          setTableData(res.data);
          setStatusTpye(res.data.statusCountsWithToday);
          setPageSize(res.data.pageSize);
          message.success(res.data.message);
          return res.data;
        }}
        alwaysShowAlert={true}
        scroll={{ x: 1600 }}
        options={{
          setting: {
            listsHeight: 80,
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
            placeholder: searchPlaceHolder,
            style: { width: "100%" },
          },

          menu: menu && {
            type: "tab",
            activeKey: activeKey,
            items: [{ status: "All" }]
              .concat(statusTpye)
              ?.map(({ status, count }, index) => {
                return {
                  key: `tab${index + 1}`,
                  label: (
                    <span
                      onClick={() => {
                        if (status == "All") {
                          setBadgeParams();
                        } else {
                          setBadgeParams(status);
                        }
                        refreshTable();
                      }}
                    >
                      {/* {getStatusTag(status, status.count)} */}
                      {status == "isVendor"
                        ? "Vendors"
                        : status == "isCompany"
                        ? "Company"
                        : status == "isPrivate"
                        ? "Private"
                        : status == "isConsultant"
                        ? "Consultant"
                        : status == "All"
                        ? "All"
                        : ""}
                      <Badge color={"grey"} count={count || 0} />
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
        headerTitle={headerTitle}
        toolBarRender={toolBarRender}
        {...other}
      />
    </FormLayout>
  );
};

export default ProTableComponentOtherSatus;
