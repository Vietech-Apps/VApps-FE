import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useState } from "react";
import { StyledForm } from "./index.styled";
import { UserOutlined } from "@ant-design/icons";
import successHandler from "meta/services/auth/successHandler";
import errorHandler from "meta/services/auth/errorHandler";

const CollectionCreateForm = ({ open, onCreate, onCancel, users }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

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
      <StyledForm
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={
        //   value?.assignTo.length > 0
        //     ? {
        //         assignTo: value.assignTo?.map((p) => p._id),
        //         industryType: value.industryType,
        //       }
        //     : { industryType: "Infrastructure", priority: priorityList[1] }
        // }
      >
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

        <Form.Item name="users" label="Users">
          <Select
            placeholder="Select users"
            mode="multiple"
            loading={users ? false : true}
          >
            {users?.map((p) => (
              <Option value={p._id} key={p._id}>
                {p.name} {p.lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </StyledForm>
    </Modal>
  );
};
const AddGroupChat = ({ users }) => {
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    try {
      const response = await jwtAxios.post(`chat/group`, values);
      successHandler(response);
      //  refreshTable();
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setOpen(false);
    }
  };

  return (
    <div>
      <Tooltip title="Create New Group" color="cyan">
        <Button
          onClick={() => {
            setOpen(true);
          }}
          type="dashed"
        >
          Create Group
        </Button>
      </Tooltip>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        users={users}
      />
    </div>
  );
};
export default AddGroupChat;
