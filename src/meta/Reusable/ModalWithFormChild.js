import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Tooltip } from "antd";
import { getIconByName } from "meta/common/AppIcons";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import React, { useState } from "react";
const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  confirmLoading,
  childern,
  title,
  width,
  bankAccounts,
  setBankAccounts,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title={title}
      okText="Create"
      width={width || 1200}
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
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
      {React.cloneElement(childern, { form, bankAccounts, setBankAccounts })}
    </Modal>
  );
};
const ModalWithFormChild = ({
  route,
  childern,
  title,
  tooltip,
  width,
  otherValues,
  size,
  icon,
  type,
  setRefreshing = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const onCreate = async (values) => {
    const data = {
      ...values,
      ...otherValues,
      bankAccounts: bankAccounts?.map((c) => c._id),
    };
    setConfirmLoading(true);
    try {
      const response = await jwtAxios.post(route, data);
      setConfirmLoading(false);
      successHandler2(response);
      setRefreshing(true);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setConfirmLoading(false);
      setOpen(false);
    }
  };
  return (
    <div>
      <Tooltip title={tooltip}>
        <Button
          type="text"
          className="add-select-btn"
          onClick={() => {
            setOpen(true);
          }}
          icon={icon || getIconByName("create")}
        />
      </Tooltip>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        confirmLoading={confirmLoading}
        childern={childern}
        setBankAccounts={setBankAccounts}
        bankAccounts={bankAccounts}
        title={title}
        width={width}
      />
    </div>
  );
};
export default ModalWithFormChild;
