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
import Unallocated from "./AdjustmentModal";
import InvoiceUnallocated from "../Invoicing/Unallocated";
import { StyledProductTable } from "meta/common/FormFeilds/index.styled";
import SimpleSearch from "meta/JLayouts/SelectSearch/SimpleDisplay";
import { creditNoteInfo } from "./Code";

const App = ({ selected, dataSource, setDataSource, setSelected, isDC }) => {
  const [dataVersion, setDataVersion] = useState(0);
  const [open, setOpen] = useState(false);
  const [allocateData, setAllocateData] = useState();
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
      account: x.incomeAccount?.code + "-" + x.incomeAccount?.name,
      accountId: x.incomeAccount?._id,
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
      width: 80,
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
            fields={"name,code,make,cuId"}
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
                f?.incomeAccount?.code + "-" + f?.incomeAccount?.name
              );
              handleSave(index, "accountId", f?.incomeAccount?._id);
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
      width: 130,
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
      title: "Account",
      dataIndex: "account",
      width: 89,
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
            route={`erp/ChartOfAccounts/wsearch`}
            handleSelect={(e, o) => {
              let f = o.find((c) => c._id == e);
              handleSave(index, "account", f.code + "-" + f.name);
              handleSave(index, "accountId", f._id);
            }}
            selectProps={{ value }}
            columns={[
              { label: "code", accessor: (f) => f.code + "-" + f.name },
            ]}
            placeholder="search chart of accounts"
          />
        );
      },
    },
    {
      title: "QTY",
      dataIndex: "qty",
      width: 20,
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
      width: 30,
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
      width: 30,
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
      width: 30,
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
      width: 50,
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
      render: (text, record) => {
        return (
          <DeleteTwoTone
            onClick={() =>
              setDataSource((pre) => pre.filter((c) => c.key !== record.key))
            }
          />
        );
      },
      width: 20,
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
        className={dataSource.length === 0 ? "empty-table-cell" : ""}
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
                {selected?.payments?.length > 0 &&
                  selected?.payments?.map((c) => (
                    <div key={c._id}>
                      <div className="flex justify-between gap-2 text-right">
                        <div colSpan={2} style={{ textAlign: "right" }}>
                          <Popover
                            content={
                              <div>
                                <p>Invoice Reference: {c.cuId}</p>
                                <p>
                                  Date: {moment(c.date).format("DD-MM-YYYY")}
                                </p>
                              </div>
                            }
                            title="Journal Item Information"
                          >
                            <InfoCircleOutlined />
                          </Popover>
                          <b style={{ fontSize: "12px" }}> {c.cuId}:</b>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Typography.Text
                            type="success"
                            style={{ fontSize: "12px" }}
                          >
                            {c.amount?.toFixed(2).toLocaleString()}
                          </Typography.Text>
                        </div>
                      </div>
                    </div>
                  ))}

                {selected?.payments?.length > 0 && (
                  <div>
                    <hr />
                    <div className="flex justify-between gap-2 text-right">
                      <div colSpan={2} style={{ textAlign: "right" }}>
                        <b style={{ fontSize: "12px" }}>Amount Due :</b>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <Typography.Text type="danger">
                          {calculateAmountDue(selected?.payments, totalAmount)}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                )}
                {selected?.unallocated?.length > 0 &&
                  selected?.unallocated?.map((c, i) => (
                    <div key={i}>
                      <hr />
                      <div className="flex justify-between gap-2 text-right">
                        <div colSpan={2} style={{ textAlign: "right" }}>
                          <b style={{ fontSize: "12px" }}>
                            <Button
                              onClick={() => {
                                setOpen(true);
                                setAllocateData(c);
                              }}
                            >
                              Adjustment
                            </Button>{" "}
                            {c.cuId} :
                          </b>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Typography.Text type="success">
                            {c.unallocated}
                          </Typography.Text>
                        </div>
                      </div>
                    </div>
                  ))}
                {selected?.invoices?.length > 0 &&
                  selected?.invoices?.map((c, i) => (
                    <div key={i}>
                      <hr />
                      <div className="flex justify-between gap-2 text-right">
                        <div colSpan={2} style={{ textAlign: "right" }}>
                          <b style={{ fontSize: "12px" }}>
                            <Button
                              onClick={() => {
                                setOpen(true);
                                setAllocateData(c);
                              }}
                            >
                              Adjustment
                            </Button>{" "}
                            {c.cuId} :
                          </b>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Typography.Text type="success">
                            {c.amountDue}
                          </Typography.Text>
                        </div>
                      </div>
                    </div>
                  ))}
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
                      disabled={isDC}
                    >
                      Add a Line
                    </Button>
                  </Tooltip>
                  <Tooltip placement="bottom" title={"Add New Section"}>
                    <Button
                      onClick={handleAddSection}
                      type="primary"
                      icon={<SubnodeOutlined />}
                      disabled={isDC}
                    >
                      Add a Section
                    </Button>
                  </Tooltip>
                </Space>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6} colSpan={7}>
                {!isDC && (
                  <ProductSearch
                    selectProps={{
                      size: "medium",
                      disabled: selected?.status == "In Payment",
                    }}
                    handleSelect={handleSelectP}
                  />
                )}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
      {selected?.invoices?.length > 0 &&
        selected?.status !== "In Payment" &&
        open && (
          <Unallocated
            setOpen={setOpen}
            open={open}
            selected={selected}
            dataSource={dataSource}
            setSelected={setSelected}
            allocateData={allocateData}
            route={`${creditNoteInfo?.dataRoute}/allocation/${selected?._id}`}
          />
        )}
      {selected?.unallocated?.length > 0 &&
        selected?.status !== "In Payment" &&
        open && (
          <InvoiceUnallocated
            setOpen={setOpen}
            open={open}
            selected={selected}
            dataSource={dataSource}
            setSelected={setSelected}
            allocateData={allocateData}
            route={`${creditNoteInfo?.dataRoute}/allocationPayment/${selected?._id}`}
          />
        )}
    </>
  );
};
export default App;
