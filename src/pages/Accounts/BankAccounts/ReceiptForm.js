import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { dataInfo } from "./Codes";
import { Button, Col, Form, Input, Row, Select, Space, Switch } from "antd";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import { getData } from "meta/common/Apis";

import FormComponent from "./FormComponent";
const ReceiptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setSelected);
  }, [id]);

  const { accountHolder, bank, company, ...others } = selected ? selected : {};
  useEffect(() => {
    form.setFieldsValue({
      accountHolder: accountHolder?._id,
      bank: bank?._id,
      company: company?._id,
      ...others,
    });
  }, [selected]);
  const handleSubmit = async () => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {},
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
        docData={selected}
        handleComplete={handleSubmit}
        extra={
          <Space>
            <Button onClick={() => handleSubmit()} loading={loading}>
              Save
            </Button>
          </Space>
        }
      >
        <FormComponent form={form} />
      </FormLayout>
    </>
  );
};

export default ReceiptForm;
