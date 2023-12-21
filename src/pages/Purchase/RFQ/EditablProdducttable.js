import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Input,
  Button,
  InputNumber,
  Select,
  Typography,
  Space,
  Tooltip,
  Popover,
} from "antd";

import ProductSearch from "meta/Reusable/ProductSearch";
import { v4 as uuidv4 } from "uuid";

import {
  calculateAmountDue,
  calculateItemTotals,
  calculateTotalPrice,
} from "meta/common/MyFns";
import {
  DeleteTwoTone,
  InfoCircleOutlined,
  PlusOutlined,
  SubnodeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import CreateProduct from "pages/Inventory/Product/Forms/CreateForm";
import { BiAddToQueue } from "react-icons/bi";

import { StyledProductTable } from "meta/common/FormFeilds/index.styled";
import SimpleSearch from "meta/JLayouts/SelectSearch/SimpleDisplay";
import { GrFormCut } from "react-icons/gr";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineControlPointDuplicate } from "react-icons/md";

const App = ({ dataSource, setDataSource, setSubTotal }) => {
  const [dataVersion, setDataVersion] = useState(0);

  const handleSave = (row, column, value) => {
    const newData = [...dataSource];
    newData[row][column] = value;
    setDataSource(newData);
  };
  useEffect(() => {
    let subTotal = dataSource?.reduce((acc, curr) => {
      return acc + (curr.qty * curr.price - curr.discount);
    }, 0);
    setSubTotal(subTotal);
  }, [dataSource]);
  const handleAdd = () => {
    let newData = {
      key: uuidv4(),
      isSection: false,
      qty: 1,
      price: 0,
      tax: 0,
      debit: 0,
      discount: 0,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleAddSection = async () => {
    const newData = {
      name: "",
      key: uuidv4(),
      type: 2,
      isSection: true,
    };
    setDataSource([...dataSource, newData]);
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
  const handleSelectP = (value, d) => {
    const x = d.find((opt) => opt._id === value);

    let c = x.uom?.units?.find((c) => c.type == "reference");
    let newData = {
      cuId: x?.cuId,
      isNew: true,
      name: x?.name,
      productId: x?._id,
      price: x?.salePrice || 0,
      qty: x?.qty || 1,
      discount: x?.saleDiscount || 0,
      tax: x?.tax?.taxRate || 0,
      taxId: x.tax?._id,
      key: d?.key || uuidv4(),
      debit: 0,
      uom: c.unit,
      uomId: c._id,
      account: x.expenseAccount?.code + "-" + x.expenseAccount?.name,
      accountId: x.expenseAccount?._id,
      taxAccount:
        x.tax?.receivableAccount?.code + "-" + x.tax?.receivableAccount?.name,
      taxAccountId: x.tax?.receivableAccount?._id,
      total: "",
    };

    setDataSource([...dataSource, newData]);
    setDataVersion((prevDataVersion) => prevDataVersion + 1);
  };

  const columns = [
    {
      title: (
        <Space>
          Item
          <ModalWithFormChild
            childern={<CreateProduct modal={true} />}
            route={"erp/product/create"}
            title={"Create new Product"}
            icon={<BiAddToQueue />}
            tooltip={"Create new Product"}
            type="text"
            size="small"
          />
        </Space>
      ),
      dataIndex: "cuId",
      width: "15%",
      render: (value, record, index) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <SimpleSearch
            fields={"name,code"}
            where={{ selectAble: true }}
            route={`erp/products/search`}
            handleSelect={(e, o) => {
              let f = o.find((c) => c._id == e);
              let c = f.uom?.units?.find((c) => c.type == "reference");
              handleSave(index, "uom", c.unit);
              handleSave(index, "cuId", f.cuId);
              handleSave(index, "name", f.name);
              handleSave(index, "qty", 4);
              handleSave(index, "discount", f?.saleDiscount || 0);
              handleSave(index, "tax", f?.tax?.taxRate || 0);
              handleSave(index, "taxId", f.tax?._id);
              handleSave(index, "price", f?.salePrice || 0);
              handleSave(index, "productId", f?._id);
              handleSave(
                index,
                "account",
                f?.expenseAccount?.code + "-" + f?.expenseAccount?.name
              );
              handleSave(index, "accountId", f?.expenseAccount?._id);
              handleSave(
                index,
                "taxAccount",
                f?.tax?.receivableAccount?.code +
                  "-" +
                  f?.receivableAccount?.name
              );
              handleSave(index, "taxAccountId", f?.tax?.receivableAccount?._id);
              setDataVersion((c) => c + 1);
            }}
            selectProps={{ value }}
            columns={[{ label: "code", accessor: (f) => f.code }]}
            placeholder="search items"
          />
        );
      },
    },
    {
      title: "Name",
      width: "25%",
      dataIndex: "name",
      render: (value, record, index) => {
        if (record.isSection) {
          return {
            children: (
              <Input.TextArea
                defaultValue={value}
                autoSize={{ minRows: 1, maxRows: 4 }}
                size="medium"
                onBlur={(e) => handleSave(index, "name", e.target.value)}
              />
            ),
            props: {
              colSpan: 8,
            },
          };
        }
        return (
          <Input.TextArea
            defaultValue={value}
            autoSize={{ minRows: 1, maxRows: 4 }}
            size="medium"
            onBlur={(e) => handleSave(index, "name", e.target.value)}
          />
        );
      },
    },
    {
      title: "UOM",
      dataIndex: "uom",
      width: "12%",
      render: (value, record, index) => {
        return (
          <SimpleSearch
            fields={"unit"}
            route={`erp/uom/unitsearch`}
            handleSelect={(e, o) => {
              let f = o.find((c) => c._id == e);
              handleSave(index, "uom", f.unit);
            }}
            otherParams={{ unit: value }}
            selectProps={{ value }}
            columns={[{ label: "Unit", field: "unit" }]}
            placeholder="search uom"
          />
        );
      },
    },
    {
      title: "QTY",
      dataIndex: "qty",
      width: "5%",
      render: (value, record, index) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <InputNumber
            status={value == 0 && "error"}
            size="medium"
            min={0}
            defaultValue={value}
            onChange={(e) => handleSave(index, "qty", e)}
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "5%",
      render: (value, record, index) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <InputNumber
            status={value == 0 && "error"}
            defaultValue={value}
            min={0}
            size="medium"
            onChange={(e) => handleSave(index, "price", e)}
          />
        );
      },
    },
    {
      title: "Dsic",
      dataIndex: "discount",
      width: "5%",
      render: (value, record, index) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <InputNumber
            size="medium"
            min={0}
            defaultValue={value}
            onChange={(e) => handleSave(index, "discount", e)}
          />
        );
      },
    },
    {
      title: "Tax",
      dataIndex: "tax",
      width: "12%",
      render: (value, record, index) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <SimpleSearch
            fields={"taxName"}
            where={{ selectAble: true }}
            route={`erp/tax/dsearch`}
            handleSelect={(e, o) => {
              let f = o.find((c) => c._id == e);
              handleSave(index, "tax", f.taxRate);
              handleSave(
                index,
                "taxAccount",
                `${f.receivableAccount?.code} - ${f.receivableAccount?.name}`
              );
              handleSave(index, "taxAccountId", f.receivableAccount?._id);
            }}
            columns={[
              { label: "Name", accessor: (f) => f.taxRate + "%" + f.taxName },
            ]}
            selectProps={{ value }}
            placeholder="search tax"
          />
        );
      },
    },
    {
      title: "Incl.Tax",
      dataIndex: "afterTaxDiscount",
      width: "6%",
      render: (text, record) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <>{calculateTotalPrice(record)?.totalPriceWithTax.toLocaleString()}</>
        );
      },
    },

    {
      title: "ac",
      width: "7%",
      render: (text, record) => {
        return (
          <Space.Compact>
            <DeleteTwoTone
              onClick={() =>
                setDataSource((pre) => pre.filter((c) => c.key !== record.key))
              }
            />
            <Tooltip title="Cut" color="cyan">
              <Button
                type="text"
                size="small"
                disabled={copiedRow === record}
                onClick={() => handleCut(record)}
                icon={<GrFormCut />}
              ></Button>
            </Tooltip>
            <Tooltip title="Copy">
              <Button
                type="text"
                size="small"
                disabled={copiedRow === record}
                onClick={() => handleCopy(record)}
                icon={<IoMdCopy />}
              ></Button>
            </Tooltip>
            <Tooltip title="Paste">
              <Button
                size="small"
                type="text"
                disabled={copiedRow === null}
                onClick={() => handlePaste(record)}
                icon={<MdOutlineControlPointDuplicate />}
              ></Button>
            </Tooltip>
          </Space.Compact>
        );
      },

      key: "action",
    },
  ];

  return (
    <>
      <StyledProductTable
        locale={{
          emptyText: () => "",
        }}
        disabled={true}
        size="small"
        bordered
        className={dataSource?.length === 0 ? "empty-table-cell" : ""}
        rowKey={(e) => e.key}
        key={dataVersion}
        dataSource={dataSource}
        columns={columns}
        toolBarRender={false}
        search={false}
        pagination={false}
        footer={(pageData) => {
          let { untaxedAmount, taxAmount, totalAmount } = calculateItemTotals(
            pageData.filter((c) => !c.isSection)
          );
          return (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
                <div>
                  <div className="flex gap-2 justify-between text-right">
                    <div style={{ textAlign: "right" }}>
                      <b style={{ fontSize: "12px" }}>
                        Discounted Untaxed Amount:
                      </b>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <b style={{ fontSize: "12px" }}>
                        {untaxedAmount?.toFixed(2)}
                      </b>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 justify-between text-right">
                    <div style={{ textAlign: "right" }}>
                      <b style={{ fontSize: "12px" }}>Tax :</b>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <b style={{ fontSize: "12px" }}>
                        {taxAmount?.toFixed(2)}
                      </b>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <div className="flex justify-between gap-2 text-right">
                    <div colSpan={2} style={{ textAlign: "right" }}>
                      <b style={{ fontSize: "12px" }}>Total:</b>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <b style={{ fontSize: "12px" }}>
                        {totalAmount?.toFixed(2)?.toLocaleString()}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>
                <Space size={9}>
                  <Tooltip placement="bottom" title={"Add New Section"}>
                    <Button
                      onClick={handleAdd}
                      type="primary"
                      icon={<PlusOutlined />}
                    >
                      Add a Line
                    </Button>
                  </Tooltip>
                  <Tooltip placement="bottom" title={"Add New Section"}>
                    <Button
                      onClick={handleAddSection}
                      type="primary"
                      icon={<SubnodeOutlined />}
                    >
                      Add a Section
                    </Button>
                  </Tooltip>
                </Space>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6} colSpan={7}>
                <ProductSearch
                  selectProps={{
                    size: "medium",
                  }}
                  handleSelect={handleSelectP}
                />
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </>
  );
};
export default App;
