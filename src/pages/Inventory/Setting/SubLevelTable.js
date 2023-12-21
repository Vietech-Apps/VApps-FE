import { Button, Checkbox, Form, Input, Select, Table } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import { v4 as uuidv4 } from "uuid";
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

const App = ({
  dataSource,
  setDataSource,
  setCount,
  count,
  setRefreshing,
  loading,
}) => {
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
    const handleChange = async (e, item) => {
      try {
        const response = await jwtAxios.put(`erp/BinLevel/update/${item._id}`, {
          active: e,
        });
        setRefreshing(true);
        // setDataSource((prevState) => {
        //   const newData = prevState.map((items) => {
        //     if (items._id === item._id) {
        //       return response.data.result;
        //     } else {
        //       return items;
        //     }
        //   });
        //   return newData;
        // });
        successHandler2(response);
      } catch (error) {
        errorHandler(error);
      }
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

    useEffect(() => {
      form.setFieldsValue({
        active: record?.active,
      });
    }, [record]);

    if (editable) {
      childNode = editing ? (
        dataIndex !== "active" && (
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
        )
      ) : dataIndex == "active" ? (
        <Form.Item name={dataIndex} valuePropName="checked">
          <Checkbox
            ref={inputRef}
            disabled={record.key == "1"}
            onChange={(e) => handleChange(e.target.checked, record)}
          />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "Sublevel",
      dataIndex: "sublevel",
      width: "15%",
    },
    {
      title: "Name (changeable)",
      dataIndex: "name",
      editable: true,
      width: "20%",
    },
    {
      title: "Code (Prefix)",
      dataIndex: "title",
      // editable: true,
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "active",
     // editable: true,
      width: "10%",
       render: (record, i) => <Checkbox disabled />,
    },
  ];
  let getCountLetter = (count) => {
    const letters = ["Room", "Row", "Rack", "Level", "Box"];
    const index = count - 1;
    return letters[index];
  };
  let getCode = (count) => {
    const letters = ["Alphabet", "Number", "Number", "Number", "Alphabet"];
    const index = count - 1;
    return letters[index];
  };
  const handleAdd = async () => {
    const newData = {
      key: uuidv4(),
      sublevel: `SubLevel ${count}`,
      name: `${getCountLetter(count)}`,
      active: true,
      title: getCode(count),
    };
    try {
      const response = await jwtAxios.post(`erp/BinLevel/create`, newData);
      setDataSource([...dataSource, response.data.result]);
      setCount(count + 1);
      setRefreshing(true);
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

    try {
      const response = await jwtAxios.put(
        `erp/BinLevel/update/${item._id}`,
        row
      );
      setRefreshing(true);
      setDataSource(newData);
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
        size="small"
        rowClassName={() => "editable-row"}
        bordered
        loading={loading}
        rowKey={(key) => key.key}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        footer={() => (
          <Button
            block
            onClick={handleAdd}
            hidden={dataSource?.length >= 5}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add a row
          </Button>
        )}
      />
    </div>
  );
};
export default App;
