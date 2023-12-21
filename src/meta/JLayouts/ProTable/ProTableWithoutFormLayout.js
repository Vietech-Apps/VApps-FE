import { Badge, Button, message, Space, Tooltip } from "antd";

import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useState } from "react";
import { FcClearFilters, FcFilledFilter } from "react-icons/fc";
import { StyleProTable } from "./index.style";

const ProTableWithoutFormLayout = ({
  columns,
  expandedRowRender,
  searchPlaceHolder,
  headerTitle,
  setTableData,
  actionRef,
  other,
  setSearch,
  search,
  toolBarRender,
  rowSelection,
  mainRoute,
  refreshTable,
  otherParams,
  status,
  menu,
  scroll,
  pagination = true,
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [badgeParams, setBadgeParams] = useState();
  const [activeKey, setActiveKey] = useState("tab1");
  const [created, setCreated] = useState();

  const [statusTpye, setStatusTpye] = useState([]);
  const [filters, setFilters] = useState(false);
  return (
    <StyleProTable
      params={{
        [status]: badgeParams,
        createdat: created,
        ...otherParams,
      }}
      size="small"
      columns={columns}
      search={filters}
      actionRef={actionRef}
      cardBordered
      className="p-0"
      expandable={{ expandedRowRender }}
      // headerTitle={"headerTitle"}
      onRequestError={(error) => errorHandler(error)}
      rowKey={(p) => p._id}
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
        const res = await jwtAxios.get(`${mainRoute}/prolist`, {
          params,
        });

        setTableData(res.data);
        setStatusTpye(res.data.statusCountsWithToday);
        setPageSize(res.data.pageSize);
        message.success(res.data.message);
        return res.data;
      }}
      alwaysShowAlert={true}
      rowSelection={rowSelection}
      scroll={{ x: scroll || 1600 }}
      options={{
        setting: {
          listsHeight: 80,
        },
        search: true,
        reset: false,
        refresh: true,
        fullScreen: true,
      }}
      onReset={() => {
        setSearch(null);
        setBadgeParams();
        setCreated();
        setActiveKey("tab1");
      }}
      toolbar={{
        search: {
          value: search,
          onChange: (e) => {
            setSearch(e.target.value);
          },

          placeholder: searchPlaceHolder,
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
                  {/* {getStatusTag(status.status, status.count)} */}
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
                setSearch("");
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
  );
};

export default ProTableWithoutFormLayout;
