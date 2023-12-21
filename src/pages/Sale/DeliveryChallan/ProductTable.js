// import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import { Table, InputNumber, Typography, Popover, Space, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { DeleteTwoTone } from "@ant-design/icons";

import { StyledProductTable } from "meta/common/FormFeilds/index.styled";
import ProductSearch from "meta/Reusable/ProductSearch";
import SimpleSearch from "meta/JLayouts/SelectSearch/SimpleDisplay";
const App = ({
  journal,
  selected,
  dataSource,
  setDataSource,
  setSelected,
  isNew,
}) => {
  const [dataVersion, setDataVersion] = useState(0);
  const handleSave = (row, column, value) => {
    const newData = [...dataSource];
    newData[row][column] = value;
    setDataSource(newData);
  };

  const columns = [
    {
      render: (c, r, i) => i + 1,
      width: "2%",
    },
    {
      title: "Item",
      dataIndex: "code",
      width: "12%",
    },
    {
      title: "Name",
      width: "30%",
      dataIndex: "name",
      render: (value, record, index) => {
        return isNew ? (
          <Input.TextArea
            status={!value && "error"}
            defaultValue={value}
            autoSize={{ minRows: 1, maxRows: 4 }}
            size="medium"
            onBlur={(e) => handleSave(index, "name", e.target.value)}
          />
        ) : (
          value
        );
      },
    },
    {
      title: "Ordered QTY",
      dataIndex: "qty",
      width: "10%",
      render: (value, record, index) => {
        return isNew ? (
          <InputNumber
            status={value == 0 && "error"}
            size="medium"
            min={1}
            defaultValue={value}
            onChange={(e) => {
              handleSave(index, "qty", e);
              handleSave(index, "dcQty", e - record?.dcQty);
              handleSave(index, "remainQty", e - record?.dcQty);
              setDataVersion((c) => c + 1);
            }}
            style={{ width: "100%" }}
          />
        ) : (
          value
        );
      },
    },
    {
      title: "DC",
      dataIndex: "dcQty",
      width: "15%",
      render: (value, record, index) => {
        return (
          <InputNumber
            status={value == 0 && "error"}
            size="medium"
            min={1}
            max={record.qty}
            defaultValue={value}
            onChange={(e) => {
              handleSave(index, "dcQty", e);
              handleSave(index, "remainQty", record.qty - e);
              setDataVersion((c) => c + 1);
            }}
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "Remain Qty",
      dataIndex: "remainQty",
      width: "10%",
      render: (value) => {
        return value;
      },
    },
    {
      title: "UOM",
      dataIndex: "uom",
      width: "12%",
      render: (value, record, index) => {
        return isNew ? (
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
        ) : (
          value
        );
      },
    },
    { title: "status", dataIndex: "status", key: "status", width: "10%" },
    {
      title: "ac",
      render: (text, record) => {
        return (
          <DeleteTwoTone
            onClick={() =>
              setDataSource((pre) =>
                pre.map((c) =>
                  c.key == record.key ? { ...c, isRemove: true } : c
                )
              )
            }
          />
        );
      },
      width: "6%",
      key: "action",
    },
  ];
  const handleSelectP = (value, d) => {
    const x = d.find((opt) => opt._id === value);
    let c = x.uom?.units.find((c) => c.type == "reference");
    let newData = {
      code: x?.cuId,
      name: x?.name,
      productId: x?._id,
      price: x?.salePrice || 0,
      qty: x?.qty || 1,
      discount: x?.saleDiscount || 0,
      key: d?.key || uuidv4(),
      uom: c.unit,
      remainQty: 0,
      dcQty: 0,

      taxId: x.tax?._id,
      tax: x.tax?.taxRate,
      taxAccount:
        x.tax?.receivableAccount?.code + "-" + x.tax?.receivableAccount?.name,
      taxAccountId: x.tax?.receivableAccount?._id,
    };
    setDataSource([...dataSource, newData]);
    setDataVersion((prevDataVersion) => prevDataVersion + 1);
  };
  console.log(dataSource);
  return (
    <>
      <StyledProductTable
        size="small"
        bordered
        rowKey={(e) => e.key}
        locale={{
          emptyText: () => "No Data",
        }}
        key={dataVersion}
        dataSource={dataSource?.filter((c) => !c.isRemove)}
        columns={columns}
        toolBarRender={false}
        search={false}
        pagination={false}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={6} colSpan={8}>
                {isNew && (
                  <ProductSearch
                    selectProps={{
                      size: "medium",
                      disabled: selected?.status == "Posted",
                    }}
                    handleSelect={handleSelectP}
                  />
                )}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </>
  );
};
export default App;
