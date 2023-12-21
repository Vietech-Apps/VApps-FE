import { Form, Input, Select } from "antd";
import React from "react";
import { StyledCol, StyledRow } from "../FormFeilds/index.styled";

const Company = ({ form }) => {
  return (
    <Form form={form}>
      <StyledRow gutter={24}>
        <StyledCol md={12}>
          <Form.Item
            name="company"
            label="Company"
            tooltip="Registered Company Name"
            rules={[
              {
                required: true,
                message: "please input company name!",
              },
            ]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>
        </StyledCol>
        <StyledCol md={12} xs={12}>
          <Form.Item
            name="Site"
            hasFeedback
            initialValue={"Main Site"}
            label={"Site"}
            rules={[
              {
                required: true,
                message: "Search & select site!",
              },
            ]}
          >
            <Select
              allowClear={true}
              options={[{ value: "Main Site", label: "Main Site" }]}
              
            ></Select>
          </Form.Item>
        </StyledCol>
      </StyledRow>
    </Form>
  );
};

export default Company;
