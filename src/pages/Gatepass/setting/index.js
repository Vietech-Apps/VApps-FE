import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Button, Row, Space, Form, Input, Select, Col, Tabs } from "antd";
import ImageUpload from "meta/common/FormFeilds/ImageUpload";
import { normFile } from "meta/common/FormFeilds/normFile";
import React from "react";
import { useNavigate } from "react-router-dom";
import PhoneCodes from "meta/common/PhoneCodes";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";
import successHandler from "meta/services/auth/successHandler";
import {
  StyledContentDiv,
  StyledCol,
  StyledMetaForm,
  StyledRow,
} from "meta/common/FormFeilds/index.styled";
const Setting = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();
  const onFinish = async () => {
    const values = form.getFieldsValue();
    try {
      const response = await jwtAxios.post(
        "meta/company/profile/createMeta",
        values
      );
      return successHandler(response);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };
  return (
    <div>
      <StyledContentDiv>
        <PageHeader
          title="New Gate"
          ghost={false}
          onBack={() => navigate(-1)}
          extra={[
            <Space key={"1"}>
              <Button icon={<SaveOutlined />} type="primary" onClick={onFinish}>
                Save
              </Button>
            </Space>,
          ]}
        />
      </StyledContentDiv>

      <StyledMetaForm layout="vertical" form={form} initialValues={{}}>
        <StyledRow gutter={24}>
          <StyledCol md={12}>
            <Form.Item
              name="company"
              label="Company"
              tooltip="Registered Company Name"
              rules={[
                {
                  required: true,
                  message: "please input company name!",
                },
              ]}
            >
              <Input placeholder="Company Name" />
            </Form.Item>
          </StyledCol>
          <StyledCol md={12} xs={12}>
            <Form.Item
              name="branch"
              hasFeedback
              label={"Branch"}
              rules={[
                {
                  required: true,
                  message: "Search & select branch!",
                },
              ]}
            >
              <Select
                defaultValue={"GST"}
                allowClear={true}
                options={[
                  { value: "GST", label: "GST" },
                  { value: "Non GST", label: "Non GST" },
                  {
                    value: "Composition Scheme",
                    label: "Composition Scheme",
                  },
                ]}
              ></Select>
            </Form.Item>
          </StyledCol>

          <StyledCol sm={4}>
            <Form.Item
              name="gateNo"
              label="Gate No"
              rules={[
                {
                  required: true,
                  message: "please input phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </StyledCol>
          <StyledCol sm={8}>
            <Form.Item name="name" label="Gate Name/Description">
              <Input />
            </Form.Item>
          </StyledCol>
          <StyledCol sm={6}>
            <Form.Item name="securityGuard" label="Security Guard Name">
              <Select
                options={[
                  { value: "April-March", label: "April-March" },
                  { value: "January-December", label: "January-December" },
                ]}
              />
            </Form.Item>
          </StyledCol>
          <StyledCol sm={6}>
            <Form.Item name="supervisor" label="Supervisor Name">
              <Select
                options={[
                  { value: "April-March", label: "April-March" },
                  { value: "January-December", label: "January-December" },
                ]}
              />
            </Form.Item>
          </StyledCol>
        </StyledRow>
      </StyledMetaForm>
    </div>
  );
};

export default Setting;
