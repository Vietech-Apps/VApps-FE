import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Drawer, Form, Space } from "antd";

import { getIconByName } from "meta/common/AppIcons";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useState } from "react";
import TempleteForm from "./TempleteForm";

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Drawer
        title="Create a Template"
        width={500}
        onClose={onCancel}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              onClick={() => {
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
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <TempleteForm form={form} />
      </Drawer>
    </>
  );
};

const AddPanel = ({ panels, setPanels }) => {
  const [open, setOpen] = useState(false);

  const onCreate = async (values) => {
    try {
      const response = await jwtAxios.post("erp/estTemplate/create", values);
      successHandler(response);
      setPanels([...panels, response.data.result]);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
        icon={getIconByName("create")}
      >
        New Template
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
export default AddPanel;
