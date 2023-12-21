import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Divider,
  Space,
  Tabs,
  message,
  Steps,
  Tooltip,
  Alert,
  Typography,
} from "antd";
import {
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProductTable from "./ProductTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData, postAndGetData } from "meta/common/Apis";
import TextArea from "antd/es/input/TextArea";

import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { AiOutlineSave } from "react-icons/ai";
import { FcRefresh } from "react-icons/fc";
import EditResizableTable from "meta/Reusable/EditableProTable/EditResizableTable";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { useGetData } from "meta/services/auth/ezAPI";
import { JEInfo } from "./Codes";
import DynamicSelect from "meta/JLayouts/DynamicSelect";

const ReceiptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [
    { apiData: selected, loading: tableLoading },
    { setData: setSelected, setRefreshing },
  ] = useGetData(`${JEInfo.dataRoute}/read/${id}`, [], {}, id ? true : false);

  const { accountingDate, scheduledDate, transactions, ...others } = selected
    ? selected
    : {};

  useEffect(() => {
    setCurrent(
      selected?.status == "Posted" ? 1 : selected?.status == "Drafts" && 0
    );

    setDataSource(transactions || []);
    form.setFieldsValue({
      accountingDate: dayjs(accountingDate),
      ...others,
    });
  }, [selected]);
  let isNotBalanced = (balances) => {
    let totalDebit = 0;
    let totalCredit = 0;

    for (const balance of balances) {
      totalDebit += balance.debit;
      totalCredit += balance.credit;
    }

    if (
      balances.length === 0 ||
      totalDebit !== totalCredit ||
      totalDebit === 0 ||
      totalCredit === 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  console.log(dataSource);
  const handleSubmit = async (status = "Drafts") => {
    if (dataSource?.length < 1) {
      message.info("You need to add a line before posting");
    } else {
      if (isNotBalanced(dataSource)) {
        message.warning(
          "Debit and credit balances are not equal or should not be zero"
        );
      } else {
        const response = await handleValidateWithOutReset(
          form,
          id,
          `${JEInfo.dataRoute}/create`,
          `${JEInfo.dataRoute}/update/${id}`,
          {
            path: JEInfo.navPath,
            status: status,
            transactions: dataSource,
          },
          setLoading
        );
        if (!id)
          navigate(`${JEInfo.navPath}/workspace/${response.data.result?._id}`);
        setSelected(response.data.result);
        return response.data.result;
      }
    }
  };

  let items = [
    {
      label: "Journal Items",
      key: 1,
      children: (
        <>
          <ProductTable
            dataSource={dataSource}
            setDataSource={setDataSource}
            selected={selected}
            loading={tableLoading}
          />
        </>
      ),
    },
    {
      label: "Other Info",
      key: 2,
      children: (
        <>
          <Row gutter={24} style={{ marginBottom: "1.5rem" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="autoPost"
                label="Auto-post"
                tooltip="Specify whether this entry is posted automatically on its accounting date, and any similar recurring invoices."
              >
                <Select
                  options={[
                    { value: "no", label: "No" },
                    { value: "atDate", label: "At Date" },
                    { value: "monthly", label: "Monthly" },
                    { value: "quarterly", label: "Quarterly" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="toCheck"
                label="To Check"
                tooltip="If this checkbox is ticked, it means that the user was not sure of all the related information at the time of the creation of the move and that the move needs to be checked again."
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="fiscalPosition"
                label="Fiscal Position"
                tooltip="Specify whether this entry is posted automatically on its accounting date, and any similar recurring invoices."
              >
                <Input />
              </Form.Item>
              <Form.Item name="company" label="Company">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item labelCol={{ span: 4 }} name="typeFor">
                <TextArea placeholder="Add an Internal Note For...." />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];
  const [{ apiData: tags }, { setData: setTags }] = useGetData(
    `erp/journal/list`,
    []
  );
  const [tagTitle, setTagTitle] = useState([]);
  const addTag = (e) => {
    e.preventDefault();
    postAndGetData(
      `erp/journal/create`,
      {
        journalName: tagTitle,
      },
      tags,
      setTags
    );
    setTagTitle("");
  };

  return (
    <>
      <AppPageMetadata title={JEInfo?.metaData} />

      <FormLayout
        codes={JEInfo}
        docData={selected}
        form={form}
        handleComplete={handleSubmit}
        tabItems={[
          {
            title: "Drafts",
            status: selected?.status == "Drafts" ? "finish" : "wait",
          },
          {
            title: "Post",
            status: selected?.status === "Posted" ? "finish" : "wait",
          },
        ]}
        extraStep={
          <Space>
            <Button
              icon={<AiOutlineSave />}
              onClick={() => handleSubmit(selected?.status || "Drafts")}
              loading={loading}
              disabled={selected?.status == "Posted"}
            >
              Save
            </Button>
            <Button
              type="primary"
              onClick={() => handleSubmit("Posted")}
              hidden={!id}
              loading={loading}
              disabled={selected?.status == "Posted"}
            >
              Post
            </Button>
            <Tooltip title={`Refresh`} placement="bottomRight">
              <Button
                icon={<FcRefresh />}
                onClick={() => setRefreshing(true)}
              />
            </Tooltip>
            <Tooltip title={`Reset To draft`} placement="bottomRight">
              <Button
                onClick={() => handleSubmit("Drafts")}
                disabled={selected?.status == "Posted"}
              >
                Reset To Draft
              </Button>
            </Tooltip>
            <Tooltip title={`Reverse Entry`} placement="bottomRight">
              <Button
                onClick={() => setRefreshing(true)}
                disabled={selected?.status == "Posted"}
              >
                Reverse Entry
              </Button>
            </Tooltip>
          </Space>
        }
      >
        <StyledMetaForm
          form={form}
          size="small"
          layout="vertical"
          disabled={selected?.addALineDisabled}
          initialValues={{ operationType: "Journal Enteries" }}
        >
          <Row gutter={8}>
            {/* <Col xs={24} sm={12}>
              <SelectSearch
                // handleSelect={handleSelectJ}
                fields={"type,journalName,code"}
                route={`erp/journal/dsearch`}
                label={"Journal"}
                name={`journal`}
                columns={[
                  { label: "Name", size: 24, field: "journalName" },
                  { label: "Type", size: 24, field: "type" },
                  { label: "code", size: 3, field: "shortCode" },
                ]}
                placeholder="search journals"
                formProps={{
                  // initialValue: journals?.length > 0 ? journals[0]?._id : null,
                  rules: [
                    {
                      required: true,
                      message: "Please select journal!",
                    },
                  ],
                }}
              />
            </Col> */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="reference"
                label={<b>Journal Detail</b>}
                rules={[
                  {
                    required: true,
                    message: "please input Journal details!",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="" maxLength={6} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Row gutter={8}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    labelCol={{
                      span: 12,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "please input Accounting Date!",
                      },
                    ]}
                    name="accountingDate"
                    label={<b>Accounting date</b>}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <DynamicSelect
                    path="scrum/project"
                    label="Project"
                    name="project"
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <DynamicSelect
                    path="erp/journal"
                    label="Tag"
                    formProps={{
                      rules: [
                        {
                          required: true,
                          message: "please input Accounting Date!",
                        },
                      ],
                      labelCol: {
                        span: 12,
                      },
                    }}
                    name="journal"
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <StyledTabs items={items} type="card" style={{ marginTop: "10px" }} />
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default ReceiptForm;
