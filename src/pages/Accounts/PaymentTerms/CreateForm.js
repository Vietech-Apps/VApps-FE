import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { dataInfo, formTitle, path, route } from "./Codes";
import { Button, Checkbox, Col, Divider, Form, Input, Row, Space } from "antd";
import {
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProductTable from "./ProductTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData } from "meta/common/Apis";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { useGetData } from "meta/services/auth/ezAPI";
const CreateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const [
    { apiData: selected, loading: refreshing },
    { setData: setSelected, setRefreshing },
  ] = useGetData(`${dataInfo.dataRoute}/read/${id}`, [], {}, id ? true : false);
  const { date, company, ...others } = selected ? selected : {};
  useEffect(() => {
    setDataSource(selected?.terms || []);
    form.setFieldsValue({
      date: dayjs(date),
      company: company?._id,
      ...others,
    });
  }, [selected]);
  const handleSubmit = async (status = "Drafts") => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {
        status: status,
        terms: dataSource,
      },
      setLoading
    );
    if (!id)
      navigate(`${dataInfo.navPath}/workspace/${response.data.result?._id}`);
    setSelected(response.data.result);
    return response.data.result;
  };

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        form={form}
        extraStep={
          <Space size={4}>
            <Button
              type="primary"
              onClick={() => handleSubmit("Done")}
              hidden={selected?.status == "Drafts"}
              loading={loading}
            >
              Done
            </Button>
          </Space>
        }
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
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item name="paymentTerms" label="Payment Terms">
                <Input placeholder="e.g. 10 Days" />
              </Form.Item>
              <SelectSearch
                fields={"name"}
                route={`meta/company/profile/dsearch`}
                label={"Company"}
                name={"company"}
                columns={[{ label: "Company Name", size: 2, field: "name" }]}
                placeholder="Search with company name"
              />
              <Form.Item
                name="earlyDiscount"
                label="Early Discount"
                valuePropName="checked"
              >
                <Checkbox placeholder="e.g. 10 Days" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={24}>
              <Divider orientation="left">DUE TERMS</Divider>
              <ProductTable
                dataSource={dataSource}
                setDataSource={setDataSource}
                selected={selected}
              />
            </Col>
            {/* <Col xs={24} sm={8}>
              <Divider orientation="left">PREVIEW</Divider>
              <Form.Item name="date" label="Example $100 on">
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="ShowInstallmentDates"
                label="Show Installment Dates"
              >
                <Checkbox />
              </Form.Item>
            </Col> */}
          </Row>
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default CreateForm;
