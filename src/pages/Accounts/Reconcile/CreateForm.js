import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { formTitle, path, reconcileInfo, route } from "./Codes";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  message,
} from "antd";
import {
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProductTable from "./ProductTable";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData } from "meta/common/Apis";
import SelectSearch from "meta/common/selectSearch/SelectSearchWithHandle";
const CreateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [isChecked, setisChecked] = useState(false);
  useEffect(() => {
    if (id) getData(`${route}/read/${id}`, setSelected);
  }, [id]);

  const {
    date,

    ...others
  } = selected ? selected : {};
  useEffect(() => {
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
      date: dayjs(date),

      ...others,
    });
  }, [selected]);
  const handleSubmit = async (status = "Drafts") => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${route}/create`,
      `${route}/update/${id}`,
      {
        status: status,
        products: dataSource,
      },
      setLoading
    );
    if (!id) navigate(`${path}/workspace/${response.data.result?._id}`);
    setSelected(response.data.result);
    return response.data.result;
  };
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
  const handleCheckboxChange = (e) => {
    setisChecked(e.target.checked);
    console.log(e.target.checked);
  };
  return (
    <>
      <AppPageMetadata title={formTitle} />
      <FormLayout
       codes={reconcileInfo}
        extraStep={
          <Space size={4}>
            {!selected || selected?.status == "Drafts" ? (
              <Button
                type="primary"
                onClick={() =>
                  handleSubmit(dataSource?.length > 0 ? "Ready" : "Drafts")
                }
                loading={loading}
              >
                Mark as Todo {selected?.status}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    const updatedData = dataSource?.map((item) => ({
                      ...item,
                      doneQty: item.doneQty ? 0 : item.qty - item.defectedQty,
                    }));
                    setDataSource(updatedData);
                  }}
                  type="primary"
                  loading={loading}
                >
                  {dataSource.some((item) => item.doneQty)
                    ? "Clear Quantity"
                    : "Set Quantity"}
                </Button>
                <Button
                  onClick={() =>
                    handleValidate(dataSource) == true
                      ? message.info("please add done qunatity")
                      : message.success("Validated")
                  }
                  type="primary"
                  loading={loading}
                >
                  Validate
                </Button>
              </>
            )}

            <Button
              type="primary"
              onClick={() => handleSubmit("Done")}
              hidden={
                selected?.status == "Drafts" || handleValidate(dataSource)
              }
              loading={loading}
            >
              Done
            </Button>
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
        extra={
          <Space>
            <Button
              onClick={() => handleSubmit(selected?.status || "Drafts")}
              loading={loading}
            >
              Save
            </Button>
          </Space>
        }
      >
        <StyledMetaForm
          form={form}
          size="small"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item name="internalTransfer" label="Internal Transfer">
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              </Form.Item>
              <Form.Item name="paymentType" label="Payment Type">
                <Radio.Group>
                  <Radio value="Send">Send</Radio>
                  <Radio value="Receive">Receive</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="vendor" label="Vendor" hidden={!isChecked}>
                <Input />
              </Form.Item>

              <Form.Item name="customer" label="Customer">
                <Input />
              </Form.Item>
              <Form.Item name="amount" label="Amount">
                <InputNumber />
              </Form.Item>
              <Form.Item name="date" label="Date">
                <DatePicker />
              </Form.Item>
              <Form.Item name="memo" label="Memo">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="journal" label="Journal">
                <Select
                  options={[
                    { value: "cash", label: "Cash" },
                    { value: "bank", label: "Bank" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="vendorBankAccount" label="Vendor Bank Account">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </StyledMetaForm>

      {/* <StyledTabs type="card" items={items} defaultActiveKey={1} /> */}
      
      </FormLayout>
    </>
  );
};

export default CreateForm;
