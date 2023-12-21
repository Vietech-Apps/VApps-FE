import { SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Select,
  Col,
  Input,
  InputNumber,
  Divider,
  Space,
  Typography,
  Checkbox,
  Tabs,
  message,
  Row,
} from "antd";
import { usePermissions } from "meta/common/CheckPermission";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import TextArea from "antd/es/input/TextArea";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { dataInfo } from "../Codes";

const FormMain = () => {
  const mainRoute = "erp/BinLocation";
  const formTitle = "Bin Location";
  const [form] = Form.useForm();
  const { id } = useParams();
  const moduleName = RoutePermittedRole.BinLocation;
  const { canCreate, canUpdate } = usePermissions(moduleName);

  const [{ apiData: selectedData }, { setSelectedData }] = useGetData(
    `${mainRoute}/read/${id}`,
    [],
    {},
    id ? true : false
  );

  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values) => {
    setConfirmLoading(true);
    try {
      const response = await jwtAxios.post(`${mainRoute}/create`, values);
      setConfirmLoading(false);
      successHandler(response);
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

  const [{ apiData: data }] = useGetData(`erp/BinLevelwithcodes`, []);
  const [{ apiData: warehouses }] = useGetData(`erp/Warehouse/all`, []);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const items = [
    {
      label: "General",
      key: 1,
      children: (
        <>
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24} md={12}>
              <Form.Item name="location" label="Location">
                <Select
                  options={[
                    { value: "location1", label: "Receipt" },
                    { value: "location2", label: "Delievery" },
                    { value: "location3", label: "Internal Transfer" },
                    { value: "location4", label: "Manufacturing" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>
              <Form.Item name="country" label="Country">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="dropShip">
                <Checkbox onChange={onChange} className="checkbox-set">
                  <strong className="font-500">Drop-Ship</strong>
                </Checkbox>
              </Form.Item>
              <Form.Item name="inActive">
                <Checkbox onChange={onChange} className="checkbox-set">
                  <strong className="font-500">Inactive</strong>
                </Checkbox>
              </Form.Item>
              <Form.Item name="enableBinLocations">
                <Checkbox onChange={onChange} className="checkbox-set">
                  <strong className="font-500">Enable Bin Locations</strong>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      label: "Bin Locations",
      key: 2,
      children: (
        <>
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24} md={12}>
              <Form.Item
                name="binLocCodeSeparator"
                label="Bin Loc. Code Separator"
              >
                <Select
                  options={[
                    { value: "location1", label: "Receipt" },
                    { value: "location2", label: "Delievery" },
                    { value: "location3", label: "Internal Transfer" },
                    { value: "location4", label: "Manufacturing" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="noOfBinLocations" label="No Of Bin Locations">
                <Input />
              </Form.Item>
              <Form.Item name="defaultBinLocation" label="Default Bin Location">
                <Input />
              </Form.Item>
              <Form.Item name="enforceDefaultBinLoc">
                <Checkbox onChange={onChange}>
                  <strong className="font-500">Enforce Default Bin Loc.</strong>
                </Checkbox>
              </Form.Item>
              <Form.Item name="autoAllocOnIssue" label="Auto Alloc. On Issue">
                <Select
                  options={[
                    { value: "issue1", label: "Single Choice" },
                    {
                      value: "issue2",
                      label: "Single Choice",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="autoAllocOnReceipt"
                label="Auto Alloc. On Receipt"
              >
                <Select
                  options={[
                    { value: "receipt1", label: "Default Bin Location" },
                    {
                      value: "receipt2",
                      label: "Single Choice",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="receiveUpToMaxQty">
                <Checkbox onChange={onChange}>
                  <strong className="font-500">Receive Up To Max.Qty</strong>
                </Checkbox>
              </Form.Item>
              <Form.Item name="receiveUpToMaxWeight">
                <Checkbox onChange={onChange}>
                  <strong className="font-500">Receive Up To Max.Weight</strong>
                </Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="enableReceivingBinLocations">
                <Checkbox onChange={onChange} className="checkbox-set">
                  <strong className="font-500">
                    Enable Receiving Bin Locations
                  </strong>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [selectedDynamicFieldIds, setSelectedDynamicFieldIds] = useState([]);

  const handleSelectWarehouse = (value) => {
    setSelectedWarehouseId(value);
  };

  const handleSelectDynamicField = (index, value, documents) => {
    setSelectedDynamicFieldIds((prevIds) => {
      const newIds = [...prevIds];
      newIds[index] = value;
      return newIds;
    });
  };

  const calculateBinLocationCode = () => {
    if (!selectedWarehouseId || !selectedDynamicFieldIds.length) {
      return "";
    }
    const selectedWarehouse = warehouses?.find(
      (w) => w._id === selectedWarehouseId
    );
    if (!selectedWarehouse) {
      return "";
    }
    const dynamicFieldValues = selectedDynamicFieldIds.map((id, index) => {
      const field = data[index]?.documents?.find((d) => d._id === id);
      return field?.title || "";
    });

    let binLocationCode = `${selectedWarehouse.warehouseCode}`;
    for (let i = 0; i < dynamicFieldValues.length; i++) {
      if (dynamicFieldValues[i]) {
        if (i === 0) {
          binLocationCode += `-${dynamicFieldValues[i]}`;
        } else if (dynamicFieldValues[i - 1]) {
          binLocationCode += `-${dynamicFieldValues[i]}`;
        } else {
          binLocationCode += dynamicFieldValues[i];
        }
      }
    }
    form.setFieldsValue({ binLocationCode });
    return binLocationCode;
  };

  const binLocationCode = calculateBinLocationCode();

  useEffect(() => {
    form.setFieldsValue(selectedData);
    setSelectedWarehouseId(selectedData?.warehouse);
    setSelectedDynamicFieldIds([
      selectedData?.sublevel1,
      selectedData?.sublevel2,
      selectedData?.sublevel3,
      selectedData?.sublevel4,
      selectedData?.sublevel5,
    ]);
  }, [selectedData]);

  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        extra={
          <Space>
            <Button
              disabled={!canCreate}
              loading={confirmLoading}
              onClick={onValidate}
              icon={<SaveOutlined />}
            >
              Save
            </Button>
          </Space>
        }
      >
        <StyledMetaForm
          layout="horizontal"
          size="small"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 10 },
          }}
          form={form}
        >
          <Divider>
            <Typography.Text mark>{binLocationCode}</Typography.Text>
          </Divider>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="warehouse"
                label="Warehouse"
                rules={[
                  {
                    required: true,
                    message: "Please select warehouse!",
                  },
                ]}
                // extra={selectedWarehouse?.warehouseCode}
              >
                <Select onSelect={handleSelectWarehouse}>
                  {warehouses?.map((w) => (
                    <Select.Option key={w._id} value={w._id}>
                      {w.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {data?.map((p, index) => (
              <Col xs={24} sm={12} md={6} key={p._id}>
                <Form.Item name={`sublevel${index + 1}`} label={p.name}>
                  <Select
                    disabled={
                      index >= selectedDynamicFieldIds.length ||
                      !selectedWarehouseId
                    }
                    onSelect={(value) =>
                      handleSelectDynamicField(index, value, p.documents)
                    }
                  >
                    {p.documents?.map((d) => (
                      <Select.Option key={d._id} value={d._id}>
                        {d.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ))}
            <Col xs={24}>
              <Form.Item
                name="binLocationCode"
                label="Bin Location Code"
                labelCol={{ sm: { span: 6 }, md: { span: 4 } }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24}>
              <Divider orientation="left">Bin Location Properties</Divider>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="inActive" label="inactive">
                <Checkbox
                  onChange={onChange}
                  className="checkbox-set"
                ></Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="receivingBinLocation"
                label="Receiving Bin Location"
              >
                <Checkbox
                  onChange={onChange}
                  className="checkbox-set"
                ></Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="excludeFromAutoAllocOnIssue"
                label=" Exclude From Auto. Alloc. On Issue"
              >
                <Checkbox
                  onChange={onChange}
                  className="checkbox-set"
                ></Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="description"
                label="Description"
                labelCol={{ sm: { span: 6 }, md: { span: 5 } }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="itemWeight" label="Item Weight">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="itemQty" label="Item Qty">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="noOfItems" label="No. Of Items">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="noOfBatches" label="No. Of Batches/Serials">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="alternativeSortCode"
                label="Alternative Sort Code"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="barCode" label="Bar Code">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="minimumQty" label="Minimum Qty">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="maximumQty" label="Maximum Qty">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="maximumWeight" label="Maximum Weight">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24}>
              <Divider></Divider>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="itemRestrictions" label="Item Restrictions">
                <Select
                  options={[
                    { value: "item1", label: "item1" },
                    { value: "item2", label: "item2" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="uomRestrictions" label="Uom Restrictions">
                <Select
                  options={[
                    { value: "item1", label: "item1" },
                    { value: "item2", label: "item2" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="batchRestrictions" label="Batch Restrictions">
                <Select
                  options={[
                    { value: "item1", label: "item1" },
                    { value: "item2", label: "item2" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="transactionRestrictions"
                label="Transaction Restrictions"
              >
                <Select
                  options={[
                    { value: "item1", label: "item1" },
                    { value: "item2", label: "item2" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="lastUpdatedOn" label="Last Updated On">
                <Input />
              </Form.Item>
              <Form.Item name="reason" label="Reason">
                <TextArea placeholder="Autosize height with minimum and maximum number of lines" />
              </Form.Item>
            </Col>
          </Row>
        </StyledMetaForm>
      </FormLayout>
    </>
  );

};

export default FormMain;
