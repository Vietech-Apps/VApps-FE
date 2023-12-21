import { CloseOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Table, Tag, Typography } from "antd";
import { getUniqueBrands } from "meta/Reusable/CalcData";
import getColumnSearchProps from "meta/Reusable/getColumnSearchProps";
import React from "react";
import { StyledTable } from "./index.styled";

const SOProducts = ({ products, relatedRFQ, setDataSource }) => {
  const valueEnum = getUniqueBrands(
    products?.filter((p) => p.type == 1) || []
  )?.reduce((acc, curr) => {
    acc[curr.title] = { text: curr.title };
    return acc;
  }, {});
  let columns = [
    {
      title: "code",
      dataIndex: "code",
      key: "code",
      ...getColumnSearchProps("code", false),
    },
    {
      title: "Detail",
      dataIndex: "name",
      width: "20%",
      key: "name",

      ellipsis: true,
    },
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
      filters: true,
      onFilter: true,
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      valueEnum: valueEnum,
      type: "0",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Disc%",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Total",
      render: (record) =>
        record.type !== 2 &&
        (
          record.price * record.qty -
          (record.price * record.qty * record.discount) / 100
        ).toFixed(2),

      key: "total",
    },
  ];

  const getCheckboxProps = (record) => ({
    disabled: record.type == 2,
  });
  return (
    <>
      {products?.length > 0 ? (
        <>
          <Divider>Colored Already in RFQs</Divider>
          <StyledTable
            size="small"
            rowSelection={{
              getCheckboxProps,
              selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            }}
            tableAlertRender={({
              selectedRowKeys,
              selectedRows,
              onCleanSelected,
            }) => {
              return (
                <Space size={24}>
                  <span>
                    <a
                      style={{ marginInlineStart: 8 }}
                      onClick={onCleanSelected}
                    >
                      Cancel Selection{" "}
                    </a>
                    (Selected{" "}
                    {selectedRowKeys?.length > 1
                      ? `${selectedRowKeys?.length} Items`
                      : `${selectedRowKeys?.length} item`}
                    )
                    <a
                      style={{ marginInlineStart: 8 }}
                      onClick={() => setDataSource(selectedRows)}
                    >
                      Add selected Products to SO
                    </a>
                  </span>
                </Space>
              );
            }}
            // loading={loading}
            pagination={false}
            search={false}
            toolBarRender={false}
            dataSource={products}
            columns={columns}
            rowClassName={(record) =>
              record.type == 2
                ? "data-row-active-row-section"
                : relatedRFQ?.some((rfq) =>
                    rfq.products.some(
                      (product) => product.productId === record.productId
                    )
                  )
                ? "data-row-active-row-avaliable"
                : ""
            }
            rowKey={(key) => key._id}
          />
        </>
      ) : (
        []
      )}
      {relatedRFQ?.length > 0 && (
        <>
          <Divider>
            <Typography.Text type="success"> Related RFQs</Typography.Text>
          </Divider>

          <Table
            size="small"
            dataSource={relatedRFQ}
            rowKey={(key) => key._id}
            columns={[
              {
                title: "ID",
                dataIndex: "cuId",
                width: 120,
                key: "cuId",
                fixed: "left",
                render: (Id) => <Tag color="#87d068">{Id}</Tag>,
              },
              {
                title: "Vendor Detail",
                key: "vendor",
                width: 350,
                render: (key) => <span key={key._id}>{key.vendor?.title}</span>,
              },
              {
                title: "Expacted Date",
                key: "date",
                width: 100,
                dataIndex: "",
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                width: 100,
              },
              {
                title: "Products",
                render: (key) => key.products?.length,
                key: "products",
                width: 50,
              },
              //   {
              //     key: "action",
              //     render: (record) => (
              //       <Button
              //         hidden={record.status == "Cancelled"}
              //         icon={<CloseOutlined />}
              //         type={"text"}
              //         onClick={() => handleDelete(record)}
              //       ></Button>
              //     ),
              //     width: 20,
              //   },
            ]}
            pagination={false}
          />
        </>
      )}
    </>
  );
};

export default SOProducts;
