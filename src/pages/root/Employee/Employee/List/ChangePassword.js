import { Button, Form, Input, Modal, Radio } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      centered
      open={open}
      title="Change Password"
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
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "password required",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const ChangePassword = ({ data, isProfile }) => {
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    try {
      const response = await jwtAxios.patch(
        `admin/password-update/${data._id}`,
        values
      );

      successHandler(response);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setOpen(false);
    }
  };
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        type="text"
        size="small"
        icon={<RiLockPasswordLine key={"password"} />}
      >
        {isProfile && "Change Password"}
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
export default ChangePassword;
