import { Button, Form, Input, Popconfirm, Table } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import { v4 as uuidv4 } from "uuid";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import React, { useContext, useEffect, useRef, useState } from "react";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const SubLevelTable = ({ selected, dataSource, setDataSource, loading }) => {
  const [count, setCount] = useState(dataSource?.length + 1);
  useEffect(() => {
    setCount(dataSource?.length + 1);
  }, [dataSource]);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "Code",
      dataIndex: "title",
      width: "10%",
      editable: true,
    },

    {
      title: "Description",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "No. of Bin Locations",
      width: "10%",
      dataIndex: "binCount",
    },
  ];
  let title;
  if (selected.title === "Alphabet") {
    title = String.fromCharCode(64 + count);
  } else if (selected.title === "Number") {
    title = count;
  }
  const handleAdd = async () => {
    const newData = {
      key: uuidv4(),
      title: title,
      description: `${selected?.name}${count}`,
      binLevel: selected?._id,
    };

    try {
      const response = await jwtAxios.post(`erp/LevelCode/create`, newData);
      setDataSource([...dataSource, response.data.result]);
      setCount(count + 1);
      successHandler2(response);
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleSave = async (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    try {
      const response = await jwtAxios.put(
        `erp/LevelCode/update/${item._id}`,
        row
      );

      successHandler2(response);
    } catch (error) {
      errorHandler(error);
    }
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        size="small"
        dataSource={dataSource}
        columns={columns}
        rowKey={(key) => key._id}
        loading={loading}
        footer={() => (
          <Button
          
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add Code
          </Button>
        )}
      />
    </div>
  );
};
export default SubLevelTable;
