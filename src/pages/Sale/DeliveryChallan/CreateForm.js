import FormLayout from "meta/JLayouts/Layout";
import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Tabs,
  Spin,
  Checkbox,
  Tooltip,
  Row,
  Col,
  DatePicker,
  Steps,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import "shared/styles/vendors/ql-editor.css";
import { useGetData } from "meta/services/auth/ezAPI";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import {
  calculateItemTotals,
  handleValidateWithOutReset,
} from "meta/common/MyFns";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { useAuthUser } from "meta/utility/AuthHooks";

import TermAndConditionComponent from "pages/Sale/TermCondition/TermAndConditionComponent";
import ProductTable from "./ProductTable";
import { StyledTabs } from "meta/common/FormFeilds/index.styled";

import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import CreateContact from "pages/apps/Customers/Component/Create/CreateContact";
import { CheckSquareTwoTone } from "@ant-design/icons";
import { FcRefresh } from "react-icons/fc";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { StyledMetaForm } from "./index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import LoadTable from "./LoadTable";
import { dataInfo } from "./Code";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Main = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [customer, setCustomer] = useState();
  const [dataSource, setDataSource] = useState([]);
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState();
  const [whatLoad, setWhatLoad] = useState();
  const [refreshings, setRefreshings] = useState(false);
  const [
    { apiData: selected, loading: refreshing },
    { setData: setSelected, setRefreshing },
  ] = useGetData(
    `${dataInfo?.dataRoute}/read/${id}`,
    {},
    {},
    id ? true : false
  );

  useEffect(() => {
    setIsNew(selected?.so ? selected?.isNew : true);
    setValue(selected?.terms);
    setDataSource(selected?.products ? selected?.products : []);
    const {
      contact,
      invoiceDate,
      dueDate,
      journal,
      terms,
      deliveryChallan,
      sameAsBilling,
      so,
      ...others
    } = selected || {};
    form.setFieldsValue({
      sameAsBilling: sameAsBilling || true,
      contact: contact?._id,
      so: so?._id,
      invoiceDate: dayjs(invoiceDate),
      deliveryChallan: deliveryChallan?._id,
      dueDate: dayjs(dueDate),
      ...others,
    });
  }, [selected]);

  const handleComplete = async (status) => {
    setWhatLoad(status);
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo?.dataRoute}/create`,
      `${dataInfo?.dataRoute}/update/${id}`,
      {
        products: dataSource,
        terms: value,
        amount: calculateItemTotals(dataSource).totalAmount,
        amountDue: calculateItemTotals(dataSource).totalAmount,
        isDisabled: status == "Posted" ? true : false,
        status: status,
        isNew,
      },
      setLoading
    );
    if (!id)
      navigate(`${dataInfo.navPath}/workspace/${response.data.result?._id}`);
    setSelected(response.data?.result);
  };

  const handleSelect = (e, option) => {
    const f = option.find((c) => c._id == e);
    form.setFieldsValue({ billingAddress: f?.address });
  };

  const handleSelectSO = (e, option) => {
    setIsNew(false);
    const f = option?.find((c) => c._id == e);
    setCustomer(f.customer._id);
    form.setFieldsValue({
      contact: f?.customer?._id,
      billingAddress: f.address,
      sameAsBilling: f.sameAsBilling,
      shippingAddress: f.shippingAddress,
      reference: f.cuId,
    });
    setDataSource(
      f.products
        ?.filter((a) => a.dcStatus !== "Delivered")
        ?.map((c) => ({
          ...c,
          isNew: true,
          qty: c.dcQty,
          tax: c.tax || 0,
          remainQty: 0,
          code: c.cuId || c.code,
        }))
    );
  };

  if (refreshing) {
    return <Spin />;
  } else {
    return (
      <>
        <AppPageMetadata title={dataInfo?.metaData} />
        <FormLayout
          codes={dataInfo}
          docData={selected}
          handleComplete={handleComplete}
          extraStep={
            <Space wrap>
              <Tooltip title={`Save`} placement="bottomRight">
                <Button
                  onClick={() => handleComplete("Draft")}
                  disabled={selected?.isDisabled}
                  loading={whatLoad == "Draft" && loading}
                  type="primary"
                  className="mr-2"
                  icon={<AiOutlineCloudUpload />}
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
                  icon={<CheckSquareTwoTone className="mr-2" />}
                  className="mr-2"
                >
                  Post
                </Button>
              </Tooltip>
              <Tooltip title={`Refresh`} placement="bottomRight">
                <Button
                  icon={<FcRefresh className="mr-2" />}
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
              {/* <Button
                type="primary"
                onClick={() => setOpen(true)}
                hidden={selected?.status === "Drafts" || !id}
                disabled={selected?.status === "In Payment"}
              >
                Register Payment
              </Button> */}
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
              title: "Invoiced",
              status: selected?.status === "In Payment" ? "finish" : "wait",
            },
          ]}
        >
          <StyledMetaForm
            form={form}
            layout="vertical"
            size="medium"
            disabled={selected?.status == "In Payment"}
            initialValues={{
              sameAsBilling: true,
            }}
          >
            <Row gutter={12}>
              <Col md={12}>
                <SelectSearch
                  handleSelect={handleSelectSO}
                  fields={"cuId,customer"}
                  route={`erp/DeliveryChallan/sowsearch`}
                  label={"Auto-Complete"}
                  name={"so"}
                  columns={[
                    { label: "Id", size: 4, field: "cuId" },
                    {
                      label: "Vendor",
                      size: 20,
                      accessor: (e) => e.customer?.title,
                    },
                    {
                      label: "Products",
                      size: 2,
                      accessor: (e) =>
                        e.products?.filter((c) => c.dcQty > 0)?.length,
                    },
                    { label: "status", field: "dcStatus", size: 3 },
                  ]}
                  placeholder="search Sale Order"
                  otherParams={{ _id: selected?.so?._id }}
                  selectProps={{
                    onClear: () => setDataSource([]),
                    disabled: selected?.so,
                  }}
                  where={{ dcStatus: "!Delivered" }}
                />
              </Col>
              <Col md={6}>
                <Form.Item name={"date"} label="Challan Date">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item name={"dispatchDate"} label="Dipatch Date">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col md={12}>
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
                  selectProps={{ disabled: selected?.contact }}
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
              </Col>
              <Col md={8}>
                <Form.Item name={"billingAddress"} label="Billing Address">
                  <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
                </Form.Item>
              </Col>
              <Col md={4}>
                <Form.Item
                  name="sameAsBilling"
                  onChange={(e) => setSameAsBilling(e.target.checked)}
                  valuePropName="checked"
                  label="Shipping Same as Billing"
                >
                  <Checkbox />
                </Form.Item>
              </Col>

              <Col md={8}>
                <Form.Item name={"reference"} label="Refernece">
                  <Input />
                </Form.Item>
              </Col>

              <Col md={8}>
                <Form.Item name={"vehicle"} label="Vehicle No">
                  <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
                </Form.Item>
              </Col>
              <Col md={8}>
                {sameAsBilling == false && (
                  <Form.Item name="shippingAddress" label={"Shipping Address"}>
                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </StyledMetaForm>
          <StyledTabs
            type="card"
            size="small"
            defaultActiveKey="1"
            items={[
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
                      isNew={isNew}
                    />
                    {/* <TaxAndRoundOff form={form} subTotal={subTotal} /> */}
                  </>
                ),
              },
              id && {
                label: selected?.reference,
                key: "6",
                children: (
                  <LoadTable
                    dataSource={dataSource}
                    setDataSource={setDataSource}
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
            ]}
          />
        </FormLayout>
      </>
    );
  }
};

export default Main;
