import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import "./style.css";
import { StyledProTable } from "pages/Gatepass/Gatein/index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DeleteTwoTone } from "@ant-design/icons";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false} size="medium">
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
      >
        {type == "number" ? (
          <InputNumber
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            style={{ width: "100%" }}
            min={0}
          />
        ) : type == "select" ? (
          <Select
            options={[
              { label: "Units", value: "units" },
              { label: "Dozens", value: "dozens" },
            ]}
            ref={inputRef}
            // onPressEnter={save}
            onBlur={save}
          />
        ) : (
          type == "input" && (
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 4 }}
              allowClear
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
            />
          )
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
const ProductTable = ({ dataSource, setDataSource, selected }) => {
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "Id",
      dataIndex: "cuId",
    },
    {
      title: "Code",
      dataIndex: "code",
      editable: true,
      type: "input",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
      type: "input",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      width: "20%",
      editable: true,
      type: "input",
    },
    {
      title: "Demand",
      dataIndex: "qty",
      width: "10%",
      editable: true,
      type: "number",
    },
    selected?.products?.length > 0
      ? {
          title: "Done",
          dataIndex: "doneQty",
          width: "10%",
          editable: true,
          type: "number",
        }
      : {},

    {
      title: "UOM",
      dataIndex: "uom",
      type: "select",
      editable: true,
    },
    {
      title: "",
      //   dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <DeleteTwoTone />
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: uuidv4(),
      name: ``,
      qty: 1,
      notes: ``,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
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
        type: col.type,
      }),
    };
  });
  const handleSelect = (e, options) => {
    const d = options?.find((d) => d._id == e);

    let newd = {
      qty: 1,
      productId: d?._id,
      doneQty: 0,
      code: d.code,
      name: d.name,
      cuId: d.cuId,
      uom: "units",
      key: uuidv4(),
    };
    setDataSource([...dataSource, newd]);
  };

  return (
    <div>
      <StyledProTable
        components={components}
        rowClassName={() => "editable-row"}
        search={false}
        toolBarRender={false}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        locale={{ emptyText: () => "" }}
        footer={() => (
          <Row style={{ margin: 0, display: "flex", gap: "10px" }} gutter={24}>
            <Button onClick={handleAdd} type="primary">
              Add A Line
            </Button>

            <SelectSearch
              key={1}
              fields={"make,code,name"}
              route={`erp/products/search`}
              // label={"Product"}
              // name={"po"}
              columns={[
                { label: "Id", size: 4, field: "cuId" },
                { label: "code", size: 4, field: "code" },
                { label: "Name", size: 4, field: "name" },
                { label: "make", size: 4, accessor: (e) => e.make?.title },
                { label: "Created Date", size: 5, field: "poDate" },
              ]}
              placeholder="search Products"
              handleSelect={handleSelect}
              formProps={{ style: { marginBottom: "0px", flexGrow: 1 } }}
            />
          </Row>
        )}
      />
    </div>
  );
};
export default ProductTable;
