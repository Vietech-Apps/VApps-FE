import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import {
  Button,
  Row,
  Space,
  Form,
  Input,
  Select,
  Col,
  Tabs,
  Card,
  message,
} from "antd";
import ImageUpload from "meta/common/FormFeilds/ImageUpload";
import { normFile } from "meta/common/FormFeilds/normFile";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PhoneCodes from "meta/common/PhoneCodes";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";
import successHandler from "meta/services/auth/successHandler";
import { StyledCol, StyledRow } from "meta/common/FormFeilds/index.styled";
import { useAuthUser } from "meta/utility/AuthHooks";
import FormLayout from "meta/JLayouts/Layout";
const Setting = () => {
  const { pathname } = useLocation();
  let name = pathname.split("company-setting")[1].split("/")[1];
  let { id, branch } = useParams();

  const [branchData, setBranchData] = useState();
  const getFetchdata = async (route) => {
    try {
      const response = await jwtAxios.get(route);
      setBranchData(response.data.result);
    } catch (error) {
      console.log("error", error);
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (id) {
      getFetchdata(`meta/company/branch/read/bycompanyid/${id}`);
    }
  }, [id]);
  const navigate = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onValidate = async () => {
    form
      .validateFields()
      .then((values) => {
        if (id) {
          onUpdate(values);
        } else {
          onFinish(values);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        info.errorFields.map((p) => message.info(p.errors[0]));
      });
  };
  const { user } = useAuthUser();
  const onFinish = async (values) => {
    let route = branch
      ? "meta/company/branch/createMeta"
      : "meta/company/profile/createMeta";
    values.parentCompany = branch && branch;
    try {
      const response = await jwtAxios.post(route, values);
      form.resetFields();
      navigate(`/company-setting`);
      return successHandler(response);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onUpdate = async (values) => {
    values.updateBy = [{ ...branchData.updatedBy, user: user?._id }];
    try {
      const response = await jwtAxios.put(
        `meta/company/branch/updateMeta/${id}`,
        values
      );

      navigate(`/company-setting`);
      return successHandler(response);
    } catch (error) {
      errorHandler(error);
    }
  };
  const [filled, setFilled] = useState(1);
  useEffect(() => {
    form.setFieldsValue(branchData ? { ...branchData } : {});
  }, [branchData, filled]);
  return (
    <FormLayout
      title={name.replace(/-/g, " ").toUpperCase()}
      isOtherChild={true}
      onSave={onValidate}
      extra={
        <Space key={"1"}>
          {/* <Button icon={<SaveOutlined />} type="primary" onClick={onValidate}>
            {id ? "Save" : "Create"}
          </Button> */}
          {id || branch ? (
            <Button
              onClick={() => {
                navigate("/company-setting/new-company"),
                  form.resetFields(),
                  (id = undefined),
                  (branch = undefined);
              }}
            >
              Create New Company
            </Button>
          ) : (
            ""
          )}
          <Button onClick={onReset}>Reset</Button>
          {id && <Button onClick={() => setFilled(filled + 1)}>Filled</Button>}
        </Space>
      }
    >
      <Form
        layout="vertical"
        form={form}
        disabled={true}
        initialValues={{
          taxationType: "GST",
          bankDetails: [{ accountCurrency: "PKR" }],
          correspondingBankDetails: [{ accountCurrency: "PKR" }],
        }}
      >
        <StyledRow gutter={24}>
          <StyledCol md={18}>
            <StyledRow gutter={12}>
              <StyledCol md={24}>
                {branch || id ? (
                  <Form.Item
                    name="branchName"
                    label="Branch Name"
                    tooltip="Registered Branch Name"
                    rules={[
                      {
                        required: true,
                        message: "please input Branch name!",
                      },
                    ]}
                  >
                    <Input placeholder="Branch Name" />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="name"
                    label="Company Name"
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
                )}
              </StyledCol>
              {!branch && !id && (
                <StyledCol md={12} xs={12}>
                  <Form.Item
                    name="taxationType"
                    hasFeedback
                    label={"Taxation Type"}
                    tooltip="If Taxation Type set GST,then invoice while be 'Tax Invoice' otherwise invoice will be 'Bill Of Supply'"
                    rules={[
                      {
                        required: true,
                        message: "Search & select customer!",
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
              )}

              {!branch && !id && (
                <StyledCol md={12}>
                  <Form.Item name="ntn" label="NTN">
                    <Input placeholder="NTN" />
                  </Form.Item>
                </StyledCol>
              )}
            </StyledRow>
          </StyledCol>
          {!branch && !id && (
            <StyledCol sm={6}>
              <Form.Item
                name="logo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                label=" "
              >
                <ImageUpload folder="company" name="Logo" />
              </Form.Item>
            </StyledCol>
          )}
          <StyledCol sm={8}>
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
          </StyledCol>
          <StyledCol sm={8}>
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
          </StyledCol>
          <StyledCol sm={8}>
            <Form.Item name="fiscalYear" label="Fiscal Year">
              <Select
                options={[
                  { value: "April-March", label: "April-March" },
                  { value: "January-December", label: "January-December" },
                ]}
              />
            </Form.Item>
          </StyledCol>
          <StyledCol sm={8}>
            <Form.Item name="country" label="Country">
              <Select showSearch>
                {" "}
                {PhoneCodes.map((d, i) => (
                  <Option key={i} value={d.name}></Option>
                ))}
              </Select>
            </Form.Item>
          </StyledCol>
          <StyledCol sm={8}>
            <Form.Item name="city" label="City">
              <Input />
            </Form.Item>
          </StyledCol>

          <StyledCol sm={8}>
            <Form.Item name="state" label="State/Province">
              <Select>
                <Option value="Punjab">Punjab</Option>
                <Option value="KPK">KPK</Option>
                <Option value="Balochistan">Balochistan</Option>
                <Option value="Sindh">Sindh</Option>
                <Option value="AJK">AJK</Option>
              </Select>
            </Form.Item>
          </StyledCol>
          <StyledCol sm={8}>
            <Form.Item name="postalCode" label="Zip/Postal Code">
              <Input />
            </Form.Item>
          </StyledCol>
          <StyledCol sm={16}>
            <Form.Item name="address" label="Address">
              <Input.TextArea
                autoSize={{ minRows: 1, maxRows: 3 }}
                showCount
                allowClear={true}
              />
            </Form.Item>
          </StyledCol>
          <StyledCol sm={24} md={24} className="p-0">
            <Tabs
              type="card"
              items={[
                {
                  key: "1",
                  label: `Bank Details`,
                  children: (
                    <StyledRow>
                      <StyledCol sm={24} md={24}>
                        <Form.List name="bankDetails">
                          {(fields, { add, remove }) => (
                            <div
                              className="d-flex flex-column align-items-end w-100"
                              style={{ width: "100%" }}
                            >
                              {fields.map(({ key, name, ...restField }) => (
                                <div
                                  key={key}
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                  }}
                                >
                                  <Row
                                    gutter={24}
                                    style={{ width: "100%" }}
                                    className="w-100"
                                  >
                                    <Col xs={8}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "bankName"]}
                                        label="Bank Name"
                                      >
                                        <Input.TextArea
                                          showCount
                                          allowClear={true}
                                          autoSize={{ maxRows: 3, minRows: 1 }}
                                          placeholder="bank Name"
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={8}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "branchName"]}
                                        label="Branch Name"
                                      >
                                        <Input.TextArea
                                          showCount
                                          allowClear={true}
                                          autoSize={{ maxRows: 3, minRows: 1 }}
                                          placeholder="Barnch Name"
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={8}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "accountNumber"]}
                                        label="Account Number"
                                      >
                                        <Input.TextArea
                                          showCount
                                          allowClear={true}
                                          autoSize={{ maxRows: 3, minRows: 1 }}
                                          placeholder="Account number"
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={8}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "accountCurrency"]}
                                        label="Account Currency"
                                      >
                                        <Select
                                          allowClear
                                          style={{ width: "100%" }}
                                          options={[
                                            { value: "USD", label: "USD" },
                                            { value: "AED", label: "AED" },
                                            { value: "PKR", label: "PKR" },
                                            { value: "EUR", label: "EUR" },
                                          ]}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={8}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "ibanCode"]}
                                        label="IBAN Code"
                                      >
                                        <Input.TextArea
                                          allowClear={true}
                                          showCount
                                          autoSize={{ maxRows: 3, minRows: 1 }}
                                          placeholder="IBAN Number"
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={8}>
                                      <Form.Item label=" ">
                                        <MinusCircleOutlined
                                          onClick={() => remove(name)}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </div>
                              ))}

                              <Button
                                block
                                type="primary"
                                className="mb-2 px-3"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                              >
                                Add More
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </StyledCol>
                    </StyledRow>
                  ),
                },
                {
                  key: "2",
                  label: `Corresponding Bank Detals`,
                  children: (
                    <StyledRow>
                      <StyledCol>
                        <Form.List name="correspondingBankDetails">
                          {(fields, { add, remove }) => (
                            <Space>
                              {fields.map(({ key, name, ...restField }) => (
                                <Space
                                  key={key}
                                  style={{
                                    display: "flex",
                                    marginBottom: 8,
                                  }}
                                  align="baseline"
                                >
                                  <Form.Item
                                    {...restField}
                                    name={[name, "bankName"]}
                                    label="Bank Name"
                                  >
                                    <Input.TextArea
                                      showCount
                                      allowClear={true}
                                      autoSize={{ maxRows: 3, minRows: 1 }}
                                      placeholder="bank Name"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    label="Branch Name"
                                    name={[name, "branchName"]}
                                  >
                                    <Input.TextArea
                                      showCount
                                      allowClear={true}
                                      autoSize={{ maxRows: 3, minRows: 1 }}
                                      placeholder="Barnch Name"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "accountNumber"]}
                                    label="Account Number"
                                  >
                                    <Input.TextArea
                                      showCount
                                      allowClear={true}
                                      autoSize={{ maxRows: 3, minRows: 1 }}
                                      placeholder="Account number"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "accountCurrency"]}
                                    label="Account Currency"
                                  >
                                    <Select
                                      defaultValue={"PKR"}
                                      style={{ width: "100%" }}
                                      options={[
                                        { value: "USD", label: "USD" },
                                        { value: "AED", label: "AED" },
                                        { value: "PKR", label: "PKR" },
                                        { value: "EUR", label: "EUR" },
                                      ]}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "ibanCode"]}
                                    label="IBAN Code"
                                  >
                                    <Input.TextArea
                                      allowClear={true}
                                      showCount
                                      autoSize={{ maxRows: 3, minRows: 1 }}
                                      placeholder="IBAN Number"
                                    />
                                  </Form.Item>
                                  <Form.Item label=" ">
                                    <MinusCircleOutlined
                                      onClick={() => remove(name)}
                                    />
                                  </Form.Item>
                                </Space>
                              ))}
                              <Form.Item>
                                <Button
                                  label=" "
                                  type="dashed"
                                  onClick={() => add()}
                                >
                                  More
                                </Button>
                              </Form.Item>
                            </Space>
                          )}
                        </Form.List>
                      </StyledCol>
                    </StyledRow>
                  ),
                },
                {
                  key: "3",
                  label: `Additional Information`,
                  children: (
                    <StyledRow>
                      <StyledCol md={6}>
                        {" "}
                        <Form.Item
                          label="Director Photo"
                          name="directorPhoto"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="signature"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="Digital Signature"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="businessCard"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="Bussiness Card"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="companyLetterHead"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="Company Letter Head"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="trademarkCertificate"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="Trademark Certificate"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="passBook"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="PassBook"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="certificateOfIncorporation"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="Certificate Of Incorporation"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="regisrationCertificate"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="Regisration Certificate"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="boardResolution"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="Board Resolution"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="nTNCertificate"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="NTN Certificate"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="partnerShipDeed"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="PartnerShip Deed"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                      <StyledCol md={6}>
                        <Form.Item
                          name="otherDocs"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          label="Other Documents"
                        >
                          <ImageUpload folder="company" name="" />
                        </Form.Item>
                      </StyledCol>
                    </StyledRow>
                  ),
                },
              ]}
            />
          </StyledCol>
        </StyledRow>
      </Form>
    </FormLayout>
  );
};

export default Setting;
