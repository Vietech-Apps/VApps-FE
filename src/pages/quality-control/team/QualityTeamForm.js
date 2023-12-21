import { Button, Form, Input, Space, message } from "antd";
import FormLayout from "meta/JLayouts/Layout";
import { getData } from "meta/common/Apis";
import AppPageMetadata from "meta/core/AppPageMetadata";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import { dataInfo, } from "./QTCodes";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";

const QualityTeam = () => {
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
    form.setFieldsValue(selectedData ? { ...selectedData } : {});
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
  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        form={form}
        extra={
          <Space>
            <Button onClick={handleSubmit} loading={loading}>
              Save
            </Button>
          </Space>
        }
      >
        <StyledMetaForm form={form} layout="vertical">
          <Form.Item name="title" label="Team Name" tooltip="The QA Masters">
            <Input placeholder="Team name" />
          </Form.Item>
          <Form.Item name="email" label="Email Alias">
            <Input placeholder="Alias email" />
          </Form.Item>
          <SelectSearch
            fields={"name"}
            route={`meta/company/profile/dsearch`}
            label={"Company"}
            name={"company"}
            placeholder="search company with name"
            columns={[{ label: "Company Name", size: 2, field: "name" }]}
          />
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default QualityTeam;
