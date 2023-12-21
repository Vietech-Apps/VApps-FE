import { SaveOutlined } from "@ant-design/icons";
import { Form, Space, Button, message } from "antd";
import { usePermissions } from "meta/common/CheckPermission";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import CreateForm from "./CreateForm";
import { getStatusTag } from "meta/common/status";
import { pInfo } from "../Code";

const FormMain = () => {
  const mainRoute = "erp/product";
  const formTitle = "Products";
  // const moduleName = RoutePermittedRole.products;
  // const { canCreate, canUpdate } = usePermissions(moduleName);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState();
  const onFinish = async (values) => {
    setConfirmLoading(true);

    try {
      const response = await jwtAxios.post(`${mainRoute}/create`, values);
      setConfirmLoading(false);
      successHandler(response);
      navigate(`/inventory/products/workspace/${response.data.result._id}`);
    } catch (error) {
      errorHandler(error);
      setConfirmLoading(false);
    }
  };
  const onUpdate = async (values) => {
    setConfirmLoading(true);
    try {
      const response = await jwtAxios.put(
        `${mainRoute}/update/${selectedData._id}`,
        values
      );
      successHandler(response);
      setConfirmLoading(false);
    } catch (error) {
      errorHandler(error);
      setConfirmLoading(false);
    }
  };
  const onValidate = async () => {
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
        console.log("Validate Failed:", info);
        info.errorFields.map((p) => message.info(p.errors[0]));
      });
  };
  return (
    <FormLayout
      codes={pInfo}
      docData={selectedData}
      extraStep={
        <Space>
          <Button
            // disabled={!canCreate}
            loading={confirmLoading}
            onClick={onValidate}
            icon={<SaveOutlined />}
          >
            Save
          </Button>
        </Space>
      }
    >
      <CreateForm
        form={form}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        modal={false}
      />
    </FormLayout>
  );
};

export default FormMain;
