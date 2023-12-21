import { Form, Input } from "antd";
import React from "react";
import { StyledMailModalTextArea } from "../../Sale/Quotation/index.styled";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";

const TermForm = ({ form, modal, value, setValue }) => {
  return (
    <StyledMetaForm form={form}>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      {!modal && (
        <Form.Item name="content">
          <StyledMailModalTextArea
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder={"term and conditions"}
          />
        </Form.Item>
      )}
    </StyledMetaForm>
  );
};

export default TermForm;
