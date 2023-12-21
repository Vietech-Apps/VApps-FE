import { Form, Input, Select } from "antd";
import React from "react";

const TempleteForm = ({ form, type = "" }) => {
  const { Option } = Select;
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          qty: 1,
          sheetType: "Ms Sheet",
          isImpCu: true,
          type: type,
        }}
      >
        <Form.Item name="type" label="Template Type">
          <Select>
            <Option value="Accessories">Accessories</Option>
            <Option value="Products">Products</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="panelType"
          label="Panel Type"
          rules={[
            {
              required: true,
              message: "Please select the type of panel!",
            },
          ]}
          className="collection-create-form_last-form-item"
        >
          <Select placeholder="type">
            <Option value="LV">LV</Option>
            <Option value="MV">MV</Option>
            <Option value="PDB">PDB</Option>
            <Option value="LDB">LDB</Option>
            <Option value="DB">DB</Option>
            <Option value="BTD">BTD</Option>
            <Option value="Cable Tray">Cable Tray</Option>
          </Select>
        </Form.Item>

        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TempleteForm;
