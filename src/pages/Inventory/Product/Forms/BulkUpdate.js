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
  Row,
  Col,
} from "antd";
import { updateAllDocuments } from "meta/common/MyFns";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";

const OtherComponent = ({
  selectedRowKeys,
  selectedRows,
  onCleanSelected,
  deleteDocuments,
  setLoading,
  refreshTable,
  form,
}) => {
  const [visible, setVisible] = useState(false);
  const handleUpdate = async (route, data, all) => {
    all
      ? await updateAllDocuments(route, setLoading, data)
      : await deleteDocuments(route, selectedRowKeys, setLoading, data);
    refreshTable();
    onCleanSelected();
    setVisible(false);
    form.resetFields();
  };

  return (
    <Space size={2}>
      <StyledMetaForm form={form} layout="vertical">
        <Row gutter={12}>
          <Col md={8}>
            <Form.Item label="S.Disc (%)" name="saleDiscount">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item label="P.Disc (%)" name="purchaseDiscount">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col md={8}>
            <Form.Item label="S.Price" name="salePrice">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item label="P.Price" name="purchasePrice">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col md={8}>
            <SelectSearch
              fields={"taxName"}
              route={"erp/tax/dsearch"}
              label={"Tax"}
              name={"tax"}
              columns={[
                {
                  label: "Name",
                  size: 10,
                  accessor: (c) => c.taxRate + "%" + c.taxName,
                },
              ]}
              placeholder="search tax"
            />
          </Col>
          <Col md={8}>
            <SelectSearch
              fields={"taxName"}
              route={"erp/tax/dsearch"}
              label={"Purchase Tax"}
              name={"purchaseTax"}
              columns={[
                {
                  label: "Name",
                  size: 10,
                  accessor: (c) => c.taxRate + "%" + c.taxName,
                },
              ]}
              placeholder="search tax"
            />
          </Col>
          <Col md={8}>
            <Form.Item label="Currency" name="currency" hasFeedback>
              <Select placeholder="currency">
                <Select.Option value="$USD">$USD</Select.Option>
                <Select.Option value="Rs">Rs</Select.Option>
                <Select.Option value="€EUR">€EUR</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={8}>
            <SelectSearch
              fields={"name"}
              route={"erp/UOM/wsearch"}
              label={"Purc.UOM"}
              name={"purchaseUom"}
              columns={[{ label: "Name", size: 10, field: "name" }]}
              placeholder="search uom"
            />
          </Col>
          <Col md={8}>
            <SelectSearch
              fields={"name"}
              route={"erp/UOM/wsearch"}
              label={"UOM"}
              name={"uom"}
              columns={[{ label: "Name", size: 10, field: "name" }]}
              placeholder="search uom"
            />
          </Col>
          <Col md={8}>
            <SelectSearch
              fields={"name,code"}
              route={`erp/chartOfAccounts/wsearch`}
              label={"Inc.Account"}
              name={`incomeAccount`}
              columns={[
                { label: "Name", size: 12, field: "name" },
                // { label: "Ty", size: 24, field: "type" },
                { label: "code", size: 12, field: "code" },
              ]}
              where={{ accountType: "Income" }}
              placeholder="search income acounts"
            />
          </Col>
          <Col md={8}>
            <SelectSearch
              fields={"name,code"}
              route={`erp/chartOfAccounts/wsearch`}
              label={"Exp.Account"}
              name={`expenseAccount`}
              columns={[
                { label: "Name", size: 12, field: "name" },

                { label: "code", size: 12, field: "code" },
              ]}
              where={{ accountType: "Expense" }}
              placeholder="search expense acounts"
            />
          </Col>
          <Col md={8}>
            <Form.Item name="qty" label="Qty">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Space>
              <Popconfirm
                placement="topLeft"
                title={`Are you sure you want to update the selected products?`}
                onConfirm={() =>
                  handleUpdate("erp/product/bulk/update", form.getFieldsValue())
                }
                okText="Yes"
                cancelText="No"
              >
                <Tooltip
                  color="gray"
                  title={`Change in ${selectedRowKeys?.length} Selected products`}
                >
                  <Button type="primary">
                    Update {selectedRowKeys?.length} Item
                  </Button>
                </Tooltip>
              </Popconfirm>
              <Popconfirm
                placement="bottomLeft"
                title={`Are you sure you want to update the all products?`}
                onConfirm={() =>
                  handleUpdate(
                    "erp/product/bulk/all",
                    form.getFieldsValue(),
                    "all"
                  )
                }
                okText="Yes"
                cancelText="No"
              >
                <Tooltip color="gray" title={`Change in all Products`}>
                  <Button type="primary">Update All</Button>
                </Tooltip>
              </Popconfirm>
              {selectedRows.filter((p) => p.removed === true).length > 0 && (
                <Popconfirm
                  placement="topLeft"
                  title="Are you sure you want to Enable the selected products?"
                  onConfirm={() =>
                    handleUpdate("erp/product/bulk/update", {
                      removed: false,
                    })
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">Enabled</Button>
                </Popconfirm>
              )}
              {selectedRows.filter((p) => p.removed === false).length > 0 && (
                <Popconfirm
                  placement="topLeft"
                  title="Are you sure you want to Disable the selected products?"
                  onConfirm={() =>
                    handleUpdate("erp/product/bulk/update", { removed: true })
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">Disabled</Button>
                </Popconfirm>
              )}
            </Space>
          </Col>
        </Row>
      </StyledMetaForm>
    </Space>
  );
};

export default OtherComponent;
