import { CopyOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Modal, Radio } from "antd";
import Vendor from "meta/JLayouts/CustomerComponent/Vendor";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import { useState } from "react";
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create Alternative"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      width={800}
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
        name="form_in_modal"
        initialValues={{
          isAlternative: true,
        }}
        autoComplete="off"
      >
        <Vendor
          form={form}
          modal={true}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
        <Form.Item name="isAlternative" valuePropName="checked">
          <Checkbox>Copy Products</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const Alternative = ({
  dataSource,
  data,
  alternative,
  setAlternative,
  form,
  value,
  setReqData,
}) => {
  const [open, setOpen] = useState(false);

  const onCreate = async (values) => {
    const filterdata = dataSource?.map((d) =>
      d.status === "chosen" || d.status === "clear"
        ? { ...d, status: "null" }
        : { ...d }
    );

    let newValues = form.getFieldsValue();
    delete newValues["vendor"];
    try {
      values.products = values.isAlternative == true ? filterdata : [];
      values.termCondation = value;
      values.alternativeId = data?._id;
      let newdata = { ...newValues, ...values };
      if (!data?.isAlternative) {
        const respon = await jwtAxios.put(`erp/RFQ/update/${data?._id}`, {
          isAlternative: true,
        });
        setReqData(respon.data.result);
      }
      const response = await jwtAxios.post("erp/RFQ/create", newdata);
      setOpen(false);
      setAlternative([...alternative, response.data.result]);
    } catch (error) {
      setOpen(false);
      errorHandler(error);
    }
  };

  return (
    <div>
      <Button
        type="link"
        icon={<CopyOutlined />}
        onClick={() => {
          !data?._id ? message.info("select vendor") : setOpen(true);
        }}
      >
        Alternative
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
export default Alternative;
