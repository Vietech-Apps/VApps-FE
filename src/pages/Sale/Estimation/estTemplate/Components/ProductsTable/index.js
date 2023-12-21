import {
  Form,
  Input,
  InputNumber,
  Table,
  Space,
  Button,
  Tooltip,
  Select,
} from "antd";

import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DeleteOutlined,
  SisternodeOutlined,
  SnippetsOutlined,
  SubnodeOutlined,
} from "@ant-design/icons";
import { BiCut } from "react-icons/bi";
import { StyledTable } from "../../index.styled";
import ProductSearch from "meta/Reusable/ProductSearch";
import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import CreateProduct from "pages/Inventory/Product/Forms/CreateForm";
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
  type,
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
          marginBottom: "-0px",
        }}
        name={dataIndex}
        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
      >
        {type == "0" ? (
          <Input.TextArea
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            autoSize={{
              minRows: 1,
              maxRows: 3,
            }}
          />
        ) : type == "1" ? (
          <InputNumber
            ref={inputRef}
            prefix={
              dataIndex == "price" && record.currency == "USD"
                ? "$"
                : record.currency == "EURO" && "€"
            }
            onPressEnter={save}
            onBlur={save}
            // precision={0}
            style={{ width: "100%" }}
          />
        ) : (
          type == "2" && (
            <Select ref={inputRef} onBlur={save}>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="PKR">PKR</Select.Option>
              <Select.Option value="EURO">EURO</Select.Option>
            </Select>
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
const ProductsTable = ({
  isCopy,
  setIsCopy,
  panels,
  setPanels,
  panelDetail,
}) => {
  const [products, setProducts] = useState();
  const [isAddProduct, setIsAddProduct] = useState(true);
  const [isAddSection, setIsAddSection] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setProducts(
      panels.filter((panel) => panel._id === panelDetail?._id)[0].products
    );
  }, [products, panels]);

  const defaultColumns = [
    {
      title: (
        <Space>
          Code{" "}
          <ModalWithFormChild
            childern={<CreateProduct modal={true} />}
            route={"erp/product/create"}
            title={"Create a new Product"}
            tooltip={"Create a new Product"}
            size="small"
          />
        </Space>
      ),
      dataIndex: "code",
      width: "15%",
      editable: true,
      type: "0",
    },
    {
      title: "Name",
      width: "20%",
      dataIndex: "name",
      ellipsis: true,
      key: "name",
      type: "0",
      editable: true,
    },
    {
      title: "Model",
      dataIndex: "model",
      editable: true,
      key: "model",
      ellipsis: true,
      type: "0",
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
      ellipsis: true,
      editable: true,
      type: "0",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      editable: true,
      type: "2",
      key: "currency",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      editable: true,
      type: "1",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price, p) => (!p.type == 1 ? "" : price ? price?.toFixed(2) : 0),
      editable: true,
      key: "price",
      type: "1",
    },
    {
      title: "Disc",
      dataIndex: "discount",
      key: "discount",
      render: (discount, p) => (!p.type == 1 ? "" : discount),
      editable: true,
      type: "1",
    },
    {
      title: "Unit",
      type: "1",
      key: "unitPrice",
      dataIndex: "unitPrice",
      render: (text, p) => {
        if (p.type == 1) {
          return (
            <span key={p.key}>
              {(p.discount && p.price
                ? p.price - (p.price * p.discount) / 100
                : p.price || 0
              )?.toFixed(2)}
            </span>
          );
        }
      },
    },
    {
      title: "Sub",

      key: "subtotal",
      render: (w, p) =>
        p.type == 1 &&
        (p.discount && p.price
          ? (p.price - (p.price * p.discount) / 100) * p.qty
          : p.price * p.qty
        )?.toFixed(2),
    },

    {
      title: "Actions",
      width: 100,
      key: "Action",
      render: (_, record, i) => {
        return (
          <Space key={record.key} wrap>
            <DeleteOutlined onClick={() => handleDelete(record)} />
            {isCopy == true && (
              <Tooltip title={"Paste Here"}>
                <SnippetsOutlined onClick={() => onPaste(i, record)} />
              </Tooltip>
            )}

            {isCopy == true && (
              <Tooltip title={"Move Here"}>
                <BiCut onClick={() => onCut(i, record)} />
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  const handleAddProduct = async (value, options) => {
    const filterData = options.find((option) => option._id === value);
    const newData = {
      key: uuidv4(),
      code: filterData?.code,
      name: filterData?.name,
      type: 1,
      productId: filterData?._id,
      price: filterData?.purchasePrice,
      panelId: panelDetail._id,
      discount: filterData?.purchaseDiscount ? filterData?.purchaseDiscount : 0,
      qty: 1,
      panelCount: panelDetail.panelCount,
      make: filterData?.make?.title,
      model: filterData?.model,
      makeId: filterData?.make?._id,
      currency: filterData?.currency ? filterData?.currency : "Rs",
    };
    setProducts([...products, newData]);
    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          return {
            ...panel,
            products: [...panel.products, newData],
          };
        }
        return panel;
      }),
    ]);
  };
  const [section, setSection] = useState();
  const [qty, setQty] = useState();

  const handleAddSection = async () => {
    const newData = {
      name: section ? section : "section",
      key: uuidv4(),
      type: 2,
      detail: "",
      discount: 0,
      price: 0,
      qty: qty ? qty : 1,
      panelId: panelDetail._id,
      panelCount: panelDetail.panelCount,
    };
    setProducts([...products, newData]);
    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          return {
            ...panel,
            products: [...panel.products, newData],
          };
        }
        return panel;
      }),
    ]);
  };

  const handleSave = async (row) => {
    const newData = [...products];
    const index = newData.findIndex((item) => row._id === item._id);
    const item = newData[index];
    row.save = "Need Save";
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setProducts(newData);
    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          return {
            ...panel,
            products: newData,
          };
        }
        return panel;
      }),
    ]);
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
        editable:
          record.type == 2
            ? col.dataIndex == "make" ||
              col.dataIndex == "model" ||
              col.dataIndex == "price" ||
              col.dataIndex == "discount" ||
              col.dataIndex == "currency"
              ? false
              : col.editable
            : col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        type: col.type,
        handleSave,
      }),
    };
  });

  const handleDelete = async (e) => {
    const filterData = products?.filter((p) =>
      p._id ? p._id !== e._id : p.key !== e.key
    );
    setProducts(filterData);
    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id !== panelDetail?._id) {
          return panel;
        }
        return {
          ...panel,
          products: panel.products.filter((p) =>
            e._id ? p._id !== e._id : e.key !== p.key
          ),
        };
      }),
    ]);
  };

  const onPaste = (index, record) => {
    const newSelected = selectedRowKeys.map((p) => ({
      key: uuidv4(),
      name: p.name,
      code: p.code,
      qty: p.qty,
      panelCount: panelDetail?.panelCount,
      productId: p.productId,
      discount: p.discount,
      price: p.price,
      detail: p.detail,
      panelId: p.panelId,
      type: p.type,
      make: p.make,
      model: p.model,
      makeId: p?.makeId,
      currency: p.currency,
    }));

    const newPanels = [...panels];
    const panelIndex = newPanels.findIndex((p) =>
      p._id ? p._id === panelDetail?._id : p.key === panelDetail.key
    );
    newPanels[panelIndex].products.splice(index + 1, 0, ...newSelected);
    setProducts(Array.from(new Set([...products, ...newSelected])));
    setIsCopy(false);
  };

  const onCut = async (index, record) => {
    const newSelected = selectedRowKeys.map((p) => ({
      key: uuidv4(),
      name: p.name,
      code: p.code,
      qty: p.qty,
      panelCount: panelDetail?.panelCount,
      productId: p.productId,
      discount: p.discount,
      price: p.price,
      detail: p.detail,
      panelId: p.panelId,
      type: p.type,
      make: p.make,
      model: p.model,
      makeId: p?.makeId,
      currency: p.currency,
    }));

    const newProducts = products.filter(
      (p) => !selectedRowKeys.some((selected) => selected.key === p.key)
    );
    const newPanels = [...panels];
    const panelIndex = newPanels.findIndex((p) =>
      p._id ? p._id === panelDetail?._id : p.key === panelDetail.key
    );
    newPanels[panelIndex].products = newPanels[panelIndex].products.filter(
      (p) => newProducts.some((newProduct) => newProduct.key === p.key)
    );
    newPanels[panelIndex].products.splice(index + 1, 0, ...newSelected);
    setPanels(newPanels);
    setProducts(Array.from(new Set([...newProducts, ...newSelected])));
    setSelectedRowKeys([]);
    setIsCopy(false);
  };

  const getCheckboxProps = (record) => ({
    disabled: !record._id,
  });
  const [load, setLoad] = useState(false);
  return (
    <div>
      {/* <Divider style={{ margin: 4, padding: 4, marginTop: 2 }} /> */}
      <StyledTable
        cardBordered
        pagination={false}
        toolBarRender={false}
        search={false}
        bordered={false}
        components={components}
        dataSource={products}
        columns={columns}
        size="small"
        rowKey={(e) => e.key}
        rowSelection={{
          getCheckboxProps,
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          onChange: (r, d) => {
            setSelectedRowKeys(d), setIsCopy(d?.length > 0 ? true : false);
          },
        }}
        footer={() => (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <Tooltip placement="bottom" title={"Add New Section"}>
              <Button
                style={{ marginRight: "8px" }}
                kind="button"
                onClick={() => {
                  setIsAddProduct(false);
                  setIsAddSection(true);
                }}
                type="primary"
                ghost={isAddSection}
                icon={<SubnodeOutlined />}
              />
            </Tooltip>

            <Tooltip placement="bottom" title={"Add a Product"}>
              <Button
                style={{ marginRight: "8px" }}
                kind="button"
                onClick={() => {
                  setIsAddProduct(true);
                  setIsAddSection(false);
                }}
                type="primary"
                ghost={isAddProduct}
                icon={<SisternodeOutlined />}
              />
            </Tooltip>
            {isAddProduct && <ProductSearch handleSelect={handleAddProduct} />}
            {isAddSection && (
              <>
                <Input.TextArea
                  style={{ width: "700px" }}
                  placeholder="Section Name"
                  autoSize={{
                    minRows: 1,
                    maxRows: 3,
                  }}
                  onChange={(e) => setSection(e.target.value)}
                  value={section}
                />
                <InputNumber placeholder="qty" onChange={(e) => setQty(e)} />
              </>
            )}
            {isAddSection && (
              <Button type="primary" onClick={handleAddSection}>
                Add
              </Button>
            )}
          </div>
        )}
        rowClassName={(record) =>
          Object.prototype.hasOwnProperty.call(record, "_id") == true
            ? record.save == "Need Save"
              ? "row-color-notsaved"
              : record.type == 2
              ? "data-row-active-row-section"
              : ""
            : "row-color-notsaved"
        }
        tableAlertRender={false}
      />
    </div>
  );
};
export default ProductsTable;
