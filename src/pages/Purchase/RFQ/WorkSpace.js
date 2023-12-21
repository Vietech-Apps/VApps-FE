import {
  DeleteOutlined,
  FileDoneOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import VendorComponent from "meta/JLayouts/CustomerComponent/VendorComponent";
import FormLayout from "meta/JLayouts/Layout";
import TaxAndRoundOff from "meta/Reusable/TaxAndRoundOff";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import TermAndConditionComponent from "pages/Sale/TermCondition/TermAndConditionComponent";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Alternative from "./Alternative";
import AlternativeTable from "./AlternativeTable";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import ComposeEmail from "meta/JLayouts/ComposeEmail/ComposeEmail";
import ReqForQuote from "pages/Sale/pdf/Rfq";
import PurchaseOrder from "pages/Sale/pdf/PO";
import ConfirmAlternativeModal from "./ConfirmAlternativeModal";
import SOProducts from "./SOProducts";
import UploadNode from "meta/common/UploadNode";
import { normFile } from "meta/common/fns";
import FileUpload from "meta/common/FormFeilds/FileUpload";
import { dataInfo } from "./Codes";
import EditAbleProductTable from "./EditablProdducttable";

const WorkSpace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [subTotal, setSubTotal] = useState();
  const [value, setValue] = useState();
  const [alternative, setAlternative] = useState([]);
  const [newLoading, setNewLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getData = async () => {
    setNewLoading(true);
    try {
      const response = await jwtAxios.get(`${dataInfo.dataRoute}/read/${id}`);
      setData(response.data.result);
      setNewLoading(false);
      setAlternative(response.data.otherData);
    } catch (error) {
      setNewLoading(false);
      errorHandler(error);
    }
  };
  useEffect(() => {
    if (id) getData();
  }, [id, refreshing]);

  useEffect(() => {
    setSelectedCustomer(data?.vendor);
    if (id) {
      setDataSource(data?.products?.length > 0 ? data?.products : []);
      setValue(data?.termCondation);
      form.setFieldsValue({
        orderDeadline: data?.orderDeadline
          ? dayjs(data?.orderDeadline, "YYYY-MM-DD")
          : dayjs(),
        confirmationDate: data?.confirmationDate
          ? dayjs(data?.confirmationDate, "YYYY-MM-DD")
          : dayjs(),
        expectedArrival: data?.expectedArrival
          ? dayjs(data?.expectedArrival, "YYYY-MM-DD")
          : dayjs(),
        content: data?.content,
        attachments: data?.attachments?.length > 0 ? data?.attachments : [],
        purchaseAgreement: data?.purchaseAgreement,
        roundOff: data?.roundOff,
        otherCharges: data?.otherCharges,
        otherChargesValue: data?.otherChargesValue,
        taxType: data?.taxType,
        afterTax: data?.afterTax,
        grandTotal: data?.grandTotal,
        notes: data?.notes,
        vendorReference: data?.vendorReference,
      });
      setCheck(data?.isComplete);
    }
  }, [data, id]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState();
  const [whatLoading, setWhatLoading] = useState();
  const [check, setCheck] = useState(false);
  console.log(dataSource);
  const handleSubmit = async (status) => {
    setWhatLoading(status);
    setLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        values.termCondation = value;
        values.products = dataSource;
        values.rfqStatus = status == "Save" ? "RFQ" : status;
        values.isComplete = status === "PO" ? true : false;
        values.poDate = status === "PO" ? dayjs().format("DD-MM-YYYY") : null;
        if (id) {
          try {
            const response = await jwtAxios.put(
              `${dataInfo.dataRoute}/update/${id}`,
              values
            );
            successHandler2(response);
            setLoading(false);
            setData(response.data.result);
          } catch (error) {
            errorHandler(error);
            setLoading(false);
          }
        } else {
          try {
            const response = await jwtAxios.post(
              `${dataInfo.dataRoute}/create`,
              values
            );
            successHandler2(response);
            setLoading(false);
            navigate(
              `${dataInfo.navPath}/workspace/${response.data.result?._id}`
            );
            setData(response.data.result);
          } catch (error) {
            errorHandler(error);
            setLoading(false);
          }
        }
      })
      .catch((info) => {
        info.errorFields.map((p) => message.info(p.errors[0]));
        setLoading(false);
      });
  };
  const handleCheckAlternative = () => {
    const nonCancelled = alternative?.filter(
      (obj) =>
        obj.rfqStatus !== "Cancelled" &&
        obj.isAlternative == true &&
        !obj.isKeep
    );
    return nonCancelled ? nonCancelled.length : 0;
  };
  const [open, setOpen] = useState(false);
  const [relatedRFQ, setRelatedRFQ] = useState([]);
  const [products, setProducts] = useState([]);
  return (
    <React.Fragment>
      <FormLayout
        codes={dataInfo}
        form={form}
        handleSubmit={handleSubmit}
        extraStep={
          <Space>
            <Tooltip color={"cyan"} title="Save">
              <Button
                onClick={() => {
                  !data?._id
                    ? message.info("select vendor")
                    : handleSubmit(data?.rfqStatus ? data?.rfqStatus : "RFQ");
                }}
                loading={whatLoading == "REQ" && loading}
                icon={<SaveOutlined />}
              >
                Save
              </Button>
            </Tooltip>
            <Tooltip color={"cyan"} title="Confirm Order">
              <Button
                hidden={!id || data?.rfqStatus == "Cancelled"}
                icon={<FileDoneOutlined />}
                loading={whatLoading == "PO" && loading}
                onClick={() =>
                  handleCheckAlternative() > 0
                    ? setOpen(true)
                    : handleSubmit("PO")
                }
              >
                Confirm Order
              </Button>
            </Tooltip>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => {
                setRefreshing(true);
              }}
            ></Button>
            <Tag color={"cyan"}>{data?.rfqStatus || "Creating"}</Tag>
            {data?.isComplete && (
              <Switch
                disabled={!data?.isComplete}
                checked={check}
                loading={whatLoading == "RFQ" && loading}
                onChange={(e) => handleSubmit("RFQ")}
                checkedChildren="Edit"
                size="small"
              />
            )}
            <Tooltip color={"cyan"} title="Send By Email">
              <ComposeEmail data={data} handleSubmit={handleSubmit} />
            </Tooltip>
            <ReqForQuote
              title={"Req For Quotation"}
              hidden={data?.rfqStatus !== "RFQ"}
              handleComplete={handleSubmit}
              data={data}
            />
            <PurchaseOrder
              title={"Purchase Order"}
              hidden={data?.rfqStatus !== "PO"}
              handleComplete={handleSubmit}
              data={data}
            />

            <Tooltip color={"cyan"} title="Cancel">
              <Button
                onClick={() => handleSubmit("Cancelled")}
                hidden={!id || data?.rfqStatus == "Cancelled"}
                icon={<DeleteOutlined />}
                loading={whatLoading == "Cancelled" && loading}
              ></Button>
            </Tooltip>
          </Space>
        }
        tabItems={[
          {
            label: "Products",
            key: "1",
            children: (
              <>
                <EditAbleProductTable
                  products={products}
                  relatedRFQ={relatedRFQ}
                  dataSource={dataSource}
                  setSubTotal={setSubTotal}
                  setDataSource={setDataSource}
                  // handleSubmit={handleSubmit}
                />
                {/* <TaxAndRoundOff form={form} subTotal={subTotal} /> */}
              </>
            ),
          },
          {
            label: "Tenders",
            key: "2",

            children: (
              <Row gutter={12}>
                <Col sm={12}>
                  {id ? (
                    <p>
                      Create a call for tender by adding alternative request for
                      quotations to different vendors. Make your choice by
                      selecting the best combination of lead time, OTD and/or
                      total amount. By comparing product lines you can also
                      decide to order some products from one vendor and others
                      from another vendor. make this quote short
                    </p>
                  ) : (
                    "Select Vendor"
                  )}
                </Col>
                <Col sm={12}>
                  {id ? (
                    <Alternative
                      dataSource={dataSource}
                      setDataSource={setDataSource}
                      data={data}
                      form={form}
                      setAlternative={setAlternative}
                      alternative={alternative}
                      value={value}
                      setReqData={setData}
                    />
                  ) : null}
                  {alternative?.length > 0 &&
                    alternative.filter((p) => p.rfqStatus !== "Cancelled")
                      ?.length > 0 && (
                      <Button
                        type="link"
                        onClick={() =>
                          navigate(`/purchase/reqforquote/comparing/${id}`)
                        }
                      >
                        Comparing Order Line
                      </Button>
                    )}
                </Col>
                <Col sm={24}>
                  {id ? (
                    <AlternativeTable
                      setReqData={setData}
                      data={data}
                      setAlternative={setAlternative}
                      alternative={alternative}
                    />
                  ) : null}
                </Col>
              </Row>
            ),
          },
          {
            label: "SO",
            key: "13",
            children: (
              <SOProducts
                products={products}
                relatedRFQ={relatedRFQ}
                setDataSource={setDataSource}
              />
            ),
          },
          {
            label: "Term & Condition",
            key: "3",
            children: (
              <TermAndConditionComponent
                editorHtml={value}
                setEditorHtml={setValue}
              />
            ),
          },

          {
            label: "Notes",
            key: "4",
            children: (
              <Form form={form}>
                <Form.Item name="notes">
                  <Input.TextArea showCount placeholder="internal notes..." />
                </Form.Item>
              </Form>
            ),
          },
          {
            label: "Attachments",
            key: "5",
            children: id && (
              <Form form={form} layout="vertical">
                <Form.Item
                  name={"attachments"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  label="RFQ Attachments"
                >
                  <FileUpload folder={"RFQ"} />
                </Form.Item>
              </Form>
            ),
          },
        ]}
      >
        {newLoading ? (
          <Spin />
        ) : (
          <Collapse
            bordered={false}
            size="small"
            defaultActiveKey={["1", "0", "2"]}
          >
            <Collapse.Panel
              header={
                selectedCustomer ? (
                  <span>
                    Vender Detail: Name {selectedCustomer?.title} Email{" "}
                    {selectedCustomer?.email} phone: {selectedCustomer?.phone}
                  </span>
                ) : (
                  "Vendor Detail"
                )
              }
              extra={
                <Space>
                  <Typography.Text>Creadit Limit:123 </Typography.Text>
                  <Typography.Text>Balance:123 </Typography.Text>
                </Space>
              }
            >
              {data ? (
                <VendorComponent
                  setProducts={setProducts}
                  setRelatedRFQ={setRelatedRFQ}
                  form={form}
                  data={data}
                  selectedCustomer={selectedCustomer}
                  setSelectedCustomer={setSelectedCustomer}
                  handleSubmit={handleSubmit}
                />
              ) : (
                ""
              )}
            </Collapse.Panel>
          </Collapse>
        )}
        <ConfirmAlternativeModal
          open={open}
          setOpen={setOpen}
          setReqData={setData}
          data={data}
          setAlternative={setAlternative}
          handleSubmit={handleSubmit}
          alternative={alternative}
        />
      </FormLayout>
    </React.Fragment>
  );
};

export default WorkSpace;
