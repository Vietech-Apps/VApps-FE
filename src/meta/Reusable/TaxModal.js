import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Radio, Tooltip } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new tax "
      okText="Create"
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
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="taxName"
          label="Tax Name"
          rules={[
            {
              required: true,
              message: "Please input the tax name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="taxRate"
          label="Tax Rate(%)"
          rules={[
            {
              required: true,
              message: "Please input the tax rate!",
            },
          ]}
          initialValue={0}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const TaxModal = ({}) => {
  const [tax, setTax] = useState();
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    try {
      const response = await jwtAxios.post("erp/tax/create", values);
      setTax([...tax, response.data.result]);
      successHandler(response);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setOpen(false);
    }
  };
  return (
    <>
      <Tooltip key={4} color="cyan" title="Add new Tax Type">
        <Button
          size="small"
          type="text"
          onClick={() => {
            setOpen(true);
          }}
          icon={<BiAddToQueue />}
        />
      </Tooltip>

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
export default TaxModal;
