import FormLayout from "meta/JLayouts/Layout";
import React, { useState, useEffect } from "react";
import { dataInfo, formTitle, path, route } from "./Codes";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Steps,
  Tabs,
  message,
} from "antd";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import AppPageMetadata from "meta/core/AppPageMetadata";
import ProductTable from "./ProductTable";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetData } from "meta/services/auth/ezAPI";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import dayjs from "dayjs";
import { getData } from "meta/common/Apis";
import { useAuthUser } from "meta/utility/AuthHooks";
import ApprovalTable from "./ApprovalTable";
import SendForApproval from "./SendForApproval";
import moment from "moment";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";
import successHandler2 from "meta/services/auth/successHandle2";
const DemandForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathname = useLocation();
  const { user } = useAuthUser();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState();
  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setSelected);
  }, [id]);
  const { cuDate, products, department, approvedBy, ...others } = selected
    ? selected
    : {};
  useEffect(() => {
    setCurrent(
      selected?.status == "Post"
        ? 1
        : selected?.status == "Draft"
        ? 0
        : selected?.status == "Rejected"
        ? 2
        : selected?.status == "Accepted"
        ? 2
        : 0
    );
    setDataSource(selected?.products || []),
      form.setFieldsValue(
        selected
          ? {
              cuDate: dayjs(cuDate),
              department: department?._id,
              approvedBy: approvedBy?.map((d) => d._id),
              others,
            }
          : { department: user?.processId }
      );
  }, [selected]);
  const [wLoad, setWLoad] = useState();
  const handleSubmit = async (status = "Drafts") => {
    setWLoad(status);
    const response = await handleValidateWithOutReset(
      form,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
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
        />
      ),
      key: "1",
    },
    {
      label: "Approval",
      children: selected && <ApprovalTable selected={selected} />,
      key: "2",
    },
    { label: "Notes", children: "Operation", key: "3" },
  ];
  const [current, setCurrent] = useState(0);
  const handleChange = (e) => {
    setCurrent(e);
  };
  const handleValidate = (arr) => {
    for (const item of arr) {
      if (!item.doneQty) {
        return true;
      }
    }
    return false;
  };

  const handleApproved = async (status) => {
    if (selected?.approvedBy?.find((c) => c.user?._id == user?._id)) {
      try {
        const res = await jwtAxios.put(`${dataInfo.dataRoute}/approval/${id}`, {
          user: user?._id,
          status: status,
          approvalDate: moment(),
        });
        successHandler2(res);
        setSelected(res.data.result);
      } catch (error) {
        errorHandler(error);
      }
    } else {
      message.info("Don't have premission for approval");
    }
  };
  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout
        codes={dataInfo}
        form={form}
        tabItems={items}
        extraStep={
          <Space size={4}>
            {!selected || selected?.status == "Drafts" ? (
              <Button
                type="primary"
                onClick={() =>
                  handleSubmit(dataSource?.length > 0 ? "Ready" : "Drafts")
                }
                loading={wLoad == "Drafts" && loading}
              >
                Mark as Todo
              </Button>
            ) : (
              <>
                <Button
                  onClick={() =>
                    handleValidate(dataSource) == true
                      ? message.info("please add done qunatity")
                      : message.success("Validate")
                  }
                  type="primary"
                  // loading={loading}
                >
                  Validate
                </Button>
                <Button
                  onClick={() => {
                    const updatedData = dataSource?.map((item) => ({
                      ...item,
                      doneQty: item.doneQty ? 0 : item.qty,
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
              </>
            )}

            <Button
              type="primary"
              onClick={() => handleSubmit("Post")}
              hidden={
                selected?.status == "Drafts" ||
                handleValidate(dataSource) ||
                !id
              }
              loading={wLoad == "Post" && loading}
            >
              Post
            </Button>
            <SendForApproval setSelected={setSelected} selected={selected} />

            <Button
              type="primary"
              onClick={() => handleApproved("Accepted")}
              loading={wLoad == "Accepted" && loading}
            >
              Accept
            </Button>
            <Button
              type="primary"
              onClick={() => handleApproved("Rejected")}
              loading={wLoad == "Rejected" && loading}
              // hidden
            >
              Reject
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
            title: "Post",
            status: current >= 1 ? "finish" : "wait",
          },

          selected?.status == "Accepted" || selected?.status == "Rejected"
            ? {
                title: selected?.status,
                status: current >= 3 ? "finish" : "wait",
              }
            : "",
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
          layout="vertical"
          disabled={id ? selected?.createdBy?._id !== user?._id : false}
          initialValues={{
            operationType: "Receipts",
            department: user?.processId,
          }}
        >
          <Row gutter={12}>
            <Col sm={12}>
              <Form.Item label="Title" name="title">
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item label="Date" name="cuDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col sm={6}>
              <SelectSearch
                key={1}
                fields={"title"}
                route={`meta/process/dsearch`}
                label={"Department"}
                name={"department"}
                columns={[{ label: "Title", size: 4, field: "title" }]}
                placeholder="search departement"
              />
            </Col>
            <Col sm={12}></Col>
            <Col sm={6}>
              <Form.Item label="Source Document" name="sourceDocument">
                <Input placeholder="e.g. P0001" />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <SelectSearch
                key={1}
                fields={"name"}
                route={`meta/company/profile/dsearch`}
                label={"company"}
                name={"company"}
                columns={[{ label: "Name", size: 4, field: "name" }]}
                placeholder="search company"
              />
            </Col>
          </Row>
        </StyledMetaForm>
      </FormLayout>
    </>
  );
};

export default DemandForm;
