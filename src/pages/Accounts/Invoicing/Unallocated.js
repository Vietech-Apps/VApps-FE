import { Button, Checkbox, Form, Input, InputNumber, Modal, Radio } from "antd";
import { calculateItemTotals } from "meta/common/MyFns";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import moment from "moment";
import { useEffect, useState } from "react";
const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  selected,
  dataSource,
  form,
  loading,
  allocateData,
}) => {
  const calculateTotal = calculateItemTotals(dataSource).totalAmount;

  return (
    <Modal
      open={open}
      title={`${allocateData.cuId} - ${selected?.cuId}`}
      okText="Allocate"
      cancelText="Cancel"
      width={620}
      onCancel={onCancel}
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name={"allocate"}
          extra={`${allocateData?.unallocated?.toFixed(
            0
          )} -${calculateTotal?.toFixed(2)}=${
            allocateData?.unallocated - calculateTotal
          }`}
          label={"Allocate"}
          initialValue={
            allocateData?.unallocated > calculateTotal
              ? calculateTotal?.toFixed(2)
              : allocateData?.unallocated?.toFixed(2)
          }
        >
          <InputNumber min={0} style={{ width: "100%" }} max={calculateTotal} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Unallocated = ({
  selected,
  dataSource,
  setSelected,
  allocateData,
  open,
  setOpen,
  route,
}) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const onCreate = async (values) => {
    setLoading(true);

    values.allocateData = allocateData;
    try {
      const res = await jwtAxios.put(route, values);
      setSelected(res.data.result);
      successHandler2(res);
      setLoading(false);
      setOpen(false);
      form.resetFields();
    } catch (error) {
      errorHandler(error);
      setLoading(false);
      setOpen(false);
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
        selected={selected}
        dataSource={dataSource}
        form={form}
        loading={loading}
        allocateData={allocateData}
      />
    </div>
  );
};
export default Unallocated;
