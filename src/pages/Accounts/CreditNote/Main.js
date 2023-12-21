import FormLayout from "meta/JLayouts/Layout";
import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Spin,
  Tooltip,
  Row,
  Col,
  DatePicker,
  Steps,
  Alert,
} from "antd";
import "shared/styles/vendors/ql-editor.css";
import { useGetData } from "meta/services/auth/ezAPI";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import {
  calculateItemTotals,
  calculateTotalPrice,
  handleValidateWithOutReset,
} from "meta/common/MyFns";
import { useAuthUser } from "meta/utility/AuthHooks";

import TermAndConditionComponent from "pages/Sale/TermCondition/TermAndConditionComponent";
import { creditNoteInfo } from "./Code";
import ProductTable from "./ProductTable";
import {
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import JournalItems from "./JournalItems";
import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import CreateContact from "pages/apps/Customers/Component/Create/CreateContact";
import { AiOutlineSave } from "react-icons/ai";
import {
  CheckCircleOutlined,
  CheckSquareTwoTone,
  RestFilled,
  SaveTwoTone,
} from "@ant-design/icons";
import { FcRefresh } from "react-icons/fc";
import RegisterPayment from "./RegisterPayment";
import Unallocated from "./AdjustmentModal";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { usePermissions } from "meta/common/CheckPermission";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { IoRefreshOutline } from "react-icons/io5";

const Main = () => {
  const { canUpdate } = usePermissions(
    RoutePermittedRole[creditNoteInfo.title]
  );
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useAuthUser();
  const [dataSource, setDataSource] = useState([]);
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isDC, setIsDC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatLoad, setWhatLoad] = useState();
  const [refreshings, setRefreshings] = useState(false);
  const [items, setItems] = useState([]);

  const [
    { apiData: selected, loading: refreshing },
    { setData: setSelected, setRefreshing },
  ] = useGetData(
    `${creditNoteInfo.dataRoute}/readwithUnpaid/${id}`,
    {},
    {},
    id ? true : false
  );

  useEffect(() => {
    setValue(selected?.terms);
    setDataSource(selected?.products ? selected?.products : []);

    const {
      contact,
      accountingDate,
      dueDate,
      creditNoteDate,
      terms,
      deliveryChallan,
      ...others
    } = selected || {};
    setIsDC(deliveryChallan?._id ? true : false);
    form.setFieldsValue({
      contact: contact?._id,
      accountingDate: dayjs(accountingDate),
      creditNoteDate: dayjs(creditNoteDate),
      deliveryChallan: deliveryChallan?._id,
      dueDate: dayjs(dueDate),
      ...others,
    });
  }, [selected]);
  console.log(selected);
  useEffect(() => {
    let newDataSoruce = dataSource?.map((s) => ({
      credit: 0,
      debit: calculateTotalPrice(s).discountedTotalPrice,
      ...s,
    }));
    let credit = newDataSoruce?.reduce((totalDebit, item) => {
      const itemDebit = item.debit;
      return totalDebit + itemDebit;
    }, 0);

    let hasTax = false;
    let groupedTaxes = {};

    newDataSoruce?.forEach((item) => {
      const taxValue = item.tax || 0;
      const taxKey = taxValue?.toFixed(2);
      const discountValue = (item.discount * item.price) / 100;
      if (taxValue > 0) {
        hasTax = true;
        if (groupedTaxes[taxKey]) {
          // If the tax value already exists, update the credit value
          groupedTaxes[taxKey].debit +=
            (((item.price - discountValue) * taxValue) / 100) * item.qty;
        } else {
          // Create a new entry for the unique tax value
          groupedTaxes[taxKey] = {
            key: uuidv4(),
            credit: 0,
            name: `Tax ${taxValue}%`,
            debit: (((item.price - discountValue) * taxValue) / 100) * item.qty,
            account: item.taxAccount,
            accountId: item.taxAccountId,
          };
        }
      }
    });

    const taxRows = Object.values(groupedTaxes);
    const totalTax = taxRows.reduce((total, row) => total + row.debit, 0);
    const debitRow = {
      key: uuidv4(),
      debit: 0,
      name: selected?.cuId,
      credit: totalTax + credit || 0,
      account: `${selected?.contact?.accountReceivable?.code} -
        ${selected?.contact?.accountReceivable?.name}`,
      accountId: selected?.contact?.accountReceivable?._id,
    };

    const newData = hasTax
      ? newDataSoruce.concat(taxRows, debitRow)
      : newDataSoruce.concat(debitRow);

    setItems(newData);
  }, [dataSource]);

  const handleComplete = async (status) => {
    setWhatLoad(status);
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${creditNoteInfo.dataRoute}/create`,
      `${creditNoteInfo.dataRoute}/updateandentries/${id}`,
      {
        products: dataSource,
        terms: value,
        amount: calculateItemTotals(dataSource).totalAmount,
        amountDue: calculateItemTotals(dataSource).totalAmount,
        isDisabled: status == "Posted" ? true : false,
        status: status,
        path: creditNoteInfo.navPath,
        transactions: items,
      },
      setLoading
    );
    if (response !== null) {
      if (!id)
        navigate(
          `${creditNoteInfo.navPath}/workspace/${response.data.result?._id}`
        );
      setSelected(response.data?.result);
    }
    return response;
  };

  const handleSelect = (e, option) => {
    const f = option.find((c) => c._id == e);
    form.setFieldsValue({
      deliveryAddress: f?.address,
      paymentTerm: f.paymentTerms?._id,
    });
  };

  const tabItems = [
    {
      label: "Workspace",
      key: "1",
      children: (
        <>
          <ProductTable
            dataSource={dataSource}
            setDataSource={setDataSource}
            form={form}
            setSelected={setSelected}
            selected={selected}
            isDC={isDC}
          />
        </>
      ),
    },
    {
      label: "Jouranl Items",
      key: "5",
      children: (
        <JournalItems
          id={id}
          dataSource={dataSource}
          setDataSource={setDataSource}
          selected={selected}
          setItems={setItems}
          items={items}
        />
      ),
    },
    {
      label: "Term & Condition",
      key: "2",
      children: (
        <TermAndConditionComponent
          editorHtml={value}
          setEditorHtml={setValue}
        />
      ),
    },
    {
      label: "Other Info",
      key: "3",
      children: "other info",
    },

    {
      label: "Notes",
      key: "4",
      children: (
        <Form form={form}>
          <Form.Item name="notes">
            <Input.TextArea
              showCount
              placeholder="internal notes..."
            ></Input.TextArea>
          </Form.Item>
        </Form>
      ),
    },
  ];

  if (refreshing) {
    return <Spin />;
  } else {
    return (
      <>
        <AppPageMetadata title={creditNoteInfo.metaData} />
        <FormLayout
          codes={creditNoteInfo}
          docData={selected}
          form={form}
          handleNew={() => {
            form.resetFields();
            setDataSource([]);
            setSelected();
          }}
          tabItems={tabItems}
          handleComplete={handleComplete}
          extraStep={
            <Space wrap>
              <Tooltip title={`Save`} placement="bottomRight">
                <Button
                  onClick={() => handleComplete("Draft")}
                  disabled={selected?.isDisabled}
                  loading={whatLoad == "Draft" && loading}
                  type="primary"
                >
                  Save
                </Button>
              </Tooltip>
              <Tooltip title={``} placement="bottomRight">
                <Button
                  onClick={() => handleComplete("Posted")}
                  loading={whatLoad == "Posted" && loading}
                  disabled={selected?.isDisabled}
                  hidden={!id}
                  icon={<CheckCircleOutlined />}
                >
                  Post
                </Button>
              </Tooltip>
              <Tooltip title={`Refresh`} placement="bottomRight">
                <Button
                  icon={<IoRefreshOutline className="mr-1" />}
                  onClick={() => {
                    setRefreshing(true);
                    form.resetFields();
                    setRefreshings(true);
                  }}
                  disabled={selected?.isDisabled}
                >
                  Refresh
                </Button>
              </Tooltip>
              <Button
                onClick={() => setOpen(true)}
                hidden={selected?.status === "Drafts" || !id}
                disabled={selected?.status === "In Payment"}
              >
                Register Payment
              </Button>
              {id && open && (
                <RegisterPayment
                  id={id}
                  selected={selected}
                  dataSource={dataSource}
                  setSelected={setSelected}
                  open={open}
                  setOpen={setOpen}
                />
              )}
              {selected?.invoices?.length > 0 &&
                selected?.status !== "In Payment" && (
                  <Alert
                    message="There are unpaid debits associated with this customer. You can allocate them to settle this credit note."
                    type="info"
                  />
                )}
            </Space>
          }
          items={[
            {
              title: "Draft",
              status:
                selected?.status == "Draft"
                  ? "finish"
                  : selected?.status == "Posted" ||
                    selected?.status == "In Payment"
                  ? "finish"
                  : "finish",
            },
            {
              title: "Post",
              status: selected?.status === "Posted" ? "finish" : "wait",
            },
            {
              title: "InPayment",
              status: selected?.status === "In Payment" ? "finish" : "wait",
            },
            {
              title: "Paid",
              status: selected?.status === "Paid" ? "finish" : "wait",
            },
          ]}
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
            disabled={
              selected?.status == "In Payment" || (selected && !canUpdate)
            }
          >
            <Row gutter={12}>
              <Col md={16}>
                <SelectSearch
                  handleSelect={handleSelect}
                  fields={"title,email,phone"}
                  route={`meta/contact/dsearch`}
                  label={"Customer"}
                  name={`contact`}
                  columns={[
                    { label: "Title", size: 24, field: "title" },
                    { label: "Email", size: 24, field: "email" },
                    // { label: "Phone", size: 3, field: "phone" },
                  ]}
                  placeholder="search customers"
                  formProps={{
                    rules: [
                      {
                        required: true,
                        message: "Please select customer!",
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
                <Form.Item name={"deliveryAddress"} label="Delivery Address">
                  <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
                </Form.Item>
                <Form.Item name={"paymentReference"} label="Payment Reference">
                  <Input />
                </Form.Item>
              </Col>
              <Col md={8}>
                <Form.Item
                  name={"accountingDate"}
                  label="Accounting Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select Accounting Date!",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name={"creditNoteDate"}
                  label="CreditNote Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select creditNote Date!",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name={"dueDate"} label="Due Date">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <SelectSearch
                  fields={"paymentTerms"}
                  route={`accounts/PaymentTerms/wsearch`}
                  label={"Payment Term"}
                  name={`paymentTerm`}
                  columns={[
                    { label: "Title", size: 24, field: "paymentTerms" },
                    {
                      label: "Total Installments",
                      size: 2,
                      accessor: (c) => c.terms?.length,
                    },
                  ]}
                  placeholder="search Payment Terms"
                  otherParams={{ _id: selected?.paymentTerm }}
                />
              </Col>
            </Row>
          </StyledMetaForm>
        </FormLayout>
      </>
    );
  }
};

export default Main;
