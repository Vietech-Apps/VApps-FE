import { ReloadOutlined } from "@ant-design/icons";
import {
  Collapse,
  Form,
  Row,
  Col,
  DatePicker,
  Input,
  Typography,
  Button,
  Space,
  Checkbox,
  Select,
  Divider,
  Tag,
} from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";

import React, { useEffect, useState } from "react";

import Vendor from "./Vendor";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";

const VendorComponent = ({
  form,
  data,
  selectedCustomer,
  setSelectedCustomer,
  handleSubmit,
  setRelatedRFQ,
  setProducts,
}) => {
  const { Text } = Typography;
  const checkStatus = Form.useWatch("sameAsBilling", form);
  const [sameAsBilling, setSameAsBilling] = useState();
  useEffect(() => {
    setSameAsBilling(checkStatus);
    form.setFieldsValue({
      billingAddress: data?.billingAddress,
    });
  }, [checkStatus]);

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSo, setSelectedSo] = useState();
  const [value, setValue] = useState();

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    let params = { q: searchTerm, fields: "customer,cuId" };
    try {
      const res = await jwtAxios.get(`erp/SO/search`, { params });
      const data = res.data.result;
      setOptions(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSearch("");
  }, []);
  const handleSelect = async (value, options) => {
    const filterOption = options?.documents?.find((p) => p._id == value);
    setSelectedSo(filterOption);
    console.log(filterOption?.products);
    setProducts(filterOption?.products);
    setRelatedRFQ(options.RFQs);
  };
  return (
    <StyledMetaForm
      name="form1"
      size="small"
      form={form}
      labelCol={{
        flex: "170px",
      }}
      labelAlign="left"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      initialValues={{
        sameAsBilling: true,
        billingAddress: data?.address,
      }}
    >
      <Row gutter={12}>
        <Col xs={24} sm={16} md={16}>
          <Vendor
            form={form}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            data={data}
            handleSubmit={handleSubmit}
          />
          <Form.Item
            name="vendorReference"
            label={<Text strong>Vendor Ref</Text>}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8} md={8}>
          <Form.Item
            name="expectedArrival"
            label={<Text strong>Expected Arrival</Text>}
          >
            <DatePicker format={"DD-MM-YYYY"} style={{ width: "60%" }} />
          </Form.Item>
          <Form.Item
            name="confirmationDate"
            label={<Text strong>Confirmation Date</Text>}
          >
            <DatePicker format={"DD-MM-YYYY"} style={{ width: "60%" }} />
          </Form.Item>
          <Form.Item
            name="orderDeadline"
            label={<Text strong>Order Deadline</Text>}
          >
            <DatePicker format={"DD-MM-YYYY"} style={{ width: "60%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={16} md={16}>
          <Form.Item name="relatedSO" label={<Text strong>Related SO</Text>}>
            <Select
              showSearch
              value={value}
              placeholder="Search SOs"
              onSearch={handleSearch}
              onSelect={(value) => handleSelect(value, options)}
              notFoundContent={loading ? <span>Loading...</span> : null}
              filterOption={false}
              style={{ width: "100%" }}
              allowClear
              onClear={() => {
                setSelectedSo();
                setProducts([]);
                setValue(null);
                setRelatedRFQ([]);
              }}
              loading={loading}
              dropdownRender={(menu) => (
                <div style={{ overflowX: "scroll" }}>
                  <Row gutter={12}>
                    <Col xs={10}>Id {options?.documents?.length}</Col>
                    <Col xs={12}>Customer</Col>
                    <Col xs={2}>Total</Col>
                  </Row>
                  <Divider
                    style={{
                      margin: "2px 0",
                    }}
                  />
                  {menu}
                </div>
              )}
            >
              {options?.documents?.map((data, i) => (
                <Select.Option key={data._id} value={data._id}>
                  <Row gutter={12}>
                    <Col xs={10}>{data.cuId}</Col>
                    <Col xs={12}>{data.customer?.title}</Col>
                    <Col xs={2}>
                      <Tag color={"gold"}>{data?.productCount}</Tag>
                    </Col>
                  </Row>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </StyledMetaForm>
  );
};

export default VendorComponent;
