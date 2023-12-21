import { Button, Form, Input, InputNumber, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import SelectSearch from "./SelectSearch";
import { ProTable } from "@ant-design/pro-components";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false} size="middle">
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
  type,
  inputProps,
  numberProps,
  route,
  otherProps,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    if (editable) {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
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
  const inputType = (type, route) => {
    switch (type) {
      case "input":
        return (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 5 }}
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            {...inputProps}
          />
        );
      case "number":
        return (
          <InputNumber
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            {...numberProps}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        );
      case "SelectSearch":
        return (
          <SelectSearch
            autoFocus={editing}
            onBlur={save}
            route={route}
            otherProps={otherProps}
            record={record}
            onSelect={(val) => {
              form.setFieldsValue({ [dataIndex]: val });
              // save();
            }}
          />
        );
      default:
        return (
          <Input.TextArea
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            autoSize={{ minRows: 1, maxRows: 5 }}
            {...inputProps}
          />
        );
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
        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
      >
        {inputType(type, route)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const App = ({
  dataSource,
  setDataSource,
  defaultColumns,
  summary,
  footer = false,
  handleSave: propsHandleSave,
}) => {
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
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
        rules: col.rules,
        type: col.type,
        inputProps: col.inputProps,
        numberProps: col.numberProps,
        route: col.route || "",
        otherProps: col.others || {},
        handleSave: propsHandleSave || handleSave,
      }),
    };
  });
  return (
    <div>
      <ProTable
        size="small"
        search={false}
        toolBarRender={false}
        locale={{ emptyText: () => "" }}
        pagination={false}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        footer={footer}
        summary={summary}
      />
    </div>
  );
};
export default App;
