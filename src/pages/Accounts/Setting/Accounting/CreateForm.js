import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { dataInfo } from "../Codes";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  message,
} from "antd";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData } from "meta/common/Apis";
import {
  StyledCol,
  StyledHeader,
  StyledMainHeader,
  StyledSubHeader,
} from "../../index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { useAuthUser } from "meta/utility/AuthHooks";
import { useGetData } from "meta/services/auth/ezAPI";
const CreateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthUser();
  const [{ apiData: selected }, { setData: setSelected }] = useGetData(
    `accounts/GeneralSetting/readByCompany/${user?.currLocation?.parentCompany?._id}`,
    {}
  );
  const {
    internalTransferAccount,
    outstandingPaymentsAccount,
    outstandingReceiptsAccount,
    cashDiscountGainAccount,
    cashDiscountLossAccount,
    bankSuspenseAccount,
    salesTax,
    defualtTemporaryAccount,
    defualtAccountOrderInv,
    purchaseTax,
    stockValuationIncAccount,
    stockValuationExpAccount,
    ...others
  } = selected ? selected : {};
  useEffect(() => {
    form.setFieldsValue({
      internalTransferAccount: internalTransferAccount?._id,
      outstandingPaymentsAccount: outstandingPaymentsAccount?._id,
      outstandingReceiptsAccount: outstandingReceiptsAccount?._id,
      stockValuationIncAccount: stockValuationIncAccount?._id,
      cashDiscountGainAccount: cashDiscountGainAccount?._id,
      cashDiscountLossAccount: cashDiscountLossAccount?._id,
      bankSuspenseAccount: bankSuspenseAccount?._id,
      defualtAccountOrderInv: defualtAccountOrderInv?._id,
      defualtTemporaryAccount: defualtTemporaryAccount?._id,
      stockValuationExpAccount: stockValuationExpAccount?._id,
      salesTax: salesTax?._id,
      purchaseTax: purchaseTax?._id,
      ...others,
    });
  }, [selected]);
  const handleSubmit = async (status = "Drafts") => {
    const response = await handleValidateWithOutReset(
      form,
      selected?._id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${selected?._id}`,
      {
        status: status,
        products: dataSource,
      },
      setLoading
    );
    if (!selected?._id)
      navigate(`${dataInfo.navPath}/${response.data.result?._id}`);
    setSelected(response.data.result);
    return response.data.result;
  };
  const monthName = [
    {
      value: "January",
      name: "January",
      days: "1-31",
    },
    {
      value: "February",
      name: "February",
      days: "1-28/29",
    },
    {
      value: "March",
      name: "March",
      days: "1-31",
    },
    {
      value: "April",
      name: "April",
      days: "1-30",
    },
    {
      value: "May",
      name: "May",
      days: "1-31",
    },
    {
      value: "June",
      name: "June",
      days: "1-30",
    },
    {
      value: "July",
      name: "July",
      days: "1-31",
    },
    {
      value: "August",
      name: "August",
      days: "1-31",
    },
    {
      value: "September",
      name: "September",
      days: "1-30",
    },
    {
      value: "October",
      name: "October",
      days: "1-31",
    },
    {
      value: "November",
      name: "November",
      days: "1-30",
    },
    {
      value: "Dececember",
      name: "December",
      days: "1-31",
    },
  ];

  const dateList = [];

  for (let i = 1; i <= 31; i++) {
    dateList.push({ value: i, name: String(i) });
  }

  return (
    <>
      <AppPageMetadata title={dataInfo?.metaData} />
      <FormLayout
        codes={dataInfo}
        docData={selected}
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
        <StyledMainHeader> Taxes</StyledMainHeader>
        <StyledMetaForm
          form={form}
          size="small"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Row gutter={24}>
            <StyledCol sm={12} xs={24}>
              <StyledHeader>Default Taxes</StyledHeader>
              <StyledSubHeader>
                Default taxes applied to local transactions
              </StyledSubHeader>

              <SelectSearch
                fields={"taxName"}
                name="salesTax"
                label="Sales Tax"
                route={`erp/tax/wsearch`}
                otherParams={{ _id: selected?.salesTax?._id }}
                columns={[
                  {
                    label: "Name",
                    size: 4,
                    accessor: (e) => (
                      <>
                        {e.taxRate}%{e.taxName}
                      </>
                    ),
                  },
                ]}
                placeholder="Select here"
              />
              <SelectSearch
                fields={"taxName"}
                name="purchaseTax"
                label="Purchase Tax"
                route={`erp/tax/wsearch`}
                otherParams={{ _id: selected?.purchaseTax?._id }}
                columns={[
                  {
                    label: "Name",
                    size: 4,
                    accessor: (e) => (
                      <>
                        {e.taxRate}%{e.taxName}
                      </>
                    ),
                  },
                ]}
                placeholder="Select here"
              />
            </StyledCol>
            <StyledCol sm={12} xs={24}>
              <StyledHeader>Tax Return Periodicity</StyledHeader>
              <StyledSubHeader>
                How often tax returns have to be made
              </StyledSubHeader>

              <Form.Item
                name="periodicity"
                label="Periodicity"
                rules={[{ required: true, message: "Tax Name is required" }]}
              >
                <Select
                  options={[
                    { value: "monthly", label: "monthly" },
                    { value: "annually", label: "annually" },
                    { value: "semi-annually", label: "semi-annually" },
                    { value: "every4months", label: "every 4 months" },
                    { value: "quarterly", label: "quarterly" },
                    { value: "every2months", label: "every 2 months" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="reminder"
                label="Reminder"
                extra="Days after period"
              >
                <Input />
              </Form.Item>
              <Form.Item name="journal" label="Journal">
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
            </StyledCol>
          </Row>
          <StyledMainHeader> Currencies</StyledMainHeader>
          <Row gutter={24}>
            <StyledCol sm={12} xs={24}>
              <StyledHeader>Main Currency</StyledHeader>
              <StyledSubHeader>Main currency of your company</StyledSubHeader>
              <Form.Item name="currency" label="Currency">
                <Select
                  disabled
                  options={[
                    {
                      value: "PKR",
                      label: "PKR",
                    },
                    {
                      value: "AED",
                      label: "AED",
                    },
                    {
                      value: "AFN",
                      label: "AFN",
                    },
                  ]}
                />
              </Form.Item>
            </StyledCol>
          </Row>
          <StyledMainHeader>Default Accounts</StyledMainHeader>
          <Row gutter={24}>
            <StyledCol sm={12} xs={24}>
              <StyledSubHeader>
                The following default accounts are used with certain features.
              </StyledSubHeader>
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="bankSuspenseAccount"
                label="Bank Suspense Account"
                otherParams={{ _id: selected?.bankSuspenseAccount?._id }}
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="outstandingReceiptsAccount"
                otherParams={{ _id: selected?.outstandingReceiptsAccount?._id }}
                label="Outstanding Receipts Account"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="outstandingPaymentsAccount"
                otherParams={{ _id: selected?.outstandingPaymentsAccount?._id }}
                label="Outstanding Payments Account"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="internalTransferAccount"
                otherParams={{ _id: selected?.internalTransferAccount?._id }}
                label="Internal Transfer Account"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="cashDiscountGainAccount"
                otherParams={{ _id: selected?.cashDiscountGainAccount?._id }}
                label="Cash Discount Gain Account"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="cashDiscountLossAccount"
                otherParams={{ _id: selected?.chartOfAccounts?._id }}
                label="Cash Discount Loss Account"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
            </StyledCol>
            <StyledCol sm={12} xs={24}>
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="defaultReceivable"
                otherParams={{ _id: selected?.defualtAccountOrderInv?._id }}
                label="Default Account Receivable"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="defaultPayable"
                otherParams={{ _id: selected?.defualtAccountOrderInv?._id }}
                label="Default Account Payable"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="defualtTemporaryAccount"
                otherParams={{ _id: selected?.defualtTemporaryAccount?._id }}
                label="Default Temporary Account"
                formProps={{
                  extra: "Account for Anonymous Customers",
                }}
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="defualtAccountOrderInv"
                otherParams={{ _id: selected?.defualtAccountOrderInv?._id }}
                label="Default Account for orders and invoices"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
            </StyledCol>
          </Row>
          <StyledMainHeader>Stock Valuation</StyledMainHeader>
          <Row gutter={24}>
            <StyledCol sm={12} xs={24}>
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="stockValuationIncAccount"
                label="Income Account"
                otherParams={{ _id: selected?.stockValuationIncAccount?._id }}
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name="stockValuationExpAccount"
                otherParams={{ _id: selected?.stockValuationExpAccount?._id }}
                label="Expense Account"
                columns={[
                  {
                    label: "Code-Account",
                    size: 8,
                    accessor: (c) => c.code + "-" + c.name,
                  },
                ]}
                placeholder="search"
              />
            </StyledCol>
          </Row>
          <StyledMainHeader>Fiscal Periods</StyledMainHeader>

          <Row gutter={24}>
            <StyledCol sm={12} xs={24}>
              <StyledHeader>Fiscal Year</StyledHeader>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <Form.Item
                  name="lastDayMonth"
                  label="Last Day"
                  style={{ flex: 1 }}
                >
                  <Select options={monthName} />
                </Form.Item>
                <Form.Item name="lastDayDate" style={{ flex: 1 }}>
                  <Select options={dateList} />
                </Form.Item>
              </div>
            </StyledCol>
            <StyledCol sm={12} xs={24}>
              <StyledHeader>Invoicing Switch Threshold</StyledHeader>

              <StyledSubHeader>
                The invoices up to this date will not be taken into account as
                accounting entries
              </StyledSubHeader>
              <Form.Item name="invoiceswitchThresholdDate">
                <DatePicker />
              </Form.Item>
            </StyledCol>
            <StyledCol sm={12} xs={24}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <StyledHeader>Fiscal Years</StyledHeader>
                <Form.Item name="fiscalYears" valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              </div>
              <StyledSubHeader>
                Define fiscal years of more or less than one year
              </StyledSubHeader>
            </StyledCol>
          </Row>
          {/* <StyledTabs items={items} type="card" /> */}
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default CreateForm;
