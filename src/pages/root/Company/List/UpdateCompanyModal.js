import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio, Select } from "antd";
import ImageUpload from "meta/common/FormFeilds/ImageUpload";
import { normFile } from "meta/common/FormFeilds/normFile";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useEffect, useState } from "react";
const CollectionCreateForm = ({ open, onCreate, onCancel, record }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(record ? { ...record } : {});
  }, [record]);
  return (
    <Modal
      open={open}
      title="Update Company Detail"
      okText="Update"
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Company Name"
          rules={[
            {
              required: true,
              message: "Please input the company Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="taxationType"
          hasFeedback
          label={"Taxation Type"}
          tooltip="If Taxation Type set GST,then invoice while be 'Tax Invoice' otherwise invoice will be 'Bill Of Supply'"
          rules={[
            {
              required: true,
              message: "Search & select customer!",
            },
          ]}
        >
          <Select
            defaultValue={"GST"}
            allowClear={true}
            options={[
              { value: "GST", label: "GST" },
              { value: "Non GST", label: "Non GST" },
              {
                value: "Composition Scheme",
                label: "Composition Scheme",
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item name="ntn" label="NTN">
          <Input placeholder="NTN" />
        </Form.Item>
        <Form.Item
          name="logo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          label=" "
        >
          <ImageUpload folder="company" name="Logo" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const UpdateCompanyModal = ({ record, refreshTable }) => {
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    try {
      const response = await jwtAxios.put(
        `meta/company/profile/update/${record._id}`,
        values
      );
      successHandler(response);
      refreshTable();
      setOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <div>
      <EditOutlined
        onClick={() => {
          setOpen(true);
        }}
      />
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        record={record}
      />
    </div>
  );
};
export default UpdateCompanyModal;
