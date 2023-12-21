import FormLayout from "meta/JLayouts/Layout";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Tabs,
  Spin,
  Tooltip,
  Statistic,
  Tag,
} from "antd";
import "shared/styles/vendors/ql-editor.css";

import { useGetData } from "meta/services/auth/ezAPI";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import TaxAndRoundOff from "meta/Reusable/TaxAndRoundOff";
import moment from "moment";
import TermAndConditionComponent from "../TermCondition/TermAndConditionComponent";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import CustomerComponent from "meta/JLayouts/CustomerComponent";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { useAuthUser } from "meta/utility/AuthHooks";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";
import Quote from "../pdf/Quote";
import { getStatusTag } from "meta/common/status";
import { dataInfo } from "./Code";
import {
  CheckOutlined,
  CheckSquareTwoTone,
  RocketOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import AppPageMetadata from "meta/core/AppPageMetadata";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";
import { TbTruckDelivery } from "react-icons/tb";
import ProductTable from "./ProductTable";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";

const Main = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useAuthUser();
  const [dataSource, setDataSource] = useState([]);
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [{ apiData: quoteDetail }, { setData: setQuoteDetail }] = useGetData(
    `erp/Quotation/read/${id}`,
    []
  );

  useEffect(() => {
    setDataSource(quoteDetail?.products ? quoteDetail?.products : []);

    form.setFieldsValue({
      clientName: quoteDetail?.customer?.title,
      billingAddress: quoteDetail?.billingAddress || quoteDetail?.address,
      orderDate: quoteDetail?.orderDate
        ? dayjs(quoteDetail?.orderDate, "YYYY-MM-DD")
        : moment(),
      expectedShipmentDate: quoteDetail?.expectedShipmentDate
        ? dayjs(quoteDetail?.expectedShipmentDate, "YYYY-MM-DD")
        : moment(),
      expirationDate: quoteDetail?.expirationDate
        ? dayjs(quoteDetail?.expirationDate, "YYYY-MM-DD")
        : moment(),
      notes: quoteDetail?.notes,
      shippingAddress: quoteDetail?.shippingAddress,
      sameAsBilling: quoteDetail?.sameAsBilling,
      roundOff: quoteDetail?.roundOff,
      otherCharges: quoteDetail?.otherCharges,
      otherChargesValue: quoteDetail?.otherChargesValue,
      taxType: quoteDetail?.taxType,
      afterTax: quoteDetail?.afterTax,
      grandTotal: quoteDetail?.grandTotal,
      reference: quoteDetail?.reference,
    });
    setValue(quoteDetail?.termCondation);
    setCurrent(
      (quoteDetail?.quotationStatus == "Cancelled" && 3) ||
        (quoteDetail?.quotationStatus == "Sale Order" && 2) ||
        (quoteDetail?.quotationStatus == "Quotation Sent" && 1) ||
        (quoteDetail?.quotationStatus == "Quotation" && 0)
    );
  }, [quoteDetail]);
  const [subTotal, setSubTotal] = useState(0);
  const [current, setCurrent] = useState(0);

  const [loading, setLoading] = useState(false);
  const [whatLoad, setWhatLoad] = useState();
  const handleComplete = async (status) => {
    setWhatLoad(status);
    setRefreshing(true);

    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {
        termCondation: value,
        quotationStatus: status,
        products: dataSource,
        isSO: status == "Sale Order" ? true : false,

        soStatus: status == "Sale Order" ? status : "",
        soDate: status == "Sale Order" ? dayjs().format("DD-MM-YYYY") : "",
        soBy: status == "Sale Order" ? user?._id : null,
      },
      setLoading
    );
    if (response) setQuoteDetail(response.data?.result);
  };
  const handleForward = async (e, products) => {
    try {
      const res = await jwtAxios.post(`${dataInfo.dataRoute}/dcorinvoice`, {
        documentStatus: e,
        soId: id,
        products,
      });
      setQuoteDetail(res.data.result);
      if (e == "DC") {
        navigate(
          `/sales/DeliveryChallan/workspace/${res.data?.result?.docuemntId}`
        );
      } else {
        navigate(`/accounts/DeliveryChallan/${res.data?.result?.docuemntId}`);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        title={getStatusTag(quoteDetail?.quotationStatus)}
        codes={dataInfo}
        docData={quoteDetail}
        handleComplete={handleComplete}
        extra={
          <Space size={4}>
            <Tooltip title="Delivery Note Created">
              <Tag icon={<RocketOutlined />}>{quoteDetail?.dcs?.length}</Tag>
            </Tooltip>
            <Quote
              disabled={quoteDetail?.quotationStatus == "Cancelled"}
              title={
                quoteDetail?.quotationStatus == "Sale Order"
                  ? "Sale Order"
                  : "Quotation"
              }
              handleComplete={handleComplete}
              quotation={quoteDetail}
            />
          </Space>
        }
        extraStep={
          <Space wrap>
            <Tooltip title={`Save`} placement="bottomRight">
              <Button
                type="primary"
                hidden={quoteDetail?.quotationStatus == "Cancelled"}
                disabled={
                  quoteDetail?.quotationStatus == "Sale Order" ||
                  quoteDetail?.isDisabled
                }
                icon={<SaveOutlined />}
                onClick={() => handleComplete(quoteDetail?.quotationStatus)}
                loading={whatLoad == quoteDetail?.quotationStatus && loading}
              >
                Save
              </Button>
            </Tooltip>
            <Tooltip title={`Convert to Sale Order`} placement="bottomRight">
              <Button
                hidden={quoteDetail?.quotationStatus == "Cancelled"}
                onClick={() => handleComplete("Sale Order")}
                loading={whatLoad == "Sale Order" && loading}
                disabled={
                  quoteDetail?.quotationStatus == "Sale Order" ||
                  quoteDetail?.isDisabled
                }
                icon={
                  quoteDetail?.quotationStatus == "Sale Order" && (
                    <CheckSquareTwoTone />
                  )
                }
              >
                Confirm
              </Button>
            </Tooltip>

            <Tooltip title={`Cancel`} placement="bottomRight">
              <Button
                hidden={quoteDetail?.quotationStatus == "Cancelled"}
                icon={<MdOutlineCancelScheduleSend />}
                onClick={() => handleComplete("Cancelled")}
                loading={whatLoad == "Cancelled" && loading}
              />
            </Tooltip>
            <Tooltip title={`Restore to Quotation`} placement="bottomRight">
              <Button
                hidden={quoteDetail?.quotationStatus !== "Cancelled"}
                icon={<FaTrashRestore />}
                onClick={() => handleComplete("Quotation")}
                loading={whatLoad == "Quotation" && loading}
              />
            </Tooltip>
            <Button
              onClick={() => handleForward("DC", dataSource)}
              loading={whatLoad == "DC" && loading}
              disabled={
                !quoteDetail?.isSO || quoteDetail?.quotationStatus == "DC"
              }
            >
              Create Delivery Challan
            </Button>
            <Button
              hidden={!quoteDetail?.isSO}
              onClick={() => handleForward("Invoice", dataSource)}
              loading={whatLoad == "Invoice" && loading}
              disabled
            >
              Record Payment
            </Button>
            <Tag color="green">{quoteDetail?.quotationStatus}</Tag>
          </Space>
        }
      >
        {quoteDetail?.customer ? (
          <CustomerComponent form={form} data={quoteDetail} />
        ) : null}

        <Tabs
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
                    setSubTotal={setSubTotal}
                    setDataSource={setDataSource}
                    handleSubmit={handleComplete}
                    handleForward={handleForward}
                    data={quoteDetail}
                  />
                  {/* <TaxAndRoundOff form={form} subTotal={subTotal} /> */}
                </>
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
                <StyledMetaForm form={form}>
                  <Form.Item name="notes">
                    <Input.TextArea
                      showCount
                      placeholder="internal notes..."
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    ></Input.TextArea>
                  </Form.Item>
                </StyledMetaForm>
              ),
            },
          ]}
        />
      </FormLayout>
    </>
  );
};

export default Main;
