import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Select,
  Col,
  Input,
  InputNumber,
  Divider,
  Space,
  Typography,
  Checkbox,
  Tabs,
  message,
  Result,
} from "antd";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppRowContainer } from "meta";
import { getData, postAndGetData } from "meta/common/Apis";
import TextArea from "antd/es/input/TextArea";
import QRCode from "react-qr-code";
import ImageUpload from "meta/common/FormFeilds/ImageUpload";
import { normFile } from "meta/common/FormFeilds/normFile";

import { useGetData } from "meta/services/auth/ezAPI";
import InventoryData from "./InventoryData";
import DynamicSelect from "meta/JLayouts/DynamicSelect";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import { useAuthUser } from "meta/utility/AuthHooks";

const { Option } = Select;

const CreateProduct = ({ form, selectedData, setSelectedData, modal }) => {
  const { id } = useParams();
  const { user } = useAuthUser();
  const [{ apiData: setting }] = useGetData(
    `accounts/GeneralSetting/readByCompany/${user?.currLocation?.parentCompany?._id}`,
    {}
  );
  console.log(setting);
  const [{ apiData: companies }] = useGetData(`meta/company/profile/list`, []);
  useEffect(() => {
    if (id && !modal) getData(`erp/product/read/${id}`, setSelectedData);
  }, []);

  const {
    make,
    incomeAccount,
    expenseAccount,
    purchaseUom,
    uom,
    company,
    tax,
    purchaseTax,
    ...other
  } = selectedData ? selectedData : {};
  useEffect(() => {
    form.setFieldsValue({
      incomeAccount:
        incomeAccount?._id || setting?.stockValuationIncAccount?._id,
      expenseAccount:
        expenseAccount?._id || setting?.stockValuationExpAccount?._id,
      uom: uom?._id,
      company: company?._id || setting?.company?._id,
      purchaseUom: purchaseUom?._id,
      tax: tax?._id || setting?.salesTax?._id,
      purchaseTax: purchaseTax?._id || setting?.purchaseTax?._id,
      make: make?._id,
      ...other,
    });
  }, [selectedData, setting]);

  const items = [
    {
      label: `Product Info`,
      key: 1,
      children: (
        <AppRowContainer gutter="24">
          <Col xs={24} md={12}>
            <Form.Item
              hasFeedback
              bordered={true}
              label={<b>Product Type</b>}
              className="form-field"
              name="type"
            >
              <Select bordered={true} placeholder="Select Product Type">
                <Option key={2} value="Storable">
                  Storable
                </Option>
                <Option key={1} value="Consumable">
                  Consumable
                </Option>
                <Option key={3} value="Service">
                  Service
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="salePrice"
              //rules={[{ required: true, message: "Enter product price!" }]}
              label={<b>Sale Price</b>}
            >
              <InputNumber
                bordered={true}
                placeholder="Price"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="purchasePrice"
              bordered={true}
              label={<b>Purchase Price</b>}
            >
              <InputNumber
                bordered={true}
                placeholder="Purchase Price"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <SelectSearch
              fields={"taxName"}
              route={"erp/tax/dsearch"}
              label={"Sale Tax"}
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
              placeholder="search purchase tax"
            />
            <Form.Item name="company" label="Company">
              <Select
                showSearch
                mode="multiple"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {companies?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              hasFeedback
              label={<b>Tags</b>}
              className="form-field"
              name="tags"
              // rules={[{ required: true, message: "Select product Tag" }]}
            >
              <DynamicSelect endpoint="productTags" label="Tags" />
            </Form.Item>
            <Form.Item
              hasFeedback
              label={<b>Make</b>}
              className="form-field"
              name="make"
              rules={[{ required: true, message: "Select product make name" }]}
            >
              <DynamicSelect path="erp/make" label="Make" />
            </Form.Item>
            <Form.Item
              hasFeedback
              label={<b>Model</b>}
              className="form-field"
              name="model"
            >
              <Input
                bordered={true}
                placeholder="Model"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              label={<b>Category</b>}
              className="form-field"
              name="category"
            >
              <DynamicSelect
                path="erp/category"
                endpoint="product"
                label="Category"
              />
            </Form.Item>
            <Form.Item name="code" label={<b>Vendor Code</b>}>
              <Input
                bordered={true}
                placeholder="Code"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <SelectSearch
              fields={"name"}
              route={"erp/UOM/wsearch"}
              label={"UOM"}
              name={"uom"}
              columns={[{ label: "Name", size: 10, field: "name" }]}
              placeholder="search uom"
              where={{ _id: uom?._id }}
            />
            <SelectSearch
              fields={"name"}
              route={"erp/UOM/wsearch"}
              label={"Purchase UOM"}
              name={"purchaseUom"}
              columns={[{ label: "Name", size: 10, field: "name" }]}
              placeholder="search uom"
              where={{ _id: purchaseUom?._id }}
            />
          </Col>
        </AppRowContainer>
      ),
    },
    {
      label: `Features`,
      key: 2,
      children: (
        <AppRowContainer>
          <Col xs={24} md={24}>
            <Form.List name="variant">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "attribute"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing attribute",
                          },
                        ]}
                      >
                        <DynamicSelect
                          endpoint="productVarient"
                          label="Varient"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing value",
                          },
                        ]}
                      >
                        <Input placeholder="Value" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "addedCost"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Extra Price",
                          },
                        ]}
                      >
                        <InputNumber placeholder="Extra Price" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Variant
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </AppRowContainer>
      ),
    },
    {
      label: `Sale info`,
      key: 3,
      children: (
        <AppRowContainer>
          {/* <Col md={8}>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              label="Sale Account"
              name="saleAccount"
              hasFeedback
            >
              <Select>
                <Option value="Accounts">Accounts</Option>
              </Select>
            </Form.Item>
          </Col> */}
          <Col md={4}>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              label="Sale Discount%"
              name="saleDiscount"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              label="sale Information"
              name="saleInformation"
              hasFeedback
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </AppRowContainer>
      ),
    },
    {
      label: `Purchase info`,
      key: 4,
      children: (
        <AppRowContainer>
          {/* <Col md={8}>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              label="Purchase Account"
              name="purchaseAccount"
              hasFeedback
            >
              <Select>
                <Option valu="Accounts">Accounts</Option>
              </Select>
            </Form.Item>
          </Col> */}
          <Col md={4}>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              label="Purchase Discount%"
              name="purchaseDiscount"
              hasFeedback
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              label="Purchase Information"
              name="purchaseInformation"
              hasFeedback
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </AppRowContainer>
      ),
    },
    {
      label: `Accounts info`,
      key: 5,
      children: (
        <AppRowContainer>
          <Col md={12}>
            RECEIVEABLES
            <SelectSearch
              fields={"name,code"}
              route={`erp/chartOfAccounts/wsearch`}
              label={"Income Account"}
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

          <Col md={12}>
            PAYABLES
            <SelectSearch
              fields={"name,code"}
              route={`erp/chartOfAccounts/wsearch`}
              label={"Expense Account"}
              name={`expenseAccount`}
              columns={[
                { label: "Name", size: 12, field: "name" },

                { label: "code", size: 12, field: "code" },
              ]}
              where={{ accountType: "Expense" }}
              placeholder="search expense acounts"
            />
          </Col>
        </AppRowContainer>
      ),
    },
    {
      label: `Inventory`,
      key: 6,
      children: (
        <AppRowContainer>
          <Col md={8}>
            <Form.Item
              labelCol={{
                span: 8,
              }}
              label="Min stock level"
              name="minStock"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              labelCol={{
                span: 8,
              }}
              label="Max stock level"
              name="maxStock"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col md={24}>
            {/* only rendering inventory data if selectedData is not undefined */}
            {selectedData && <InventoryData form={form} data={selectedData} />}
          </Col>
        </AppRowContainer>
      ),
    },
  ];
  const productName = Form.useWatch("name", form);
  if (!setting) {
    return <Result />;
  } else {
    return (
      <StyledMetaForm
        name="validate_other"
        layout="horizantal"
        autoComplete="off"
        labelCol={{
          span: 6,
        }}
        form={form}
      >
        <AppRowContainer gutter="24">
          <Col xs={24} md={12}>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              name="name"
              rules={[{ required: true, message: "Enter the product name" }]}
              label={<b>Product Name</b>}
            >
              <Input.TextArea
                style={{
                  color: "#135200",
                  fontSize: "24px",
                  fontFamily: "sans-serif",
                }}
                bordered={true}
                autoSize={{ minRows: 1, maxRows: 3 }}
                placeholder="Product Name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item name="barcode" label={<b>Barcode</b>}>
              <Input
                bordered={true}
                placeholder="Barcode"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={4}>
            <Form.Item
              name="picture"
              // label={" "}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <ImageUpload maxCount={2} name="Picture" folder="product" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={4}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "50%", width: "50%" }}
              value={productName ? productName : "vieTech.pro"}
              viewBox={`0 0 256 256`}
            />
          </Col>
        </AppRowContainer>
        <AppRowContainer gutter="24">
          <Col xs={24} md={12}>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              name="detail"
              label={<b>Details</b>}
            >
              <Input.TextArea
                rows={5}
                placeholder="Any details"
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={4}>
            <Form.Item name="isPurchased" valuePropName="checked">
              <Checkbox value="isPurchased">Purchase Eligibility</Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={4}>
            <Form.Item name="isSold" valuePropName="checked">
              <Checkbox value="isSold">Sale Eligibility</Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={4}>
            <Form.Item name="isExpensed" valuePropName="checked">
              <Checkbox>Expensable</Checkbox>
            </Form.Item>
          </Col>
        </AppRowContainer>
        <Tabs defaultActiveKey={1} type="card" items={items} />
      </StyledMetaForm>
    );
  }
};

export default CreateProduct;
