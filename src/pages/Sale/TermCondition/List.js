import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Space, Table } from "antd";
import FormLayout from "meta/JLayouts/Layout";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TermForm from "./TermForm";
import { dataInfo } from "./Codes";
const List = () => {
  const [selectedData, setSelectedData] = useState();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "CreatedBy",
      render: (record) => record?.createdBy.name,
      key: "createdBy",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => {
            setSelectedData(record);
            setIsNew(true);
          }}
        ></Button>
      ),
    },
  ];
  const [value, setValue] = useState("");
  const [isNew, setIsNew] = useState(false);

  const [form] = Form.useForm();
  const [{ apiData: dataSource }, { setData: setDataSource }] = useGetData(
    `meta/termCond/alllist`,
    []
  );
  const onFinish = async (values) => {
    try {
      const response = await jwtAxios.post("meta/termCond/create", values);
      setDataSource([...dataSource, response.data.result]);
      successHandler(response);
      setIsNew(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onUpdate = async (values) => {
    try {
      const response = await jwtAxios.patch(
        `meta/termCond/update/${selectedData?._id}`,
        values
      );
      setDataSource((prevState) =>
        prevState.map((data) =>
          data._id === selectedData._id ? response.data.result : data
        )
      );
      successHandler(response);
      setIsNew(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onValidate = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (selectedData) {
          onUpdate(values);
        } else {
          console.log(values);
          onFinish(values);
        }
      })
      .catch((info) => {
        info.errorFields.map((p) => message.info(p.errors[0]));
      });
  };
  useEffect(() => {
    form.setFieldsValue({ content: selectedData?.content, ...selectedData });
  }, [selectedData]);
  return (
    <FormLayout
      codes={dataInfo}
      form={form}
      extra={
        <Button
          type="primary"
          onClick={() => {
            setIsNew(!isNew);
            setSelectedData(null);
          }}
        >
          {isNew ? "Back to List" : "Add New"}
        </Button>
      }
      otherChildern={
        isNew && (
          <Space wrap>
            <Button type="primary" onClick={() => onValidate()} size="small">
              {selectedData ? "Update" : "Save"}
            </Button>
          </Space>
        )
      }
    >
      {isNew ? (
        <TermForm form={form} modal={false} />
      ) : (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey={(key) => key._id}
          expandable={{
            expandedRowRender: (record) => (
              <ReactQuill
                readOnly={true}
                theme="bubble"
                value={record.content}
                placeholder={"write term and conditions"}
              />
            ),
          }}
        />
      )}
    </FormLayout>
  );
};

export default List;
