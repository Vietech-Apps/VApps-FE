import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { dataInfo, formTitle, path, route } from "./Codes";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Steps,
  Tabs,
  Tooltip,
  message,
} from "antd";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";

import AppPageMetadata from "meta/core/AppPageMetadata";
import ProductTable from "./ProductTable";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetData } from "meta/services/auth/ezAPI";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData } from "meta/common/Apis";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import SelectSearchh from "meta/JLayouts/SelectSearch/TableDisplay";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";

const ReceiptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [binLocations, setBinLocations] = useState([]);
  const [warehouseId, setWarehose] = useState();
  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setSelected);
  }, [id]);

  const {
    vendor,
    scheduledDate,
    products,
    sourceDocument,
    warehouse,
    ...others
  } = selected ? selected : {};

  useEffect(() => {
    setWarehose(selected?.warehouse);
    setCurrent(
      selected?.status == "Ready"
        ? 2
        : selected?.status == "Waiting"
        ? 1
        : selected?.status == "Done"
        ? 3
        : 0
    );

    setDataSource(selected?.products || []);
    form.setFieldsValue({
      vendor: vendor?._id,
      scheduledDate: dayjs(scheduledDate),
      sourceDocument: sourceDocument || selected?.po?.cuId,
      warehouse: selected?.warehouse,
      ...others,
    });
  }, [selected]);
  const handleSubmit = async (status = "Drafts") => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/${status == "Done" ? "done" : "update"}/${id}`,
      {
        status: status,
        products: dataSource,
      },
      setLoading
    );
    if (!id)
      navigate(`${dataInfo.navPath}/workspace/${response.data.result?._id}`);
    setSelected(response.data.result);
    return response.data.result;
  };

  let items = [
    {
      label: "Operations",
      children: (
        <ProductTable
          dataSource={dataSource}
          setDataSource={setDataSource}
          selected={selected}
          binLocations={binLocations}
          warehouseId={warehouseId}
        />
      ),
      key: "1",
    },
    { label: "Additional", children: "Operation", key: "2" },
    { label: "Notes", children: "Operation", key: "3" },
  ];
  const [current, setCurrent] = useState(0);
  const handleChange = (e) => {
    setCurrent(e);
  };
  const handleValidate = (arr) => {
    if (arr?.length > 0) {
      for (const item of arr) {
        if (!item.doneQty) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };

  const handleSelect = async (e) => {
    setWarehose(e);
  };
  const fetchData = async () => {
    try {
      const res = await jwtAxios.get(`erp/binLocation/readByWh/${warehouseId}`);
      setBinLocations(res.data.result);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (warehouseId) {
      fetchData();
    }
  }, [warehouseId]);

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        form={form}
        handleSubmit={handleSubmit}
        tabItems={items}
        extraStep={
          <Space size={4}>
            <Button
              onClick={() => handleSubmit(selected?.status || "Drafts")}
              loading={loading}
            >
              Save
            </Button>
            <Button
              type="primary"
              onClick={() =>
                handleSubmit(dataSource?.length > 0 ? "Ready" : "Drafts")
              }
              loading={loading}
              disabled={selected?.status == "Done"}
              hidden={!id}
            >
              Mark as Ready
            </Button>

            <Button
              disabled={selected?.status === "Done"}
              onClick={() => {
                const isSetQuantity = dataSource?.some(
                  (item) => item.doneQty === 0
                );
                const updatedData = dataSource?.map((item) => {
                  if (isSetQuantity) {
                    return item.doneQty === 0
                      ? { ...item, doneQty: item.qty - item.defectedQty }
                      : item;
                  } else {
                    return { ...item, doneQty: 0 };
                  }
                });
                setDataSource(updatedData);
              }}
              type="primary"
              loading={loading}
              hidden={!id}
            >
              {dataSource?.some((item) => item.doneQty === 0)
                ? "Set Quantity"
                : "Clear Quantity"}
            </Button>

            <Button
              disabled={selected?.status == "Done"}
              onClick={() =>
                handleValidate(dataSource) == true
                  ? message.info("please add done qunatity")
                  : message.success("Validated")
              }
              type="primary"
              loading={loading}
              hidden={!id}
            >
              Validate
            </Button>
            <Popconfirm
              title="Warning"
              onConfirm={() => handleSubmit("Done")}
              okText="Yes"
              cancelText="No"
              description={
                <ul>
                  <li>
                    <strong>Editing Restrictions:</strong> Post-submission edits
                    are now disabled to ensure data accuracy. Please review
                    entries before submitting.
                  </li>
                  <li>
                    <strong>Inventory Changes:</strong> Inventory levels
                    automatically update with transactions. Monitor these
                    changes closely.
                  </li>
                </ul>
              }
            >
              <Button
                type="primary"
                hidden={
                  selected?.status == "Drafts" || handleValidate(dataSource)
                }
                disabled={selected?.status == "Done"}
                loading={loading}
              >
                Done
              </Button>
            </Popconfirm>
          </Space>
        }
        stepsprops={{
          size: "small",
          onChange: handleChange,
          current,
        }}
        items={[
          {
            title: "Drafts",
            status: current === 0 ? "process" : current > 0 ? "finish" : "wait",
          },
          {
            title: "Waiting",
            status: current >= 1 ? "finish" : "wait",
          },
          {
            title: "Ready",
            status: current == 2 ? "process" : current == 3 ? "finish" : "wait",
          },
          {
            title: "Done",
            status: current >= 3 ? "finish" : "wait",
          },
        ]}
      >
        <StyledMetaForm
          form={form}
          size="small"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{ operationType: "Receipts" }}
        >
          <Row gutter={12}>
            <Col sm={12}>
              <SelectSearchh
                fields={"title,email,phone"}
                route={`meta/contact/dsearch`}
                label={"Received From"}
                name={"vendor"}
                columns={[
                  { label: "Name", size: 4, field: "title" },
                  { label: "Email", size: 4, field: "email" },
                  // { label: "Phone", size: 3, field: "phone" },
                ]}
                placeholder="search vendor"
                formProps={{
                  rules: [
                    { required: true, message: "Please select received from!" },
                  ],
                }}
              />
            </Col>
            <Col sm={12}>
              <Form.Item label="Scheduled Date" name="scheduledDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <SelectSearch
                fields={"title,warehouseCode"}
                route={`erp/Warehouse/dsearch`}
                label={"Warehouse"}
                name={"warehouse"}
                columns={[
                  { label: "Title", size: 4, field: "title" },
                  { label: "Code", size: 4, field: "warehouseCode" },
                  // { label: "Phone", size: 3, field: "phone" },
                ]}
                placeholder="search warehouse"
                formProps={{
                  rules: [
                    {
                      required: true,
                      message: "Please select ware house!",
                    },
                  ],
                }}
                handleSelect={handleSelect}
              />
            </Col>

            <Col sm={12}>
              <Form.Item label="Operation Type" name="operationType">
                <Select
                  options={[
                    { label: "Receipts", value: "Receipts" },
                    { label: "Deliveries", value: "Deliveries" },
                    { label: "Returns", value: "Returns" },
                    { label: "Manufacturing", value: "Manufacturing" },
                    { label: "PoS Orders", value: "PoS Orders" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item label="Source Document" name="sourceDocument">
                <Input
                  placeholder="e.g. P0001"
                  disabled={selected?.sourceDocument || selected?.po?.cuId}
                />
              </Form.Item>
            </Col>
          </Row>
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default ReceiptForm;
