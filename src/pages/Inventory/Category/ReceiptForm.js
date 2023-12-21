import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { Max_Level, formTitle, path, route } from "./Codes";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import {
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData } from "meta/common/Apis";
import LabelSelect from "meta/JLayouts/DynamicSelect";
import DynamicCascader from "./DynamicCascader";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const ReceiptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [current, setCurrent] = useState(0);
  const [accountsData, setAccountsData] = useState();

  const [refresh, setRefresh] = useState();
  const parent = Form.useWatch("cascader", form);
  useEffect(() => {
    if (parent)
      form.setFieldsValue({
        accountCategory: accountsData?.find((item) => item._id == parent[0])
          ?.accountCategory,
      });
    else
      form.setFieldsValue({
        accountCategory: null,
      });
  }, [parent]);

  useEffect(() => {
    if (id) getData(`${route}/read/${id}`, setSelected);
  }, [id]);

  const {
    vendor,
    scheduledDate,
    products,
    sourceDocument,
    warehouse,
    ...others
  } = selected ? selected : {};
  useEffect(() => {
    setCurrent(
      selected?.status == "Ready"
        ? 2
        : selected?.status == "Waiting"
        ? 1
        : selected?.status == "Done"
        ? 3
        : 0
    );

    setDataSource(selected?.products || []);
    form.setFieldsValue({
      vendor: vendor?._id,
      scheduledDate: dayjs(scheduledDate),
      sourceDocument: sourceDocument || selected?.po?.cuId,
      warehouse: selected?.warehouse,
      ...others,
    });
  }, [selected]);

  const handleSubmit = async (status = "Drafts") => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${route}/create`,
      `${route}/update/${id}`,
      {
        status: status,
        products: dataSource,

        parent: parent ? parent[parent?.length - 1] : null,
      },
      setLoading
    );
    setRefresh(true);
    form.resetFields();
    // if (!id) navigate(`${path}/create`);
    //  setSelected(response.data.result);

    return response.data.result;
  };

  let items = [
    {
      label: "Details",
      key: 1,
      children: (
        <>
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24} sm={12}>
              <Form.Item name="costingMethod" label="Costing Method">
                <Select placeholder="Select a costing method" allowClear>
                  <Select.Option value="Standard Price">
                    Standard Price
                  </Select.Option>
                  <Select.Option value="FIFO">FIFO</Select.Option>
                  <Select.Option value="Average Cost">
                    Average Cost
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="removalStrategy" label="Removal Strategy">
                <Select placeholder="Select a removal Strategy" allowClear>
                  <Select.Option value="fifo">FIFO</Select.Option>
                  <Select.Option value="lifo">LIFO</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item name="incomeAccount" label="Income Account">
                <Select
                  disabled
                  size="small"
                  options={[{ value: "taxes", label: "Taxes 15%" }]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="isActive"
                label="Active"
                valuePropName="checked"
                //  tooltip="Check this box if this account allows invoices & payments matching of journal items."
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="expenseAccount" label="Expense Account">
                <Select
                  disabled
                  size="small"
                  options={[{ value: "taxes", label: "Taxes 15%" }]}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];
  return (
    <>
      <AppPageMetadata title={formTitle} />
      <FormLayout
        title={formTitle}
        subTitle={selected?.cuId || selected?.cuIdDraft}
        path={path}
        extra={
          <Space>
            <Button
              onClick={() => handleSubmit(selected?.status || "Drafts")}
              loading={loading}
            >
              Save
            </Button>
          </Space>
        }
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
          initialValues={{ operationType: "Receipts" }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Category Name"
                className="main-head-input"
                rules={[{ required: true, message: "Enter the field!" }]}
              >
                <Input placeholder="e.g All" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={16}>
              <Form.Item
                label="Parent"
                labelCol={{
                  span: 4,
                }}
                name="cascader"
              >
                <DynamicCascader
                  setAccountsData={setAccountsData}
                  refresh={refresh}
                  maxLevel={Max_Level}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}> </Row>
          <StyledTabs items={items} type="card" />
        </StyledMetaForm>
        {/* <FooterTab
          id={id}
          folder="InvReceipt"
          data={selected}
          route={route}
          handleSubmit={() => handleSubmit("Drafts")}
        /> */}
      </FormLayout>
    </>
  );
};

export default ReceiptForm;
