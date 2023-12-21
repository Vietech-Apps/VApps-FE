import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { useState } from "react";
import { dataInfo, route } from "./Codes";
import { useParams } from "react-router-dom";
import errorHandler from "meta/services/auth/errorHandler";
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Send for Approval"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      width={900}
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
          priority: "Medium",
        }}
      >
        <SelectSearch
          selectProps={{ mode: "multiple" }}
          key={1}
          fields={"title,email,whatsappNumber"}
          route={`admin/dsearch`}
          label={"Approval By"}
          name={"approvedBy"}
          formProps={{
            rules: [{ required: true, message: "Please select approval by!" }],
          }}
          columns={[
            { label: "Name", size: 4, field: "name" },
            { label: "Email", size: 4, field: "email" },
          ]}
          placeholder="search user"
        />
        <Form.Item
          name="scheduleDate"
          label="Schedule Date"
          rules={[{ required: true, message: "Please select date!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="priority" label="Priority">
          <Select
            options={[
              { label: "High", value: "High" },
              { label: "Low", value: "Low" },
              { label: "Medium", value: "Medium" },
            ]}
          />
        </Form.Item>
        <Form.Item name="notes" label="Notes">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const SendForApproval = ({ setSelected, selected }) => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const onCreate = async (values) => {
    try {
      const res = await jwtAxios.put(`${dataInfo.dataRoute}/approvedBy/${id}`, {
        approvedBy: values.approvedBy?.map((c) => ({
          user: c,
          notes: values.notes,
          scheduleDate: values.scheduleDate,
          priority: values.priority,
        })),
      });
      setSelected(res.data?.result);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setOpen(false);
    }
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
        hidden={selected?.status !== "Post"}
      >
        Send for Approval
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
export default SendForApproval;
