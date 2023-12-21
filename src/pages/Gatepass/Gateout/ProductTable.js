import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Space,
  InputNumber,
  Row,
  Col,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { generate } from "@ant-design/colors";
import React, { useContext, useEffect, useRef, useState } from "react";
import SearchModal from "./SearchModal";
import { StyledProTable } from "./index.styled";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
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
        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
      >
        {type == 1 ? (
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }}
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
          />
        ) : (
          type == 2 && (
            <InputNumber
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
              min={0}
              max={record.qty}
            />
          )
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        // style={{
        //   paddingRight: 24,
        // }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const ProductTable = ({ dataSource, setDataSource, id }) => {
  const [count, setCount] = useState(2);
  const valueEnum = dataSource?.reduce((acc, curr) => {
    acc[curr.cuId] = { text: curr.cuId };
    return acc;
  }, {});
  const handleAdd = () => {
    const newData = {
      key: uuidv4(),
      name: `name ${count}`,
      qty: 1,
      notes: `notes ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    row.deliveredStatus = row.qty !== row.deliveredQty ? "P.D" : "D";
    row.save = true;
    row.remainQty = row.qty - row.deliveredQty;
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
  const defaultColumns = [
    {
      title: "S.No",
      width: "4%",
      dataIndex: "index",
      valueType: "indexBorder",
    },
    {
      title: "Code",
      dataIndex: "code",
      width: "10%",
      type: 2,
    },
    {
      title: "PO",
      dataIndex: "poCuId",
      width: "10%",
      filters: true,
      onFilter: true,
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      valueEnum: valueEnum,
      type: "0",
    },
    {
      title: "Item",
      dataIndex: "name",
      width: "30%",
      editable: true,
      type: 1,
    },

    {
      title: "QTY",
      dataIndex: "qty",
      editable: true,
      type: 1,
    },
    {
      title: "Deliv.QTY",
      dataIndex: "deliveredQty",
      type: 2,
      editable: true,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      width: "20%",
      editable: true,
      type: 1,
    },
    {
      title: "status",
      dataIndex: "deliveredStatus",
      type: 1,
    },
    // {
    //   title: "Action",
    //   render: (_, key) => (
    //     <Space>
    //       <Button
    //         icon={<CloseSquareTwoTone />}
    //         type="text"
    //         onClick={() => {
    //           let x = dataSource?.filter((c) => c.po !== key.po);
    //           setDataSource(x);
    //         }}
    //       ></Button>
    //     </Space>
    //   ),
    //   type: 2,
    // },

    Table.SELECTION_COLUMN,
  ];
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
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    setCheckIsAdd(false);
  };

  const [checkIsAdd, setCheckIsAdd] = useState(false);

  function getRowClassName(record, index) {
    const cuIdGroups = {};
    let groupIndex = 1;
    dataSource.forEach((r, i) => {
      if (!cuIdGroups[r.poCuId]) {
        cuIdGroups[r.poCuId] = groupIndex;
        groupIndex += 1;
      }
    });
    groupIndex = cuIdGroups[record.poCuId];
    const colors = [
      "red",
      "pink",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
    ];
    const startIndex = groupIndex > 1 ? 1 : 0;
    const colorIndex = (startIndex + groupIndex) % colors.length;
    const colorName = `${colors[colorIndex]}-${(index % 10) + 1}`;

    const className = `group-${groupIndex}`;
    return `${className} ${colorName} editable-row`;
  }

  const groupColors = [
    generate("red")[1],
    generate("pink")[1],
    generate("orange")[1],
    generate("gold")[1],
    generate("lime")[1],
    generate("green")[1],
    generate("cyan")[1],
    generate("blue")[1],
    generate("geekblue")[1],
    generate("purple")[1],
    generate("red")[3],
    generate("pink")[3],
    generate("orange")[3],
    generate("gold")[3],
    generate("lime")[3],
    generate("green")[3],
    generate("cyan")[3],
    generate("blue")[3],
    generate("geekblue")[3],
    generate("purple")[3],
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      ...Object.values(valueEnum).map((button) => ({
        key: button.text,
        text: button.text,
        onSelect: () => {
          let selectedRows = dataSource?.filter(
            (item) => item.cuId === button.text
          );
          setSelectedRowKeys(selectedRows?.map((row) => row.key));
          setSelectedRows(selectedRows);
        },
      })),
    ],
  };
  const countByCuId = (dataSo) => {
    const counts = {};
    dataSo?.forEach((item) => {
      const cuId = item.cuId;
      counts[cuId] = (counts[cuId] || 0) + 1;
    });
    return counts;
  };
  const [open, setOpen] = useState(false);
  const handleSelect = (e, o) => {
    let d = o.find((c) => c._id == e);
    setDataSource([...dataSource, { ...d, key: uuidv4() }]);
  };
  const [w, setW] = useState();
  return (
    <div>
      <StyledProTable
        components={components}
        headerTitle={""}
        // headerTitle={`${dataSource?.reduce(
        //   (pre, item) => pre + item.deliveredQty,
        //   0
        // )} Item Delivering out of ${dataSource?.reduce(
        //   (pre, item) => pre + item.qty,
        //   0
        // )}`}
        pagination={false}
        rowKey={(key) => key.po}
        search={false}
        size={"small"}
        rowSelection={rowSelection}
        rowClassName={getRowClassName}
        bordered
        dataSource={dataSource}
        columns={columns}
        options={{
          setting: false,
          search: false,
          density: false,
          reset: false,
          refresh: false,
          fullScreen: true,
        }}
        groupColors={groupColors}
        footer={() => (
          <Row gutter={12}>
            <Col md={6}>
              <Space size={4}>
                <Button
                  type="primary"
                  onClick={() => {
                    setOpen(true);
                  }}
                  size="small"
                >
                  Load POs
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    setW("p");
                  }}
                >
                  Add Products
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    setW("l");
                    handleAdd();
                  }}
                >
                  Add Line
                </Button>
              </Space>
            </Col>
            <Col md={18}>
              {w == "p" ? (
                <SelectSearch
                  key={1}
                  fields={"make,code,name"}
                  route={`erp/products/search`}
                  columns={[
                    { label: "Id", size: 4, field: "cuId" },
                    { label: "code", size: 4, field: "code" },
                    { label: "Name", size: 4, field: "name" },
                    { label: "make", size: 4, accessor: (e) => e.make?.title },
                    { label: "Created Date", size: 5, field: "poDate" },
                  ]}
                  placeholder="search Products"
                  handleSelect={handleSelect}
                />
              ) : (
                ""
              )}
            </Col>
          </Row>
        )}
        tableAlertRender={({ onCleanSelected }) => {
          let qty = selectedRows?.reduce((pre, item) => pre + item.qty, 0);
          const counts = countByCuId(selectedRows);

          return (
            <Space size={24}>
              <span>
                {Object.keys(counts).length} POs with {qty} qunatity
              </span>
              {!id && (
                <Button
                  type="link"
                  onClick={() => {
                    let x = dataSource.filter(
                      (d) => !selectedRows.some((s) => s.po == d.po)
                    );

                    setDataSource(x);
                    onCleanSelected();
                    setSelectedRowKeys();
                    setSelectedRows();
                  }}
                >
                  Remove Selected PO
                </Button>
              )}
              {!id && (
                <Button
                  type="link"
                  onClick={() => {
                    let x = dataSource.filter(
                      (d) => !selectedRows.some((s) => s.key == d.key)
                    );

                    setDataSource(x);
                    onCleanSelected();
                    setSelectedRowKeys();
                    setSelectedRows();
                  }}
                >
                  Remove Selected Item
                </Button>
              )}
            </Space>
          );
        }}
      />
      {open && (
        <SearchModal
          dataSources={dataSource}
          setDataSources={setDataSource}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};
export default ProductTable;
