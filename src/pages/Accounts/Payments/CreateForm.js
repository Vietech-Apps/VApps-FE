import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { dataInfo, path } from "./Codes";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Tabs,
  Tooltip,
  message,
} from "antd";
import {
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData } from "meta/common/Apis";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";

import { useGetData } from "meta/services/auth/ezAPI";
import { FcRefresh } from "react-icons/fc";
import { AiOutlineSave } from "react-icons/ai";
import { FaThList } from "react-icons/fa";

import { CheckSquareTwoTone, SaveTwoTone } from "@ant-design/icons";
import { JEInfo } from "../JournalEntries/Codes";
const CreateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState();
  const [isChecked, setisChecked] = useState(false);
  const [
    { apiData: selected, loading: refreshing },
    { setData: setSelected, setRefreshing },
  ] = useGetData(`${dataInfo.dataRoute}/read/${id}`, [], {}, id ? true : false);

  const {
    date,
    contact,
    contactAccount,
    companyAccount,
    toAccount,
    accountingDate,
    ...others
  } = selected ? selected : {};

  useEffect(() => {
    setContacts(contact || null);
    setisChecked(selected?.internalTransfer);
    setPaymentType(selected?.paymentType || paymentType);
    setAccountType(selected?.accountType == "PCSH" ? "cash" : "bank");
    setDataSource(selected?.products || []);
    form.setFieldsValue({
      date: dayjs(date),
      accountingDate: dayjs(accountingDate),
      toAccount: toAccount?._id,
      contact: contact?._id,
      companyAccount: companyAccount?._id,
      contactAccount: contactAccount?._id,
      ...others,
    });
  }, [selected]);

  const handleSelect = (e, option) => {
    let x = option?.find((c) => c._id == e);
    setAccountType(x.accountType);
  };
  const [contacts, setContacts] = useState();
  const handleSelectContact = (e, option) => {
    form.setFieldsValue({ contactAccount: null });
    let x = option?.find((c) => c._id == e);
    setContacts(x);
  };
  const [whatLoad, setWhatLoad] = useState();
  const handleSubmit = async (status = "Drafts") => {
    setWhatLoad(status);
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/paymentWithJournal/${id}`,
      {
        status: status == "Posted" ? "Unallocated" : status,
        module: "Customer",
        path,
        contactName: contacts?.title,
        accountType:
          accountType == "cash" ? "PCSH" : accountType == "bank" && "PBNK",
      },
      setLoading
    );

    if (!id)
      navigate(`${dataInfo.navPath}/workspace/${response.data?.result?._id}`);
    setSelected(response.data.result);
    return response.data.result;
  };

  const handleCheckboxChange = (e) => {
    setisChecked(e.target.checked);
  };

  const [paymentType, setPaymentType] = useState("Receive");
  if (refreshing) {
    return <Spin />;
  } else {
    return (
      <>
        <AppPageMetadata title={dataInfo.metaData} />
        <FormLayout
          codes={dataInfo}
          form={form}
          handleSubmit={handleSubmit}
          items={[
            {
              title: "Drafts",
              status: selected?.status == "Drafts" ? "finish" : "wait",
            },
            {
              title: "Post",
              status: selected?.status === "Posted" ? "finish" : "wait",
            },
          ]}
          extraStep={
            <Space>
              <Tooltip title={`Save`} placement="bottomRight">
                <Button
                  icon={<SaveTwoTone />}
                  onClick={() => handleSubmit("Drafts")}
                  loading={whatLoad == "Drafts" && loading}
                  disabled={selected?.isDisabled}
                  type="primary"
                >
                  Save
                </Button>
              </Tooltip>
              <Tooltip title={``} placement="bottomRight">
                <Button
                  onClick={() => handleSubmit("Posted")}
                  loading={whatLoad == "Posted" && loading}
                  disabled={selected?.isDisabled}
                  hidden={!id}
                  type="primary"
                  icon={<CheckSquareTwoTone />}
                >
                  Post
                </Button>
              </Tooltip>
              <Tooltip title={`Refresh`} placement="bottomRight">
                <Button
                  icon={<FcRefresh />}
                  onClick={() => setRefreshing(true)}
                />
              </Tooltip>

              <Tooltip title={`Journal Entries`} placement="bottomRight">
                {selected?.journalEntry && (
                  <FaThList
                    onClick={() =>
                      navigate(
                        `${JEInfo.navPath}/workspace/${selected?.journalEntry?._id}`
                      )
                    }
                  />
                )}
              </Tooltip>
            </Space>
          }
        >
          <StyledMetaForm
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 24,
            }}
            disabled={selected?.isDisabled}
            // layout="vertical"
            initialValues={{ paymentType: "Receive", amount: 0.0 }}
          >
            <Row gutter={24}>
              <Col xs={24} sm={18}>
                <Form.Item
                  name="internalTransfer"
                  label="Internal Transfer"
                  valuePropName="checked"
                >
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </Form.Item>
                <Form.Item name="paymentType" label="Payment Type">
                  <Radio.Group onChange={(e) => setPaymentType(e.target.value)}>
                    <Radio value="Send">Send</Radio>
                    <Radio value="Receive">Receive</Radio>
                  </Radio.Group>
                </Form.Item>
                {!isChecked && (
                  <SelectSearch
                    handleSelect={handleSelectContact}
                    fields={"title,email,phone"}
                    route={`meta/contact/wsearch`}
                    label={"Customer"}
                    name={`contact`}
                    columns={[
                      { label: "Title", size: 24, field: "title" },
                      { label: "Email", size: 24, field: "email" },
                      // { label: "Phone", size: 3, field: "phone" },
                    ]}
                    where={{ isCustomer: true }}
                    otherParams={{ _id: selected?.contact?._id }}
                    placeholder="search customer"
                    formProps={{
                      rules: [
                        {
                          required: true,
                          message: "Please select customer!",
                        },
                      ],
                    }}
                  />
                )}

                {contacts?._id && paymentType == "Send" && (
                  <SelectSearch
                    fields={"accountHolder"}
                    route={`accounts/bankAccount/customerBankAccounts`}
                    label={"Customer Bank Account"}
                    name={"contactAccount"}
                    otherParams={{ _id: contacts?._id }}
                    string={contacts ? contacts?._id : false}
                    columns={[
                      {
                        label: "Title",
                        size: 2,
                        accessor: (e) =>
                          e.accountType == "bank"
                            ? e.bank?.name + "-" + e.accountHolderName
                            : e.accountHolderName,
                      },
                    ]}
                    placeholder="search acounts"
                  />
                )}

                <SelectSearch
                  handleSelect={handleSelect}
                  fields={"accountHolderName"}
                  route={`accounts/bankAccount/customSearch`}
                  label={isChecked ? "From Account" : "Company Bank Account"}
                  name={"companyAccount"}
                  otherParams={{ _id: selected?.acountHolder?._id }}
                  where={{ forCompany: true }}
                  formProps={{
                    rules: [
                      {
                        required: true,
                        message: `Company Bank Account!`,
                      },
                    ],
                  }}
                  columns={[
                    {
                      label: "Title",
                      size: 2,
                      accessor: (e) =>
                        e.accountType == "bank"
                          ? e.bank?.name + "-" + e.accountHolderName
                          : e.accountHolderName,
                    },
                  ]}
                  placeholder="search acounts"
                />

                {!isChecked && (
                  <Form.Item
                    name={
                      paymentType === "Receive"
                        ? "debit"
                        : paymentType === "Send" && "credit"
                    }
                    label={
                      paymentType === "Receive"
                        ? "Debit Amount"
                        : paymentType === "Send" && "Credit Amount"
                    }
                    rules={[
                      {
                        required: true,
                        message: `Please input ${
                          paymentType == "Receive"
                            ? "debit"
                            : paymentType === "Send" && "credit"
                        }`,
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                )}
                {isChecked && (
                  <Form.Item
                    name={"amount"}
                    label={"Amount"}
                    rules={[
                      {
                        required: true,
                        message: "please add amount",
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                )}
                {isChecked && (
                  <SelectSearch
                    fields={"accountHolderName"}
                    route={`accounts/bankAccount/customSearch`}
                    label={"To Account"}
                    name={"toAccount"}
                    // otherParams={{ _id: selected?.acountHolder?._id }}
                    where={{ forCompany: true }}
                    formProps={{
                      rules: [
                        {
                          required: true,
                          message: `To Bank Account!`,
                        },
                      ],
                    }}
                    columns={[
                      {
                        label: "Title",
                        size: 2,
                        accessor: (e) =>
                          e.accountType == "bank"
                            ? e.bank?.name + "-" + e.accountHolderName
                            : e.accountHolderName,
                      },
                    ]}
                    placeholder="search acounts"
                  />
                )}
                <Form.Item name="reference" label="Reference">
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item name="accountingDate" label="Account Date">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="date" label="Date">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </StyledMetaForm>
        </FormLayout>
      </>
    );
  }
};

export default CreateForm;
