import {
  Form,
  Input,
  InputNumber,
  Table,
  Space,
  Button,
  Tooltip,
  Select,
  Typography,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  DeleteOutlined,
  FilterOutlined,
  SisternodeOutlined,
  SnippetsOutlined,
  SubnodeOutlined,
} from "@ant-design/icons";
import { BiCut } from "react-icons/bi";
import {
  Formate,
  getUniqueBrands,
  PanelSum,
  productCost,
  productTotal,
  productUnit,
} from "meta/Reusable/CalcData";
import { StyledTable } from "../../index.styled";
import { useGetData } from "meta/services/auth/ezAPI";
import { HiTemplate } from "react-icons/hi";
import ProductSearch from "meta/Reusable/ProductSearch";
import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import TempleteForm from "../../estTemplate/Components/AddPanel/TempleteForm";
import CreateProduct from "pages/Inventory/Product/Forms/CreateForm";

import getColumnSearchProps from "meta/Reusable/getColumnSearchProps";
import BulkUpdate from "meta/Reusable/BulkUpdate";
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
  estimation,
}) => {
  const [products, setProducts] = useState([]);
  const [isAddProduct, setIsAddProduct] = useState(true);
  const [isAddSection, setIsAddSection] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setProducts(panelDetail?.products);
  }, [panels]);
  const valueEnum = getUniqueBrands(
    products?.filter((p) => p.type == 1) || []
  )?.reduce((acc, curr) => {
    acc[curr.title] = { text: curr.title };
    return acc;
  }, {});

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
      render: (id) => <small>{id}</small>,
      width: "11%",
      editable: true,
      type: "0",
      ...getColumnSearchProps("code", false),
    },
    {
      title: "Name",
      width: "20%",
      dataIndex: "name",
      ellipsis: true,
      key: "name",
      type: "0",
      editable: true,
      ...getColumnSearchProps("name", true),
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
      filters: true,
      onFilter: true,
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      valueEnum: valueEnum,
      type: "0",
    },

    {
      title: "Qty",
      dataIndex: "qty",
      editable: true,
      type: "1",
      width: "5%",
      key: "qty",
    },
    {
      title: "Curr",
      dataIndex: "currency",
      editable: true,
      type: "2",
      width: "6%",
      key: "currency",
      filters: true,
      onFilter: true,
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      valueEnum: {
        USD: { text: "USD" },
        Rs: { text: "Rs" },
        EURO: { text: "EURO" },
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price, p) => (p.type == 2 ? "" : Formate(price)),
      editable: true,
      key: "price",
      type: "1",
    },
    {
      title: "Disc",
      dataIndex: "discount",
      key: "discount",
      width: "5%",
      render: (discount, p) => (p.type == 2 ? "" : Formate(discount, 2)),
      editable: true,
      type: "1",
    },
    {
      title: "Unit",
      type: "1",
      key: "unitPrice",
      dataIndex: "unitPrice",
      render: (w, p) => p.type == 1 && Formate(productUnit(p, estimation)),
    },
    {
      title: "Sub",
      key: "subtotal",
      render: (w, p) => p.type == 1 && Formate(productTotal(p, estimation)),
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
      save: "Need Save",
    };

    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          const updatedPanel = {
            ...panel,
            save: (panel.save || 0) + 1,
            pCost: productCost([...panel.products, newData], estimation),
            products: [...panel.products, newData],
          };
          const panelCost = PanelSum(updatedPanel);
          return {
            ...updatedPanel,
            panelCost,
          };
        }
        return panel;
      }),
    ]);
    setProducts([...products, newData]);
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
      save: "Need Save",
    };
    setProducts([...products, newData]);
    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          const updatedPanel = {
            ...panel,
            save: (panel.save || 0) + 1,
            pCost: productCost([...panel.products, newData], estimation),
            products: [...panel.products, newData],
          };
          const panelCost = PanelSum(updatedPanel);
          return {
            ...updatedPanel,
            panelCost,
          };
        }
        return panel;
      }),
    ]);
  };

  const handleSave = async (row) => {
    const newData = [...products];
    const index = newData.findIndex((item) =>
      row._id ? row._id === item._id : row.key === item.key
    );
    const item = newData[index];
    row.save = "Need Save";
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          const updatedPanel = {
            ...panel,
            save: (panel.save || 0) + 1,
            pCost: productCost(newData, estimation),
            products: newData,
          };
          const panelCost = PanelSum(updatedPanel);
          return {
            ...updatedPanel,
            panelCost,
          };
        }
        return panel;
      }),
    ]);
    setProducts(newData);
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
    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          const updatedPanel = {
            ...panel,
            save: (panel.save || 0) + 1,
            pCost: productCost(filterData, estimation),
            products: filterData,
          };
          const panelCost = PanelSum(updatedPanel);
          return {
            ...updatedPanel,
            panelCost,
          };
        }
        return panel;
      }),
    ]);
    setProducts(filterData);
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
      save: "Need Save",
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
      // save: "Need Save",
      currency: p.currency,
      _id: p._id,
    }));

    const newProducts = products?.filter(
      (p) => !selectedRowKeys.some((selected) => selected.key === p.key)
    );
    const newPanels = [...panels];
    const panelIndex = newPanels.findIndex((p) =>
      p._id ? p._id === panelDetail?._id : p.key === panelDetail.key
    );
    newPanels[panelIndex].products = newPanels[panelIndex].products?.filter(
      (p) => newProducts.some((newProduct) => newProduct.key === p.key)
    );
    newPanels[panelIndex].products.splice(index + 1, 0, ...newSelected);
    setProducts(Array.from(new Set([...newProducts, ...newSelected])));

    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          const updatedPanel = {
            products: Array.from(new Set([...newProducts, ...newSelected])),
            ...panel,
            save: (panel.save || 0) + 1,
            pCost: productCost(products, estimation),
          };
          const panelCost = PanelSum(updatedPanel);
          return {
            ...updatedPanel,
            panelCost,
          };
        }
        return panel;
      }),
    ]);

    setSelectedRowKeys([]);
    setIsCopy(false);
  };

  const [isGroup, setIsGroup] = useState(false);

  const [{ apiData: groups, loading }, { setRefreshing }] = useGetData(
    "erp/estTemplate/products",
    []
  );
  const { Option } = Select;
  let newFile;
  const handleAddGroup = async (e) => {
    const filterData = groups?.filter((p) => p._id == e);
    const produc = filterData[0]?.products;
    newFile = produc?.map((p, i) => ({
      key: uuidv4(),
      name: p.name,
      code: p.code,
      type: p.type,
      detail: p.detail,
      productId: p._id,
      price: p.price,
      panelId: panelDetail._id,
      discount: p.discount,
      qty: p.qty,
      panelCount: panelDetail.panelCount,
      make: p.make,
      model: p.model,
      makeId: p.makeId,
      save: "Need Save",
      currency: p.currency,
    }));
    setPanels((prevPanels) => [
      ...prevPanels.map((panel) => {
        if (panel._id === panelDetail._id) {
          const updatedPanel = {
            ...panel,
            save: (panel.save || 0) + 1,
            pCost: productCost([...panel.products, ...newFile], estimation),
            products: [...panel.products, ...newFile],
          };
          const panelCost = PanelSum(updatedPanel);
          return {
            ...updatedPanel,
            panelCost,
          };
        }
        return panel;
      }),
    ]);
  };
  const getCheckboxProps = (record) => ({
    disabled: !record._id,
  });
  const [load, setLoad] = useState(false);
  const other = {
    rowSelection: {
      getCheckboxProps,
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      onChange: (r, d) => {
        setSelectedRowKeys(d), setIsCopy(d?.length > 0 ? true : false);
      },
    },
    tableAlertRender: ({ selectedRowKeys, selectedRows, onCleanSelected }) => (
      <Space size={2}>
        <span>
          Selected {selectedRowKeys.length} items
          <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
            cancel selection
          </a>
        </span>
      </Space>
    ),

    tableAlertOptionRender: ({
      selectedRowKeys,
      selectedRows,
      onCleanSelected,
    }) => {
      return (
        <BulkUpdate
          selectedRowKeys={selectedRowKeys}
          selectedRows={selectedRows}
          onCleanSelected={onCleanSelected}
          products={products}
          setProducts={setProducts}
          estimation={estimation}
          panelDetail={panelDetail}
          setPanels={setPanels}
        />
      );
    },
  };
  return (
    <div>
      {/* <Divider style={{ margin: 4, padding: 4, marginTop: 2 }} /> */}
      <StyledTable
        cardBordered
        pagination={false}
        toolBarRender={false}
        search={false}
        // bordered={false}
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
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {products?.length > 0 && (
              <ModalWithFormChild
                childern={<TempleteForm type="Products" />}
                route={"erp/estTemplate/create"}
                title={"New Templete"}
                tooltip={"Save as New Templete"}
                width={600}
                otherValues={{ products: products }}
                setRefreshing={setRefreshing}
              />
            )}

            <Tooltip placement="bottom" title={"Load Templetes"}>
              <Button
                onClick={() => {
                  setIsAddProduct(false);
                  setIsAddSection(false);
                  setIsGroup(true);
                }}
                type="primary"
                ghost={isGroup}
                icon={<HiTemplate />}
              />
            </Tooltip>
            <Tooltip placement="bottom" title={"Add New Section"}>
              <Button
                onClick={() => {
                  setIsAddProduct(false);
                  setIsAddSection(true);
                  setIsGroup(false);
                }}
                type="primary"
                ghost={isAddSection}
                icon={<SubnodeOutlined />}
              />
            </Tooltip>

            <Tooltip placement="bottom" title={"Add a Product"}>
              <Button
                onClick={() => {
                  setIsAddProduct(true);
                  setIsAddSection(false);
                  setIsGroup(false);
                }}
                type="primary"
                ghost={isAddProduct}
                icon={<SisternodeOutlined />}
              />
            </Tooltip>
            {isGroup && (
              <Select
                style={{ width: "100%" }}
                loading={loading}
                showSearch
                placeholder="Search templetes by Title"
                optionFilterProp="children"
                onSelect={handleAddGroup}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {groups?.map((pro) => (
                  <Option key={pro._id} value={pro._id}>
                    {`${pro.cuId || pro.id}-${pro.panelType}
                    [ ${pro.title} ]  <${pro.createdBy?.name}>`}
                  </Option>
                ))}
              </Select>
            )}

            {isAddProduct && (
              <ProductSearch
                handleSelect={handleAddProduct}
                load={load}
                setLoad={setLoad}
              />
            )}
            {isAddSection && (
              <>
                <Input.TextArea
                  style={{ width: "100%" }}
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
          record.save == "Need Save"
            ? "row-color-notsaved"
            : record.type == 2
            ? "data-row-active-row-section"
            : ""
        }
        {...other}
      />
    </div>
  );
};
export default ProductsTable;
