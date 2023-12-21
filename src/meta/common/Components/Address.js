import { Form, Input, Row, Select, Col } from "antd";
import React from "react";
import { StyledRow } from "../FormFeilds/index.styled";

import PhoneCodes from "../PhoneCodes";
import { StyledCol } from "./index.style";

const Address = ({ form }) => {
  return (
    <>
      <StyledRow gutter={[24]}>
        <StyledCol sm={12}>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "please input phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </StyledCol>

        <StyledCol sm={12}>
          <Form.Item name="address" label="Address">
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 3 }}
              showCount
              allowClear={true}
            />
          </Form.Item>
        </StyledCol>
        <StyledCol sm={6}>
          <Form.Item name="country" label="Country">
            <Select showSearch>
              {PhoneCodes.map((d, i) => (
                <Select.Option key={i} value={d.name}></Select.Option>
              ))}
            </Select>
          </Form.Item>
        </StyledCol>
        <StyledCol sm={6}>
          <Form.Item name="state" label="State/Province">
            <Select
              options={[
                { value: "Punjab", label: "Punjab" },
                { value: "KPK", label: "KPK" },
                { value: "AJK", label: "AJK" },
                { value: "Sindh", label: "Sindh" },
                { value: "Balochistan", label: "Balochistan" },
              ]}
            />
          </Form.Item>
        </StyledCol>
        <StyledCol sm={6}>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
        </StyledCol>
        <StyledCol sm={6}>
          <Form.Item name="postalCode" label="Zip/Postal Code">
            <Input />
          </Form.Item>
        </StyledCol>
      </StyledRow>
    </>
  );
};

export default Address;
