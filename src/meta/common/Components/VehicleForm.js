import { Form, Input, Row, Select, Col } from "antd";
import React from "react";
import ImageUpload from "../FormFeilds/ImageUpload";
import { StyledRow } from "../FormFeilds/index.styled";
import { normFile } from "../FormFeilds/normFile";

import { StyledCol2 } from "./index.style";

const VehicleForm = ({ form }) => {
  return (
    <>
      <StyledRow gutter={[24]}>
        <StyledCol2 sm={6}>
          <Form.Item name="grossWeight" label="Gross Weight">
            <Input />
          </Form.Item>
        </StyledCol2>
        <StyledCol2 sm={6}>
          <Form.Item name="tareWeight" label="Tare Weight">
            <Input />
          </Form.Item>
        </StyledCol2>{" "}
        <StyledCol2 sm={6}>
          <Form.Item name="netWeight" label="Net Weight">
            <Input disabled />
          </Form.Item>
        </StyledCol2>{" "}
        <StyledCol2 sm={6}>
          <Form.Item name="weightUnit" label="Weight Unit">
            <Select
              options={[
                { value: "Kgs", label: "Kgs" },
                { value: "Tonnes", label: "Tonnes" },
              ]}
            />
          </Form.Item>
        </StyledCol2>
        <StyledCol2 sm={6}>
          <Form.Item
            name="drivingLicense"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="Driving License"
          >
            <ImageUpload folder="company" name="Add" />
          </Form.Item>
        </StyledCol2>
        <StyledCol2 sm={6}>
          <Form.Item
            name="vehicleRegistration"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="Vehicle Registration"
          >
            <ImageUpload folder="company" name="Add" />
          </Form.Item>
        </StyledCol2>
        <StyledCol2 sm={6}>
          <Form.Item
            name="vehicleInsurance"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="Vehicle Insurance"
          >
            <ImageUpload folder="company" name="Add" />
          </Form.Item>
        </StyledCol2>
        <StyledCol2 sm={6}>
          <Form.Item
            name="other"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="Other Docs"
          >
            <ImageUpload folder="company" name="Add" />
          </Form.Item>
        </StyledCol2>
        <StyledCol2 sm={12}>
          <Form.Item name="transporterName" label="Transporter Name">
            <Input />
          </Form.Item>
        </StyledCol2>
        <StyledCol2 sm={12}>
          <Form.Item name="transporterNo" label="Transporter Phone">
            <Input />
          </Form.Item>
        </StyledCol2>
      </StyledRow>
    </>
  );
};

export default VehicleForm;
