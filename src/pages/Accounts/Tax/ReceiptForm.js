import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { taxInfo } from "./Codes";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
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
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
const ReceiptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (id) getData(`${taxInfo.dataRoute}/read/${id}`, setSelected);
  }, [id]);

  const {
    vendor,
    scheduledDate,
    products,
    sourceDocument,
    warehouse,
    receivableAccount,
    payableAccount,
    advanceAccount,
    company,
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
      receivableAccount: receivableAccount?._id,
      payableAccount: payableAccount?._id,
      advanceAccount: advanceAccount?._id,
      company: company,
      ...others,
    });
  }, [selected]);
  const handleSubmit = async (status = "Drafts") => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${taxInfo.dataRoute}/create`,
      `${taxInfo.dataRoute}/update/${id}`,
      {
        status: status,
        products: dataSource,
      },
      setLoading
    );
    if (!id)
      navigate(`${taxInfo.navPath}/workspace/${response.data.result?._id}`);
    setSelected(response.data.result);
    return response.data.result;
  };
  let items = [
    {
      label: "Advanced Options",
      key: "2",
      children: (
        <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
          <Col xs={24} sm={12}>
            <Form.Item name="labelOnInvoices" label="Label On Invoices">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="includedInPrice"
              label="Included in Price"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="country" label="Country">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="affectBaseOfSubsequentTaxes"
              label="Affect Base Of Subsequent Taxes"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <SelectSearch
              fields={"name"}
              route={`meta/company/profile/dsearch`}
              name="company"
              label={"Company"}
              columns={[{ label: "Name", size: 2, field: "name" }]}
              placeholder="Search"
            />
          </Col>
        </Row>
      ),
    },
  ];
  const [current, setCurrent] = useState(0);

  return (
    <>
      <AppPageMetadata title={taxInfo.metaData} />
      <FormLayout
        codes={taxInfo}
        docData={selected}
        handleComplete={handleSubmit}
        extraStep={
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
          size="medium"
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
          <Row gutter={12}>
            <Col sm={12} xs={24}>
              <Form.Item
                name="taxName"
                label="Tax Name"
                rules={[{ required: true, message: "Tax Name is required" }]}
              >
                <Input placeholder="Tax 15%" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item name="taxRate" label="Percentage %">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name="taxType"
                label="Tax Type"
                tooltip="Determines where the tax is selectable. Note : 'None' means a tax can't be used by itself, however it can still be used in a group. 'adjustment' is used to perform tax adjustment."
              >
                <Select
                  options={[
                    {
                      value: "sales",
                      label: "Sales",
                    },
                    {
                      value: "purchases",
                      label: "Purchases",
                    },
                    {
                      value: "none",
                      label: "none",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/dsearch`}
                name="payableAccount"
                label={"Tax Payable Account"}
                columns={[
                  { label: "accountType", size: 2, field: "accountType" },
                  { label: "Code", size: 2, field: "code" },
                  { label: "name", size: 4, field: "name" },
                ]}
                placeholder="Search"
              />
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item
                name="taxScope"
                label="Tax Scope"
                tooltip="Restrict the use of taxes to a type of product."
              >
                <Select
                  options={[
                    {
                      value: "services",
                      label: "Services",
                    },
                    {
                      value: "goods",
                      label: "Goods",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/dsearch`}
                name="receivableAccount"
                label={"Tax Receivable Account"}
                columns={[
                  { label: "accountType", size: 2, field: "accountType" },
                  { label: "Code", size: 2, field: "code" },
                  { label: "name", size: 4, field: "name" },
                ]}
                placeholder="Search"
              />
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item name="description" label="Description">
                <Input />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/dsearch`}
                name="advanceAccount"
                label={"Tax Advance Account"}
                columns={[
                  { label: "accountType", size: 2, field: "accountType" },
                  { label: "Code", size: 2, field: "code" },
                  { label: "name", size: 4, field: "name" },
                ]}
                placeholder="Search"
              />
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item name="active" label="Active" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
            </Col>
          </Row>
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
