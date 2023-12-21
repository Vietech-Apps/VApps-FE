import { Col, Form, Input, message, Modal, Row, Select, Checkbox } from "antd";
import React, { useState } from "react";
import jwtAxios from "meta/services/auth/jwt-api";

import { useAuthUser } from "meta/utility/AuthHooks";

const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  selectedData,
  formList,
  width,
  title,
  loading,
  open,
}) => {
  const [form] = Form.useForm();
  React.useEffect(() => {
    form.setFieldsValue(
      selectedData
        ? {
            ...selectedData,
          }
        : {}
    );
  }, [selectedData]);
  const { Option } = Select;
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    errorInfo.errorFields.map((p) => message.error(p.errors[0]));
  };
  return (
    <Modal
      width={width}
      open={visible}
      title={selectedData ? `Update ${title}` : `Create ${title}`}
      okText={selectedData ? "Update" : "Create"}
      cancelText="Cancel"
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
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={12}>
          {formList?.map((p) => (
            <React.Fragment key={p.id}>
              {p.type == 1 && (
                <Col xs={p.xs} sm={p.md} md={p.sm}>
                  <Form.Item
                    name={p.name}
                    label={p.label}
                    rules={[
                      {
                        required: p.required,
                        message: `Please input the ${p.message}!`,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              )}
              {p.type == 2 && (
                <Col xs={p.xs} sm={p.md} md={p.sm}>
                  <Form.Item
                    name={p.name}
                    label={p.label}
                    rules={[
                      {
                        required: p.required,
                        message: `Please input the ${p.message}!`,
                      },
                    ]}
                  >
                    <Select>
                      {p.select?.map((d) => (
                        <Option value={d.value} key={d.id}>
                          {d.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {p.type == 3 && (
                <Col xs={p.xs} sm={p.md} md={p.sm}>
                  <Form.Item name={p.name} label={p.label}>
                    <Checkbox />
                  </Form.Item>
                </Col>
              )}
              {p.type == "Input.TextArea" && (
                <Col xs={p.xs} sm={p.md} md={p.sm}>
                  <Form.Item name={p.name} label={p.label}>
                    <Input.TextArea rows={p.rows} />
                  </Form.Item>
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>
      </Form>
    </Modal>
  );
};

const ModalForm = ({
  listData,
  setListData,
  selectedData,
  route,
  title,
  width,
  formList,
  visible,
  setVisible,
}) => {
  const { user } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const onCreate = async (values) => {
    try {
      setLoading(true);
      values.createdBy = user._id;
      const response = await jwtAxios.post(`/${route}/create`, values);
      if (response.data.success === true) {
        setListData([...listData, response.data.result]);
        setLoading(false);
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
      setLoading(false);
    }
  };

  const OnUpdate = async (values) => {
    try {
      const response = await jwtAxios.patch(
        `/${route}/update/${selectedData?._id}`,
        values
      );
      const filterData = listData.filter((p) => p._id !== selectedData._id);
      setListData(filterData);
      setListData((d) => [...d, response.data.result]);
      message.success(response.data.message);
      setVisible(false);
    } catch (error) {
      message.error(error.response.data.message);
      setLoading(false);
      setVisible(false);
    }
  };

  return (
    <div>
      {visible && (
        <CollectionCreateForm
          visible={visible}
          onCreate={selectedData ? OnUpdate : onCreate}
          onCancel={() => {
            setVisible(false);
          }}
          selectedData={selectedData}
          formList={formList}
          width={width}
          title={title}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ModalForm;
