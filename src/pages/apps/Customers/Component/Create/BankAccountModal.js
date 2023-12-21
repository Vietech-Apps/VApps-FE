import { Button, Form, Input, Modal, Radio } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import FormComponent from "pages/Accounts/BankAccounts/FormComponent";
import { useEffect, useState } from "react";
const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  selectedData,
  loading,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      accountHolder: selectedData?._id,
      accountHolderName: selectedData?.title,
    });
  }, [selectedData]);
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      width={1000}
      confirmLoading={loading}
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
      <FormComponent form={form} selectedData={selectedData} />
    </Modal>
  );
};
const BankAccountModal = ({
  open,
  setOpen,
  selectedData,
  setBankAccounts,
  bankAccounts,
}) => {
  const [loading, setLoading] = useState(false);
  const onCreate = async (values) => {
    setLoading(true);
    try {
      const response = await jwtAxios.post(
        "accounts/BankAccount/create",
        values
      );
      successHandler(response);
      setLoading(false);
      setBankAccounts([...bankAccounts, response.data.result]);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <div>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        selectedData={selectedData}
        loading={loading}
      />
    </div>
  );
};
export default BankAccountModal;
