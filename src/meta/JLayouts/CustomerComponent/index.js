import {
  Collapse,
  Form,
  Row,
  Col,
  DatePicker,
  Input,
  Typography,
  Button,
  Space,
  Checkbox,
  Select,
} from "antd";
import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useGetData } from "meta/services/auth/ezAPI";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import CreateContact from "pages/apps/Customers/Component/Create/CreateContact";
import React, { useEffect, useState } from "react";

const CustomerComponent = ({ form, data, pageMetaData }) => {
  const { Text } = Typography;
  const checkStatus = Form.useWatch("sameAsBilling", form);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [sameAsBilling, setSameAsBilling] = useState();
  const handleSelect = (e, options) => {
    let filterCustomer = options?.find((d) => d._id == e);
    setSelectedCustomer(filterCustomer);
  };
  useEffect(() => {
    setSameAsBilling(checkStatus);
    setSelectedCustomer(data?.customer);
    form.setFieldsValue({
      customer: data?.customer?._id,
    });
  }, [checkStatus, data]);

  return (
    <>
      <StyledMetaForm
        form={form}
        layout=""
        size="small"
        labelCol={{
          flex: "100px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        initialValues={{
          sameAsBilling: true,
          billingAddress: data?.address,
          // customer: data?.customer?._id,
        }}
      >
        <Row gutter={12}>
          <Col xs={24} sm={16} md={16}>
            <span>
              <SelectSearch
                handleSelect={handleSelect}
                fields={"title,email,phone"}
                route={`meta/contact/dsearch`}
                label={"Customer"}
                name={`customer`}
                columns={[
                  { label: "Title", size: 24, field: "title" },
                  { label: "Email", size: 24, field: "email" },
                  // { label: "Phone", size: 3, field: "phone" },
                ]}
                placeholder="search customers"
                otherParams={{ _id: selectedCustomer?._id }}
                formProps={{
                  rules: [
                    {
                      required: true,
                      message: "Please select customers!",
                    },
                  ],
                  extra: selectedCustomer && (
                    <Space>
                      {selectedCustomer?.email ? (
                        <Text copyable>{selectedCustomer?.email}</Text>
                      ) : (
                        ""
                      )}
                      {selectedCustomer?.phone ? (
                        <Text copyable>{selectedCustomer?.phone}</Text>
                      ) : (
                        ""
                      )}
                    </Space>
                  ),
                }}
                newComponent={
                  <ModalWithFormChild
                    childern={<CreateContact modal={true} />}
                    route={"meta/contact/create"}
                    title={"Create a new Contact"}
                    tooltip={"Create a new Contact"}
                    // setRefreshing={setRefreshing}
                  />
                }
              />
            </span>
            <Form.Item
              name="billingAddress"
              label={<Text strong>Billing Address</Text>}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="sameAsBilling"
              onChange={(e) => setSameAsBilling(e.target.checked)}
              valuePropName="checked"
              label="Shipp Same as Billing"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            {sameAsBilling == false && (
              <Form.Item
                name="shippingAddress"
                label={<Text strong>Shipping Address</Text>}
              >
                <Input.TextArea />
              </Form.Item>
            )}
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Form.Item
              name="orderDate"
              label={<Text strong>Order Date</Text>}
              rules={[{ required: true, message: "Order Date is required" }]}
            >
              <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="expectedShipmentDate"
              label={<Text strong>Ship Date</Text>}
            >
              <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="expirationDate"
              label={<Text strong>Expiration Date</Text>}
            >
              <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="reference" label={<Text strong>Ref No</Text>}>
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </StyledMetaForm>
    </>
  );
};

export default CustomerComponent;
