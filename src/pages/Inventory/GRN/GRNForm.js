import React, { useEffect } from "react";
import { useRef, useState } from "react";
import FormLayout from "meta/JLayouts/Layout";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import {
  Form,
  Col,
  Row,
  Input,
  Button,
  Select,
  Tabs,
  Checkbox,
  InputNumber,
  message,
  Divider,
  Descriptions,
  Space,
  DatePicker,
} from "antd";

import { getData } from "meta/common/Apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formTitle, route } from "./Codes";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import VendorDetail from "./VendorDetail";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import General from "./General";
import ProductTable from "./ProductTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import Additional from "./Additional";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { normFile } from "meta/common/fns";
import FileUpload from "meta/common/FormFeilds/FileUpload";
import PDFView from "./PDFView";
import { useAuthUser } from "meta/utility/AuthHooks";

const GRNForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedData, setSelectedData] = useState();
  const [loading, setLoading] = useState(false);
  const { attachments, ...others } = selectedData ? selectedData : {};
  useEffect(() => {
    if (id) getData(`${route}/read/${id}`, setSelectedData);
  }, [id]);
  useEffect(() => {
    setSelected(selectedData);
    setDataSource(selectedData?.po?.products);
    form.setFieldsValue(
      selectedData
        ? { attachments: attachments?.length > 0 ? attachments : [], ...others }
        : {}
    );
  }, [selectedData]);

  const handleSubmit = async () => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${route}/create`,
      `${route}/update/${id}`,
      {
        gateIn: selected?.gateIn?._id,
        po: selected?.po._id,
        quality: id ? selected?.quality?._id : selected?._id,
        dataSource: dataSource,
      },
      setLoading
    );
    if (!id) navigate(`${pathname}/${response.data.result._id}`);
  };
  const [whatType, setWhatType] = useState();
  const { TextArea } = Input;
  const [selected, setSelected] = useState();

  const [dataSource, setDataSource] = useState([]);
  const handleSelect = (e, options) => {
    const filterd = options?.find((d) => d._id === e);
    setDataSource(filterd.po?.products);
    setSelected(filterd);
  };
  const items = [
    {
      key: "1",
      label: `General`,
      children: <General selected={selected} />,
    },
    {
      key: "2",
      label: `Vendor`,
      children: <VendorDetail selected={selected?.po} />,
    },
    {
      key: "3",
      label: `Additional Detail`,
      children: <Additional selected={selected} />,
    },
    {
      key: "4",
      label: `Attachments`,
      children: (
        <>
          <Form form={form} layout="vertical">
            <Form.Item
              name={"attachments"}
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label="GRN Attachments"
            >
              <FileUpload folder={"GRN"} />
            </Form.Item>
            <Form.Item label="Related Attachments">
              <FileUpload
                folder={"GRN"}
                disabled={true}
                fileList={[
                  ...(selected?.po?.attachments || []),
                  ...(selected?.gateIn?.attachments || []),
                  ...(selected?.quality?.attachments || []),
                ]}
              />
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];
  function calculateTotal(products) {
    let total = 0;
    for (let i = 0; i < products?.length; i++) {
      total += products[i]?.qty;
    }
    return total;
  }
  const { user } = useAuthUser();
  return (
    <>
      <AppPageMetadata title="GRN" />
      <FormLayout
        title={formTitle}
        subTitle={id && selected?.cuId}
        path={route}
        extra={[
          <Button key={1} onClick={handleSubmit} loading={loading}>
            Save
          </Button>,
          id && (
            <PDFView
              title={formTitle}
              selected={selected}
              dataSource={dataSource}
              handleComplete={handleSubmit}
              key={2}
            />
          ),
        ]}
        size="small"
      >
        <StyledMetaForm
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          {!id && (
            <SelectSearch
              fields={"cuId,gateIn,po"}
              route={`erp/Quality/Check/searchPOGateIn`}
              // label={"Product"}
              // name={"po"}
              columns={[
                { label: "Id", size: 4, field: "cuId" },
                { label: "GateIn", size: 4, accessor: (e) => e.gateIn?.cuId },
                { label: "PO", size: 4, accessor: (e) => e.po?.cuId },
                { label: "Created Date", size: 5, field: "poDate" },
                {
                  label: "Vendor",
                  size: 4,
                  accessor: (e) => e.po?.vendor?.title,
                },
                {
                  label: "Products",
                  size: 2,
                  accessor: (data) => calculateTotal(data.po?.products),
                },
                {
                  label: "ExpectedArrival Date",
                  size: 5,
                  field: "expectedArrival",
                },
                {
                  label: "Delivered Status",
                  size: 2,
                  field: "deliveredStatus",
                },
              ]}
              placeholder="search POs"
              handleSelect={handleSelect}
            />
          )}

          <Tabs
            defaultActiveKey="1"
            items={items}
            tabBarExtraContent={
              <Form.Item name="createdDate" label="Created">
                <DatePicker />
              </Form.Item>
            }
          />
          <Divider style={{ margin: 0, padding: 0 }} />
        </StyledMetaForm>
        <Space>
          Defected Pieces{" "}
          {dataSource?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.defectedQty;
          }, 0)}{" "}
          out of{" "}
          {dataSource?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.deliveredQty;
          }, 0)}
        </Space>
        <ProductTable dataSource={dataSource} setDataSource={setDataSource} />
      </FormLayout>
      {id && <FooterTab id={id} folder="GRB" data={selected} route={route} />}
    </>
  );
};

export default GRNForm;
