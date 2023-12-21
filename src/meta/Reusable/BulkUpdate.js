import React, { useState } from "react";
import {
  Space,
  Table,
  Button,
  Form,
  InputNumber,
  Select,
  Popconfirm,
  Tooltip,
} from "antd";
import { NetPanel, productCost } from "meta/Reusable/CalcData";
import { useGetData } from "meta/services/auth/ezAPI";
import { CloseOutlined } from "@ant-design/icons";

const BulkUpdate = ({
  selectedRowKeys,
  selectedRows,
  products,
  setProducts,
  setPanels,
  estimation,
  panelDetail,
  onCleanSelected,
}) => {
  const [form] = Form.useForm();
  const handleUpdate = async (data) => {
    let newdata = selectedRows?.map((d) => ({
      key: d?.key,
      _id: d?._id || null,
      code: d.type == 1 ? d?.code : null,
      name: d?.name,
      type: d.type,
      productId: d.productId || null,
      price: d.type == 1 ? data?.price || d.price : 0,
      discount: d.type == 1 ? data?.discount || d.discount : null,
      qty: data?.qty || d.qty,
      panelCount: d.panelCount,
      make: d.type == 1 ? d.make : "",
      model: d.type == 1 ? data?.model || d.model : "",
      makeId: d.type == 1 ? d.makeId : null,
      currency: d.type == 1 ? data?.currency || d.currency : null,
      save: "Need Save",
    }));

    let updatedData = products?.map((d) => {
      const newDataItem = newdata.find((n) => n.key === d.key);
      return newDataItem ? newDataItem : d;
    });
    setProducts(updatedData);
    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          const updatedPanel = {
            ...panel,
            save: (panel.save || 0) + 1,
            pCost: productCost(updatedData, estimation),
            products: updatedData,
          };
          const panelCost = NetPanel(estimation, updatedPanel);
          return {
            ...updatedPanel,
            panelCost,
          };
        }
        return panel;
      }),
    ]);
  };

  return (
    <Space size={1}>
      <Form
        form={form}
        layout="inline"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Form.Item label="Disc (%)" name="discount">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Qty" name="qty">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Currency" name="currency" hasFeedback>
          <Select placeholder="currency">
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="Rs">Rs</Select.Option>
            <Select.Option value="EURO">EURO</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <Space size={2}>
        {" "}
        <Popconfirm
          placement="topLeft"
          title={`Are you sure you want to update the selected ${selectedRowKeys?.length}  products?`}
          onConfirm={() => handleUpdate(form.getFieldsValue())}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" size="small">
            update
          </Button>
        </Popconfirm>
        <Button
          size="small"
          onClick={() => onCleanSelected()}
          icon={<CloseOutlined />}
        ></Button>
      </Space>
    </Space>
  );
};

export default BulkUpdate;
