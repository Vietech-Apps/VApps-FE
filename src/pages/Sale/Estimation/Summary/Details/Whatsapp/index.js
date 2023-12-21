import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useState } from "react";
import { StyledForm } from "./index.styled";
import successHandler from "meta/services/auth/successHandler";
import errorHandler from "meta/services/auth/errorHandler";

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      width={700}
      title="New Group"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <StyledForm form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input the phone Number!",
            },
          ]}
        >
          <Input placeholder="Phone Number (e.g. +1234567890)" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[
            {
              required: true,
              message: "Please input the Message!",
            },
          ]}
        >
          <Input.TextArea placeholder="Message" style={{ marginTop: "16px" }} />
        </Form.Item>
      </StyledForm>
    </Modal>
  );
};
const SendMessageForm = () => {
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    try {
      const response = await jwtAxios.post(`whatsapp/send-message`, values);
      successHandler(response);
      //  refreshTable();
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setOpen(false);
    }
  };

  return (
    <>
      <Button type="primary" shape="round" onClick={() => setOpen(true)}>
        Send WhatsApp Message
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
export default SendMessageForm;
