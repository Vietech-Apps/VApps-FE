import { Button, Form, Input, Modal, Radio } from "antd";
import VendorComponent from "meta/JLayouts/CustomerComponent/VendorComponent";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import { useState } from "react";
const CollectionCreateForm = ({ open, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();
  const [selectedCustomer, setSelectedCustomer] = useState();
  return (
    <Modal
      width={1100}
      confirmLoading={loading}
      open={open}
      title="Create a new collection"
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
      <VendorComponent
        form={form}
        setSelectedCustomer={setSelectedCustomer}
        selectedCustomer={selectedCustomer}
      />
    </Modal>
  );
};
const VendorModal = ({
  selectedRows,
  selectedSo,
  setRelatedRFQ,
  relatedRFQ,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    setLoading(true);
    values.products = selectedRows;
    values.so = selectedSo?._id;
    try {
      const response = await jwtAxios.post(`erp/RFQ/create`, values);
      successHandler2(response);
      setLoading(false);

      setRelatedRFQ([...relatedRFQ, response.data.result]);
      //   setData(response.data.result);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create RFQ with selected Products
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        loading={loading}
      />
    </div>
  );
};
export default VendorModal;
