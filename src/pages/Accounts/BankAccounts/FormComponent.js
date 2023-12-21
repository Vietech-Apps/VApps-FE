import { Col, Form, Input, Switch, Row, Select } from "antd";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import React from "react";
import BankForm from "./BankForm";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import CreateContact from "pages/apps/Customers/Component/Create/CreateContact";

const FormComponent = ({ form }) => {
  const forCompany = true;
  const accountType = Form.useWatch("accountType", form);
  return (
    <StyledMetaForm
      form={form}
      size="small"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{ operationType: "Receipts", accountType: "bank" }}
    >
      <Row gutter={24}>
        <Col xs={24} sm={18}>
          {/* <Form.Item
                name="forCompany"
                label="Your bank Account"
                valuePropName="checked"
                tooltip="Please confirm if this is the account you wish to use for transactions. Set it to 'true'` if this account does not belong to either a customer or a vendor."
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  // disabled={disableReconciliationSwitch} // use the new state here
                />
              </Form.Item> */}
          {forCompany && (
            <Form.Item name="accountType" label="Account Type">
              <Select
                placeholder="Select an account type"
                options={[
                  {
                    label: "Cash Account",
                    value: "cash",
                  },
                  {
                    label: "Bank Account",
                    value: "bank",
                  },
                ]}
              />
            </Form.Item>
          )}
          {accountType !== "cash" && (
            <SelectSearch
              fields={"name,bankIdentifierCode,address"}
              route={`accounts/Bank/dsearch`}
              label={"Bank"}
              name={`bank`}
              columns={[
                { label: "Name", size: 24, field: "name" },
                {
                  label: "bankIdentifierCode",
                  size: 24,
                  field: "bankIdentifierCode",
                },
              ]}
              placeholder="Search banks"
              formProps={{
                rules: [
                  {
                    required: true,
                    message: "Please select banks!",
                  },
                ],
              }}
              newComponent={
                <ModalWithFormChild
                  childern={<BankForm modal={true} />}
                  route={"accounts/Bank/create"}
                  title={"Create New Bank"}
                  tooltip={"Create New Bank"}
                  // setRefreshing={setRefreshing}
                />
              }
            />
          )}
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={[
              {
                required: true,
                message: "Please input the Account Number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="accountHolderName" label="Account Title">
            <Input />
          </Form.Item>
          {forCompany && (
            <>
              <Form.Item
                name="displayDash"
                label="Display on dashboard"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  // disabled={disableReconciliationSwitch} // use the new state here
                />
              </Form.Item>

              <SelectSearch
                fields={"code,name"}
                route={`erp/chartOfAccounts/wsearch`}
                name={`relatedChartAcc`}
                label={`Related Account`}
                columns={[
                  { label: "Code", size: 2, field: "code" },
                  { label: "name", size: 8, field: "name" },
                ]}
                where={{
                  accountCategory: "12",
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select the Account!",
                  },
                ]}
                placeholder="Search from Chart of Account"
              />
            </>
          )}
          {/* {!forCompany && ( */}
          <SelectSearch
            fields={"title,email,phone"}
            route={`meta/contact/dsearch`}
            label={"Account Holder"}
            name={`accountHolder`}
            columns={[
              { label: "Title", size: 24, field: "title" },
              { label: "Email", size: 24, field: "email" },
              // { label: "Phone", size: 3, field: "phone" },
            ]}
            placeholder="Search Contact"
            formProps={{
              rules: [
                {
                  required: true,
                  message: "Please select Contact!",
                },
              ],
            }}
            newComponent={
              <ModalWithFormChild
                childern={<CreateContact modal={true} />}
                route={"meta/contact/create"}
                title={"Create a new Contact"}
                tooltip={"Create a new Contact"}
                // setRefreshing={setRefreshing}
              />
            }
          />
          {/* )} */}
          <SelectSearch
            fields={"name"}
            route={`meta/company/profile/dsearch`}
            label={"Company"}
            name={"company"}
            columns={[{ label: "Name", size: 5, field: "name" }]}
          />
        </Col>
      </Row>
    </StyledMetaForm>
  );
};

export default FormComponent;
