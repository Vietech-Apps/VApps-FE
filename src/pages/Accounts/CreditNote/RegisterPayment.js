import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
} from "antd";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";
import successHandler2 from "meta/services/auth/successHandle2";
import { path as paymentPath } from "../Payments/Codes";

import { useGetData } from "meta/services/auth/ezAPI";
import { useAuthUser } from "meta/utility/AuthHooks";
import { JEInfo } from "../JournalEntries/Codes";
import { creditNoteInfo } from "./Code";

const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  selected,
  loading,
  setAccountType,
  handleSelectJ,
  form,
}) => {
  const [amountChange, setAmountChange] = useState();

  const difference = selected?.amountDue - amountChange;
  const [paymentStatus, setPaymentStatus] = useState();
  useEffect(() => {
    form.setFieldsValue({ reference: selected?.cuId, amountDue: difference });
  }, [selected, difference]);
  const handleJournal = (e, option) => {
    let x = option?.find((c) => c._id == e);
    setAccountType(x.accountType);
  };

  return (
    <Modal
      open={open}
      title="Register Payment"
      okText="Create Payment"
      cancelText="Cancel"
      centered
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <StyledMetaForm
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          accountingDate: dayjs(),
          amount: selected?.amountDue,
          paymentStatus: "Keep Open",
          label: "Write Off",
        }}
      >
        <SelectSearch
          handleSelect={handleJournal}
          fields={"accountHolderName"}
          route={`accounts/BankAccount/customSearch`}
          label={"Account"}
          name={`account`}
          where={{ forCompany: true }}
          columns={[
            {
              label: "Bank",
              size: 2,
              accessor: (e) =>
                e.accountType == "bank"
                  ? e.bank?.name + "-" + e.accountHolderName
                  : e.accountHolderName,
            },
          ]}
          placeholder="Search accounts"
          formProps={{
            rules: [
              {
                required: true,
                message: "Please select account!",
              },
            ],
          }}
        />

        <Form.Item name="accountingDate" label="Payment Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="reference" label="Reference">
          <Input disabled />
        </Form.Item>

        <Form.Item name="amount" label="Amount">
          <InputNumber
            max={selected?.amountDue}
            style={{ width: "100%" }}
            onChange={(e) => setAmountChange(e)}
            min={0}
          />
        </Form.Item>

        {difference > 0 && amountChange && (
          <>
            <Form.Item label="Amount Difference" name="amountDue">
              <InputNumber disabled />
            </Form.Item>

            <Form.Item
              name="paymentStatus"
              className="collection-create-form_last-form-item"
              rules={[
                { required: true, message: "Please Select Payment Status" },
              ]}
            >
              <Radio.Group onChange={(e) => setPaymentStatus(e.target.value)}>
                <Radio value="Keep Open">Keep Open</Radio>
                <Radio value="Mark as full payment">Mark as full payment</Radio>
              </Radio.Group>
            </Form.Item>

            {paymentStatus == "Mark as full payment" && (
              <>
                <SelectSearch
                  handleSelect={handleSelectJ}
                  fields={"name,code"}
                  route={"erp/chartOfAccounts/dsearch"}
                  label={"Post Difference In"}
                  name={`postDifference`}
                  columns={[
                    { label: "Name", size: 5, field: "name" },
                    { label: "Code", size: 3, field: "code" },
                  ]}
                  placeholder="Search accounts"
                  formProps={{
                    rules: [
                      {
                        required: true,
                        message: "Please select account!",
                      },
                    ],
                  }}
                />

                <Form.Item
                  name="label"
                  label="Label"
                  tooltip="Modify the designation of the counterparty responsible for managing the payment variance."
                >
                  <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
                </Form.Item>
              </>
            )}
          </>
        )}
      </StyledMetaForm>
    </Modal>
  );
};

const RegisterPayment = ({
  selected,
  dataSource,
  setSelected,
  id,
  open,
  setOpen,
}) => {
  const [form] = Form.useForm();
  const [accountType, setAccountType] = useState();
  const [loading, setLoading] = useState(false);
  const [postDiff, setPostDiff] = useState();
  const { user } = useAuthUser();

  const [{ apiData: setting }] = useGetData(
    `accounts/GeneralSetting/readByCompany/${user?.currLocation?.parentCompany?._id}`,
    {}
  );

  const handleSelectJ = (e, options) => {
    let x = options?.find((c) => c._id == e);
    setPostDiff(x);
  };
  const checkStatus = (e) => {
    if (e.paymentStatus === "Mark as full payment") {
      return {
        account: postDiff?.code + "-" + postDiff?.name,
        accountId: postDiff?._id,
        notes: e.label,
        contact: selected?.contact?._id,
        credit: e.amountDue,
        debit: 0.0,
      };
    }
  };

  const onCreate = async (values) => {
    setLoading(true);
    const entries = [
      {
        account: `${selected?.contact?.accountReceivable?.code}-${selected?.contact?.accountReceivable?.name}`,
        accountId: selected?.contact?.accountReceivable?._id,
        notes: "Customer Reimbursement",
        contact: selected?.contact?._id,
        credit: 0.0,
        debit:
          values.paymentStatus === "Mark as full payment"
            ? values.amount + values.amountDue
            : values.amount,
      },
      {
        account: `${setting?.outstandingReceiptsAccount?.code}-${setting?.outstandingReceiptsAccount?.name}`,
        accountId: setting?.outstandingReceiptsAccount?._id,
        notes: "Customer Reimbursement",
        contact: selected?.contact?._id,
        credit: values.amount,
        debit: 0.0,
      },
    ];

    const statusEntry = checkStatus(values);
    if (statusEntry) {
      entries.push(statusEntry);
    }

    values.transactions = entries;
    values.accountType =
      accountType === "cash" ? "PCSH" : accountType === "bank" && "PBNK";
    values.memo = selected?._id;
    values.paymentPath = paymentPath;
    values.contact = selected?.contact?._id;
    values.journalPath = JEInfo.navPath;
    values.amount =
      values.paymentStatus === "Mark as full payment"
        ? values.amount + values.amountDue
        : values.amount;

    try {
      const response = await jwtAxios.put(
        `${creditNoteInfo.dataRoute}/regPayment/${selected?._id}`,
        values
      );
      setSelected(response.data.result);
      successHandler2(response);
      form.setFieldValue();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <div>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        selected={selected}
        dataSource={dataSource}
        setAccountType={setAccountType}
        handleSelectJ={handleSelectJ}
        form={form}
        loading={loading}
      />
    </div>
  );
};

export default RegisterPayment;
