import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Tooltip,
} from "antd";
import moment from "moment";
import jwtAxios from "meta/services/auth/jwt-api";
import { getData } from "meta/common/Apis";
import React, { useState } from "react";
import { useEffect } from "react";
import { StyledForm } from "./index.styled";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import successHandler from "meta/services/auth/successHandler";
import errorHandler from "meta/services/auth/errorHandler";

const CollectionCreateForm = ({ open, onCreate, onCancel, users, value }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <Modal
      open={open}
      width={700}
      title="Assign Task"
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
        initialValues={
          value?.assignTo?.length > 0
            ? {
                assignTo: value.assignTo?.map((p) => p._id),
                industryType: value.industryType,
                priority: value.priority,
              }
            : { industryType: "Infrastructure" }
        }
      >
        {!value.assignTo && (
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item name="assignTo" label="AssignTo">
          <Select
            placeholder="Select person to assign "
            mode="multiple"
            showSearch
            filterOption={(input, option) =>
              option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            loading={users ? false : true}
          >
            {users?.map((p) => (
              <Option value={p._id} key={p._id}>
                {`${p.name} ${p.lastName}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="form-field" name="dueDate" label="Due Date">
          <DatePicker
            disabledDate={(current) => {
              return moment().add(-1, "days") >= current;
            }}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item className="form-field" name="priority" label="Priority">
          <Select placeholder={"Priority"}>
            <Option value={"High"}>High</Option>
            <Option value={"Medium"}>Medium</Option>
            <Option value={"Low"}>Low</Option>
          </Select>
        </Form.Item>

        {!value.assignTo && (
          <Form.Item name="industryType">
            <Radio.Group>
              <Radio value="Infrastructure">Infrastructure</Radio>
              <Radio value="Industry">Industry</Radio>
            </Radio.Group>
          </Form.Item>
        )}

        <Form.Item
          className="form-field"
          name="description"
          label="Description"
        >
          <Input.TextArea
            placeholder={"description"}
            autoSize={{ minRows: 2, maxRows: 5 }}
            showCount
          />
        </Form.Item>
      </StyledForm>
    </Modal>
  );
};
const AddAssign = ({ value, hidden, refreshTable }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const onCreate = async (values) => {
    try {
      const response = await jwtAxios.put(
        `erp/Estimation/assign/${value._id}`,
        values
      );
      successHandler(response);
      refreshTable();
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setOpen(false);
    }
  };

  useEffect(() => {
    getData(`admin/alllist`, setUsers);
  }, []);
  return (
    <>
      <Button
        hidden={hidden}
        type="text"
        size="small"
        onClick={() => {
          setOpen(true);
        }}
        icon={<UserAddOutlined />}
      />

      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        users={users}
        value={value}
      />
    </>
  );
};
export default AddAssign;
