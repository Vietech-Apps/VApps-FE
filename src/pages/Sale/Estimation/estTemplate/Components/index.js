import { Badge, Button, Form, Input, Popconfirm, Select, Space } from "antd";
import { getIconByName } from "meta/common/AppIcons";
import ReactDragListView from "react-drag-listview";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GrDrag } from "react-icons/gr";
import { StyledTable } from "../index.styled";
import successHandler from "meta/services/auth/successHandler";
import errorHandler from "meta/services/auth/errorHandler";
import ProductsTable from "./ProductsTable";
import successHandler2 from "meta/services/auth/successHandle2";
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
  const { Option } = Select;
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
      type == "0" ? (
        <Form.Item
          style={{
            marginBottom: "0px",
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
      ) : type == "2" ? (
        <Form.Item
          style={{
            marginBottom: "-0px",
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select ref={inputRef} onBlur={save}>
            <Option value="Products">Products</Option>
            <Option value="Accessories">Accessories</Option>
          </Select>
        </Form.Item>
      ) : (
        <Form.Item
          style={{
            marginBottom: "-0px",
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select ref={inputRef} onBlur={save}>
            <Option value="LV">LV</Option>
            <Option value="MV">MV</Option>
            <Option value="PDB">PDB</Option>
            <Option value="LDB">LDB</Option>
            <Option value="DB">DB</Option>
            <Option value="BTD">BTD</Option>
            <Option value="Cable Tray">Cable Tray</Option>
          </Select>
        </Form.Item>
      )
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
const PanelTable = ({ form, panels, setPanels }) => {
  const handleDelete = async (key) => {
    const response = await jwtAxios.delete(`erp/estTemplate/delete/${key._id}`);
    if (response.data.success == true) {
      const newData = panels?.filter((item) => item._id !== key._id);
      setPanels(newData);
      message.success("Deleted");
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const countProductsWithoutId = (panelId) => {
    const panel = panels.find((p) => p._id === panelId);
    if (!panel) {
      return 0;
    }

    const productsWithoutId = panel.products.filter(
      (product) => !product._id || product.save == "Need Save"
    );
    return productsWithoutId.length;
  };
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Saved");
  const [whatClick, setWhatClick] = useState();
  const panelProductSave = async (e) => {
    setWhatClick(e._id);
    setMessage("Saving");
    setLoading(true);

    try {
      const response = await jwtAxios.patch(
        `erp/estTemplate/update/${e?._id}`,
        e
      );
      setPanels((prevPanels) => {
        const updatedPanels = prevPanels.map((panel) => {
          if (panel._id === e._id) {
            return response.data.result;
          }
          return panel;
        });
        return updatedPanels;
      });
      setLoading(false);
      setMessage("Saved");
      successHandler2(response);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };
  const defaultColumns = [
    {
      title: "Id",
      render: (key, record, index) => record.cuId || record.id,
    },

    {
      title: "Template Title",
      dataIndex: "title",
      key: "name",
      type: "0",
      editable: true,
    },
    {
      title: "Template Type",
      dataIndex: "type",
      type: "2",
      editable: true,
    },
    {
      title: "Panel Type",
      dataIndex: "panelType",
      type: "3",
      editable: true,
    },

    {
      title: "Creator",
      render: (record) => record.createdBy?.name,
      key: "creator",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "operation",
      width: "15%",
      dataIndex: "operation",
      render: (_, record, index) =>
        panels?.length >= 1 ? (
          <Space wrap>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <Button icon={getIconByName("delete")}></Button>
            </Popconfirm>

            <Badge count={countProductsWithoutId(record?._id)}>
              <Button
                type=""
                onClick={() => panelProductSave(record)}
                loading={whatClick == record._id && loading}
              >
                {countProductsWithoutId(record?._id) == 0
                  ? message
                  : "Need Save"}
              </Button>
            </Badge>
          </Space>
        ) : null,
    },
  ];

  const handleSave = async (row) => {
    const newData = [...panels];
    const index = newData.findIndex((item) => row.order === item.order);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setPanels(newData);
    try {
      const response = await jwtAxios.patch(
        `erp/estTemplate/update/${item?._id}`,
        row
      );
      successHandler(response);
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
        type: col.type,
        handleSave,
      }),
    };
  });
  const [isCopy, setIsCopy] = useState(false);
  const [copied, setCopied] = useState();
  const [cut, setCut] = useState(false);

  const expandedRowRender = (e) => {
    return (
      <ProductsTable
        key={e._id}
        setMessage={setMessage}
        panelDetail={e}
        setCopied={setCopied}
        copied={copied}
        setIsCopy={setIsCopy}
        isCopy={isCopy}
        setCut={setCut}
        panels={panels}
        setPanels={setPanels}
      />
    );
  };

  const onSelectChange = (newSelectedRowKeys, record) => {
    setSelectedRow(record);
    setSelectedRowKeys(newSelectedRowKeys);
    setIsCopy(false);
    setCut(false);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      {panels?.length > 0 && (
        <StyledTable
          cardBordered
          toolbar={false}
          search={false}
          reset={false}
          refresh={false}
          options={{
            setting: false,
            search: false,
            density: false,
            reset: false,
            refresh: false,
            fullScreen: true,
          }}
          expandable={{
            expandedRowRender,
          }}
          components={components}
          rowClassName={(record, index) =>
            `row-color-${index % 2 === 0 ? 0 : 1}`
          }
          dataSource={panels}
          columns={columns}
          rowKey={(e) => e.order}
          size="small"
          tableAlertRender={false}
          // showHeader={false}
          pagination={false}
        />
      )}
    </>
  );
};
export default PanelTable;
