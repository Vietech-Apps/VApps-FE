import { AimOutlined, CloseOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Space, Table, Tooltip } from "antd";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledTable } from "./index.styled";

const Comparing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ apiData: dataSource, loading }, { setRefreshing }] = useGetData(
    `erp/RFQ/comparing/${id}`,
    []
  );

  const handleChoose = async (r) => {
    const filterd = dataSource.filter(
      (p) => !p.count && p.productId == r.productId
    );
    let keep = filterd.filter((d) => d.docId == r.docId && d.uuid == r.uuid);
    let clear = filterd.filter((d) => !keep.includes(d));
    setRefreshing(true);
    try {
      const response = await jwtAxios.put(`erp/RFQ/choose`, {
        keep,
        clear,
      });
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleClear = async (r) => {
    try {
      setRefreshing(true);
      const response = await jwtAxios.put(`erp/RFQ/clear/${r.docId}/${r._id}`);
    } catch (error) {
      errorHandler(error);
    }
  };
  function countObjectsWithoutStatus(objects) {
    let objectsWithoutStatus = objects.filter((obj) => obj.status == "null");
    return objectsWithoutStatus.length;
  }

  return (
    <FormLayout title="Comparison Sheet">
      <StyledTable
        loading={loading}
        toolBarRender={false}
        dataSource={dataSource}
        pagination={false}
        size="small"
        search={false}
        rowKey={(key) => key.uuid}
        rowClassName={(record) =>
          record.count ? "data-row-active-row-section" : ""
        }
        columns={[
          {
            title: "code",
            dataIndex: "code",
            key: "code",
            width: 120,
          },
          {
            title: "Name",
            render: (_, key) => (!key.count ? key.name : key.name),
            key: "name",
            copyable: true,
            width: 300,
            ellipsis: true,
          },
          {
            title: "Vendor",
            dataIndex: "vendor",
            key: "vendor",
            copyable: true,
            ellipsis: true,
          },
          {
            title: "Reference",
            dataIndex: "cuId",
            key: "cuId",
          },
          {
            title: "Expected Arrival",
            dataIndex: "expectedArrival",
            key: "expectedArrival",
            valueType: "date",
          },
          {
            title: "Status",
            dataIndex: "rfqStatus",
            key: "rfqStatus",
          },
          {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
          },
          {
            title: "Unit Price",
            dataIndex: "price",
            key: "price",
          },
          {
            title: "total",
            render: (_, r) => !r.count && r.price * r.qty,
            key: "total",
          },
          {
            title: "Action",
            render: (k, r) =>
              !r.count && (
                <Space wrap size={1}>
                  {r.status == "null" || r.status == "clear" ? (
                    <>
                      <Tooltip title="Choose">
                        <Button
                          icon={<AimOutlined />}
                          type={"text"}
                          hidden={r.status == "chosen" || r.status == "clear"}
                          size="small"
                          onClick={() => {
                            countObjectsWithoutStatus(dataSource) == 1
                              ? message.info("no item to comparison")
                              : handleChoose(r);
                          }}
                        ></Button>
                      </Tooltip>
                      <Tooltip title="Clear">
                        <Button
                          icon={<CloseOutlined />}
                          type={"text"}
                          size="small"
                          hidden={r.status == "clear" || r.status == "chosen"}
                          onClick={() => handleClear(r)}
                        ></Button>
                      </Tooltip>
                    </>
                  ) : (
                    "Chosen"
                  )}
                </Space>
              ),
          },
        ]}
      />
    </FormLayout>
  );
};

export default Comparing;
