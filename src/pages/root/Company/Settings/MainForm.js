import FormLayout from "meta/JLayouts/Layout";
import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Button,
  Space,
  Spin,
  Tooltip,
  Col,
  Select,
  Input,
  Row,
  DatePicker,
} from "antd";
import "shared/styles/vendors/ql-editor.css";
import { useGetData } from "meta/services/auth/ezAPI";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { handleValidateWithOutReset } from "meta/common/MyFns";

import { companyInfo } from "./Code";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import { FcRefresh } from "react-icons/fc";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { usePermissions } from "meta/common/CheckPermission";
import { normFile } from "meta/common/FormFeilds/normFile";
import ImageUpload from "meta/common/FormFeilds/ImageUpload";
import PhoneCodes from "meta/common/PhoneCodes";

const MainForm = () => {
  const { canUpdate } = usePermissions();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const taxationType = Form.useWatch("taxationType", form);
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [
    { apiData: selected, loading: refreshing },
    { setData: setSelected, setRefreshing },
  ] = useGetData(
    `${companyInfo.dataRoute}/read/${id}`,
    undefined,
    {},
    id ? true : false
  );

  useEffect(() => {
    const { fiscalYear, ...others } = selected || {};
    form.setFieldsValue({
      fiscalYear: dayjs(fiscalYear),
      ...others,
    });
  }, [selected]);

  const handleComplete = async () => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${companyInfo.dataRoute}/createMeta`,
      `${companyInfo.dataRoute}/update/${id}`,
      {},
      setLoading
    );
    if (response !== null) {
      if (!id)
        navigate(
          `${companyInfo.dataRoute}/workspace/${response.data.result?._id}`
        );
      setSelected(response.data?.result);
    }
    return response;
  };
  const colorList = [
    { label: "#B2DFDB", value: "#B2DFDB" },
    { label: "#B2EBF2", value: "#B2EBF2" },
    { label: "#DCEDC8", value: "#DCEDC8" },
    { label: "#B39DDB", value: "#B39DDB" },
    { label: "#B3E5FC", value: "#B3E5FC" },
    { label: "#C8E6C9", value: "#C8E6C9" },
    { label: "#D1C4E9", value: "#D1C4E9" },
    { label: "#E1BEE7", value: "#E1BEE7" },
    { label: "#F8BBD0", value: "#F8BBD0" },
    { label: "#FFCDD2", value: "#FFCDD2" },
  ];

  if (refreshing) {
    return <Spin />;
  } else {
    return (
      <>
        <AppPageMetadata title={companyInfo.metaData} />
        <FormLayout
          codes={companyInfo}
          docData={selected}
          onSave={handleComplete}
          handleComplete={handleComplete}
          extraStep={
            <Space wrap>
              <Tooltip title={`Refresh`} placement="bottomRight">
                <Button
                  icon={<FcRefresh />}
                  onClick={() => {
                    setRefreshing(true);
                    form.resetFields();
                  }}
                  disabled={selected?.isDisabled}
                >
                  Refresh
                </Button>
              </Tooltip>
            </Space>
          }
        >
          <StyledMetaForm
            form={form}
            layout="horizontal"
            size="medium"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 18,
            }}
            disabled={selected && !canUpdate}
            initialValues={{
              taxationType: "Tax",
              bankDetails: [{ accountCurrency: "PKR" }],
              correspondingBankDetails: [{ accountCurrency: "PKR" }],
              fiscalYear: dayjs("06/30/2023"),
            }}
          >
            <Row gutter={24}>
              <Col md={16}>
                <Row gutter={12}>
                  <Col md={24}>
                    <Form.Item
                      name="name"
                      label="Organization name"
                      tooltip="Registered Company Name"
                      rules={[
                        {
                          required: true,
                          message: "please input company name!",
                        },
                      ]}
                    >
                      <Input placeholder="Organization name" />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={12}>
                    <Form.Item
                      name="taxationType"
                      hasFeedback
                      label={"Tax Type"}
                      tooltip="If Taxation Type set Tax,then invoice while be 'Tax Invoice'"
                      rules={[
                        {
                          required: true,
                          message: "Search & select customer!",
                        },
                      ]}
                    >
                      <Select
                        allowClear={true}
                        options={[
                          { value: "Tax", label: "Tax" },
                          { value: "Non Tax", label: "Non Tax" },
                          {
                            value: "Composition Scheme",
                            label: "Composition Scheme",
                          },
                        ]}
                      ></Select>
                    </Form.Item>
                  </Col>
                  {taxationType !== "Non Tax" && (
                    <Col md={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Enter NTN Number",
                          },
                        ]}
                        name="ntn"
                        label="NTN"
                      >
                        <Input placeholder="NTN" />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </Col>

              <Col sm={8}>
                <Form.Item
                  name="logo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  label=" "
                >
                  <ImageUpload folder="company" name="Logo" />
                </Form.Item>
              </Col>
              <Col sm={8}>
                <Form.Item
                  style={{ color: "#d9d9d9" }}
                  name="fiscalYear"
                  label="Fiscal Year End"
                >
                  <DatePicker
                    format={"DD/MMM/YYYY"}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col sm={8}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "please input phone number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={8}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,

                      message: "please input email!",
                    },
                    {
                      type: "email",
                      message: "input valid emial!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col sm={8}>
                <Form.Item name="country" label="Country">
                  <Select showSearch>
                    {PhoneCodes.map((d, i) => (
                      <Option key={i} value={d.name}></Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={8}>
                <Form.Item name="city" label="City">
                  <Input />
                </Form.Item>
              </Col>

              <Col sm={8}>
                <Form.Item name="state" label="State/Province">
                  <Select>
                    <Option value="Punjab">Punjab</Option>
                    <Option value="KPK">KPK</Option>
                    <Option value="Balochistan">Balochistan</Option>
                    <Option value="Sindh">Sindh</Option>
                    <Option value="AJK">AJK</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={8}>
                <Form.Item name="postalCode" label="Zip/Postal Code">
                  <Input />
                </Form.Item>
              </Col>

              <Col sm={8}>
                <Form.Item name="color" label="Color">
                  <Select showSearch>
                    {colorList.map((color, i) => (
                      <Option
                        key={i}
                        value={color.value}
                        style={{ backgroundColor: color.value }}
                      >
                        {color.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={16}>
                <Form.Item name="address" label="Address">
                  <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 3 }}
                    showCount
                    allowClear={true}
                  />
                </Form.Item>
              </Col>
            </Row>
          </StyledMetaForm>
        </FormLayout>
      </>
    );
  }
};

export default MainForm;
