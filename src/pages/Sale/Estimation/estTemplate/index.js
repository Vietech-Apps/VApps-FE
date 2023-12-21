import { Col, Form, Input, Row, Space } from "antd";
import { getData } from "meta/common/Apis";
import { useEffect, useState } from "react";
import FormLayout from "meta/JLayouts/Layout";
import EstimationForm from "./Components";
import AddPanel from "./Components/AddPanel";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { EstFooterForm } from "./index.styled";
import { dataInfo } from "./Code";

const Estimation = () => {
  const [form] = Form.useForm();
  const [panels, setPanels] = useState([]);
  useEffect(() => {
    getData(`${dataInfo.dataRoute}/alllist`, setPanels);
  }, []);
  const handleComplete = (my) => {
    console.log(my);
  };

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        docData={panels}
        handleComplete={handleComplete}
        extra={[
          <Space key={"1"}>
            <AddPanel panels={panels} setPanels={setPanels} />
          </Space>,
        ]}
      >
        <EstimationForm form={form} panels={panels} setPanels={setPanels} />
        <EstFooterForm labelCol={{ span: 12 }}></EstFooterForm>
      </FormLayout>
    </>
  );
};

export default Estimation;
