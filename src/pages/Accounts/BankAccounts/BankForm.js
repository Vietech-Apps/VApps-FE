import { Col, Form, Input, Row, Select } from "antd";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import React from "react";

const BankForm = ({ form }) => {
  return (
    <StyledMetaForm
      form={form}
      size="small"
      layout="vertical"
      name="form_in_modal"
      initialValues={{
        modifier: "public",
      }}
    >
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="bankIdentifierCode" label="Bank Identifier Code">
            <Input />
          </Form.Item>
          <Form.Item name="street" label="Bank Address">
            <Input placeholder="Street" />
          </Form.Item>
          <Form.Item name="street2">
            <Input placeholder="Street2" />
          </Form.Item>
          <Row gutter={12}>
            <Col xs={24} sm={8}>
              <Form.Item name="city">
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="state">
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="zip">
                <Input placeholder="Zip" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="country">
            <Input placeholder="Country" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                pattern: /^\d{10}$/,
                message: "Please input the Phone Number!",
                type: Number,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </StyledMetaForm>
  );
};

export default BankForm;
