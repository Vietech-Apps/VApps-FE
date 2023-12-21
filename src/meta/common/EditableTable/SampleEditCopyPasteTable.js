import {
  CopyOutlined,
  DeleteOutlined,
  ScissorOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

const EditAbleTable = ({ dataSource, setDataSource }) => {
  const options = [
    {
      key: uuidv4(),
      item: "Edward King 01",
      remarks: "adresss1",
      qty: 34,
      unit: 12,
      invoice: "Abc123",
    },
    {
      key: uuidv4(),
      item: "Edward King 12",
      remarks: "adresss2",
      qty: 70,
      unit: 12,
      invoice: "Abc123",
    },
  ];

  const handleSelect = (value, record) => {
    const filteredData = options.filter((item) => item.key === value.key);
    let findData = filteredData[0];

    const newData = [...dataSource];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      newData.splice(index, 1, { key: uuidv4(), ...findData });
      setDataSource(newData);
    }
    setCheckIsAdd(false);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    setCheckIsAdd(false);
  };
  const [copiedRow, setCopiedRow] = useState(null);
  const handleCopy = (record) => {
    setCopiedRow(record);
  };
  const handleCut = (record) => {
    setCopiedRow(record);
    const newDataSource = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newDataSource);
  };
  const handlePaste = (record) => {
    if (copiedRow) {
      let newData = { ...copiedRow };
      const existingKeys = dataSource.map((item) => item.key);
      while (existingKeys.includes(newData.key)) {
        newData.key = uuidv4();
      }
      setCopiedRow(null);
      setDataSource([...dataSource, newData]);
    }
  };
  const defaultColumns = [
    {
      title: "S.No",
      width: "5%",
      render: (key, record, i) => i + 1,
    },
    {
      title: "Item",
      dataIndex: "item",
      width: "30%",
      editable: true,
      type: 2,
    },

    {
      title: "QTY",
      dataIndex: "qty",
      type: 2,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      type: 1,
    },
    {
      title: "Invoice No",
      dataIndex: "invoice",
      type: 2,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      type: 2,
    },
    {
      title: "Actions",
      width: "13%",
      fixed: "right",
      render: (_, record) =>
        dataSource?.length >= 1 ? (
          <Space wrap>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                size="small"
              ></Button>
            </Popconfirm>
            <Tooltip title="Cut" color="cyan">
              <Button
                type="primary"
                size="small"
                disabled={copiedRow === record}
                onClick={() => handleCut(record)}
                icon={<ScissorOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Copy">
              <Button
                type="primary"
                size="small"
                disabled={copiedRow === record}
                onClick={() => handleCopy(record)}
                icon={<CopyOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Paste">
              <Button
                size="small"
                type="primary"
                disabled={copiedRow === null}
                onClick={() => handlePaste(record)}
                icon={<SnippetsOutlined />}
              ></Button>
            </Tooltip>
          </Space>
        ) : null,
    },
  ];
  const [checkIsAdd, setCheckIsAdd] = useState(false);
  const handleAdd = () => {
    setCheckIsAdd(true);
    const newData = {
      key: uuidv4(),
      item: `Select`,
      remarks: "",
      qty: 1,
    };
    setDataSource([...dataSource, newData]);
  };
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

  const { Option } = Select;

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    type,
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
              messdescription: `${title} is required.`,
            },
          ]}
        >
          {type == 1 ? (
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          ) : (
            <Select
              ref={inputRef}
              onBlur={save}
              showArrow
              labelInValue
              onSelect={(value) => handleSelect(value, record)}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options.map((option) => (
                <Option key={option.key} value={option.item}>
                  {option.item}
                </Option>
              ))}
            </Select>
          )}
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
        type: col.type,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        search={false}
        size={"small"}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        footer={() => (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <Button
              type="primary"
              size="small"
              block
              onClick={() => {
                checkIsAdd
                  ? message.info(
                      "Only one line can be added,complete previous task!"
                    )
                  : handleAdd();
              }}
            >
              Add Row
            </Button>
          </div>
        )}
      />
    </div>
  );
};
export default EditAbleTable;
