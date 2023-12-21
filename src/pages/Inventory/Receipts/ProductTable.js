import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
} from "antd";
import "./style.css";
import { StyledProTable } from "pages/Gatepass/Gatein/index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DeleteTwoTone } from "@ant-design/icons";
import { useParams } from "react-router-dom";
const { Option } = Select;
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
  binLocations,
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
            max={dataIndex == "doneQty" && record.qty - record.defectedQty}
          />
        ) : type == "select" ? (
          <Select
            options={[
              { label: "Units", value: "units" },
              { label: "Dozens", value: "dozens" },
            ]}
            ref={inputRef}
            onBlur={save}
          />
        ) : type == "selectBin" ? (
          <Select ref={inputRef} onBlur={save} allowClear>
            {binLocations?.map((c, t) => (
              <Option key={t} value={c.binLocationCode}>
                {c.binLocationCode}
              </Option>
            ))}
          </Select>
        ) : (
          type == "input" && (
            <Input.TextArea
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
              autoSize={{ minRows: 1, maxRows: 4 }}
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
const ProductTable = ({
  dataSource,
  setDataSource,
  selected,
  binLocations,
  warehouseId,
}) => {
  const { id } = useParams();

  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "#",
      dataIndex: "index",
      valueType: "indexBorder",
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
      title: "Demand",
      dataIndex: "qty",
      width: "10%",
      editable: true,
      type: "number",
    },

    selected?.po
      ? {
          title: "Defected",
          dataIndex: "defectedQty",
          width: "4%",
          type: "number",
        }
      : {},
    {
      title: "Done",
      dataIndex: "doneQty",
      width: "10%",
      editable: true,
      type: "number",
    },
    {
      title: "UOM",
      dataIndex: "uom",
      type: "select",
      width: "10%",
      editable: true,
    },
    {
      title: "Location",
      dataIndex: "binLocation",
      type: "selectBin",
      width: "20%",
      editable: true,
    },
    {
      title: "",
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
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
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
        binLocations: binLocations,
      }),
    };
  });
  const handleSelect = (e, options) => {
    const d = options?.find((d) => d._id == e);
    let c = d.inventory?.find(
      (c) => c.isDefault && c?.warehouse == warehouseId
    );

    let newd = {
      qty: 1,
      productId: d?._id,
      doneQty: 0,
      code: d.code || d.cuId,
      name: d.name,
      defectedQty: 0,
      cuId: d.cuId,
      uom: "units",
      key: uuidv4(),
      binLocation: c ? c?.binLocation?.binLocationCode : "",
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
        locale={{ emptyText: () => "" }}
        columns={columns}
        footer={() => (
          <div>
            <SelectSearch
              selectProps={{ disabled: !warehouseId }}
              key={1}
              fields={"make,code,name"}
              route={`erp/products/searchPopulated`}
              // label={"Product"}
              // name={"po"}
              columns={[
                { label: "Id", size: 4, field: "cuId" },
                { label: "code", size: 4, field: "code" },
                { label: "Name", size: 4, field: "name" },
                { label: "make", size: 4, accessor: (e) => e.make?.title },
                { label: "Created Date", size: 5, field: "poDate" },
              ]}
              placeholder={
                warehouseId ? "search Products" : "please select warehouse"
              }
              handleSelect={handleSelect}
            />
          </div>
        )}
      />
    </div>
  );
};
export default ProductTable;
