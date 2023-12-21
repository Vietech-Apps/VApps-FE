import {
  Button,
  Form,
  Col,
  Input,
  Space,
  message,
  Row,
  Collapse,
  Switch,
} from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "meta/common/Apis";
import { getIconByName } from "meta/common/AppIcons";
import FormLayout from "meta/JLayouts/Layout";
import successHandler from "meta/services/auth/successHandler";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import { roleInfo } from "./Code";
import Permissions from "./PermissionHandler";
import { StyledFormRole } from "./index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import AppPageMetadata from "meta/core/AppPageMetadata";

const CreateForm = () => {
  const [permissionsArr, setPermissionsArr] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [{ apiData: branches }] = useGetData("meta/company/branch/alllist", []);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (id) getData(`${roleInfo.dataRoute}/read/${id}`, setSelectedData);
  }, []);

  const { id } = useParams();

  const onFinish = async (values) => {
    values.powers = permissionsArr;
    setConfirmLoading(true);
    try {
      const response = await jwtAxios.post(
        `${roleInfo.dataRoute}/create`,
        values
      );
      setConfirmLoading(false);
      successHandler(response);
    } catch (error) {
      errorHandler(error);
      setConfirmLoading(false);
    }
  };
  const onUpdate = async (values) => {
    values.powers = permissionsArr;
    setConfirmLoading(true);
    try {
      const response = await jwtAxios.put(
        `${roleInfo.dataRoute}/update/${selectedData._id}`,
        values
      );
      successHandler(response);
      setConfirmLoading(false);
    } catch (error) {
      errorHandler(error);
      setConfirmLoading(false);
    }
  };
  const { title, powers, ...other } = selectedData ? selectedData : {};

  useEffect(() => {
    setPermissionsArr(selectedData?.powers || []);
    console.log(powers);
    form.setFieldsValue({
      title,
      powers,
      ...other,
    });
  }, [selectedData]);

  const [form] = Form.useForm();
  const Validate = () => {
    form
      .validateFields()
      .then((values) => {
        if (id) {
          onUpdate(values);
        } else {
          onFinish(values);
        }
      })
      .catch((info) => {
        info.errorFields.map((p) => message.info(p.errors[0]));
      });
  };
  const handleComplete = (my) => {
    console.log(my);
  };

  return (
    <>
      <AppPageMetadata title={roleInfo.metaData} />

      <FormLayout
        codes={roleInfo}
        docData={selectedData}
        handleComplete={handleComplete}
        extra={
          <Space>
            <Button
              type="primary"
              loading={confirmLoading}
              onClick={Validate}
              icon={getIconByName("save")}
            >
              Save
            </Button>
          </Space>
        }
      >
        <StyledFormRole
          name="validate_other"
          layout="horizantal"
          autoComplete="off"
          initialValues={{}}
          labelCol={{ span: 6 }}
          form={form}
        >
          <Row>
            <Col md={16} xs={16}>
              <Form.Item
                name="title"
                label="Role Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the role name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={8} xs={8}>
              <Form.Item
                labelCol={{ span: 8 }}
                name="isBound"
                label="Restricted"
                valuePropName="checked"
                tooltip="Turn this option on if you want to limit this role to this Company only"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input the Role Description!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="collection-create-form_last-form-item">
                <Collapse>
                  {branches?.map((location) => (
                    <Collapse.Panel
                      header={`${location.parentCompany?.name}[${location.branchName}]`}
                      key={location._id}
                    >
                      <div key={location._id}>
                        <Permissions
                          company={location}
                          selectedData={selectedData}
                          permissions={permissionsArr}
                          setPermissions={setPermissionsArr}
                        />
                      </div>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </Form.Item>
            </Col>
          </Row>
        </StyledFormRole>
      </FormLayout>
    </>
  );
};

export default CreateForm;
