import React, { useState, useEffect, useRef } from "react";
import { Table, Input, Button, InputNumber, Space, Tooltip } from "antd";
import { ProTable } from "@ant-design/pro-components";
import SimpleSearch from "meta/JLayouts/SelectSearch/SimpleDisplay";
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

import ModalWithFormChild from "meta/Reusable/ModalWithFormChild";
import CreateProduct from "pages/Inventory/Product/Forms/CreateForm";
import { BiAddToQueue } from "react-icons/bi";

const ProductTable = ({
  dataSource,
  setDataSource,

  setSubTotal,
}) => {
  const [dataVersion, setDataVersion] = useState(0);
  useEffect(() => {
    let subTotal = dataSource?.reduce((acc, curr) => {
      return acc + (curr.qty * curr.price - curr.discount);
    }, 0);
    setSubTotal(subTotal);
  }, [dataSource]);
  const handleSave = (row, column, value) => {
    const newData = [...dataSource];
    newData[row][column] = value;
    setDataSource(newData);
  };

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

  const handleSelectP = (value, d) => {
    const x = d.find((opt) => opt._id === value);
    let c = x.uom?.units.find((c) => c.type == "reference");
    console.log(x);
    let newData = {
      code: x?.cuId,
      name: x?.name,
      productId: x?._id,
      price: x?.salePrice || 0,
      qty: x?.qty || 1,
      discount: x?.saleDiscount || 0,
      key: d?.key || uuidv4(),
      uom: c.unit,
      taxAccountId: x.tax?.receivableAccount?._id,
      taxAccount:
        x.tax?.receivableAccount?.code + "-" + x.tax?.receivableAccount?.name,
      tax: x.tax?.taxRate,
      account: x?.incomeAccount
        ? x?.incomeAccount?.code + "-" + x?.incomeAccount?.name
        : "",
      accountId: x?.incomeAccount ? x?.incomeAccount?._id : null,
    };
    setDataSource([...dataSource, newData]);
    setDataVersion((prevDataVersion) => prevDataVersion + 1);
  };
  console.log(dataSource);
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
      dataIndex: "code",
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
            fields={"name,code"}
            propClassName="select-set-l"
            where={{ selectAble: true }}
            route={`erp/products/search`}
            handleSelect={(e, o) => {
              let f = o.find((c) => c._id == e);
              handleSave(index, "code", f.cuId);
              handleSave(index, "name", f.name);
              handleSave(index, "qty", 4);
              handleSave(index, "discount", f?.saleDiscount || 0);
              handleSave(index, "tax", f?.tax || 0);
              handleSave(index, "price", f?.salePrice || 0);
              handleSave(index, "productId", f?._id);
              handleSave(index, "uom", f?.uom?.name);
              handleSave(index, "tax", f?.tax?.taxRate);
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
      width: "30%",
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
            style={{ width: "100%" }}
            defaultValue={value}
            autoSize={{ minRows: 1, maxRows: 4 }}
            size="medium"
            onBlur={(e) => handleSave(index, "name", e.target.value)}
          />
        );
      },
    },

    {
      title: "QTY",
      dataIndex: "qty",
      width: "6%",
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
            style={{ width: "100%" }}
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
      width: "8%",
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
            style={{ width: "100%" }}
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
      title: "Dsic%",
      dataIndex: "discount",
      width: "6%",
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
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "Tax%",
      dataIndex: "tax",
      width: "10%",
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
            selectProps={{
              value,
              // onClear: (c) => handleSave(index, "tax", 0),
            }}
            columns={[
              { label: "Name", accessor: (f) => f.taxRate + "%" + f.taxName },
            ]}
            placeholder="search tax"
          />
        );
      },
    },
    {
      title: "UOM",
      dataIndex: "uom",
      width: "10%",
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
            fields={"unit"}
            propClassName="select-set-r"
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
      title: "U.Price",
      dataIndex: "unitPrice",
      width: "5%",
      render: (text, record) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <>
            {calculateTotalPrice(record)
              ?.unitPrice?.toFixed(2)
              ?.toLocaleString()}
          </>
        );
      },
    },

    {
      title: "Incl.Tax",
      dataIndex: "afterTaxDiscount",
      width: "4%",
      render: (text, record) => {
        if (record.isSection) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <>
            {calculateTotalPrice(record)
              ?.totalPriceWithTax?.toFixed(2)
              .toLocaleString()}
          </>
        );
      },
    },

    {
      title: "",
      render: (text, record) => {
        return (
          <DeleteTwoTone
            onClick={() =>
              setDataSource((pre) => pre.filter((c) => c.key !== record.key))
            }
          />
        );
      },
      width: "2%",
      key: "action",
    },
  ];
  console.log(dataSource);
  return (
    <>
      <Table
        locale={{
          emptyText: () => "",
        }}
        disabled={true}
        size="small"
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
                        {untaxedAmount.toFixed(2)}
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
                        {totalAmount?.toFixed(2).toLocaleString()}
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
                      // type="primary"
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
export default ProductTable;
