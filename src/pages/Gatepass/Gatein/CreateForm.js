import {
  Button,
  Form,
  Select,
  Col,
  Input,
  Space,
  DatePicker,
  message,
  Radio,
  Row,
  Checkbox,
  Image,
  Badge,
} from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "meta/common/Apis";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import { dataInfo } from "./Code";
import dayjs from "dayjs";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";

import Address from "meta/common/Components/Address";
import VehicleForm from "meta/common/Components/VehicleForm";
import WebCam from "meta/common/Components/Webcam";
import ProductTable from "./ProductTable";
import successHandler2 from "meta/services/auth/successHandle2";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import FileUpload from "meta/common/FormFeilds/FileUpload";
import { normFile } from "meta/common/fns";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import AppPageMetadata from "meta/core/AppPageMetadata";

const CreateForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const materialType = Form.useWatch("materialType", form);
  const isItems = Form.useWatch("isItems", form);
  const isContainerized = Form.useWatch("isContainerized", form);
  const [passType, setPassType] = useState("Material");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const { id } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setSelectedData);
  }, []);
  const [imgSrcs, setImgSrcs] = useState([]);

  const { attachments, driver, date, ...other } = selectedData
    ? selectedData
    : {};
  useEffect(() => {
    setDataSource(
      selectedData?.products.map((product) => ({
        ...product,
        po: product._id,
        poCuId: product.poCuId,
      })) || []
    );
    setImgSrcs(selectedData?.photos || []);
    form.setFieldsValue({
      attachments: attachments?.length > 0 ? attachments : [],
      driver: driver?._id,
      date: dayjs(date),
      ...other,
    });
  }, [selectedData]);
  const posSet = new Set(dataSource?.map((item) => item.po));
  const posArray = Array.from(posSet);
  let deliveredStatus = dataSource?.find((s) => s.deliveredStatus == "P.D");

  const handleSubmit = async () => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {
        pos: posArray,
        products: dataSource,
        photos: imgSrcs,
        deliveredStatus: !deliveredStatus ? "D" : "P.D",
      },
      setLoading
    );
    setDataSource([]);
    setSelectedData(response.data.result);
    if (!id) navigate(`${dataInfo.navPath}/workspace/${response.data.result._id}`);
  };
  function countSavedObjects(arr) {
    let count = 0;
    arr.forEach((obj) => {
      if (obj.save) {
        count++;
      }
    });
    return count;
  }
  const handleDone = async () => {
    try {
      const response = await jwtAxios.put(`${dataInfo.dataRoute}/done/${id}`, {
        status: "Done",
      });

      // setDataSource([]);
      successHandler2(response);
      setSelectedData(response.data.result);
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleComplete = (my) => {
    console.log(my);
  };

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        docData={selectedData}
        handleComplete={handleComplete}
        extra={
          <Space>
            <Badge count={countSavedObjects(dataSource)} key={1}>
              <Button
                loading={loading}
                onClick={handleSubmit}
                type="primary"
                disabled={selectedData?.status == "Done"}
              >
                Save {countSavedObjects(dataSource) > 0 && "Changes"}
              </Button>
            </Badge>
            <Button
              type="primary"
              hidden={!id}
              onClick={handleDone}
              disabled={selectedData?.status == "Done"}
            >
              Done
            </Button>
          </Space>
        }
      >
        <StyledMetaForm
          layout="vertical"
          form={form}
          disabled={selectedData?.status == "Done"}
          initialValues={{ date: dayjs(), gateNo: "1", visitorType: "Meeting" }}
        >
          <Row gutter={24}>
            <Col sm={12}>
              <Form.Item
                name="passType"
                initialValue={passType}
                label="Pass Type"
                rules={[
                  {
                    required: true,
                    message: "please input phone number!",
                  },
                ]}
              >
                <Radio.Group
                  onChange={(e) => setPassType(e?.target?.value)}
                  value={passType}
                >
                  <Radio value="Visitor">Visitor</Radio>
                  <Radio value="Vehicle">Vehicle</Radio>
                  <Radio value="Material">Material</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item name="gateNo" label="Gate Number">
                <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item
                style={{ color: "#d9d9d9" }}
                name="date"
                label="Date & Time"
              >
                <DatePicker disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item
                name="visitorName"
                label="Person Name"
                rules={[
                  {
                    required: true,

                    message: "please input visitorName!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col sm={6}>
              <Form.Item
                name={"attachments"}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                label="Attachments"
              >
                <FileUpload folder={"GateIn"} />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item style={{ marginTop: "16px" }}>
                <WebCam form={form} imgSrcs={imgSrcs} setImgSrcs={setImgSrcs} />
              </Form.Item>
              {imgSrcs?.map((imgSrc, index) => (
                <Image
                  src={imgSrc}
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                  }}
                />
              ))}
            </Col>

            <Col sm={6}>
              <Form.Item name="vehicleNo" label="Vehicle No">
                <Input />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item name="visitorType" label="Visit Type">
                <Select
                  options={[
                    { value: "Business", label: "Business" },
                    { value: "Meeting", label: "Meeting" },
                    {
                      value: "Friends & family",
                      label: "Friends & family",
                    },
                    { value: "Delivery", label: "Delivery" },
                    { value: "Job candidates", label: "Job candidates" },
                    { value: "Others", label: "Others" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item name="purpose" label="Details (If any)">
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  showCount
                  allowClear={true}
                />
              </Form.Item>
            </Col>
            {passType === "Visitor" && (
              <>
                {/* <VehicleNo /> */}
                <Address form={form} />

                <Col sm={6}>
                  <Form.Item name="identityType" label="Identity Type">
                    <Select
                      options={[
                        { value: "April-March", label: "April-March" },
                        {
                          value: "January-December",
                          label: "January-December",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col sm={6}>
                  <Form.Item name="identityNumber" label="Identity Number">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item name="gender" label="Gender">
                    <Radio.Group>
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                      <Radio value="Other">Other</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <SelectSearch
                    fields={"name,email,phone"}
                    route={`admin/dsearch`}
                    label={
                      passType === "Material"
                        ? "Under the Supervision Of"
                        : "Whom to Meet"
                    }
                    name={"relatedPerson"}
                    columns={[
                      { label: "Name", size: 4, field: "name" },
                      // { label: "Email", size: 4, field: "email" },
                      { label: "Phone", size: 3, field: "whatsappNumber" },
                    ]}
                    placeholder="search here"
                  />
                </Col>
                <Col sm={12}>
                  <Form.Item name="informVia" label="Inform Via">
                    <Checkbox.Group
                      options={[
                        { label: "Email", value: "Email" },
                        { label: "SMS", value: "SMS" },
                        { label: "Phone", value: "Phone" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            {passType === "Vehicle" && (
              <>
                <VehicleForm />
              </>
            )}
            {passType === "Material" && (
              <>
                {/* <Col sm={12}>
                  <SelectSearch
                    fields={"name,email,phone"}
                    route={`admin/dsearch`}
                    label={"Driver"}
                    name={"driver"}
                    columns={[
                      { label: "Name", size: 4, field: "name" },
                      // { label: "Email", size: 4, field: "email" },
                      { label: "Phone", size: 3, field: "whatsappNumber" },
                    ]}
                    placeholder="search driver"
                  />
                </Col> */}
                <Col sm={12}>
                  <Form.Item
                    name="materialType"
                    initialValue={"Non-Returnable"}
                    label="Material Type"
                  >
                    <Select
                      options={[
                        { value: "Returnable", label: "Returnable" },
                        {
                          value: "Non-Returnable",
                          label: "Non-Returnable",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                {materialType === "Returnable" && (
                  <Col sm={12}>
                    <Form.Item
                      name="returnableDate"
                      label="Returnable Due Date"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                )}
                <Col sm={!isItems ? 12 : 6}>
                  <Form.Item
                    name="isItems"
                    initialValue={true}
                    label="Is Material Itemized?"
                  >
                    <Radio.Group>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {!isItems && (
                  <Col sm={12}>
                    <Form.Item
                      name="materialDescription"
                      label="Material Description"
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                )}
                <Col sm={!isItems ? 12 : 6}>
                  <Form.Item
                    name="isContainerized"
                    initialValue={false}
                    label="Is containerized Material?"
                  >
                    <Radio.Group>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {isContainerized && (
                  <>
                    <Col sm={6}>
                      <Form.Item name="containerNo" label="Container No">
                        <Input />
                      </Form.Item>
                    </Col>{" "}
                    <Col sm={6}>
                      <Form.Item
                        name="containerSealNo"
                        label="Container Seal No"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </>
                )}
                {isItems && (
                  <Col sm={24}>
                    <ProductTable
                      dataSource={dataSource}
                      setDataSource={setDataSource}
                    />
                  </Col>
                )}
              </>
            )}
          </Row>
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default CreateForm;
