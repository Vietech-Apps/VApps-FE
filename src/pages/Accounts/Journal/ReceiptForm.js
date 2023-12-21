import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { formTitle, path, route } from "./Codes";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Table,
  Radio,
  Select,
  Divider,
  Space,
  Tabs,
  message,
} from "antd";
import {
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProductTable from "./ProductTable";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData } from "meta/common/Apis";
import TextArea from "antd/es/input/TextArea";
import { debug } from "util";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
const ReceiptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();

  const [current, setCurrent] = useState(0);
  const [selectedTypeOption, setselectedTypeOption] = useState("");
  const [selectCommunicationType, setSelectCommunicationType] = useState(false);

  useEffect(() => {
    if (id) getData(`${route}/read/${id}`, setSelected);
  }, [id]);

  const {
    vendor,
    scheduledDate,
    products,
    sourceDocument,
    warehouse,
    type,
    defaultAccount,
    ...others
  } = selected ? selected : {};
  console.log(selected);
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
    setselectedTypeOption(selected?.type);
    setDefAccount(selected);
    setDataSource(selected?.products || []);
    form.setFieldsValue({
      vendor: vendor?._id,
      type: selected?.type,
      scheduledDate: dayjs(scheduledDate),
      sourceDocument: sourceDocument || selected?.po?.cuId,
      warehouse: selected?.warehouse,
      company: selected?.company?._id,
      defaultInAccount: selected?.type == "sales" && defaultAccount?._id,
      defaultExAccount: selected?.type == "purchase" && defaultAccount?._id,
      ...others,
    });
  }, [selected]);
  const [defAccount, setDefAccount] = useState();
  const handleSelect = (e) => {
    setDefAccount(e);
  };
  const handleSubmit = async (status = "Drafts") => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${route}/create`,
      `${route}/update/${id}`,
      {
        status: status,
        products: dataSource,
        defaultAccount: defAccount,
      },
      setLoading
    );
    if (!id) navigate(`${path}/workspace/${response.data.result?._id}`);
    setSelected(response.data.result);
    return response.data.result;
  };

  const handleChange = (e) => {
    setCurrent(e);
  };
  const handleValidate = (arr) => {
    if (arr?.length > 0) {
      for (const item of arr) {
        if (!item.doneQty) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };
  const handleCommunicationType = (value) => {
    if (value == "basedOnComputer" || value == "basedOnInvoice") {
      setSelectCommunicationType(true);
    } else {
      setSelectCommunicationType(false);
    }
  };
  let items = [
    {
      label: "Journal Entries",
      key: 1,
      children: (
        <>
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24} sm={12}>
              <Divider orientation="left">ACCOUNTING INFORMATION</Divider>
              {selectedTypeOption == "sales" && (
                <SelectSearch
                  fields={"code,name"}
                  route={`erp/chartOfAccounts/wsearch`}
                  name={"defaultInAccount"}
                  label={"Default Income Account"}
                  columns={[
                    { label: "Code", size: 2, field: "code" },
                    { label: "name", size: 8, field: "name" },
                  ]}
                  where={{
                    accountCategory: "41",
                  }}
                  placeholder="search"
                  formProps={{
                    rules: [
                      {
                        required: true,
                        message: "Please select chart of account!",
                      },
                    ],
                  }}
                  handleSelect={handleSelect}
                />
              )}
              {selectedTypeOption == "purchase" && (
                <SelectSearch
                  fields={"code,name"}
                  route={`erp/chartOfAccounts/wsearch`}
                  name={"defaultExAccount"}
                  label={"Default  Expense  Account"}
                  columns={[
                    { label: "Code", size: 2, field: "code" },
                    { label: "name", size: 8, field: "name" },
                  ]}
                  where={{
                    accountCategory: "51",
                  }}
                  placeholder="search"
                  formProps={{
                    rules: [
                      {
                        required: true,
                        message: "Please select chart of account!",
                      },
                    ],
                  }}
                  handleSelect={handleSelect}
                />
              )}
              {selectedTypeOption == "sales" ||
              selectedTypeOption == "purchase" ? (
                <Form.Item
                  name="dedicatedCreditNoteSequence"
                  label="Dedicated Credit Note Sequence"
                  valuePropName="checked"
                  tooltip="Check this box if you don't want to share the same sequence on payments and bank transactions posted on this journal"
                >
                  <Checkbox />
                </Form.Item>
              ) : null}
              {selectedTypeOption == "cash" || selectedTypeOption == "bank" ? (
                <>
                  <SelectSearch
                    fields={"code,name"}
                    route={`erp/chartOfAccounts/wsearch`}
                    name={`${
                      selectedTypeOption == "cash"
                        ? "cashAccount"
                        : selectedTypeOption == "bank"
                        ? "bankAccount"
                        : null
                    }`}
                    label={`${
                      selectedTypeOption == "cash"
                        ? "Cash Account"
                        : selectedTypeOption == "bank"
                        ? "Bank Account"
                        : null
                    }`}
                    columns={[
                      { label: "Code", size: 2, field: "code" },
                      { label: "name", size: 8, field: "name" },
                    ]}
                    where={{
                      accountCategory: "12",
                    }}
                    placeholder="search"
                  />

                  <SelectSearch
                    fields={"code,name"}
                    route={`erp/chartOfAccounts/wsearch`}
                    name="suspenseAccount"
                    label="Suspense Account"
                    formProps={{
                      tooltip:
                        "Bank statements transactions will be posted on the suspense account until the final reconciliation allowing finding the right account.",
                    }}
                    columns={[
                      { label: "Code", size: 2, field: "code" },
                      { label: "name", size: 8, field: "name" },
                    ]}
                    where={{
                      accountCategory: "13",
                    }}
                    placeholder="search"
                  />

                  <SelectSearch
                    fields={"code,name"}
                    route={`erp/chartOfAccounts/wsearch`}
                    name="profitAccount"
                    label="Profit Account"
                    formProps={{
                      tooltip:
                        "Used to register a profit when the ending balance of a cash register differs from what the system computes",
                    }}
                    columns={[
                      { label: "Code", size: 2, field: "code" },
                      { label: "name", size: 8, field: "name" },
                    ]}
                    where={{
                      accountCategory: "41",
                    }}
                    placeholder="search"
                  />

                  <SelectSearch
                    fields={"code,name"}
                    route={`erp/chartOfAccounts/wsearch`}
                    name="lossAccount"
                    label="Loss Account"
                    formProps={{
                      tooltip:
                        "Used to register a loss when the ending balance of a cash register differs from what the system computes",
                    }}
                    columns={[
                      { label: "Code", size: 2, field: "code" },
                      { label: "name", size: 8, field: "name" },
                    ]}
                    where={{
                      accountCategory: "51",
                    }}
                    placeholder="search"
                  />

                  <Form.Item
                    name="dedicatedPaymentNoteSequence"
                    label="Dedicated Payment Note Sequence"
                    valuePropName="checked"
                    tooltip="Check this box if you don't want to share the same sequence on payments and bank transactions posted on this journal"
                  >
                    <Checkbox />
                  </Form.Item>
                </>
              ) : null}

              <Form.Item
                name="shortCode"
                label="Short Code"
                tooltip="Shorter name used for display. The journal entries of this journal will also be named using this prefix by default."
              >
                <Input />
              </Form.Item>
            </Col>
            {selectedTypeOption == "bank" && (
              <Col xs={24} sm={12}>
                <Divider orientation="left">BANK ACCOUNT NUMBER</Divider>
                <Form.Item
                  name="accountNumber"
                  label="Account Number"
                  tooltip="Used to register a loss when the ending balance of a cash register differs from what the system computes"
                >
                  <Input />
                </Form.Item>
              </Col>
            )}
          </Row>
        </>
      ),
    },
  ];
  return (
    <>
      <AppPageMetadata title={formTitle} />
      <FormLayout
        title={`${formTitle} / New`}
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
                name="journalName"
                label="Journal Name"
                className="main-head-input"
                rules={[
                  {
                    required: true,
                    message: "please input Journal name!",
                  },
                ]}
              >
                <Input placeholder="Journal" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "please select a type name!",
                  },
                ]}
                tooltip="Select 'Sale' for customer invoices journals.\nSelect 'Purchase' for vendor bills journals.\nSelect 'Cash' or 'Bank' for journals that are used in customer or vendor payments.\nSelect 'General' for miscellaneous operations journals."
              >
                <Select
                  onChange={(value) => setselectedTypeOption(value)}
                  // value={selectedTypeOption}
                  options={[
                    {
                      value: "sales",
                      label: "Sales",
                    },
                    {
                      value: "purchase",
                      label: "Purchase",
                    },
                    {
                      value: "cash",
                      label: "Cash",
                    },
                    {
                      value: "bank",
                      label: "Bank",
                    },
                    {
                      value: "miscellaneous",
                      label: "Miscellaneous",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <SelectSearch
                fields={"name"}
                route={`meta/company/profile/dsearch`}
                name="company"
                label="Company"
                columns={[{ label: "name", size: 8, field: "name" }]}
                placeholder="search"
              />
            </Col>
          </Row>
          <StyledTabs items={items} type="card" />
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default ReceiptForm;
