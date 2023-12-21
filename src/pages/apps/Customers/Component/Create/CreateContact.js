import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Form,
  Select,
  Col,
  Input,
  Space,
  Divider,
  InputNumber,
  Tabs,
  Switch,
  Tooltip,
  Button,
} from "antd";

import LabelSelect from "meta/JLayouts/DynamicSelect";
import { countryList } from "meta/common/countryList";
import PhoneCodes from "meta/common/PhoneCodes";
import UploadNode from "meta/common/UploadNode";
import { normFile, onFinishFailed } from "meta/common/fns";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppRowContainer } from "meta";
import { getData } from "meta/common/Apis";
import { StyledAddForm } from "./index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { useGetData } from "meta/services/auth/ezAPI";
import { useAuthUser } from "meta/utility/AuthHooks";
import BankAccount from "./BankAccount";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";

const CreateContact = ({ form, modal, setBankAccounts, bankAccounts }) => {
  const { Option } = Select;
  const { id } = useParams();
  const [selectedData, setSelectedData] = useState();

  const { user } = useAuthUser();
  useEffect(() => {
    if (id && !modal) {
      getData(`meta/contact/read/${id}`, setSelectedData);
    }
  }, []);
  const [{ apiData: setting }] = useGetData(
    `accounts/GeneralSetting/readByCompany/${user?.currLocation?.parentCompany?._id}`,
    {}
  );

  const {
    company,
    tag,
    accountPayable,
    accountReceivable,
    paymentTerms,
    ...others
  } = selectedData ? selectedData : {};

  useEffect(() => {
    setBankAccounts(selectedData?.bankAccounts);
    form.setFieldsValue({
      company: company,
      accountPayable: accountPayable?._id,
      accountReceivable: accountReceivable?._id,
      paymentTerms: paymentTerms?._id,

      tag: tag?._id,
      ...others,
    });
  }, [selectedData]);

  return (
    <>
      <StyledMetaForm
        form={form}
        onFinishFailed={onFinishFailed}
        layout="horizantal"
        labelCol={{ span: 6 }}
        autoComplete="off"
      >
        <AppRowContainer>
          <Col md={12} xs={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              name="isVendor"
              label="Mark as Vendor"
              valuePropName="checked"
              tooltip="Turn this option on if this contact can be used as Vendor too."
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              name="isConsultant"
              label="Mark as Consultant"
              valuePropName="checked"
              tooltip="Turn this option on if this contact can be used as Consultant too."
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
          </Col>

          <Col md={18} xs={24}>
            <Form.Item
              labelCol={{ span: 8 }}
              name="title"
              label={<b>Contact name</b>}
              rules={[
                {
                  required: true,
                  message: "Please input contact name!",
                },
              ]}
            >
              <Input
                style={{
                  color: "#135200",
                  fontSize: "18px",
                  fontFamily: "sans-serif",
                }}
                placeholder="Name"
              />
            </Form.Item>
          </Col>
          <Col md={6} xs={24}>
            <Form.Item
              name="pictures"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <UploadNode folder={"contacts"}></UploadNode>
            </Form.Item>
          </Col>
        </AppRowContainer>
        <Tabs
          type="card"
          defaultActiveKey="001"
          items={[
            {
              label: `Basic Info`,
              key: "001",
              children: (
                <AppRowContainer>
                  <Col md={18} xs={24}>
                    <Form.Item
                      labelCol={{ span: 4 }}
                      name="tag"
                      label={<b>Tag</b>}
                    >
                      <LabelSelect
                        endpoint="contactTags"
                        mode="multiple"
                        label="tag"
                      />
                    </Form.Item>
                    <Form.Item labelCol={{ span: 4 }} label={<b>Mobile</b>}>
                      <Input.Group
                        compact
                        style={{ display: "flex" }}
                        labelCol={{ span: 4 }}
                      >
                        <Form.Item
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Please Select Country Code!",
                          //   },
                          // ]}
                          name="phoneCode"
                          initialValue={"+92"}
                          noSyle
                          style={{ margin: "0px" }}
                        >
                          <Select
                            dropdownStyle={{
                              borderTopRightRadius: "0px",
                              borderBottomRightRadius: "0px",
                            }}
                          >
                            {PhoneCodes.map((label) => {
                              return (
                                <Option
                                  value={label.dial_code}
                                  key={label.dial_code}
                                >
                                  {label.code},{label.dial_code}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          hasFeedback
                          name="mobile"
                          noStyle
                          labelCol={{ span: 4 }}
                        >
                          <Input
                            placeholder="3001234567"
                            style={{ height: "fit-content" }}
                          />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                    <Form.Item
                      labelCol={{ span: 4 }}
                      name="phone"
                      label={<b>Phone</b>}
                    >
                      <Input placeholder="phone number" />
                    </Form.Item>
                    <Form.Item
                      labelCol={{ span: 4 }}
                      name="email"
                      label={<b>Email</b>}
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        // {
                        //   required: true,
                        //   message: "please input E-mail!",
                        // },
                      ]}
                    >
                      <Input placeholder="example@vietech.pro" />
                    </Form.Item>
                    <Form.Item
                      labelCol={{ span: 4 }}
                      name="website"
                      label={<b>Website</b>}
                    >
                      <Input placeholder="www.vietech.pro" />
                    </Form.Item>
                  </Col>
                </AppRowContainer>
              ),
            },

            {
              label: `Financial details`,
              key: "4",
              children: (
                <AppRowContainer style={{ marginBottom: 0 }}>
                  <Col md={12} xs={12}>
                    <Form.Item
                      name="openingBalance"
                      label={<b>OpeningBalance</b>}
                    >
                      <InputNumber
                        disabled
                        style={{
                          width: "100%",
                        }}
                        placeholder="Opening Balance"
                      />
                    </Form.Item>
                  </Col>

                  <Col md={12} xs={12}>
                    <Form.Item name="creditLimit" label={<b>Credit Limit</b>}>
                      <InputNumber
                        // disabled
                        style={{
                          width: "100%",
                        }}
                        placeholder="Credit Limit"
                      />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={12}>
                    <SelectSearch
                      fields={"code,name"}
                      route={`erp/chartOfAccounts/wsearch`}
                      name="accountPayable"
                      label="Account Payable"
                      formProps={{
                        tooltip:
                          "Bank statements transactions will be posted on the suspense account until the final reconciliation allowing finding the right account.",
                      }}
                      columns={[
                        { label: "Code", size: 2, field: "code" },
                        { label: "name", size: 8, field: "name" },
                      ]}
                      where={{
                        accountCategory: "21",
                      }}
                      placeholder="search"
                    />
                  </Col>
                  <Col md={12} xs={12}>
                    <SelectSearch
                      fields={"paymentTerms"}
                      labelCol={{ span: 8 }}
                      route={`accounts/PaymentTerms/wsearch`}
                      label={"Payment Term"}
                      name={`paymentTerms`}
                      columns={[
                        { label: "Title", size: 24, field: "paymentTerms" },
                        {
                          label: "Total Installments",
                          size: 2,
                          accessor: (c) => c.terms?.length,
                        },
                      ]}
                      placeholder="search Payment Terms"
                      otherParams={{ _id: selectedData?.paymentTerm }}
                    />
                  </Col>
                  <Col md={12} xs={12}>
                    <SelectSearch
                      fields={"code,name"}
                      route={`erp/chartOfAccounts/wsearch`}
                      label="Account Receivable"
                      name="accountReceivable"
                      formProps={{
                        tooltip:
                          "Bank statements transactions will be posted on the suspense account until the final reconciliation allowing finding the right account.",
                      }}
                      columns={[
                        { label: "Code", size: 2, field: "code" },
                        { label: "name", size: 8, field: "name" },
                      ]}
                      where={{
                        accountCategory: "11",
                      }}
                      placeholder="search"
                    />
                  </Col>

                  <Col md={12} xs={24}>
                    <Form.Item name="title" label="Reference">
                      <Input placeholder="Reference here..." />
                    </Form.Item>
                  </Col>
                </AppRowContainer>
              ),
            },
            {
              label: `Other Details`,
              key: "2",
              children: (
                <AppRowContainer>
                  <Col md={12} xs={12}>
                    <Form.Item
                      name="address"
                      label={<b>Address</b>}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "please input company address!",
                      //   },
                      // ]}
                    >
                      <Input.TextArea
                        autoSize={{
                          minRows: 2,
                          maxRows: 6,
                        }}
                        placeholder="Street address here..."
                      />
                    </Form.Item>
                  </Col>

                  <Col md={12} xs={12}>
                    <AppRowContainer>
                      <Col md={24} xs={24}>
                        <Form.Item name="country" label={<b>Country</b>}>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select a country"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {countryList.map((country, index) => {
                              return (
                                <Option key={index} value={country.name}>
                                  {country.name}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24}>
                        <Form.Item name="province" label={<b>Province</b>}>
                          <Input placeholder="Province" />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24}>
                        <Form.Item name="city" label={<b>City</b>}>
                          <Input placeholder="City" />
                        </Form.Item>
                      </Col>
                    </AppRowContainer>
                  </Col>
                  <Col md={12} xs={12}>
                    <Form.Item
                      labelCol={{ span: 4 }}
                      name="ntn"
                      label={<b>NTN</b>}
                    >
                      <Input placeholder="ntn number here..." />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={12}>
                    <Form.Item
                      labelCol={{ span: 4 }}
                      name="stn"
                      label={<b>STN</b>}
                    >
                      <Input placeholder="stn number here..." />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={12}>
                    <Form.Item
                      labelCol={{ span: 4 }}
                      name="cnic"
                      label={<b>CNIC</b>}
                    >
                      <Input placeholder="cnic here..." />
                    </Form.Item>
                  </Col>
                </AppRowContainer>
              ),
            },
            {
              label: `Bank Details`,
              key: "55",
              children: !id ? (
                "Please Save the contact to add bank detail"
              ) : (
                <BankAccount
                  selectedData={selectedData}
                  setBankAccounts={setBankAccounts}
                  bankAccounts={bankAccounts}
                />
              ),
            },
            {
              label: `Additional Contacts`,
              key: "5",
              children: (
                <Form.List name="contacts">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <Space
                          wrap
                          key={key}
                          style={{
                            display: "flex",
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          {index + 1}
                          <Tooltip placement="right" title="Name">
                            <Form.Item {...restField} name={[name, "name"]}>
                              <Input placeholder="Name" />
                            </Form.Item>
                          </Tooltip>
                          <Tooltip placement="bottomLeft" title="Phone">
                            <Form.Item {...restField} name={[name, "phone"]}>
                              <Input placeholder="Phone" />
                            </Form.Item>
                          </Tooltip>

                          <Tooltip placement="left" title="Job Position">
                            <Form.Item
                              {...restField}
                              name={[name, "jobPosition"]}
                            >
                              <Input placeholder="Job Position" />
                            </Form.Item>
                          </Tooltip>

                          <Tooltip placement="bottomLeft" title="Email">
                            <Form.Item {...restField} name={[name, "email"]}>
                              <Input placeholder="Email" />
                            </Form.Item>
                          </Tooltip>

                          <Tooltip
                            placement="bottomLeft"
                            color="red"
                            title="Delete"
                          >
                            <DeleteOutlined onClick={() => remove(name)} />
                          </Tooltip>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add additional Contacts
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              ),
            },
          ]}
        />
        <Divider />
        {/* <Form.Item
              name="isPrivate"
              className="collection-create-form_last-form-item"
              initialValue={false}
              rules={[
                {
                  required: true,
                  message: "Please select privacy!",
                },
              ]}
            >
              <Radio.Group onChange={() => setIsPrivate(!isPrivate)}>
                <Radio value={false}>Public</Radio>
                <Radio value={true}>Private</Radio>
              </Radio.Group>
            </Form.Item>

            {isPrivate == true ? (
              <Form.Item name="shareWith" label="Share with">
                <Select mode="multiple" placeholder="Please select user ">
                  {userList.map((user) => (
                    <Option value={user._id} key={user._id}>
                      {`${user.name}(${user.designation?.title})`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              ""
            )}
          </Col> */}
      </StyledMetaForm>
    </>
  );
};

export default CreateContact;
