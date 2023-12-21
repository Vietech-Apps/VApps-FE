import FormLayout from "meta/JLayouts/Layout";
import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Button,
  Space,
  Spin,
  Tooltip,
  Col,
  Select,
  Input,
  Row,
  DatePicker,
  Checkbox,
} from "antd";
import "shared/styles/vendors/ql-editor.css";
import { useGetData } from "meta/services/auth/ezAPI";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { handleValidateWithOutReset } from "meta/common/MyFns";

import { employeInfo } from "../Code";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import { FcRefresh } from "react-icons/fc";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { usePermissions } from "meta/common/CheckPermission";
import { normFile } from "meta/common/FormFeilds/normFile";
import ImageUpload from "meta/common/FormFeilds/ImageUpload";
import PhoneCodes from "meta/common/PhoneCodes";
import {
  ProForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from "@ant-design/pro-components";
import { countryList } from "meta/common/countryList";
import FileUpload from "meta/common/FormFeilds/FileUpload";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import errorHandler from "meta/services/auth/errorHandler";
import { useAuthUser } from "meta/utility/AuthHooks";
import { useIntl } from "react-intl";

const MainForm = () => {
  const { canUpdate } = usePermissions();
  const { user } = useAuthUser();
  const { messages } = useIntl();

  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(true);
  const [{ apiData: designats }] = useGetData("meta/designation/alllist", []);
  const [{ apiData: processes }] = useGetData("meta/process/alllist", []);
  const [{ apiData: roles }] = useGetData("meta/permission/list", []);

  const { pathname } = useLocation();
  let isProfile = pathname.includes("profile");

  const check = async (_, value) => {
    if (!value) {
      return Promise.reject("Email is required");
    }
    var re =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.test(value)) {
      return Promise.reject("Invalid email address");
    }
    if (re.test(value)) {
      const email = await jwtAxios.post("admin/check", { email: value });
      if (!email?.data?.availability) {
        return Promise.reject(`${value} is not available`);
      }
    }
  };
  const [current, setCurrent] = useState(isProfile ? 1 : 0);
  const navigate = useNavigate();
  const onCurrentChange = (e) => {
    setCurrent(e);
  };
  const [formValue, setFormValue] = useState();
  const getFetchdata = async (route) => {
    try {
      const response = await jwtAxios.get(route);
      setFormValue(response.data.result);
    } catch (error) {
      errorHandler(error);
    }
  };
  
  useEffect(() => {
    if (id) {
      getFetchdata(`admin/read/${id}`);
    }
  }, [id]);

  const { designation, process, ...others } = formValue ? formValue : {};
  useEffect(() => {
    formMapRef?.current?.forEach((formInstanceRef) => {
      formInstanceRef?.current?.setFieldsValue({
        designation: designation?._id,
        process: process?._id,
        ...others,
      });
    });
  }, [formValue]);
  const formMapRef = useRef([]);
  const [form] = StepsForm.useForm();

  const taxationType = Form.useWatch("taxationType", form);
  const [loading, setLoading] = useState(false);
  const [whatLoad, setWhatLoad] = useState();
  const { Option } = Select;
  const [
    { apiData: selected, loading: refreshing },
    { setData: setSelected, setRefreshing },
  ] = useGetData(
    `${employeInfo.dataRoute}/read/${id}`,
    {},
    {},
    id ? true : false
  );

  const handleComplete = async (status) => {
    setWhatLoad(status);
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${employeInfo.dataRoute}/createMeta`,
      `${employeInfo.dataRoute}/update/${id}`,
      {
        status: status,
        path: employeInfo.dataRoute,
      },
      setLoading
    );
    if (response !== null) {
      if (!id)
        navigate(
          `${employeInfo.dataRoute}/workspace/${response.data.result?._id}`
        );
      setSelected(response.data?.result);
    }
    return response;
  };

  if (refreshing) {
    return <Spin />;
  } else {
    return (
      <>
        <AppPageMetadata title={employeInfo.metaData} />
        <FormLayout
          codes={employeInfo}
          docData={formValue}
          handleComplete={handleComplete}
          extraStep={
            <Space wrap>
              <Tooltip title={`Refresh`} placement="bottomRight">
                <Button
                  icon={<FcRefresh />}
                  onClick={() => {
                    setRefreshing(true);
                    form.resetFields();
                  }}
                  type="primary"
                  disabled={selected?.isDisabled}
                >
                  Refresh
                </Button>
              </Tooltip>
            </Space>
          }
        >
          <StepsForm
            current={current}
            form={form}
            onCurrentChange={onCurrentChange}
            formMapRef={formMapRef}
            onFinish={async (values) => {
              if (id) {
                try {
                  const response = await jwtAxios.patch(
                    `admin/update/${formValue?._id}`,

                    values
                  );
                  setCurrent(0);
                  successHandler(response);
                  navigate("/apps/employees/employee");
                } catch (error) {
                  errorHandler(error);
                }
              } else {
                const newContact = {
                  ...values,
                };
                try {
                  const response = await jwtAxios.post(
                    "admin/create",
                    newContact
                  );
                  setCurrent(0);
                  successHandler(response);
                  navigate("/apps/employees/employee");
                } catch (error) {
                  errorHandler(error);
                }
              }
            }}
            formProps={{
              validateMessages: {
                required: "This is required",
              },
            }}
          >
            <StepsForm.StepForm name="base" title="Registration">
              <ProForm.Group size={8}>
                <ProFormText
                  name="name"
                  label={messages["common.firstName"]}
                  width="md"
                  placeholder={messages["common.firstName"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input your First Name!",
                    },
                  ]}
                  disabled={isProfile}
                />
                <ProFormText
                  name="lastName"
                  label={messages["common.lastName"]}
                  width="md"
                  placeholder={messages["common.lastName"]}
                  rules={[
                    { required: true, message: "Please input your last Name!" },
                  ]}
                  disabled={isProfile}
                />
                <ProFormText
                  name="email"
                  label={messages["common.email"]}
                  width="md"
                  disabled={id ? true : false}
                  placeholder={messages["common.email"]}
                  rules={[{ validator: !id && check }]}
                />
              </ProForm.Group>

              <ProForm.Group size={90}>
                {!id && (
                  <ProFormText.Password
                    disabled={id ? true : false}
                    name="password"
                    label={messages["common.password"]}
                    width="md"
                    placeholder={messages["common.password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        min: 5,
                        message: "Password must be no more than 5 characters",
                      },
                    ]}
                  />
                )}
                <ProFormRadio.Group
                  name="isAdmin"
                  width={"md"}
                  label={"Role"}
                  options={[
                    {
                      label: "Admin",
                      value: true,
                    },
                    {
                      label: "Custom",
                      value: false,
                    },
                  ]}
                  style={{ width: "100%" }}
                  onChange={(e) => setIsAdmin(e.target.value)}
                  placeholder={"Role"}
                  rules={[{ required: true, message: "please select role" }]}
                  disabled={isProfile}
                />
                {!isAdmin && (
                  <ProFormSelect
                    width={"md"}
                    name="power"
                    label="Custom Role"
                    showSearch
                    options={roles?.map((p) => ({
                      label: p.title,
                      value: p._id,
                      key: p._id,
                    }))}
                    placeholder="Please select custom role"
                    rules={[
                      {
                        required: !isAdmin,
                        message: "Please select custom role!",
                      },
                    ]}
                    disabled={isProfile}
                  />
                )}
              </ProForm.Group>

              <ProForm.Group size={8}>
                <ProFormSelect
                  width={"md"}
                  name="designation"
                  label="Designation"
                  showSearch
                  options={designats?.map((p) => ({
                    label: p.title,
                    value: p._id,
                    key: p._id,
                  }))}
                  placeholder="Please select Designation"
                  rules={[
                    {
                      required: true,
                      message: "Please select Designation!",
                    },
                  ]}
                  disabled={isProfile}
                />

                <ProFormSelect
                  width={"md"}
                  name="process"
                  showSearch
                  label="Department"
                  options={processes?.map((p) => ({
                    label: p.title,
                    value: p._id,
                    key: p._id,
                  }))}
                  placeholder="Please select Department"
                  rules={[
                    {
                      required: true,
                      message: "Please select Department!",
                    },
                  ]}
                  disabled={isProfile}
                />
              </ProForm.Group>
              <ProForm.Group size={8}>
                <ProFormSelect
                  name="whatsappCode"
                  label="Country Code"
                  width="md"
                  showSearch
                  request={async () => {
                    return PhoneCodes?.map((p) => ({
                      label: `${p.code} ${p.dial_code}`,
                      value: p.dial_code,
                      key: p.dial_code,
                    }));
                  }}
                  placeholder="Please select custom role"
                  rules={[
                    {
                      required: !isAdmin,
                      message: "Please select custom role!",
                    },
                  ]}
                  disabled={isProfile}
                />
                <ProFormText
                  name="whatsappNumber"
                  label="whatsapp Number"
                  hasFeedback
                  width="md"
                  placeholder={"Please input Whatsapp"}
                  rules={[
                    {
                      pattern: /^[\d()-]+$/,
                      message: "Strings are not allowed!",
                    },
                    {
                      required: true,
                      message: "Please input whatsapp number!",
                    },
                  ]}
                  disabled={isProfile}
                />
              </ProForm.Group>
            </StepsForm.StepForm>
            <StepsForm.StepForm name="checkbox" title="Personal Info">
              <ProForm.Group>
                <ProFormSelect
                  width={"sm"}
                  name="country"
                  showSearch
                  initialValue={"Pakistan"}
                  label="Country"
                  options={countryList?.map((p) => ({
                    label: p.name,
                    value: p.name,
                    key: p.name,
                  }))}
                  placeholder="Select a country"
                  rules={[
                    {
                      required: true,
                      message: "Select a country",
                    },
                  ]}
                />
                <ProFormDatePicker name="birthAt" label="Birthday" width="sm" />
                <ProFormDatePicker
                  name="joinedAt"
                  label="Joining Date"
                  width="sm"
                />
                <ProFormSelect
                  width={"sm"}
                  name="gender"
                  initialValue="Male"
                  showSearch
                  label="Gender"
                  options={[
                    { label: "Male", value: "Male", key: "Male" },
                    { label: "Female", value: "Female", key: "Female" },
                    { label: "Both", value: "Both", key: "Both" },
                  ]}
                  placeholder="Select a gender"
                  rules={[
                    {
                      required: true,
                      message: "Select a gender",
                    },
                  ]}
                />
                <ProFormSelect
                  label="Blood Group"
                  name="bloodGroup"
                  initialValue="A+"
                  options={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                  ]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  name="oldId"
                  label="Old Id"
                  width="sm"
                  placeholder="Old Id/if any"
                />
                <ProFormText
                  name="phone"
                  label="Phone"
                  width="sm"
                  placeholder="Phone"
                />
                <ProFormText
                  name="ice"
                  label="Ice/In case of emergency"
                  width="sm"
                  placeholder="Ice/In case of emergency"
                />
                <ProFormRadio
                  name="isDriver"
                  label="Is Driver"
                  valuePropName="checked"
                >
                  <Checkbox />
                </ProFormRadio>
              </ProForm.Group>
              <ProForm.Group size={8}>
                <ProFormTextArea
                  name="bio"
                  label={"Bio Data"}
                  width="md"
                  placeholder={"Bio Data"}
                />
                <ProFormTextArea
                  name="address"
                  label={"Address"}
                  width="md"
                  placeholder={"Address"}
                />
              </ProForm.Group>
            </StepsForm.StepForm>
            <StepsForm.StepForm name="Bank Details" title="Bank Details">
              <ProFormText
                name="bankName"
                label="Bank Name"
                width="md"
                placeholder="Bank Name"
              />
              <ProFormText
                name="accountNumber"
                label="Account Number"
                width="md"
                placeholder="Account Number"
              />
              <ProFormSelect
                label="Pay Scale"
                name="level"
                width="md"
                initialValue="2"
                options={[
                  { value: "1", label: "Level-7" },
                  { value: "2", label: "Level-8" },
                  { value: "3", label: "Level-9" },
                  { value: "4", label: "Level-10" },
                  { value: "5", label: "Level-14" },
                ]}
              />
            </StepsForm.StepForm>
            <StepsForm.StepForm name="Documents" title="Documents">
              <ProForm.Group size={200}>
                <ProForm.Item
                  name={"picture"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <ImageUpload folder="employee" name={"Avatar"} maxCount={1} />
                </ProForm.Item>
                <ProForm.Item
                  name={"documents"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <FileUpload folder="employee" name={"Documents"} />
                </ProForm.Item>
                <ProForm.Item
                  name={"resume"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <FileUpload folder="resume" name={"Resume"} />
                </ProForm.Item>
              </ProForm.Group>{" "}
              <ProForm.Group size={200}>
                <ProForm.Item
                  name={"cnic"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <ImageUpload folder="cnic" name={"CNIC"} maxCount={2} />
                </ProForm.Item>
                <ProForm.Item
                  name={"transcript"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <FileUpload folder="transcript" name={"Transcript"} />
                </ProForm.Item>
                <ProForm.Item
                  name={"license"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <FileUpload folder="license" name={"License"} />
                </ProForm.Item>
              </ProForm.Group>
            </StepsForm.StepForm>
          </StepsForm>
        </FormLayout>
      </>
    );
  }
};

export default MainForm;
