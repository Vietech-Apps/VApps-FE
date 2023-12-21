import {
  Form,
  Select,
  Col,
  Input,
  Space,
  DatePicker,
  message,
  Divider,
  Typography,
  Dropdown,
  Row,
} from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData, postAndGetData } from "meta/common/Apis";
import { getIconByName } from "meta/common/AppIcons";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import { manualNormFile } from "meta/common/FormFeilds/manulNormFile";
import ManualUploadNode from "meta/common/FormFeilds/ManulUploadNode";
import dayjs from "dayjs";

import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import CreateContact from "pages/apps/Customers/Component/Create/CreateContact";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { useAuthUser } from "meta/utility/AuthHooks";
import successHandler2 from "meta/services/auth/successHandle2";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { GrSend } from "react-icons/gr";
import { AiOutlineSave, AiOutlineSend } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { dataInfo } from "./Codes";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import DynamicSelect from "meta/JLayouts/DynamicSelect";
import { handleValidate } from "meta/common/MyFns";
const { Option } = Select;

const CreateForm = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const handleSelect = (e, option) => {
    setIsCustomer(true);
    const Selected = option.find((c) => c._id == e);
    form.setFields([
      {
        name: "person",
        value: Selected.title,
      },
      {
        name: "address",
        value: Selected.address,
      },
      {
        name: "phone",
        value: Selected.phone,
      },
      {
        name: "email",
        value: Selected.email,
      },
    ]);
    form.setFieldsValue({ paymentTerm: Select?.paymentTerm });
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const { id } = useParams();
  const { user } = useAuthUser();
  const { pathname } = useLocation();
  let df = moment().format("DD-MM-YYYY");
  let path = pathname.split("/sales")[1]?.split("/")[1];

  let En = "Enquiry";
  let E = "Estimation";
  let Q = "Quotation";
  useEffect(() => {
    if (id) getData(`/erp/Enquiry/read/${id}`, setSelectedData);
  }, []);
  const navigate = useNavigate();
  const onFinish = async (values, to) => {
    setWhatClick(to);
    values.status = to;
    values.current = to == En ? 0 : to === E ? 1 : to === Q && 2;
    values.estimationDate = to == E ? df : path == E ? df : "";
    values.quotationDate = to == Q ? df : path == Q ? df : "";
    values.following = values.following.concat([user?._id]);
    values.quotationBy == Q ? user?._id : null;
    values.estimationBy == E ? user?._id : null;
    values.isEstimation = path == E ? true : to == E ? true : false;
    values.isQuotation = path == Q ? true : to == Q ? true : false;
    try {
      setConfirmLoading(true);
      const response = await jwtAxios.post(`erp/Enquiry/create`, values);
      setConfirmLoading(false);
      successHandler2(response);
      setActiveKey("2");
      if (to == "Enquiry") {
        navigate(`${pathname}/${response.data.result?._id}`);
        setSelectedData(response.data.result);
      } else if (to == Q) {
        navigate(`/sales/${to}`);
      } else if (to == E) {
        navigate(`/sales/Estimation`);
      }
    } catch (error) {
      errorHandler(error);
      setConfirmLoading(false);
    }
  };
  const [whatClick, setWhatClick] = useState("");
  const onUpdate = async (values, to) => {
    setWhatClick(to);

    setConfirmLoading(true);
    try {
      const response = await jwtAxios.put(
        `erp/Enquiry/update/${selectedData._id}`,
        values
      );
      successHandler2(response);
      setSelectedData(response.data.result);
      if (to !== "Quotation") {
        navigate(`/sales/${to}`);
      } else if (to === "Quotation") {
        navigate(`/sales/${to}/workspaces/${selectedData._id}`);
      } else {
        navigate(`/sales/${to}/${selectedData._id}`);
      }
      setConfirmLoading(false);
    } catch (error) {
      errorHandler(error);
      setConfirmLoading(false);
    }
  };
  const [industry, setIndustry] = useState([]);
  const [industryTitle, setIndustryTitle] = useState([]);
  const addIndustry = (e) => {
    e.preventDefault();
    postAndGetData(
      `meta/label/create?type=industrylabel`,
      { title: industryTitle },
      industry,
      setIndustry
    );
    setIndustryTitle("");
  };
  useEffect(() => {
    getData(`meta/label/list?type=industrylabel`, setIndustry);
  }, []);
  const {
    date,
    dueDate,
    customer,
    consultant,
    project,
    following,
    salePerson,
    industryType,
    ...other
  } = selectedData ? selectedData : {};
  useEffect(() => {
    setIsCustomer(customer ? true : false);
    form.setFieldsValue(
      selectedData
        ? {
            following: following?.map((p) => p._id),
            customer: customer?._id,
            consultant: consultant?._id,
            date: date ? dayjs(date, "YYYY-MM-DD") : null,
            dueData: dueDate ? dayjs(dueDate, "YYYY-MM-DD") : null,
            salePerson: salePerson?._id,
            project: project?._id,
            industryType: industryType?._id,
            ...other,
          }
        : {}
    );
  }, [selectedData]);
  const [form] = Form.useForm();
  const Validate = (navigate) => {
    form
      .validateFields()
      .then((values) => {
        if (id) {
          onUpdate(values, navigate);
        } else {
          onFinish(values, navigate);
        }
      })
      .catch((info) => {
        info.errorFields.map((p) => message.info(p.errors[0]));
      });
  };

  const [activeKey, setActiveKey] = useState("1");
  const items = [
    {
      label: "Save & continue",
      key: "1",
      onClick: () => Validate("Enquiry"),
      icon: <AiOutlineSave />,
    },
    {
      label: "Save & New",
      key: "2",
      onClick: () => Validate("Enquiry"),
      icon: <AiOutlineSave />,
    },
    {
      label: "Save & Forward to Estimation",
      key: "3",
      onClick: () => Validate("Estimation"),
      icon: <RiShareForwardLine />,
      disabled: !(path == Q || path == En),
    },
    {
      label: "Save & Forward to Quotation",
      key: "4",
      onClick: () => Validate("Quotation"),
      icon: <RiShareForwardLine />,
      disabled: !(path == Q || path == En),
    },
  ];

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        docData={selectedData}
        path={`/sales/${pathname?.split("/")[2]}`}
        handleComplete={handleValidate}
        handleNew={() => {
          form.resetFields();
          setSelectedData();
        }}
        extra={[
          <Space wrap key={1}>
            <Dropdown.Button
              type="primary"
              onClick={() => Validate("Enquiry")}
              loading={whatClick == "Enquiry" && confirmLoading}
              menu={{
                items,
              }}
            >
              Save
            </Dropdown.Button>
          </Space>,
        ]}
      >
        <StyledMetaForm
          name="validate_other"
          layout="horizantal"
          autoComplete="off"
          className="form-set"
          size="medium"
          labelCol={{
            span: 5,
          }}
          initialValues={{ date: dayjs() }}
          form={form}
        >
          <>
            <Row>
              <Col md={14} xs={24}>
                <SelectSearch
                  handleSelect={handleSelect}
                  fields={"title,email,phone"}
                  route={`meta/contact/dsearch`}
                  label={"Customer"}
                  name={`customer`}
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

                {isCustomer && (
                  <>
                    <Form.Item name={"contactPerson"} label={"Contact Person"}>
                      <Input
                        bordered={false}
                        placeholder="Contact Person"
                        autoFocus={true}
                      />
                    </Form.Item>
                    <Form.Item name={"address"} label={"Address"}>
                      <Input bordered={false} placeholder="Address" />
                    </Form.Item>
                    <Form.Item name={"phone"} label={"Phone"}>
                      <Input bordered={false} placeholder="Phone" />
                    </Form.Item>
                    <Form.Item name={"email"} label={"Email"}>
                      <Input bordered={false} placeholder="Email" />
                    </Form.Item>
                  </>
                )}
                <SelectSearch
                  fields={"title,email,phone"}
                  route={`meta/contact/wsearch`}
                  hasFeedback
                  label={"Ref/Consultant"}
                  name={`consultant`}
                  where={{ isConsultant: true }}
                  columns={[
                    { label: "Title", size: 24, field: "title" },
                    { label: "Email", size: 24, field: "email" },
                    // { label: "Phone", size: 3, field: "phone" },
                  ]}
                  placeholder="search Ref/Consultant"
                />

                <SelectSearch
                  fields={"name,email,phone"}
                  route={`admin/wsearch`}
                  name="salePerson"
                  label={"Sale Person"}
                  placeholder="Select Sale Person"
                  // where={{ isConsultant: true }}
                  columns={[
                    { label: "Name", size: 24, field: "name" },
                    { label: "Email", size: 24, field: "email" },
                    // { label: "Phone", size: 3, field: "phone" },
                  ]}
                />

                <DynamicSelect
                  path="scrum/project"
                  label="Project"
                  name="project"
                />

                <Form.Item
                  hasFeedback
                  label={"Industry Type"}
                  className="form-field"
                  name="industryType"
                >
                  <Select
                    // bordered={false}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Select a industry type"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: "8px 0",
                          }}
                        />
                        <Space
                          align="center"
                          style={{
                            padding: "0 8px 4px",
                          }}
                        >
                          <Input
                            placeholder="Or Create New"
                            value={industryTitle}
                            onChange={(e) => setIndustryTitle(e.target.value)}
                          />
                          <Typography.Link
                            onClick={addIndustry}
                            style={{
                              whiteSpace: "nowrap",
                            }}
                          >
                            {getIconByName("create")} Add Industry
                          </Typography.Link>
                        </Space>
                      </>
                    )}
                  >
                    {industry?.map((item) => (
                      <Option key={item._id} value={item._id}>
                        {item.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <SelectSearch
                  fields={"name,email,phone"}
                  route={`admin/wsearch`}
                  name="following"
                  label={"Notify"}
                  placeholder="Select a person to notify"
                  // where={{ isConsultant: true }}

                  selectProps={{ mode: "multiple" }}
                  columns={[
                    { label: "Name", size: 24, field: "name" },
                    { label: "Email", size: 24, field: "email" },
                    // { label: "Phone", size: 3, field: "phone" },
                  ]}
                />
              </Col>

              <Col md={10} xs={24}>
                <Form.Item name="date" hasFeedback label={"Date"}>
                  <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                </Form.Item>

                <Form.Item name="dueDate" hasFeedback label={"Due Date"}>
                  <DatePicker
                    style={{ width: "100%" }}
                    defaultValue={dayjs().add(5, "day")}
                    format="DD-MM-YYYY"
                  />
                </Form.Item>
                <Form.Item name="reference" hasFeedback label={"PO/Ref No"}>
                  <Input placeholder="PO/Ref Number" />
                </Form.Item>
                <Form.Item
                  initialValue={"Normal"}
                  name="priority"
                  label={"Priority"}
                >
                  <Select placeholder="Select priorty" allowClear>
                    <Option value="High">High</Option>
                    <Option value="Low">Low</Option>
                    <Option value="Normal">Normal</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  initialValue={"Visit"}
                  name="medium"
                  label={"Medium"}
                >
                  <Select allowClear>
                    <Option value="Email">Email</Option>
                    <Option value="Call">Call</Option>
                    <Option value="Visit">Visit</Option>
                    <Option value="Direct">Direct</Option>
                    <Option value="Whatsapp">Whatsapp</Option>
                    <Option value="Other">Other</Option>
                  </Select>
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
                  otherParams={{ _id: selectedData?.paymentTerm }}
                />
                <Form.Item
                  label={"Files"}
                  name="attachments"
                  valuePropName="fileList"
                  getValueFromEvent={manualNormFile}
                >
                  <ManualUploadNode folder={"enquiry"}></ManualUploadNode>
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginBottom: 0 }}>
              <Col md={14} xs={24}>
                <Form.Item
                  name="remarks"
                  label={"Details"}
                  className="textform"
                >
                  <Input.TextArea
                    placeholder="Any Details here.........."
                    rows={3}
                    showCount
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default CreateForm;
