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
} from "antd";

import SelectSearch from "../../../meta/JLayouts/SelectSearch/TableDisplay";
import { getData } from "meta/common/Apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dataInfo } from "./CPCodes";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import AppPageMetadata from "meta/core/AppPageMetadata";

const controlPoints = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedData, setSelectedData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setSelectedData);
  }, [id]);

  useEffect(() => {
    setWhatType(selectedData?.type);
    form.setFieldsValue(
      selectedData
        ? {
            ...selectedData,
          }
        : {}
    );
  }, [selectedData]);

  const handleSubmit = async () => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {},
      setLoading
    );
    if (!id) navigate(`${dataInfo.navPath}/${response.data.result._id}`);
  };
  const [whatType, setWhatType] = useState();
  const { TextArea } = Input;
  const items = [
    {
      label: "Instructions",
      key: 1,
      children: (
        <>
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24}>
              <Form.Item name="instruction">
                <TextArea placeholder="Describe the quality check to do" />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    whatType == "Pass Fail" && {
      label: "Message If Failure",
      key: 2,
      children: (
        <>
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24}>
              <Form.Item name="ifPassFail">
                <TextArea placeholder="Describe fail" />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      label: "Notes",
      key: 3,
      children: (
        <>
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24}>
              <Form.Item name="notes">
                <TextArea placeholder="Describe why you need to perform this qaulity check" />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  const { Option } = Select;
  // const operations = [
  //   "Receipts",
  //   "Delivery Orders",
  //   "Returns",
  //   "Manufacturing",
  // ];
  const productCategories = ["All", "All / Expenses", "All / Saleable"];
  const operation = ["Receipts", "Delivery Orders", "Returns", "Manufacturing"];
  // const [{ apiData: qTeams, loading }] = useGetData(`erp/QualityTeam/all`, []);

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        form={form}
        extra={[
          <Button key={1} onClick={handleSubmit} loading={loading}>
            Save
          </Button>,
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
          <Row gutter={12}>
            <Col xs={24} sm={16}>
              <Form.Item name="title" label="Title">
                <Input />
              </Form.Item>
              <SelectSearch
                selectProps={{ mode: "tags" }}
                fields={"code,name,make"}
                route={`erp/products/search`}
                label={"Product"}
                name={"product"}
                columns={[
                  { label: "cuId", size: 2, field: "cuId" },
                  { label: "code", size: 3, field: "code" },
                  { label: "name", size: 9, field: "name" },
                  {
                    label: "make",
                    size: 3,
                    accessor: (data) => data.make?.title,
                  },
                ]}
                placeholder="search products"
              />
              <Form.Item name="productCategories" label="Product Categ">
                <Select allowClear mode="tags">
                  {productCategories?.map((d) => (
                    <Option key={d}>{d}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="operations" label="Operations">
                <Select allowClear mode="tags">
                  {operation?.map((d) => (
                    <Option key={d}>{d}</Option>
                  ))}
                </Select>
              </Form.Item>
              <SelectSearch
                fields={"title"}
                route={`erp/Quality/Team/dsearch`}
                label={"Team"}
                name={"team"}
                columns={[{ label: "Team Name", size: 2, field: "title" }]}
                placeholder="Search quality team"
              />
              <SelectSearch
                fields={"name"}
                route={`admin/dsearch`}
                label={"Responsible"}
                name={"responsible"}
                columns={[{ label: "Name", size: 2, field: "name" }]}
                placeholder="Search with name"
              />
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="controlPer"
                label="Control per"
                tooltip={
                  <>
                    <p>
                      Operation: One quality check is requested at operation
                      level
                    </p>
                    <p>Product: A quality check is requested per product</p>
                    <p>
                      Quantity: A quality check is requested for each new
                      product qunatity registered, with partial quantity checks
                      also possible
                    </p>
                  </>
                }
              >
                <Select
                  options={[
                    {
                      value: "operation",
                      label: "Operation",
                    },
                    {
                      value: "product",
                      label: "Product",
                    },
                    {
                      value: "quantity",
                      label: "Quantity",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.controlPer !== currentValues.controlPer
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("controlPer") === "quantity" ? (
                    <Form.Item
                      name="partialTransferTest?"
                      label="PartialTransferTest?"
                      valuePropName="checked"
                      tooltip="Determines if only a fraction of the lot should be tested"
                    >
                      <Checkbox />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item name="controlFrequency" label="CntrlFreqncy">
                <Select
                  options={[
                    {
                      value: "all",
                      label: "All",
                    },
                    {
                      value: "randomly",
                      label: "Randomly",
                    },
                    {
                      value: "periodically",
                      label: "Periodically",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.controlFrequency !== currentValues.controlFrequency
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("controlFrequency") === "randomly" ? (
                    <Form.Item name="percentage" label="Every">
                      <InputNumber
                        addonBefore="Every"
                        addonAfter="% of Operations"
                      />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.controlFrequency !== currentValues.controlFrequency
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("controlFrequency") === "periodically" ? (
                    <Form.Item name="days" label="Every">
                      <InputNumber addonAfter="Days" />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item name="type" label="Type">
                <Select
                  onSelect={(e) => setWhatType(e)}
                  options={[
                    {
                      value: "Pass Fail",
                      label: "Pass - Fail",
                    },
                    {
                      value: "Instructions",
                      label: "Instructions",
                    },
                    {
                      value: "Picture",
                      label: "Take a Picture",
                    },
                    {
                      value: "Measure",
                      label: "Meaure",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.type !== currentValues.type
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("type") === "Measure" ? (
                    <Form.Item label="Norm">
                      <Input.Group compact>
                        <Form.Item name={["norm", "from"]} noStyle>
                          <InputNumber placeholder="From" />
                        </Form.Item>
                        <Form.Item
                          name={["norm", "to"]}
                          noStyle
                          initialValue={"mm"}
                        >
                          <Input placeholder="To" />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.type !== currentValues.type
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("type") === "Measure" ? (
                    <Form.Item label="Tolerance">
                      <Input.Group compact>
                        <Form.Item name={["tolerance", "from"]} noStyle>
                          <InputNumber placeholder="From" />
                        </Form.Item>
                        <Form.Item name={["tolerance", "to"]} noStyle>
                          <InputNumber placeholder="To" />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>

              <SelectSearch
                fields={"name"}
                route={`meta/company/profile/dsearch`}
                label={"Company"}
                name={"company"}
                columns={[{ label: "Company Name", size: 2, field: "name" }]}
                placeholder="Search with company name"
              />
            </Col>
            <Col xs={24} sm={24}>
              {" "}
              <Tabs type="card" items={items} defaultActiveKey={1} />
            </Col>
          </Row>
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default controlPoints;
