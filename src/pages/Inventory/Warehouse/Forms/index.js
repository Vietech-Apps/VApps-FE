import { SaveOutlined } from "@ant-design/icons";
import {
  Form,
  Space,
  Button,
  message,
  Row,
  Col,
  Input,
  Checkbox,
  Select,
  Tabs,
} from "antd";
import { usePermissions } from "meta/common/CheckPermission";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import {
  MySelect,
  OptionsWithNameProps,
  UserOptions,
  getOptions,
  handleValidateWithOutReset,
} from "meta/common/MyFns";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import { dataInfo } from "../Codes";

const FormMain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleName = RoutePermittedRole.products;
  const { canCreate, canUpdate } = usePermissions(moduleName);
  const [loading, setLoading] = useState(false);
  const [{ apiData: selectedData }, { setData: setSelectedData }] = useGetData(
    `${dataInfo.dataRoute}/read/${id}`,
    [],
    {},
    id ? true : false
  );
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {},
      setLoading
    );
    setSelectedData(response.data.result);
    if (!id)
      navigate(`${dataInfo.navPath}/workspace/${response.data.result?._id}`);
    return response.data.result;
  };
  const [{ apiData: companies }] = useGetData(`meta/company/profile/list`, []);
  useEffect(() => {
    form.setFieldsValue({ ...selectedData });
  }, [selectedData]);
  const [{ apiData: branchs }] = useGetData(`meta/company/branch/alllist`, []);
  const [isBin, setIsBin] = useState(true);
  const [activeKey, setActiveKey] = useState(1);
  const onChange = (e) => {
    setIsBin(e.target.checked);
    setActiveKey(e.target.checked ? 2 : 1);
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
                <MySelect
                  options={OptionsWithNameProps(branchs, "branchName")}
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
              <Form.Item name="inActive" valuePropName="checked">
                <Checkbox className="checkbox-set">
                  <strong className="font-500">Inactive</strong>
                </Checkbox>
              </Form.Item>
              <Form.Item name="enableBinLocations" valuePropName="checked">
                <Checkbox onChange={onChange} className="checkbox-set">
                  <strong className="font-500">Enable Bin Locations</strong>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    isBin &&
      id && {
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
                  <MySelect options={getOptions(branchs)} />
                  {/* <Select
                  options={[
                    { value: "location1", label: "Receipt" },
                    { value: "location2", label: "Delievery" },
                    { value: "location3", label: "Internal Transfer" },
                    { value: "location4", label: "Manufacturing" },
                  ]}
                /> */}
                </Form.Item>
                <Form.Item name="noOfBinLocations" label="No Of Bin Locations">
                  <Input />
                </Form.Item>

                <SelectSearch
                  key={1}
                  fields={"binLocationCode"}
                  route={`erp/binLocation/dsearch`}
                  label={"Default Bin Location"}
                  name={"defaultBinLocation"}
                  columns={[
                    { label: "Title", size: 4, field: "binLocationCode" },
                  ]}
                  placeholder={`search bin Locations of selected warehouse`}
                  otherParams={{ warehouse: id }}
                />

                <Form.Item name="enforceDefaultBinLoc" valuePropName="checked">
                  <Checkbox>
                    <strong className="font-500">
                      Enforce Default Bin Loc.
                    </strong>
                  </Checkbox>
                </Form.Item>
                {/* <Form.Item name="autoAllocOnIssue" label="Auto Alloc. On Issue">
                <Select
                  options={[
                    { value: "issue1", label: "Single Choice" },
                    {
                      value: "issue2",
                      label: "Single Choice",
                    },
                  ]}
                />
              </Form.Item> */}
                {/* <Form.Item
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
              </Form.Item> */}
                <Form.Item name="receiveUpToMaxQty" valuePropName="checked">
                  <Checkbox>
                    <strong className="font-500">Receive Up To Max.Qty</strong>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="receiveUpToMaxWeight" valuePropName="checked">
                  <Checkbox>
                    <strong className="font-500">
                      Receive Up To Max.Weight
                    </strong>
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}></Col>
            </Row>
          </>
        ),
      },
  ];
  return (
    <FormLayout
      codes={dataInfo}
      form={form}
      handleSubmit={handleSubmit}
      extra={
        <Space>
          <Button
            disabled={!canCreate}
            loading={loading}
            onClick={handleSubmit}
            icon={<SaveOutlined />}
          >
            Save
          </Button>
        </Space>
      }
    >
      <StyledMetaForm
        form={form}
        layout="horizontal"
        size="small"
        labelCol={{ span: 8 }}
        initialValues={{ type: "internalLocation", enableBinLocations: true }}
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item required name="title" label="Warehouse Name">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              required
              name="warehouseCode"
              tooltip="It is ideal to have a short code of no more than 3 digits to display in the Bin Location Codes."
              label="Short Code"
            >
              <Input maxLength={3} placeholder="eg WH1" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="type" label="Type">
              <Select
                options={[
                  { value: "vendorLocation", label: "Vendor Location" },
                  {
                    value: "internalLocation",
                    label: "Internal Location",
                  },
                  {
                    value: "customerLocation",
                    label: "Customer Location",
                  },
                  {
                    value: "inventoryLoss",
                    label: "Inventory Loss",
                  },
                  {
                    value: "production",
                    label: "Production",
                  },
                  {
                    value: "transitLocation",
                    label: "Transit Location",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="company" label="Company">
              <MySelect options={UserOptions(companies)} />
            </Form.Item>
          </Col>
        </Row>
        <Tabs
          type="card"
          items={items}
          defaultActiveKey={1}
          activeKey={activeKey}
          onChange={(e) => setActiveKey(e)}
        />
      </StyledMetaForm>
    </FormLayout>
  );
};

export default FormMain;
