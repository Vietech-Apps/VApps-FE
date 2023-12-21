import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { getData, postAndGetData } from "meta/common/Apis";
import { getIconByName } from "meta/common/AppIcons";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import successHandler from "meta/services/auth/successHandler";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { Option } = Select;
const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  selectedData,
  loading,
  setLoading,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [label, setLabel] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [labelTitle, setLabelTitle] = useState([]);
  const [industryTitle, setIndustryTitle] = useState([]);

  const addIndustry = (e) => {
    e.preventDefault();
    postAndGetData(
      `meta/label/create?type=industrylabel`,
      { title: industryTitle },
      industry,
      setIndustry
    );
    setIndustryTitle("");
  };
  useEffect(() => {
    getData(`meta/label/list?type=panellabel`, setLabel);
    getData(`meta/label/list?type=industrylabel`, setIndustry);
  }, []);
  const addLabel = (e) => {
    e.preventDefault();
    postAndGetData(
      `meta/label/create?type=panellabel`,
      { title: labelTitle },
      label,
      setLabel
    );
    setLabelTitle("");
  };

  const { industryType, label: newLabel, ...other } = selectedData;
  useEffect(() => {
    form.setFieldsValue({
      industryType: industryType?._id,
      label: newLabel?._id,
      ...other,
    });
  }, [selectedData]);
  return (
    <>
      <Drawer
        title="Create a new Panel"
        width={500}
        onClose={onCancel}
        open={open}
        // bodyStyle={{
        //   paddingBottom: 80,
        // }}
        extra={
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              loading={loading}
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    onCreate(values);
                  })
                  .catch((info) => {
                    console.log("Validate Failed:", info);
                  });
              }}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          size="small"
          name="form_in_modal"
          initialValues={{
            qty: 1,
            sheetType: "MSPowderCoated",
            copperType: "impTin",
            type: "LV",
          }}
        >
          <Row gutter={[16]}>
            <Col md={24} xs={24}>
              <Form.Item
                name="name"
                label="Panel Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the name of panel!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item name="qty" label="QTY">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Please select the type of panel!",
                  },
                ]}
                className="collection-create-form_last-form-item"
              >
                <Select placeholder="type">
                  <Option value="LV">LV</Option>
                  <Option value="MV">MV</Option>
                  <Option value="PDB">PDB</Option>
                  <Option value="LDB">LDB</Option>
                  <Option value="DB">DB</Option>
                  <Option value="BTD">BTD</Option>
                  <Option value="Cable Tray">Cable Tray</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item
                name="sheetType"
                label="Sheet"
                rules={[
                  {
                    required: true,
                    message: "Please select the type",
                  },
                ]}
                className="collection-create-form_last-form-item"
              >
                <Select placeholder="Type">
                  <Option value={"GISheet"}>GI Sheet</Option>
                  <Option value={"GIPowderCoated"}>GI Powder Coated</Option>
                  <Option value={"MSPowderCoated"}>MS Powder Coated</Option>
                  <Option value={"HotDipGalvanized"}>Hot Dip Galvanized</Option>
                  <Option value={"ss304"}>SS [304]</Option>
                  <Option value={"ss316"}>SS [316]</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item
                name="copperType"
                label="Copper"
                rules={[
                  {
                    required: true,
                    message: "Please select the copper",
                  },
                ]}
                className="collection-create-form_last-form-item"
              >
                <Select placeholder="Type">
                  <Option value={"impTin"}>Imported (Tin)</Option>
                  <Option value={"impSleeve"}>Imported (Sleeve)</Option>
                  <Option value={"localTin"}>Local (Tin)</Option>
                  <Option value={"localSleeve"}>Local (Sleeve)</Option>
                  <Option value={"localBoth"}>Local (Both)</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col md={24} xs={24}>
              <Form.Item
                hasFeedback
                label={"Labels"}
                className="form-field"
                name="label"
              >
                <Select
                  // bordered={false}
                  placeholder="Select a Label"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        align="center"
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Input
                          placeholder="Or Create New"
                          value={labelTitle}
                          onChange={(e) => setLabelTitle(e.target.value)}
                        />
                        <Typography.Link
                          onClick={addLabel}
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          {getIconByName("create")} Add Label
                        </Typography.Link>
                      </Space>
                    </>
                  )}
                >
                  {label?.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item name="detail" label="Detail">
                <Input.TextArea type="textarea" rows={3} showCount />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

const AddPanel = ({
  panels,
  setPanels,
  selectedData = {},
  isCreate,
  disabled = false,
  estimation = {},
}) => {
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    setLoading(true);
    values.estimation = id;
    values.order = panels?.length;
    try {
      const response = await jwtAxios.post("erp/panel/create", values);
      successHandler2(response);
      setLoading(false);
      setPanels([...panels, response.data.result]);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };
  const onUpdate = async (values) => {
    setLoading(true);
    try {
      const response = await jwtAxios.put(
        `erp/panel/update/${selectedData?._id}`,
        values
      );
      successHandler2(response);

      setPanels((prevPanels) => {
        const updatedPanels = prevPanels.map((panel) => {
          if (panel._id === selectedData._id) {
            return { ...panel, ...response.data.result };
          } else {
            return panel;
          }
        });
        return updatedPanels;
      });
      setLoading(false);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };
  return (
    <>
      {isCreate ? (
        <Button
          onClick={() => {
            setOpen(true);
          }}
          icon={getIconByName("create")}
          disabled={estimation?.isComplete || disabled}
        >
          New Panel
        </Button>
      ) : (
        <EditOutlined
          onClick={() => {
            setOpen(true);
          }}
        />
      )}
      <CollectionCreateForm
        open={open}
        onCreate={!isCreate ? onUpdate : onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        selectedData={selectedData}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};
export default AddPanel;
