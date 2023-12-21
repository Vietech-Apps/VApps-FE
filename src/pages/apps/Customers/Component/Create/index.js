import { Button, Form, Space } from "antd";
import FormLayout from "meta/JLayouts/Layout";
import { handleValidate, handleValidateWithOutReset } from "meta/common/MyFns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateForm from "./CreateContact";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { contactInfo } from "../Code";
import { getData } from "meta/common/Apis";
const index = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [selectedData, setSelectedData] = useState();
  const [bankAccounts, setBankAccounts] = useState([]);
  useEffect(() => {
    if (id) {
      getData(`meta/contact/read/${id}`, setSelectedData);
    }
  }, []);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <AppPageMetadata title={contactInfo.metaData} />
      <FormLayout
        codes={contactInfo}
        docData={selectedData}
        extra={[
          <Space wrap key={"1"}>
            <Button
              type="primary"
              size="small"
              onClick={async () => {
                let response = await handleValidateWithOutReset(
                  form,
                  id,
                  `${contactInfo.dataRoute}/createCustom`,
                  `${contactInfo.dataRoute}/update/${id}`,
                  { bankAccounts: bankAccounts?.map((c) => c._id) },
                  setLoading
                );
                setSelectedData(response.data.result);
              }}
            >
              Save
            </Button>
          </Space>,
        ]}
      >
        <CreateForm
          form={form}
          modal={false}
          bankAccounts={bankAccounts}
          setBankAccounts={setBankAccounts}
        />
      </FormLayout>
    </>
  );
};

export default index;
