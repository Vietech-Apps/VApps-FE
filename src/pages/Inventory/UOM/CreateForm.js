import FormLayout from "meta/JLayouts/Layout";
import React, { useEffect, useRef, useState } from "react";
import { dataInfo } from "./Code";
import { v4 as uuidv4 } from "uuid";
import {
  FooterToolbar,
  PageContainer,
  PageHeader,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProLayout,
  ProTable,
} from "@ant-design/pro-components";
import {
  Button,
  Card,
  Descriptions,
  Input,
  InputNumber,
  Select,
  Table,
  Tooltip,
  Checkbox,
} from "antd";
import { DeleteOutlined, PlusOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { StyledTable } from "meta/JLayouts/ProTable/index.style";
import { handleValidateWithOutReset } from "meta/common/MyFns";
import { useGetData } from "meta/services/auth/ezAPI";
import AppPageMetadata from "meta/core/AppPageMetadata";

const CreateForm = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [
    { apiData: selected, loading: refreshing },
    { setData: setSelected, setRefreshing },
  ] = useGetData(`${dataInfo.dataRoute}/read/${id}`, {}, {}, id ? true : false);
  useEffect(() => {
    setDataSource(selected?.units || []);
    formRef.current.setFieldsValue({ ...selected });
  }, [selected]);
  const handleSave = (row, column, value) => {
    const newData = [...dataSource];
    newData[row][column] = value;
    setDataSource(newData);
  };

  const columns = [
    {
      title: "Unit of Measure",
      dataIndex: "unit",
      valueType: "text",
      width: 148,
      render: (value, record, index) => {
        return (
          <Input
            status={!value ? "error" : "success"}
            size="medium"
            defaultValue={value}
            onBlur={(e) => handleSave(index, "unit", e.target.value)}
          />
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 180,
      render: (value, record, index) => {
        return (
          <Select
            style={{ width: "100%" }}
            value={value}
            onSelect={(e) => handleSave(index, "type", e)}
            onBlur={(e) => handleSave(index, "type", value)}
            options={[
              {
                label: "Mark as Base Unit",
                key: "1",
                value: "reference",
              },
              {
                label: "Smaller than the Base Unit",
                key: "2",
                value: "smaller",
              },
              {
                label: "Bigger than the Base Unit",
                key: "3",
                value: "bigger",
              },
            ]}
          />
        );
      },
    },
    {
      title: "Ratio",
      dataIndex: "ratio",
      render: (value, record, index) => {
        return (
          <InputNumber
            size="medium"
            defaultValue={value}
            onBlur={(e) => handleSave(index, "ratio", e.target.value)}
            style={{ width: "100%" }}
          />
        );
      },
      width: 80,
    },
    {
      title: "Active",
      dataIndex: "active",
      render: (value, record, index) => {
        return (
          <Checkbox
            defaultValue={value}
            defaultChecked={value}
            onBlur={(e) => handleSave(index, "active", e.target.checked)}
          />
        );
      },
      width: 2,
    },
    {
      title: "Action",
      render: (value, record, index) => {
        return (
          <DeleteOutlined
            onClick={() =>
              setDataSource((pre) => pre.filter((c) => c.key !== record.key))
            }
          />
        );
      },
      width: 2,
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const handleAdd = () => {
    let data = {
      key: uuidv4(),
      type: "",
      unit: "",
      ratio: 0,
      active: true,
    };
    setDataSource([...dataSource, data]);
  };

  const onSave = async () => {
    // setWhatLoad(status);
    const response = await handleValidateWithOutReset(
      formRef?.current,
      id,
      `${dataInfo.dataRoute}/create`,
      `${dataInfo.dataRoute}/update/${id}`,
      {
        units: dataSource,
      },
      setLoading
    );
    if (response !== null) {
      if (!id)
        navigate(`${dataInfo.navPath}/workspace/${response.data.result?._id}`);
      setSelected(response.data?.result);
    }
    return response;
  };
  return (
    <>
      <FormLayout
        codes={dataInfo}
        extra={
          <Button
            onClick={() => {
              formRef.current?.resetFields();
              setDataSource([]);
              navigate(`${dataInfo.navPath}/workspace`);
            }}
          >
            New
          </Button>
        }
        extraStep={[
          <Button
            key="1"
            type="primary"
            onClick={() => onSave()}
            loading={loading}
          >
            Save
          </Button>,
        ]}
        subTitle={selected?.cuId}
      >
        <Card>
          <ProForm formRef={formRef} submitter={false}>
            <ProFormText
              name="name"
              label="Unit of Measure Category"
              placeholder={"Unit of Measure Category"}
              rules={[
                {
                  required: true,
                  message: "Please add Unit of Measure Category",
                },
              ]}
            />
          </ProForm>
          <StyledTable
            columns={columns}
            pagination={false}
            size="small"
            dataSource={dataSource}
            footer={() => {
              return (
                <Button
                  onClick={handleAdd}
                  type="primary"
                  // disabled={!journal}
                  icon={<PlusOutlined />}
                >
                  Add a Line
                </Button>
              );
            }}
          />
        </Card>
      </FormLayout>
    </>
  );
};

export default CreateForm;
