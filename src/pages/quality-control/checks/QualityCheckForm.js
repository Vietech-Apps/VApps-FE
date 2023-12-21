import React, { useEffect } from "react";
import { useRef, useState } from "react";
import FormLayout from "meta/JLayouts/Layout";
import {
  Form,
  Input,
  Button,
  Badge,
  message,
  Tabs,
  Descriptions,
  Space,
} from "antd";
import AppPageMetadata from "meta/core/AppPageMetadata";
import QCProductTable from "./QCProductTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "meta/common/Apis";
import { dataInfo, formTitle, route } from "./QCCodes";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import { useAuthUser } from "meta/utility/AuthHooks";
import VendorDetail from "pages/Inventory/GRN/VendorDetail";
import Additional from "pages/Inventory/GRN/Additional";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { normFile } from "meta/common/fns";
import FileUpload from "meta/common/FormFeilds/FileUpload";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";

const qualityCheck = () => {

  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [d, setD] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedPO, setSelectedPO] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setD);
  }, [id]);
  const [selectedGateIn, setSelectedGateIn] = useState();

  useEffect(() => {
    setSelectedGateIn(d?.gateIn);
    setSelectedPO(d?.po);
    setDataSource(d?.products || []);
    form.setFieldsValue({
      attachments: d?.attachments,
    });
  }, [d]);

  let b = dataSource?.filter((s) => !s.qualityCheckStatus);
  const handleSubmit = async () => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {
        gateIn: selectedGateIn?._id,
        products: dataSource,
        po: selectedPO?._id,
        qualityCheckStatus: b.length > 0 ? "P.Q" : "Q",
      },
      setLoading
    );
    setD(response.data.result);

    if (!id) navigate(`${dataInfo.navPath}/${response.data.result._id}`);
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

  const handleSelectProduct = async (e, options) => {
    const fd = options?.find((c) => c._id === e);
    setSelectedPO(fd);
    setSelectedGateIn(fd.gateIn);
    if (d?.gateIn._id) {
      message.info("Already selected");
    } else {
      setDataSource(fd.products);
    }
  };
  const { user } = useAuthUser();
  const items = [
    {
      key: "1",
      label: `General`,
      children: (
        <Descriptions>
          <Descriptions.Item label="PO">{selectedPO?.cuId}</Descriptions.Item>
          <Descriptions.Item label="GateIn">
            {selectedGateIn?.cuId}
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: "2",
      label: `Vendor`,
      children: <VendorDetail selected={selectedPO} />,
    },
    {
      key: "3",
      label: `Additional Detail`,
      children: <Additional />,
    },
    {
      key: "4",
      label: `Attachments`,
      children: (
        <>
          <Form form={form} layout="vertical">
            <Form.Item
              name={"attachments"}
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label="Quality Attachments"
            >
              <FileUpload folder={"Quality"} />
            </Form.Item>
            {selectedPO?.attachments?.length > 0 && (
              <Form.Item label="Related Attachments">
                <FileUpload
                  folder={"Quality"}
                  disabled={true}
                  fileList={[
                    ...(selectedPO?.attachments || []),
                    ...(selectedGateIn?.attachments || []),
                  ]}
                />
              </Form.Item>
            )}
          </Form>
        </>
      ),
    },
  ];
  const handleValidate = (arr) => {
    for (const item of arr) {
      if (!item.qualityCheckStatus) {
        return true;
      }
    }
    return false;
  };
  const handleDone = async () => {
    try {
      const response = await jwtAxios.put(`${dataInfo.navPath}/done/${id}`, {
        qualityCheckStatus: "Quality",
        status: "Done",
      });
      successHandler2(response);
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        form={form}
        extra={[
          <Space key={1}>
            <Badge count={countSavedObjects(dataSource)}>
              <Button
                loading={loading}
                onClick={handleSubmit}
                disabled={d?.status == "Done"}
              >
                Save {countSavedObjects(dataSource) > 0 && "Changes"}
              </Button>
            </Badge>
            <Button
              type="primary"
              key={2}
              hidden={handleValidate(dataSource)}
              onClick={handleDone}
              // disabled={d?.status == "Done"}
            >
              Done
            </Button>
          </Space>,
        ]}
        size="small"

      >
        <Tabs defaultActiveKey="1" items={items} />
        <QCProductTable
          dataSource={dataSource}
          d={d}
          setD={setD}
          setDataSource={setDataSource}
          handleSelectProduct={handleSelectProduct}
        />
      </FormLayout>
    </>
  );
};

export default qualityCheck;
