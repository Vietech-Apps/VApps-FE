import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { Max_Level, dataInfo } from "./Codes";
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

import LabelSelect from "meta/JLayouts/DynamicSelect";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import { getData } from "meta/common/Apis";
import DynamicCascader from "./DynamicCascader";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
const ReceiptForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [accountsData, setAccountsData] = useState();
  const [disableReconciliationSwitch, setDisableReconciliationSwitch] =
    useState(false);

  const [refresh, setRefresh] = useState();
  const { ...others } = selected ? selected : {};

  const parent = Form.useWatch("cascader", form);
  useEffect(() => {
    if (parent && parent.length > 0) {
      form.setFieldsValue({
        accountCategory: accountsData?.find((item) => item._id == parent[0])
          ?.accountCategory,
      });
    } else {
      if (!id)
        form.setFieldsValue({
          accountCategory: null,
        });
    }
  }, [parent]);

  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setSelected);
  }, [id]);

  useEffect(() => {
    console.log(selected);
    form.setFieldsValue({
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
        selectAble: true,
      },
      setLoading
    );
    setRefresh(true);
    form.resetFields();

    return response.data.result;
  };

  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  let items = [
    {
      label: "Accounting",
      key: 1,
      children: (
        <>
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
                  disabled={parent}
                  showSearch={{ filter }}
                  options={[
                    {
                      label: "Assets",
                      options: [
                        {
                          label: "Receivable",
                          value: "11",
                        },
                        {
                          label: "Bank & Cash",
                          value: "12",
                        },
                        {
                          label: "Current Assets",
                          value: "13",
                        },
                        {
                          label: "Non-current Assets",
                          value: "14",
                        },
                        {
                          label: "Fixed Assets",
                          value: "15",
                        },
                        {
                          label: "Prepayments",
                          value: "16",
                        },
                      ],
                    },
                    {
                      label: "Liabilities",
                      options: [
                        {
                          label: "Payable",
                          value: "21",
                        },

                        {
                          label: "Current Liabilities",
                          value: "22",
                        },
                        {
                          label: "Non-current Liabilities",
                          value: "23",
                        },
                      ],
                    },
                    {
                      label: "Equity",
                      options: [
                        {
                          label: "Equity",
                          value: "31",
                        },
                        {
                          label: "Accumulated Profit",
                          value: "32",
                        },
                        {
                          label: "Share Capital",
                          value: "33",
                        },
                      ],
                    },
                    {
                      label: "Income",
                      options: [
                        {
                          label: "Income",
                          value: "41",
                        },
                        {
                          label: "Other Income",
                          value: "42",
                        },
                      ],
                    },
                    {
                      label: "Expense",
                      options: [
                        {
                          label: "Expenses",
                          value: "51",
                        },
                        {
                          label: "Depreciation",
                          value: "52",
                        },
                        {
                          label: "Cost Of Revenue",
                          value: "53",
                        },
                      ],
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="allowReconciliation"
                label="Allow Reconciliation"
                valuePropName="checked"
                tooltip="Check this box if this account allows invoices & payments matching of journal items."
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  disabled={disableReconciliationSwitch} // use the new state here
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <SelectSearch
                fields={"code,name"}
                name={"defaultTaxes"}
                label={"Default Taxes"}
                route={`erp/tax/dsearch`}
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
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="deprecated"
                label="Deprecated"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="tags"
                label="Tags"
                tooltip="Optional tags you may want to assign for custom reporting"
              >
                <LabelSelect
                  endpoint="ChartOfAccounts"
                  mode="multiple"
                  label="Tags"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}></Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="allowedJournals"
                label="Allowed Journals"
                tooltip="Define in which journals this account can be used. If empty, can be used in all journals."
              >
                <Select
                  disabled
                  allowClear
                  mode="tags"
                  options={[
                    { value: "customerInvoices", label: "Customer Invoices" },
                    {
                      value: "inventoryValuation",
                      label: "Inventory Valuation",
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="company" label="company">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];
  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        docData={selected}
        form={form}
        // tabItems={items}
        onSave={handleSubmit}
        handleComplete={handleSubmit}
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
          onValuesChange={(changedValues) => {
            if ("accountCategory" in changedValues) {
              const accCategory = changedValues.accountCategory;
              if (
                accCategory === "11" ||
                accCategory === "12" ||
                accCategory === "21"
              ) {
                form.setFieldsValue({ allowReconciliation: true });
                setDisableReconciliationSwitch(true); // disable the switch
              } else if (accCategory === "13" || accCategory === "23") {
                form.setFieldsValue({ allowReconciliation: true });
                setDisableReconciliationSwitch(false); // enable the switch
              } else {
                form.setFieldsValue({ allowReconciliation: false });
                setDisableReconciliationSwitch(false); // enable the switch
              }
            }
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
                label="Account Name"
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
