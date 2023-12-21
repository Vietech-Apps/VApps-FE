import React, { useState, useEffect } from "react";
import { Max_Level, dataInfo, staticAccounts } from "../Codes";
import { Button, Checkbox, Col, Form, Input, Row, Select, Modal } from "antd";
import {
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import { getData } from "meta/common/Apis";
import { CheckOutlined, CloseOutlined, EditFilled } from "@ant-design/icons";
import DynamicCascader from "../DynamicCascader";
const ChatAccountsModal = ({ id, FetchData, visible = false, setVisible }) => {
  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [accountsData, setAccountsData] = useState();
  const [disableReconciliationSwitch, setDisableReconciliationSwitch] =
    useState(false);

  const [refresh, setRefresh] = useState();
  const { accountCategory, ...others } = selected ? selected : {};

  const parent = Form.useWatch("cascader", form);
  useEffect(() => {
    if (parent && parent.length > 0) {
      if (accountsData)
        form.setFieldsValue({
          accountCategory: accountsData?.find((item) => item._id == parent[0])
            ?.accountCategory,
        });
      else
        form.setFieldsValue({
          accountCategory: accountCategory,
        });
    } else {
      if (!id)
        form.setFieldsValue({
          accountCategory: null,
        });
      else
        form.setFieldsValue({
          accountCategory: accountCategory,
        });
    }
  }, [parent]);

  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setSelected);
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      accountCategory,
      ...others,
    });
  }, [selected]);

  const handleSubmit = async () => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {
        parent: parent ? parent[parent?.length - 1] : null,
      },
      setLoading
    );
    setRefresh(true);
    form.resetFields();
    FetchData();
    return response.data.result;
  };

  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  return (
    <>
      <Modal
        open={visible}
        title={"Add Sub Levels"}
        style={{
          top: 20,
        }}
        onCancel={handleCloseModal}
        width={1000}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Save
          </Button>,
        ]}
      >
        <StyledMetaForm
          form={form}
          size="small"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            operationType: "Receipts",
          }}
        >
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24} sm={24}>
              <DynamicCascader
                name="cascader"
                placeholder="Select Parent here"
                setAccountsData={setAccountsData}
                refresh={refresh}
                maxLevel={Max_Level}
              />
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Sub Level Name"
                className="main-head-input"
                rules={[{ required: true, message: "Enter the field!" }]}
              >
                <Input placeholder="e.g Current Assets" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="code" label="Code" className="main-head-input">
                <Input disabled placeholder="0000" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="accountCategory"
                label="Type"
                rules={[{ required: true, message: "Enter the field!" }]}
                tooltip="Account Type is used for information purpose, to generate country-specific legal reports, and set the rules to close a fiscal year and generate opening entries."
              >
                <Select
                  placeholder="Select an account type"
                  disabled={parent && parent.length > 0}
                  showSearch={{ filter }}
                  options={staticAccounts}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="deprecated"
                label="Deprecated"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>{" "}
          </Row>
        </StyledMetaForm>
      </Modal>
    </>
  );
};

export default ChatAccountsModal;
